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

import chrome from 'ui/chrome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import dateMath from '@kbn/datemath';

import { QuickForm } from './quick_form';
import { TimeInput } from './time_input';
import { toastNotifications } from 'ui/notify';

import {
  EuiText,
  EuiFormControlLayout,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import { prettyDuration } from '../pretty_duration';
import { timeNavigation } from '../time_navigation';
import { calculateBounds } from 'ui/timefilter/get_time';

export class Timepicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      from: this.props.from,
      to: this.props.to,
      isInvalid: false,
      hasChanged: false,
      isEditMode: false,
    };
  }

  static getDerivedStateFromProps = (nextProps) => {
    return {
      from: nextProps.from,
      to: nextProps.to,
      isInvalid: false,
      hasChanged: false,
      isEditMode: false,
    };
  }

  setTime = ({ from, to }) => {
    if (this.lastToast) {
      toastNotifications.remove(this.lastToast);
    }

    const fromMoment = dateMath.parse(from);
    const toMoment = dateMath.parse(to, { roundUp: true });
    const isInvalid = fromMoment.isAfter(toMoment);
    if (isInvalid) {
      this.lastToast = toastNotifications.addDanger({
        title: `Invalid time range`,
        text: `From must occur before To`,
      });
    }

    this.setState({
      from,
      to,
      isInvalid,
      hasChanged: true,
    });
  }

  setFrom = (from) => {
    this.setTime({ from, to: this.state.to });
  }

  setTo = (to) => {
    this.setTime({ from: this.state.from, to });
  }

  getBounds = () => {
    return calculateBounds({ from: this.state.from, to: this.state.to });
  }

  stepForward = () => {
    this.setTime(timeNavigation.stepForward(this.getBounds()));
  }

  stepBackward = () => {
    this.setTime(timeNavigation.stepBackward(this.getBounds()));
  }

  applyTimeFromState = () => {
    this.props.setTime(this.state.from, this.state.to);
  }

  applyTime = ({ from, to }) => {
    this.props.setTime(from, to);
  }

  toTimeString = (timeValue) => {
    if (moment.isMoment(timeValue)) {
      return timeValue.toISOString();
    }

    return timeValue;
  }

  editMode = () => {
    this.setState({
      isEditMode: true
    });
  }

  renderTime = () => {
    const from = this.toTimeString(this.state.from);
    const to = this.toTimeString(this.state.to);
    if (this.state.isEditMode || this.state.hasChanged) {
      return (
        <Fragment>
          <TimeInput
            value={from}
            onChange={this.setFrom}
          />
          <EuiText className="euiDatePickerRange__delimeter" size="s" color="subdued">→</EuiText>
          <TimeInput
            value={to}
            onChange={this.setTo}
            roundUp={true}
          />
        </Fragment>
      );
    }

    const getConfig = (...args) => chrome.getUiSettingsClient().get(...args);
    return (
      <button
        className="euiDatePicker euiFieldText"
        onClick={this.editMode}
        style={{ textAlign: 'left', fontSize: 12, whiteSpace: 'nowrap' }}
      >
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            {prettyDuration(from, to, getConfig)}
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <span className="euiLink euiLink--primary">Show dates</span>
          </EuiFlexItem>
        </EuiFlexGroup>
      </button>
    );
  }

  render() {
    let updateButton;
    if (this.state.isEditMode || this.state.hasChanged) {
      updateButton = (
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={this.applyTimeFromState}
            color="secondary"
            fill
            disabled={this.state.isInvalid || !this.state.hasChanged}
          >
            Update
          </EuiButton>
        </EuiFlexItem>
      );
    } else {
      updateButton = (
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={this.applyTimeFromState}
            fill
            disabled={this.state.isInvalid}
          >
            Refresh
          </EuiButton>
        </EuiFlexItem>
      );
    }
    return (
      <EuiFlexGroup gutterSize="s" alignItems="center" style={{ margin: 4 }}>
        <EuiFlexItem grow={false}>
          <EuiFormControlLayout
            style={{ maxWidth: '100%' }}
            prepend={(
              <QuickForm
                setTime={this.setTime}
                applyTime={this.applyTime}
                stepForward={this.stepForward}
                stepBackward={this.stepBackward}
                setRefresh={this.props.setRefresh}
                isPaused={this.props.isPaused}
                refreshInterval={this.props.refreshInterval}
              />
            )}
          >
            <div
              className="euiDatePickerRange euiDatePickerRange--inGroup euiFormControlLayout__child--noStyle"
              style={this.state.isInvalid ? { background: 'red', minWidth: 340 } : { minWidth: 340 }}
            >
              {this.renderTime()}
            </div>
          </EuiFormControlLayout>
        </EuiFlexItem>

        {updateButton}

      </EuiFlexGroup>
    );
  }
}

const timeType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
]);

Timepicker.propTypes = {
  from: timeType,
  to: timeType,
  setTime: PropTypes.func,
  setRefresh: PropTypes.func,
  isPaused: PropTypes.bool,
  refreshInterval: PropTypes.number,
};

Timepicker.defaultProps = {
  from: 'now-15m',
  to: 'now',
};

