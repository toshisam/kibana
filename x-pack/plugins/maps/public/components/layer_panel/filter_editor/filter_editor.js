/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import chrome from 'ui/chrome';
import React, { Component, Fragment } from 'react';

import {
  EuiButton,
  EuiCodeBlock,
  EuiTitle,
  EuiPopover,
  EuiSpacer,
} from '@elastic/eui';

import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';
import { QueryBar } from 'ui/query_bar';
import { indexPatternService } from '../../../kibana_services';
import { Storage } from 'ui/storage';

const settings = chrome.getUiSettingsClient();
const localStorage = new Storage(window.localStorage);

export class FilterEditor extends Component {

  state = {
    isPopoverOpen: false,
    indexPatterns: [],
  }

  componentDidMount() {
    this._isMounted = true;
    this._loadIndexPatterns();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _loadIndexPatterns = async () => {
    const indexPatternIds = this.props.layer.getIndexPatternIds();
    const indexPatterns = [];
    const getIndexPatternPromises = indexPatternIds.map(async (indexPatternId) => {
      try {
        const indexPattern = await indexPatternService.get(indexPatternId);
        indexPatterns.push(indexPattern);
      } catch(err) {
        // unable to fetch index pattern
      }
    });

    await Promise.all(getIndexPatternPromises);

    if (!this._isMounted) {
      return;
    }

    this.setState({ indexPatterns });
  }

  _open = () => {
    this.setState({ isPopoverOpen: true });
  }

  _close = () => {
    this.setState({ isPopoverOpen: false });
  }

  _onQueryChange = ({ query }) => {
    this.props.setLayerQuery(this.props.layer.getId(), query);
    this._close();
  }

  _renderQueryPopover() {
    const layerQuery = this.props.layer.getQuery();

    return (
      <EuiPopover
        id="layerQueryPopover"
        button={this._renderOpenButton()}
        isOpen={this.state.isPopoverOpen}
        closePopover={this._close}
        anchorPosition="leftCenter"
      >
        <div className="mapFilterEditor">
          <QueryBar
            query={layerQuery ? layerQuery : { language: settings.get('search:queryLanguage'), query: '' }}
            onSubmit={this._onQueryChange}
            appName="maps"
            showDatePicker={false}
            indexPatterns={this.state.indexPatterns}
            store={localStorage}
            customSubmitButton={
              <EuiButton
                fill
                data-test-subj="mapFilterEditorSubmitButton"
              >
                <FormattedMessage
                  id="xpack.maps.layerPanel.filterEditor.modal.queryBarSubmitButtonLabel"
                  defaultMessage="Set filter"
                />
              </EuiButton>
            }
          />
        </div>
      </EuiPopover>
    );
  }

  _renderQuery() {
    const query = this.props.layer.getQuery();
    if (!query || !query.query) {
      return null;
    }

    return (
      <Fragment>
        <EuiCodeBlock>
          {query.query}
        </EuiCodeBlock>
        <EuiSpacer size="m" />
      </Fragment>
    );
  }

  _renderOpenButton() {
    const query = this.props.layer.getQuery();
    const openModalButtonLabel = query && query.query
      ? i18n.translate('xpack.maps.layerPanel.filterEditor.editFilterButtonLabel', {
        defaultMessage: 'Edit filter'
      })
      : i18n.translate('xpack.maps.layerPanel.filterEditor.addFilterButtonLabel', {
        defaultMessage: 'Add filter'
      });

    return (
      <EuiButton
        onClick={this._open}
        data-test-subj="mapLayerPanelOpenFilterEditorButton"
      >
        {openModalButtonLabel}
      </EuiButton>
    );
  }

  render() {
    return (
      <Fragment>
        <EuiTitle size="xs">
          <h5>
            <FormattedMessage
              id="xpack.maps.layerPanel.filterEditor.title"
              defaultMessage="Filter"
            />
          </h5>
        </EuiTitle>

        {this._renderQuery()}

        {this._renderQueryPopover()}
      </Fragment>
    );
  }
}
