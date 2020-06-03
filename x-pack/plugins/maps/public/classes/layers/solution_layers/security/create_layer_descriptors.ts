/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import minimatch from 'minimatch';
import { i18n } from '@kbn/i18n';
import { IndexPattern } from 'src/plugins/data/public';
import { euiPaletteColorBlind } from '@elastic/eui';
import {
  AggDescriptor,
  ColorDynamicOptions,
  LayerDescriptor,
  SizeDynamicOptions,
  StylePropertyField,
  VectorStylePropertiesDescriptor,
} from '../../../../../common/descriptor_types';
import {
  AGG_TYPE,
  COLOR_MAP_TYPE,
  FIELD_ORIGIN,
  GRID_RESOLUTION,
  RENDER_AS,
  SOURCE_TYPES,
  STYLE_TYPE,
  SYMBOLIZE_AS_TYPES,
  VECTOR_STYLES,
} from '../../../../../common/constants';
import { VectorLayer } from '../../vector_layer/vector_layer';
import { VectorStyle } from '../../../styles/vector/vector_style';
import { ESSearchSource } from '../../../sources/es_search_source';

const euiVisColorPalette = euiPaletteColorBlind();

function isApmIndex(indexPatternTitle: string) {
  return minimatch(indexPatternTitle, 'apm-*');
}

function createSourceLayerDescriptor(indexPatternId: string, indexPatternTitle: string) {
  const sourceDescriptor = ESSearchSource.createDescriptor({
    indexPatternId,
    geoField: isApmIndex(indexPatternTitle) ? 'client.geo.location' : 'source.geo.location',
    tooltipProperties: isApmIndex(indexPatternTitle)
      ? [
          'host.name',
          'client.ip',
          'client.domain',
          'client.geo.country_iso_code',
          'client.as.organization.name',
        ]
      : [
          'host.name',
          'source.ip',
          'source.domain',
          'source.geo.country_iso_code',
          'source.as.organization.name',
        ],
  });

  const styleProperties: VectorStylePropertiesDescriptor = {
    [VECTOR_STYLES.FILL_COLOR]: {
      type: STYLE_TYPE.STATIC,
      options: { color: euiVisColorPalette[1] },
    },
    [VECTOR_STYLES.LINE_COLOR]: {
      type: STYLE_TYPE.STATIC,
      options: { color: '#FFFFFF' },
    },
    [VECTOR_STYLES.LINE_WIDTH]: { type: STYLE_TYPE.STATIC, options: { size: 2 } },
    [VECTOR_STYLES.SYMBOLIZE_AS]: {
      options: { value: SYMBOLIZE_AS_TYPES.ICON },
    },
    [VECTOR_STYLES.ICON]: {
      type: STYLE_TYPE.STATIC,
      options: { value: 'home' },
    },
    [VECTOR_STYLES.ICON_SIZE]: { type: STYLE_TYPE.STATIC, options: { size: 8 } },
  };

  return VectorLayer.createDescriptor({
    label: i18n.translate('xpack.maps.sescurity.destinationLayerLabel', {
      defaultMessage: '{indexPatternTitle} | Source Point',
      values: { indexPatternTitle },
    }),
    sourceDescriptor,
    style: VectorStyle.createDescriptor(styleProperties),
  });
}

function createDestinationLayerDescriptor(indexPatternId: string, indexPatternTitle: string) {
  const sourceDescriptor = ESSearchSource.createDescriptor({
    indexPatternId,
    geoField: isApmIndex(indexPatternTitle) ? 'server.geo.location' : 'destination.geo.location',
    tooltipProperties: isApmIndex(indexPatternTitle)
      ? [
          'host.name',
          'server.ip',
          'server.domain',
          'server.geo.country_iso_code',
          'server.as.organization.name',
        ]
      : [
          'host.name',
          'destination.ip',
          'destination.domain',
          'destination.geo.country_iso_code',
          'destination.as.organization.name',
        ],
  });

  const styleProperties: VectorStylePropertiesDescriptor = {
    [VECTOR_STYLES.FILL_COLOR]: {
      type: STYLE_TYPE.STATIC,
      options: { color: euiVisColorPalette[2] },
    },
    [VECTOR_STYLES.LINE_COLOR]: {
      type: STYLE_TYPE.STATIC,
      options: { color: '#FFFFFF' },
    },
    [VECTOR_STYLES.LINE_WIDTH]: { type: STYLE_TYPE.STATIC, options: { size: 2 } },
    [VECTOR_STYLES.SYMBOLIZE_AS]: {
      options: { value: SYMBOLIZE_AS_TYPES.ICON },
    },
    [VECTOR_STYLES.ICON]: {
      type: STYLE_TYPE.STATIC,
      options: { value: 'marker' },
    },
    [VECTOR_STYLES.ICON_SIZE]: { type: STYLE_TYPE.STATIC, options: { size: 8 } },
  };

  return VectorLayer.createDescriptor({
    label: i18n.translate('xpack.maps.sescurity.destinationLayerLabel', {
      defaultMessage: '{indexPatternTitle} | Destination point',
      values: { indexPatternTitle },
    }),
    sourceDescriptor,
    style: VectorStyle.createDescriptor(styleProperties),
  });
}

export function createLayerDescriptors(
  indexPatternId: string,
  indexPatternTitle: string
): LayerDescriptor[] {
  return [
    createSourceLayerDescriptor(indexPatternId, indexPatternTitle),
    createDestinationLayerDescriptor(indexPatternId, indexPatternTitle),
  ];
}
