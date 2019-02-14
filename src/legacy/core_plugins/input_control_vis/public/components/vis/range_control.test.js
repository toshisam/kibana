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

import React from 'react';
import { shallowWithIntl } from 'test_utils/enzyme_helpers';

import {
  RangeControl,
} from './range_control';

const control = {
  id: 'mock-range-control',
  isEnabled: () => { return true; },
  options: {
    decimalPlaces: 0,
    step: 1
  },
  type: 'range',
  label: 'range control',
  value: { min: 0, max: 0 },
  min: 0,
  max: 100,
  hasValue: () => {
    return false;
  }
};

test('renders RangeControl', () => {
  const component = shallowWithIntl(<RangeControl.WrappedComponent
    control={control}
    controlIndex={0}
    stageFilter={() => {}}
  />);
  expect(component).toMatchSnapshot(); // eslint-disable-line
});

test('disabled', () => {
  const disabledRangeControl = {
    id: 'mock-range-control',
    isEnabled: () => { return false; },
    options: {
      decimalPlaces: 0,
      step: 1
    },
    type: 'range',
    label: 'range control',
    disabledReason: 'control is disabled to test rendering when disabled',
    hasValue: () => {
      return false;
    }
  };
  const component = shallowWithIntl(<RangeControl.WrappedComponent
    control={disabledRangeControl}
    controlIndex={0}
    stageFilter={() => {}}
  />);
  expect(component).toMatchSnapshot(); // eslint-disable-line
});
