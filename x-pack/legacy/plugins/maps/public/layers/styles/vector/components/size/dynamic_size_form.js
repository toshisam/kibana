/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import _ from 'lodash';
import React, { Fragment } from 'react';
import { FieldSelect } from '../field_select';
import { SizeRangeSelector } from './size_range_selector';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';

export function DynamicSizeForm(props) {
  const styleOptions = props.styleProperty.getOptions();

  const onFieldChange = ({ field }) => {
    props.onDynamicStyleChange(props.styleProperty.getStyleName(), { ...styleOptions, field });
  };

  const onSizeRangeChange = ({ minSize, maxSize }) => {
    props.onDynamicStyleChange(props.styleProperty.getStyleName(), {
      ...styleOptions,
      minSize,
      maxSize,
    });
  };

  let sizeRange;
  if (styleOptions.field && styleOptions.field.name) {
    sizeRange = (
      <SizeRangeSelector
        onChange={onSizeRangeChange}
        minSize={styleOptions.minSize}
        maxSize={styleOptions.maxSize}
        showLabels
        compressed
      />
    );
  }

  return (
    <Fragment>
      <EuiFlexGroup gutterSize="none" justifyContent="flexEnd">
        <EuiFlexItem grow={false}>{props.staticDynamicSelect}</EuiFlexItem>
        <EuiFlexItem>
          <FieldSelect
            fields={props.fields}
            selectedFieldName={_.get(styleOptions, 'field.name')}
            onChange={onFieldChange}
            compressed
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="s" />
      {sizeRange}
    </Fragment>
  );
}
