/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import PropTypes from 'prop-types';
import React, { Component }  from 'react';
import { IndexPatternSelect } from './index_pattern_select';
import { FieldSelect } from './field_select';

import {
  EuiFormRow,
  EuiFieldNumber,
  EuiSwitch,
  EuiSelect,
} from '@elastic/eui';

function filterField(field) {
  return field.aggregatable && ['number', 'boolean', 'date', 'ip', 'string'].includes(field.type);
}

export class ListControlEditor extends Component {
  state = {
    isLoadingFieldType: true,
    isStringField: false,
    prevFieldName: this.props.controlParams.fieldName,
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadIsStringField();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!prevState.isLoadingFieldType && prevState.prevFieldName &&
      prevState.prevFieldName !== nextProps.controlParams.fieldName) {
      return {
        isLoadingFieldType: true,
      };
    }

    return null;
  }

  componentDidUpdate = () => {
    if (this.state.isLoadingFieldType) {
      this.loadIsStringField();
    }
  }

  loadIsStringField = async () => {
    if (!this.props.controlParams.indexPattern || !this.props.controlParams.fieldName) {
      return;
    }

    const indexPattern = await this.props.getIndexPattern(this.props.controlParams.indexPattern);

    if (!this._isMounted) {
      return;
    }

    const field = indexPattern.fields.find((field) => {
      return field.name === this.props.controlParams.fieldName;
    });
    if (!field) {
      return;
    }
    this.setState({
      isLoadingFieldType: false,
      isStringField: field.type === 'string'
    });
  }

  renderOptions = () => {
    if (this.state.isLoadingFieldType) {
      return;
    }

    const options = [];
    if (this.props.parentCandidates && this.props.parentCandidates.length > 0) {
      const options = [
        { value: '', text: '' },
        ...this.props.parentCandidates,
      ];
      options.push(
        <EuiFormRow
          id={`parentSelect-${this.props.controlIndex}`}
          label="Parent control"
          helpText="Options are based on the value of parent control. Disabled if parent is not set."
          key="parentSelect"
        >
          <EuiSelect
            options={options}
            value={this.props.controlParams.parent}
            onChange={(evt) => {
              this.props.handleParentChange(this.props.controlIndex, evt);
            }}
          />
        </EuiFormRow>
      );
    }

    if (this.props.controlParams.fieldName) {
      options.push(
        <EuiFormRow
          id={`multiselect-${this.props.controlIndex}`}
          key="multiselect"
        >
          <EuiSwitch
            label="Multiselect"
            checked={this.props.controlParams.options.multiselect}
            onChange={(evt) => {
              this.props.handleCheckboxOptionChange(this.props.controlIndex, 'multiselect', evt);
            }}
            data-test-subj="listControlMultiselectInput"
          />
        </EuiFormRow>
      );

      // Due to Elasticsearch API's, dynamic options are only allowed on String fields
      if (this.state.isStringField) {
        options.push(
          <EuiFormRow
            id={`dynamicOptions-${this.props.controlIndex}`}
            key="dynamicOptions"
          >
            <EuiSwitch
              label="Dynamic Options"
              checked={this.props.controlParams.options.dynamicOptions}
              onChange={(evt) => {
                this.props.handleCheckboxOptionChange(this.props.controlIndex, 'dynamicOptions', evt);
              }}
              data-test-subj="listControlDynamicOptionsSwitch"
            />
          </EuiFormRow>
        );
      }

      // size is not used when dynamic options is set
      if (!this.props.controlParams.options.dynamicOptions) {
        options.push(
          <EuiFormRow
            id={`size-${this.props.controlIndex}`}
            label="Size"
            key="size"
          >
            <EuiFieldNumber
              min={1}
              value={this.props.controlParams.options.size}
              onChange={(evt) => {
                this.props.handleNumberOptionChange(this.props.controlIndex, 'size', evt);
              }}
              data-test-subj="listControlSizeInput"
            />
          </EuiFormRow>
        );
      }
    }

    return options;
  }

  render() {
    return (
      <div>

        <IndexPatternSelect
          indexPatternId={this.props.controlParams.indexPattern}
          onChange={this.props.handleIndexPatternChange}
          getIndexPatterns={this.props.getIndexPatterns}
          getIndexPattern={this.props.getIndexPattern}
          controlIndex={this.props.controlIndex}
        />

        <FieldSelect
          fieldName={this.props.controlParams.fieldName}
          indexPatternId={this.props.controlParams.indexPattern}
          filterField={filterField}
          onChange={this.props.handleFieldNameChange}
          getIndexPattern={this.props.getIndexPattern}
          controlIndex={this.props.controlIndex}
        />

        {this.renderOptions()}

      </div>
    );
  }
}

ListControlEditor.propTypes = {
  getIndexPatterns: PropTypes.func.isRequired,
  getIndexPattern: PropTypes.func.isRequired,
  controlIndex: PropTypes.number.isRequired,
  controlParams: PropTypes.object.isRequired,
  handleFieldNameChange: PropTypes.func.isRequired,
  handleIndexPatternChange: PropTypes.func.isRequired,
  handleCheckboxOptionChange: PropTypes.func.isRequired,
  handleNumberOptionChange: PropTypes.func.isRequired,
  parentCandidates: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  handleParentChange: PropTypes.func.isRequired,
};
