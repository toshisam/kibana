/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { ReactElement } from 'react';
import { getVectorStyleLabel } from '../components/get_vector_style_label';
import { FieldMetaOptions, StylePropertyOptions } from '../../../../../common/style_property_descriptor_types';

export interface IStyleProperty {
  isDynamic(): boolean;
  isComplete(): boolean;
  formatField(value: string | undefined): string;
  getStyleName(): string;
  getOptions(): StylePropertyOptions;
  renderRangeLegendHeader(): ReactElement<any> | null;
  renderLegendDetailRow(): ReactElement<any> | null;
  renderFieldMetaPopover(): ReactElement<any> | null;
  getDisplayStyleName(): string;
}

export class AbstractStyleProperty implements IStyleProperty {
  private _options: StylePropertyOptions;
  private _styleName: string;

  constructor(options: StylePropertyOptions, styleName: string) {
    this._options = options;
    this._styleName = styleName;
  }

  isDynamic(): boolean {
    return false;
  }

  /**
   * Is the style fully defined and usable? (e.g. for rendering, in legend UX, ...)
   * Why? during editing, partially-completed descriptors may be added to the layer-descriptor
   * e.g. dynamic-fields can have an incomplete state when the field is not yet selected from the drop-down
   * @returns {boolean}
   */
  isComplete(): boolean {
    return true;
  }

  formatField(value: string | undefined): string {
    return value;
  }

  getStyleName(): string {
    return this._styleName;
  }

  getOptions(): StylePropertyOptions {
    return this._options || {};
  }

  renderRangeLegendHeader() {
    return null;
  }

  renderLegendDetailRow() {
    return null;
  }

  renderFieldMetaPopover() {
    return null;
  }

  getDisplayStyleName() {
    return getVectorStyleLabel(this.getStyleName());
  }
}
