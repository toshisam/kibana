import _ from 'lodash';
import $ from 'jquery';
import { VisRequestHandlersRegistryProvider } from 'ui/registry/vis_request_handlers';
import { VisResponseHandlersRegistryProvider } from 'ui/registry/vis_response_handlers';
import { FilterBarQueryFilterProvider } from 'ui/filter_bar/query_filter';

export function EmbeddedTooltipFormatterProvider($rootScope, $compile, Private, getAppState, savedVisualizations) {
  const queryFilter = Private(FilterBarQueryFilterProvider);
  const tooltipTemplate = require('ui/agg_response/_embedded_tooltip.html');
  const UI_STATE_ID = 'popupVis';

  function getHandler(from, name) {
    if (typeof name === 'function') return name;
    return from.find(handler => handler.name === name).handler;
  }

  return function (parentVis) {
    let tooltipMsg = 'Initializing Tooltip...';
    const $tooltipScope = $rootScope.$new();
    const requestHandlers = Private(VisRequestHandlersRegistryProvider);
    const responseHandlers = Private(VisResponseHandlersRegistryProvider);
    const appState = getAppState();
    let popVis;
    let $visEl;
    let requestHandler;
    let responseHandler;
    let fetchTimestamp;
    savedVisualizations.get(parentVis.params.tooltip.vis).then((savedObject) => {
      popVis = savedObject;
      requestHandler = getHandler(requestHandlers, savedObject.vis.type.requestHandler);
      responseHandler = getHandler(responseHandlers, savedObject.vis.type.responseHandler);
      const uiState = savedObject.uiStateJSON ? JSON.parse(savedObject.uiStateJSON) : {};
      const parentUiState = getAppState().makeStateful('uiState');
      $tooltipScope.uiState = parentUiState.createChild(UI_STATE_ID, uiState, true);
      $tooltipScope.vis = savedObject.vis;
      $tooltipScope.visData = null;
      $visEl = $compile(tooltipTemplate)($tooltipScope);
    }, e => {
      tooltipMsg = _.get(e, 'message', 'Error initializing tooltip');
    });

    return function (event) {
      if (requestHandler && responseHandler) {
        tooltipMsg = 'Loading Data...';

        const localFetchTimestamp = Date.now();
        fetchTimestamp = localFetchTimestamp;
        const aggFilters = [];
        let aggResult = event.datum.aggConfigResult
        while(aggResult) {
          aggFilters.push(aggResult.aggConfig.createFilter(aggResult.key));
          aggResult = aggResult.$parent;
        }

        popVis.searchSource.set('filter', aggFilters);
        requestHandler($tooltipScope.vis, appState, $tooltipScope.uiState, queryFilter, popVis.searchSource)
        .then(requestHandlerResponse => {
          return responseHandler($tooltipScope.vis, requestHandlerResponse);
        }, e => {
          // TODO display error message in popup text
          console.log(e);
        })
        .then(resp => {
          $visEl.css({
            width: parentVis.params.tooltip.width,
            height: parentVis.params.tooltip.height
          });
          const $popup = $('.vis-tooltip');

          // Only update popup if results are for calling fetch
          if ($popup && localFetchTimestamp === fetchTimestamp) {
            $popup.css({
              width: parentVis.params.tooltip.width,
              height: parentVis.params.tooltip.height
            });
            $popup.empty();
            $popup.append($visEl);
            $tooltipScope.visData = resp;
            $tooltipScope.$apply();
          }
        }, e => {
          // TODO display error message in popup text
          console.log(e);
        });
      }

      return `<div style="height: ${parentVis.params.tooltip.height}px; width: ${parentVis.params.tooltip.width}px;">${tooltipMsg}</div>`;
    };

  };

}
