import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { FormRow } from './form_row';

import {
  EuiFieldText,
  EuiComboBox,
} from '@elastic/eui';

export class ListControl extends Component {

  state = {
    isLoading: false
  }

  componentDidMount = () => {
    this._isMounted = true;
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  handleOnChange = (selectedOptions) => {
    this.props.stageFilter(this.props.controlIndex, selectedOptions);
  }

  debouncedFetch = _.debounce(async (searchValue) => {
    await this.props.fetchOptions(searchValue);

    if (this._isMounted) {
      this.setState({
        isLoading: false,
      });
    }
  }, 300);

  onSearchChange = (searchValue) => {
    this.setState({
      isLoading: true,
    }, this.debouncedFetch.bind(null, searchValue));
  }

  renderControl() {
    if (this.props.disableMsg) {
      return (
        <EuiFieldText
          placeholder="Select..."
          disabled={true}
        />
      );
    }

    const options = this.props.options.map(option => {
      return {
        label: option.label,
        value: option.value,
        ['data-test-subj']: `option_${option.value.replace(' ', '_')}`
      };
    });

    return (
      <EuiComboBox
        placeholder="Select..."
        options={options}
        isLoading={this.state.isLoading}
        async={this.props.dynamicOptions}
        onSearchChange={this.props.dynamicOptions ? this.onSearchChange : undefined}
        selectedOptions={this.props.selectedOptions}
        onChange={this.handleOnChange}
        singleSelection={!this.props.multiselect}
        data-test-subj={`listControlSelect${this.props.controlIndex}`}
      />
    );
  }

  render() {
    return (
      <FormRow
        id={this.props.id}
        label={this.props.label}
        controlIndex={this.props.controlIndex}
        disableMsg={this.props.disableMsg}
      >
        {this.renderControl()}
      </FormRow>
    );
  }
}

const comboBoxOptionShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

ListControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selectedOptions: PropTypes.arrayOf(comboBoxOptionShape).isRequired,
  options: PropTypes.arrayOf(comboBoxOptionShape),
  disableMsg: PropTypes.string,
  multiselect: PropTypes.bool,
  dynamicOptions: PropTypes.bool,
  controlIndex: PropTypes.number.isRequired,
  stageFilter: PropTypes.func.isRequired,
  fetchOptions: PropTypes.func,
};

ListControl.defaultProps = {
  dynamicOptions: false,
  multiselect: true,
};

ListControl.defaultProps = {
  options: [],
};
