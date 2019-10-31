/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { render } from 'react-dom';
import { EuiForm, EuiFormRow, EuiPanel, EuiSpacer } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { I18nProvider } from '@kbn/i18n/react';
import { MultiColumnEditor } from '../multi_column_editor';
import {
  SuggestionRequest,
  Visualization,
  VisualizationProps,
  VisualizationSuggestion,
  Operation,
} from '../types';
import { generateId } from '../id_generator';
import { NativeRenderer } from '../native_renderer';

export interface LayerState {
  layerId: string;
  columns: string[];
}

export interface MapVisualizationState {
  layers: LayerState[];
}

function newLayerState(layerId: string): LayerState {
  return {
    layerId,
    columns: [generateId()],
  };
}

function updateColumns(
  state: MapVisualizationState,
  layer: LayerState,
  fn: (columns: string[]) => string[]
) {
  const columns = fn(layer.columns);
  const updatedLayer = { ...layer, columns };
  const layers = state.layers.map(l => (l.layerId === layer.layerId ? updatedLayer : l));
  return { ...state, layers };
}

const allOperations = () => true;

export function MapLayer({
  layer,
  frame,
  state,
  setState,
  dragDropContext,
}: { layer: LayerState } & VisualizationProps<MapVisualizationState>) {
  const datasource = frame.datasourceLayers[layer.layerId];

  const originalOrder = datasource.getTableSpec().map(({ columnId }) => columnId);
  // When we add a column it could be empty, and therefore have no order
  const sortedColumns = Array.from(new Set(originalOrder.concat(layer.columns)));

  return (
    <EuiPanel className="lnsConfigPanel__panel" paddingSize="s">
      <NativeRenderer
        render={datasource.renderLayerPanel}
        nativeProps={{ layerId: layer.layerId }}
      />

      <EuiSpacer size="s" />
      <EuiFormRow
        className="lnsConfigPanel__axis"
        label={i18n.translate('xpack.lens.map.columns', { defaultMessage: 'Columns' })}
      >
        <MultiColumnEditor
          accessors={sortedColumns}
          datasource={datasource}
          dragDropContext={dragDropContext}
          filterOperations={allOperations}
          layerId={layer.layerId}
          onAdd={() => setState(updateColumns(state, layer, columns => [...columns, generateId()]))}
          onRemove={column =>
            setState(updateColumns(state, layer, columns => columns.filter(c => c !== column)))
          }
          testSubj="datatable_columns"
          data-test-subj="datatable_multicolumnEditor"
        />
      </EuiFormRow>
    </EuiPanel>
  );
}

export const mapVisualization: Visualization<
  MapVisualizationState,
  MapVisualizationState
> = {
  id: 'lnsMap',

  visualizationTypes: [
    {
      id: 'lnsMap',
      icon: 'visTable',
      largeIcon: 'gisApp',
      label: i18n.translate('xpack.lens.map.label', {
        defaultMessage: 'Map',
      }),
    },
  ],

  getDescription(state) {
    return {
      icon: 'gisApp',
      label: i18n.translate('xpack.lens.map.label', {
        defaultMessage: 'Map',
      }),
    };
  },

  switchVisualizationType: (_, state) => state,

  initialize(frame, state) {
    return (
      state || {
        layers: [newLayerState(frame.addNewLayer())],
      }
    );
  },

  getPersistableState: state => state,

  getSuggestions({
    table,
    state,
    keptLayerIds,
  }: SuggestionRequest<MapVisualizationState>): Array<
    VisualizationSuggestion<MapVisualizationState>
  > {
    if (
      table.columns[0].operation.dataType !== 'geo_point'
    ) {
      return [];
    }
    const title =
      table.changeType === 'unchanged'
        ? i18n.translate('xpack.lens.map.suggestionLabel', {
            defaultMessage: 'As map',
          })
        : i18n.translate('xpack.lens.map.visualizationOf', {
            defaultMessage: 'Map {operations}',
            values: {
              operations:
                table.label ||
                table.columns
                  .map(col => col.operation.label)
                  .join(
                    i18n.translate('xpack.lens.map.conjunctionSign', {
                      defaultMessage: ' & ',
                      description:
                        'A character that can be used for conjunction of multiple enumarated items. Make sure to include spaces around it if needed.',
                    })
                  ),
            },
          });

    return [
      {
        title,
        score: 1,
        state: {
          layers: [
            {
              layerId: table.layerId,
              columns: table.columns.map(col => col.columnId),
            },
          ],
        },
        previewIcon: 'gisApp',
        // dont show suggestions for reduced versions or single-line tables
        hide: table.changeType === 'reduced' || !table.isMultiRow,
      },
    ];
  },

  renderConfigPanel: (domElement, props) =>
    render(
      <I18nProvider>
        <EuiForm className="lnsConfigPanel">
          {props.state.layers.map(layer => (
            <MapLayer key={layer.layerId} layer={layer} {...props} />
          ))}
        </EuiForm>
      </I18nProvider>,
      domElement
    ),

  toExpression(state, frame) {
    const layer = state.layers[0];
    const datasource = frame.datasourceLayers[layer.layerId];
    const operations = layer.columns
      .map(columnId => ({ columnId, operation: datasource.getOperationForColumnId(columnId) }))
      .filter((o): o is { columnId: string; operation: Operation } => !!o.operation);

    return {
      type: 'expression',
      chain: [
        {
          type: 'function',
          function: 'lens_map',
          arguments: {
            columns: [
              {
                type: 'expression',
                chain: [
                  {
                    type: 'function',
                    function: 'lens_map_columns',
                    arguments: {
                      columnIds: operations.map(o => o.columnId),
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    };
  },
};
