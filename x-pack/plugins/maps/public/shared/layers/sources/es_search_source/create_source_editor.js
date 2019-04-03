/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import _ from 'lodash';
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { EuiFormRow, EuiSpacer, EuiSwitch, EuiCallOut } from '@elastic/eui';

import { IndexPatternSelect } from 'ui/index_patterns/components/index_pattern_select';
import { SingleFieldSelect } from '../../../components/single_field_select';
import { indexPatternService } from '../../../../kibana_services';
import { NoIndexPatternCallout } from '../../../components/no_index_pattern_callout';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';
import { kfetch } from 'ui/kfetch';
import { GIS_API_PATH } from '../../../../../common/constants';
import { DEFAULT_LIMIT, DEFAULT_FILTER_BY_MAP_BOUNDS } from './constants';

function filterGeoField(field) {
  return ['geo_point', 'geo_shape'].includes(field.type);
}

const DOC_COUNT_UNSET = -1;

export class CreateSourceEditor extends Component {

  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  state = {
    isLoadingIndexPattern: false,
    indexPatternId: '',
    geoField: '',
    noGeoIndexPatternsExist: false,
    indexDocCount: DOC_COUNT_UNSET,
    filterByMapBounds: DEFAULT_FILTER_BY_MAP_BOUNDS,
    showFilterByBoundsSwitch: false,
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadIndexPattern(this.state.indexPatternId);
  }

  onIndexPatternSelect = (indexPatternId) => {
    this.setState({
      indexPatternId,
    }, this.loadIndexPattern(indexPatternId));
  };

  loadIndexPattern = (indexPatternId) => {
    this.setState({
      isLoadingIndexPattern: true,
      indexPattern: undefined,
      geoField: undefined,
      indexDocCount: DOC_COUNT_UNSET,
      filterByMapBounds: DEFAULT_FILTER_BY_MAP_BOUNDS,
      showFilterByBoundsSwitch: false,
    }, this.debouncedLoad.bind(null, indexPatternId));
  };

  loadIndexDocCount = async (indexPatternTitle) => {
    try {
      const { count } = await kfetch({
        pathname: `../${GIS_API_PATH}/indexCount`,
        query: {
          index: indexPatternTitle
        }
      });
      return count;
    } catch (error) {
      // retrieving index count is a nice to have and is not essential
      // do not interrupt user flow if unable to retrieve count
      return DOC_COUNT_UNSET;
    }
  }

  debouncedLoad = _.debounce(async (indexPatternId) => {
    if (!indexPatternId || indexPatternId.length === 0) {
      return;
    }

    let indexPattern;
    try {
      indexPattern = await indexPatternService.get(indexPatternId);
    } catch (err) {
      // index pattern no longer exists
      return;
    }

    // Turn off filterByMapBounds when index contains a limited number of documents
    const indexDocCount = await this.loadIndexDocCount(indexPattern.title);
    const showFilterByBoundsSwitch = indexDocCount !== DOC_COUNT_UNSET && indexDocCount <= DEFAULT_LIMIT;
    const filterByMapBounds = !showFilterByBoundsSwitch;

    if (!this._isMounted) {
      return;
    }

    // props.indexPatternId may be updated before getIndexPattern returns
    // ignore response when fetched index pattern does not match active index pattern
    if (indexPattern.id !== indexPatternId) {
      return;
    }

    this.setState({
      isLoadingIndexPattern: false,
      indexPattern: indexPattern,
      indexDocCount,
      filterByMapBounds,
      showFilterByBoundsSwitch
    });

    //make default selection
    const geoFields = indexPattern.fields.filter(filterGeoField);
    if (geoFields[0]) {
      this.onGeoFieldSelect(geoFields[0].name);
    }

  }, 300);

  onGeoFieldSelect = (geoField) => {
    this.setState({
      geoField
    }, this.previewLayer);
  };

  onFilterByMapBoundsChange = event => {
    this.setState({
      filterByMapBounds: event.target.checked,
    }, this.previewLayer);
  };

  previewLayer = () => {
    const {
      indexPatternId,
      geoField,
      filterByMapBounds,
    } = this.state;

    const sourceConfig = (indexPatternId && geoField)
      ? { indexPatternId, geoField, filterByMapBounds }
      : null;
    this.props.onSelect(sourceConfig);
  }

  _onNoIndexPatterns = () => {
    this.setState({ noGeoIndexPatternsExist: true });
  }

  _renderGeoSelect() {
    if (!this.state.indexPattern) {
      return;
    }

    return (
      <EuiFormRow
        label={i18n.translate('xpack.maps.source.esSearch.geofieldLabel', {
          defaultMessage: 'Geospatial field'
        })}
      >
        <SingleFieldSelect
          placeholder={i18n.translate('xpack.maps.source.esSearch.selectLabel', {
            defaultMessage: 'Select geo field'
          })}
          value={this.state.geoField}
          onChange={this.onGeoFieldSelect}
          filterField={filterGeoField}
          fields={this.state.indexPattern ? this.state.indexPattern.fields : undefined}
        />
      </EuiFormRow>
    );
  }

  _renderFilterByMapBounds() {
    if (!this.state.showFilterByBoundsSwitch) {
      return null;
    }

    return (
      <Fragment>
        <EuiCallOut
          title={
            i18n.translate('xpack.maps.source.esSearch.disableFilterByMapBoundsTitle', {
              defaultMessage: `Dynamically filter for data in the visible map area has been disabled`
            })
          }
        >
          <p>
            <FormattedMessage
              id="xpack.maps.source.esSearch.disableFilterByMapBoundsExplainMsg"
              defaultMessage="Index '{indexPatternTitle}' currenlty has a limited number of documents
               and does not need to be filtered by the visible map area."
              values={{
                indexPatternTitle: this.state.indexPattern ? this.state.indexPattern.title : this.state.indexPatternId,
              }}
            />
          </p>
          <p>
            <FormattedMessage
              id="xpack.maps.source.esSearch.disableFilterByMapBoundsTurnOnMsg"
              defaultMessage="Turn on dynamically filter by the visible map area if you expect the number of documents to increase."
            />
          </p>
        </EuiCallOut>
        <EuiSpacer size="s" />
        <EuiFormRow>
          <EuiSwitch
            label={
              i18n.translate('xpack.maps.source.esSearch.extentFilterLabel', {
                defaultMessage: `Dynamically filter for data in the visible map area.`
              })

            }
            checked={this.props.filterByMapBounds}
            onChange={this.onFilterByMapBoundsChange}
          />
        </EuiFormRow>
      </Fragment>
    );
  }

  _renderNoIndexPatternWarning() {
    if (!this.state.noGeoIndexPatternsExist) {
      return null;
    }

    return (
      <Fragment>
        <NoIndexPatternCallout />
        <EuiSpacer size="s" />
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>

        {this._renderNoIndexPatternWarning()}

        <EuiFormRow
          label={
            i18n.translate('xpack.maps.source.esSearch.indexPatternLabel', {
              defaultMessage: 'Index pattern'
            })}
        >
          <IndexPatternSelect
            isDisabled={this.state.noGeoIndexPatternsExist}
            indexPatternId={this.state.indexPatternId}
            onChange={this.onIndexPatternSelect}
            placeholder={i18n.translate('xpack.maps.source.esSearch.selectIndexPatternPlaceholder', {
              defaultMessage: 'Select index pattern'
            })}
            fieldTypes={['geo_point', 'geo_shape']}
            onNoIndexPatterns={this._onNoIndexPatterns}
          />
        </EuiFormRow>

        {this._renderGeoSelect()}

        {this._renderFilterByMapBounds()}

      </Fragment>
    );
  }
}
