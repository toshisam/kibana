/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { connect } from 'react-redux';
import { MBMap } from './view';
import {
  mapExtentChanged,
  mapReady,
  mapDestroyed,
  setMouseCoordinates,
  clearMouseCoordinates,
  clearGoto,
  setMapInitError,
  setDomainGeoRange,
} from '../../../actions';
import {
  getLayerList,
  getMapReady,
  getGoto,
  getScrollZoom,
  isInteractiveDisabled,
  isTooltipControlDisabled,
  isViewControlHidden,
  getSpatialFiltersLayer,
  getMapSettings,
  getDomainType,
} from '../../../selectors/map_selectors';

import { getInspectorAdapters } from '../../../reducers/non_serializable_instances';

function mapStateToProps(state = {}) {
  return {
    domainType: getDomainType(state),
    isMapReady: getMapReady(state),
    settings: getMapSettings(state),
    layerList: getLayerList(state),
    spatialFiltersLayer: getSpatialFiltersLayer(state),
    goto: getGoto(state),
    inspectorAdapters: getInspectorAdapters(state),
    scrollZoom: getScrollZoom(state),
    disableInteractive: isInteractiveDisabled(state),
    disableTooltipControl: isTooltipControlDisabled(state),
    hideViewControl: isViewControlHidden(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    extentChanged: (e) => {
      dispatch(mapExtentChanged(e));
    },
    onMapReady: (e) => {
      dispatch(clearGoto());
      dispatch(mapExtentChanged(e));
      dispatch(mapReady());
    },
    onMapDestroyed: () => {
      dispatch(mapDestroyed());
    },
    setMouseCoordinates: ({ lat, lon }) => {
      dispatch(setMouseCoordinates({ lat, lon }));
    },
    clearMouseCoordinates: () => {
      dispatch(clearMouseCoordinates());
    },
    clearGoto: () => {
      dispatch(clearGoto());
    },
    setMapInitError(errorMessage) {
      dispatch(setMapInitError(errorMessage));
    },
    setDomainGeoRange(domainGeoRange) {
      dispatch(setDomainGeoRange(domainGeoRange));
    },
  };
}

const connectedMBMap = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(MBMap);
export { connectedMBMap as MBMap };
