/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

jest.mock('../../../../kibana_services', () => {
  const mockUiSettings = {
    get: () => {
      return undefined;
    },
  };
  return {
    getUiSettings: () => {
      return mockUiSettings;
    },
  };
});

jest.mock('uuid/v4', () => {
  return function () {
    return '12345';
  };
});

import { createLayerDescriptors } from './create_layer_descriptors';

describe('createLayerDescriptor', () => {
  test('amp index', () => {
    expect(createLayerDescriptors('id', 'apm-*-transaction*')).toEqual([
      {
        __dataRequests: [],
        alpha: 0.75,
        id: '12345',
        joins: [],
        label: 'apm-*-transaction* | Source Point',
        maxZoom: 24,
        minZoom: 0,
        sourceDescriptor: {
          filterByMapBounds: true,
          geoField: 'client.geo.location',
          id: '12345',
          indexPatternId: 'id',
          scalingType: 'TOP_HITS',
          sortField: '',
          sortOrder: 'desc',
          tooltipProperties: [
            'host.name',
            'client.ip',
            'client.domain',
            'client.geo.country_iso_code',
            'client.as.organization.name',
          ],
          topHitsSize: 1,
          topHitsSplitField: 'client.ip',
          type: 'ES_SEARCH',
        },
        style: {
          isTimeAware: true,
          properties: {
            fillColor: {
              options: {
                color: '#6092C0',
              },
              type: 'STATIC',
            },
            icon: {
              options: {
                value: 'home',
              },
              type: 'STATIC',
            },
            iconOrientation: {
              options: {
                orientation: 0,
              },
              type: 'STATIC',
            },
            iconSize: {
              options: {
                size: 8,
              },
              type: 'STATIC',
            },
            labelBorderColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            labelBorderSize: {
              options: {
                size: 'SMALL',
              },
            },
            labelColor: {
              options: {
                color: '#000000',
              },
              type: 'STATIC',
            },
            labelSize: {
              options: {
                size: 14,
              },
              type: 'STATIC',
            },
            labelText: {
              options: {
                value: '',
              },
              type: 'STATIC',
            },
            lineColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            lineWidth: {
              options: {
                size: 2,
              },
              type: 'STATIC',
            },
            symbolizeAs: {
              options: {
                value: 'icon',
              },
            },
          },
          type: 'VECTOR',
        },
        type: 'VECTOR',
        visible: true,
      },
      {
        __dataRequests: [],
        alpha: 0.75,
        id: '12345',
        joins: [],
        label: 'apm-*-transaction* | Destination point',
        maxZoom: 24,
        minZoom: 0,
        sourceDescriptor: {
          filterByMapBounds: true,
          geoField: 'server.geo.location',
          id: '12345',
          indexPatternId: 'id',
          scalingType: 'TOP_HITS',
          sortField: '',
          sortOrder: 'desc',
          tooltipProperties: [
            'host.name',
            'server.ip',
            'server.domain',
            'server.geo.country_iso_code',
            'server.as.organization.name',
          ],
          topHitsSize: 1,
          topHitsSplitField: 'server.ip',
          type: 'ES_SEARCH',
        },
        style: {
          isTimeAware: true,
          properties: {
            fillColor: {
              options: {
                color: '#D36086',
              },
              type: 'STATIC',
            },
            icon: {
              options: {
                value: 'marker',
              },
              type: 'STATIC',
            },
            iconOrientation: {
              options: {
                orientation: 0,
              },
              type: 'STATIC',
            },
            iconSize: {
              options: {
                size: 8,
              },
              type: 'STATIC',
            },
            labelBorderColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            labelBorderSize: {
              options: {
                size: 'SMALL',
              },
            },
            labelColor: {
              options: {
                color: '#000000',
              },
              type: 'STATIC',
            },
            labelSize: {
              options: {
                size: 14,
              },
              type: 'STATIC',
            },
            labelText: {
              options: {
                value: '',
              },
              type: 'STATIC',
            },
            lineColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            lineWidth: {
              options: {
                size: 2,
              },
              type: 'STATIC',
            },
            symbolizeAs: {
              options: {
                value: 'icon',
              },
            },
          },
          type: 'VECTOR',
        },
        type: 'VECTOR',
        visible: true,
      },
      {
        __dataRequests: [],
        alpha: 0.75,
        id: '12345',
        joins: [],
        label: 'apm-*-transaction* | Line',
        maxZoom: 24,
        minZoom: 0,
        sourceDescriptor: {
          destGeoField: 'server.geo.location',
          id: '12345',
          indexPatternId: 'id',
          metrics: [
            {
              field: 'client.bytes',
              type: 'sum',
            },
            {
              field: 'server.bytes',
              type: 'sum',
            },
          ],
          sourceGeoField: 'client.geo.location',
          type: 'ES_PEW_PEW',
        },
        style: {
          isTimeAware: true,
          properties: {
            fillColor: {
              options: {
                color: '#54B399',
              },
              type: 'STATIC',
            },
            icon: {
              options: {
                value: 'marker',
              },
              type: 'STATIC',
            },
            iconOrientation: {
              options: {
                orientation: 0,
              },
              type: 'STATIC',
            },
            iconSize: {
              options: {
                size: 6,
              },
              type: 'STATIC',
            },
            labelBorderColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            labelBorderSize: {
              options: {
                size: 'SMALL',
              },
            },
            labelColor: {
              options: {
                color: '#000000',
              },
              type: 'STATIC',
            },
            labelSize: {
              options: {
                size: 14,
              },
              type: 'STATIC',
            },
            labelText: {
              options: {
                value: '',
              },
              type: 'STATIC',
            },
            lineColor: {
              options: {
                color: '#6092C0',
              },
              type: 'STATIC',
            },
            lineWidth: {
              options: {
                field: {
                  name: 'doc_count',
                  origin: 'source',
                },
                fieldMetaOptions: {
                  isEnabled: true,
                  sigma: 3,
                },
                maxSize: 8,
                minSize: 1,
              },
              type: 'DYNAMIC',
            },
            symbolizeAs: {
              options: {
                value: 'circle',
              },
            },
          },
          type: 'VECTOR',
        },
        type: 'VECTOR',
        visible: true,
      },
    ]);
  });

  test('non-apm index', () => {
    expect(createLayerDescriptors('id', 'filebeat-*')).toEqual([
      {
        __dataRequests: [],
        alpha: 0.75,
        id: '12345',
        joins: [],
        label: 'filebeat-* | Source Point',
        maxZoom: 24,
        minZoom: 0,
        sourceDescriptor: {
          filterByMapBounds: true,
          geoField: 'source.geo.location',
          id: '12345',
          indexPatternId: 'id',
          scalingType: 'TOP_HITS',
          sortField: '',
          sortOrder: 'desc',
          tooltipProperties: [
            'host.name',
            'source.ip',
            'source.domain',
            'source.geo.country_iso_code',
            'source.as.organization.name',
          ],
          topHitsSize: 1,
          topHitsSplitField: 'source.ip',
          type: 'ES_SEARCH',
        },
        style: {
          isTimeAware: true,
          properties: {
            fillColor: {
              options: {
                color: '#6092C0',
              },
              type: 'STATIC',
            },
            icon: {
              options: {
                value: 'home',
              },
              type: 'STATIC',
            },
            iconOrientation: {
              options: {
                orientation: 0,
              },
              type: 'STATIC',
            },
            iconSize: {
              options: {
                size: 8,
              },
              type: 'STATIC',
            },
            labelBorderColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            labelBorderSize: {
              options: {
                size: 'SMALL',
              },
            },
            labelColor: {
              options: {
                color: '#000000',
              },
              type: 'STATIC',
            },
            labelSize: {
              options: {
                size: 14,
              },
              type: 'STATIC',
            },
            labelText: {
              options: {
                value: '',
              },
              type: 'STATIC',
            },
            lineColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            lineWidth: {
              options: {
                size: 2,
              },
              type: 'STATIC',
            },
            symbolizeAs: {
              options: {
                value: 'icon',
              },
            },
          },
          type: 'VECTOR',
        },
        type: 'VECTOR',
        visible: true,
      },
      {
        __dataRequests: [],
        alpha: 0.75,
        id: '12345',
        joins: [],
        label: 'filebeat-* | Destination point',
        maxZoom: 24,
        minZoom: 0,
        sourceDescriptor: {
          filterByMapBounds: true,
          geoField: 'destination.geo.location',
          id: '12345',
          indexPatternId: 'id',
          scalingType: 'TOP_HITS',
          sortField: '',
          sortOrder: 'desc',
          tooltipProperties: [
            'host.name',
            'destination.ip',
            'destination.domain',
            'destination.geo.country_iso_code',
            'destination.as.organization.name',
          ],
          topHitsSize: 1,
          topHitsSplitField: 'destination.ip',
          type: 'ES_SEARCH',
        },
        style: {
          isTimeAware: true,
          properties: {
            fillColor: {
              options: {
                color: '#D36086',
              },
              type: 'STATIC',
            },
            icon: {
              options: {
                value: 'marker',
              },
              type: 'STATIC',
            },
            iconOrientation: {
              options: {
                orientation: 0,
              },
              type: 'STATIC',
            },
            iconSize: {
              options: {
                size: 8,
              },
              type: 'STATIC',
            },
            labelBorderColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            labelBorderSize: {
              options: {
                size: 'SMALL',
              },
            },
            labelColor: {
              options: {
                color: '#000000',
              },
              type: 'STATIC',
            },
            labelSize: {
              options: {
                size: 14,
              },
              type: 'STATIC',
            },
            labelText: {
              options: {
                value: '',
              },
              type: 'STATIC',
            },
            lineColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            lineWidth: {
              options: {
                size: 2,
              },
              type: 'STATIC',
            },
            symbolizeAs: {
              options: {
                value: 'icon',
              },
            },
          },
          type: 'VECTOR',
        },
        type: 'VECTOR',
        visible: true,
      },
      {
        __dataRequests: [],
        alpha: 0.75,
        id: '12345',
        joins: [],
        label: 'filebeat-* | Line',
        maxZoom: 24,
        minZoom: 0,
        sourceDescriptor: {
          destGeoField: 'destination.geo.location',
          id: '12345',
          indexPatternId: 'id',
          metrics: [
            {
              field: 'source.bytes',
              type: 'sum',
            },
            {
              field: 'destination.bytes',
              type: 'sum',
            },
          ],
          sourceGeoField: 'source.geo.location',
          type: 'ES_PEW_PEW',
        },
        style: {
          isTimeAware: true,
          properties: {
            fillColor: {
              options: {
                color: '#54B399',
              },
              type: 'STATIC',
            },
            icon: {
              options: {
                value: 'marker',
              },
              type: 'STATIC',
            },
            iconOrientation: {
              options: {
                orientation: 0,
              },
              type: 'STATIC',
            },
            iconSize: {
              options: {
                size: 6,
              },
              type: 'STATIC',
            },
            labelBorderColor: {
              options: {
                color: '#FFFFFF',
              },
              type: 'STATIC',
            },
            labelBorderSize: {
              options: {
                size: 'SMALL',
              },
            },
            labelColor: {
              options: {
                color: '#000000',
              },
              type: 'STATIC',
            },
            labelSize: {
              options: {
                size: 14,
              },
              type: 'STATIC',
            },
            labelText: {
              options: {
                value: '',
              },
              type: 'STATIC',
            },
            lineColor: {
              options: {
                color: '#6092C0',
              },
              type: 'STATIC',
            },
            lineWidth: {
              options: {
                field: {
                  name: 'doc_count',
                  origin: 'source',
                },
                fieldMetaOptions: {
                  isEnabled: true,
                  sigma: 3,
                },
                maxSize: 8,
                minSize: 1,
              },
              type: 'DYNAMIC',
            },
            symbolizeAs: {
              options: {
                value: 'circle',
              },
            },
          },
          type: 'VECTOR',
        },
        type: 'VECTOR',
        visible: true,
      },
    ]);
  });
});
