/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import turf from 'turf';
import React from 'react';
import { AbstractLayer } from './layer';
import { VectorStyle } from './styles/vector/vector_style';
import { InnerJoin } from './joins/inner_join';
import {
  FEATURE_ID_PROPERTY_NAME,
  SOURCE_DATA_ID_ORIGIN,
  SOURCE_META_ID_ORIGIN,
  SOURCE_FORMATTERS_ID_ORIGIN,
  FEATURE_VISIBLE_PROPERTY_NAME,
  EMPTY_FEATURE_COLLECTION,
  LAYER_TYPE,
  FIELD_ORIGIN,
  LAYER_STYLE_TYPE,
} from '../../common/constants';
import _ from 'lodash';
import { JoinTooltipProperty } from './tooltips/join_tooltip_property';
import { EuiIcon } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { DataRequestAbortError } from './util/data_request';
import {
  canSkipSourceUpdate,
  canSkipStyleMetaUpdate,
  canSkipFormattersUpdate,
} from './util/can_skip_fetch';
import { assignFeatureIds } from './util/assign_feature_ids';
import {
  getFillFilterExpression,
  getLineFilterExpression,
  getPointFilterExpression,
} from './util/mb_filter_expressions';

export class VectorLayer extends AbstractLayer {
  static type = LAYER_TYPE.VECTOR;

  static createDescriptor(options, mapColors) {
    const layerDescriptor = super.createDescriptor(options);
    layerDescriptor.type = VectorLayer.type;

    if (!options.style) {
      const styleProperties = VectorStyle.createDefaultStyleProperties(mapColors);
      layerDescriptor.style = VectorStyle.createDescriptor(styleProperties);
    }

    return layerDescriptor;
  }

  constructor(options) {
    super(options);
    this._joins = [];
    if (options.layerDescriptor.joins) {
      options.layerDescriptor.joins.forEach(joinDescriptor => {
        const join = new InnerJoin(joinDescriptor, this.getSource());
        this._joins.push(join);
      });
    }
    this._style = new VectorStyle(this._descriptor.style, this._source, this);
  }

  destroy() {
    if (this.getSource()) {
      this.getSource().destroy();
    }
    this.getJoins().forEach(joinSource => {
      joinSource.destroy();
    });
  }

  getJoins() {
    return this._joins.slice();
  }

  getValidJoins() {
    return this.getJoins().filter(join => {
      return join.hasCompleteConfig();
    });
  }

  _hasJoins() {
    return this.getValidJoins().length > 0;
  }

  isDataLoaded() {
    const sourceDataRequest = this.getSourceDataRequest();
    if (!sourceDataRequest || !sourceDataRequest.hasData()) {
      return false;
    }

    const joins = this.getValidJoins();
    for (let i = 0; i < joins.length; i++) {
      const joinDataRequest = this.getDataRequest(joins[i].getSourceDataRequestId());
      if (!joinDataRequest || !joinDataRequest.hasData()) {
        return false;
      }
    }

    return true;
  }

  getCustomIconAndTooltipContent() {
    const featureCollection = this._getSourceFeatureCollection();

    const noResultsIcon = <EuiIcon size="m" color="subdued" type="minusInCircle" />;
    if (!featureCollection || featureCollection.features.length === 0) {
      return {
        icon: noResultsIcon,
        tooltipContent: i18n.translate('xpack.maps.vectorLayer.noResultsFoundTooltip', {
          defaultMessage: `No results found.`,
        }),
      };
    }

    if (
      this.getJoins().length &&
      !featureCollection.features.some(feature => feature.properties[FEATURE_VISIBLE_PROPERTY_NAME])
    ) {
      return {
        icon: noResultsIcon,
        tooltipContent: i18n.translate('xpack.maps.vectorLayer.noResultsFoundInJoinTooltip', {
          defaultMessage: `No matching results found in term joins`,
        }),
      };
    }

    const sourceDataRequest = this.getSourceDataRequest();
    const { tooltipContent, areResultsTrimmed } = this.getSource().getSourceTooltipContent(
      sourceDataRequest
    );
    return {
      icon: this.getCurrentStyle().getIcon(),
      tooltipContent: tooltipContent,
      areResultsTrimmed: areResultsTrimmed,
    };
  }

  getLayerTypeIconName() {
    return 'vector';
  }

  async hasLegendDetails() {
    return this.getCurrentStyle().hasLegendDetails();
  }

  renderLegendDetails() {
    return this.getCurrentStyle().renderLegendDetails();
  }

  _getBoundsBasedOnData() {
    const featureCollection = this._getSourceFeatureCollection();
    if (!featureCollection) {
      return null;
    }

    const visibleFeatures = featureCollection.features.filter(
      feature => feature.properties[FEATURE_VISIBLE_PROPERTY_NAME]
    );
    const bbox = turf.bbox({
      type: 'FeatureCollection',
      features: visibleFeatures,
    });
    return {
      min_lon: bbox[0],
      min_lat: bbox[1],
      max_lon: bbox[2],
      max_lat: bbox[3],
    };
  }

  async getBounds(dataFilters) {
    const isStaticLayer =
      !this.getSource().isBoundsAware() || !this.getSource().isFilterByMapBounds();
    if (isStaticLayer) {
      return this._getBoundsBasedOnData();
    }

    const searchFilters = this._getSearchFilters(dataFilters);
    return await this.getSource().getBoundsForFilters(searchFilters);
  }

  async getLeftJoinFields() {
    return await this.getSource().getLeftJoinFields();
  }

  _getJoinFields() {
    const joinFields = [];
    this.getValidJoins().forEach(join => {
      const fields = join.getJoinFields();
      joinFields.push(...fields);
    });
    return joinFields;
  }

  async getDateFields() {
    return await this.getSource().getDateFields();
  }

  async getNumberFields() {
    const numberFieldOptions = await this.getSource().getNumberFields();
    return [...numberFieldOptions, ...this._getJoinFields()];
  }

  async getCategoricalFields() {
    return await this.getSource().getCategoricalFields();
  }

  async getFields() {
    const sourceFields = await this.getSource().getFields();
    return [...sourceFields, ...this._getJoinFields()];
  }

  getIndexPatternIds() {
    const indexPatternIds = this.getSource().getIndexPatternIds();
    this.getValidJoins().forEach(join => {
      indexPatternIds.push(...join.getIndexPatternIds());
    });
    return indexPatternIds;
  }

  getQueryableIndexPatternIds() {
    const indexPatternIds = this.getSource().getQueryableIndexPatternIds();
    this.getValidJoins().forEach(join => {
      indexPatternIds.push(...join.getQueryableIndexPatternIds());
    });
    return indexPatternIds;
  }

  _findDataRequestById(sourceDataId) {
    return this._dataRequests.find(dataRequest => dataRequest.getDataId() === sourceDataId);
  }

  async _syncJoin({
    join,
    startLoading,
    stopLoading,
    onLoadError,
    registerCancelCallback,
    dataFilters,
  }) {
    const joinSource = join.getRightJoinSource();
    const sourceDataId = join.getSourceDataRequestId();
    const requestToken = Symbol(`layer-join-refresh:${this.getId()} - ${sourceDataId}`);
    const searchFilters = {
      ...dataFilters,
      fieldNames: joinSource.getFieldNames(),
      sourceQuery: joinSource.getWhereQuery(),
      applyGlobalQuery: joinSource.getApplyGlobalQuery(),
    };
    const prevDataRequest = this._findDataRequestById(sourceDataId);

    const canSkipFetch = await canSkipSourceUpdate({
      source: joinSource,
      prevDataRequest,
      nextMeta: searchFilters,
    });
    if (canSkipFetch) {
      return {
        dataHasChanged: false,
        join: join,
        propertiesMap: prevDataRequest.getData(),
      };
    }

    try {
      startLoading(sourceDataId, requestToken, searchFilters);
      const leftSourceName = await this._source.getDisplayName();
      const { propertiesMap } = await joinSource.getPropertiesMap(
        searchFilters,
        leftSourceName,
        join.getLeftField().getName(),
        registerCancelCallback.bind(null, requestToken)
      );
      stopLoading(sourceDataId, requestToken, propertiesMap);
      return {
        dataHasChanged: true,
        join: join,
        propertiesMap: propertiesMap,
      };
    } catch (e) {
      if (!(e instanceof DataRequestAbortError)) {
        onLoadError(sourceDataId, requestToken, `Join error: ${e.message}`);
      }
      return {
        dataHasChanged: true,
        join: join,
        propertiesMap: null,
      };
    }
  }

  async _syncJoins(syncContext) {
    const joinSyncs = this.getValidJoins().map(async join => {
      await this._syncJoinStyleMeta(syncContext, join);
      await this._syncJoinFormatters(syncContext, join);
      return this._syncJoin({ join, ...syncContext });
    });

    return await Promise.all(joinSyncs);
  }

  _getSearchFilters(dataFilters) {
    const fieldNames = [
      ...this.getSource().getFieldNames(),
      ...this.getCurrentStyle().getSourceFieldNames(),
      ...this.getValidJoins().map(join => join.getLeftField().getName()),
    ];

    return {
      ...dataFilters,
      fieldNames: _.uniq(fieldNames).sort(),
      geogridPrecision: this.getSource().getGeoGridPrecision(dataFilters.zoom),
      sourceQuery: this.getQuery(),
      applyGlobalQuery: this.getSource().getApplyGlobalQuery(),
      sourceMeta: this.getSource().getSyncMeta(),
    };
  }

  async _performInnerJoins(sourceResult, joinStates, updateSourceData) {
    //should update the store if
    //-- source result was refreshed
    //-- any of the join configurations changed (joinState changed)
    //-- visibility of any of the features has changed

    let shouldUpdateStore =
      sourceResult.refreshed || joinStates.some(joinState => joinState.dataHasChanged);

    if (!shouldUpdateStore) {
      return;
    }

    for (let i = 0; i < sourceResult.featureCollection.features.length; i++) {
      const feature = sourceResult.featureCollection.features[i];
      const oldVisbility = feature.properties[FEATURE_VISIBLE_PROPERTY_NAME];
      let isFeatureVisible = true;
      for (let j = 0; j < joinStates.length; j++) {
        const joinState = joinStates[j];
        const innerJoin = joinState.join;
        const canJoinOnCurrent = innerJoin.joinPropertiesToFeature(
          feature,
          joinState.propertiesMap
        );
        isFeatureVisible = isFeatureVisible && canJoinOnCurrent;
      }

      if (oldVisbility !== isFeatureVisible) {
        shouldUpdateStore = true;
      }

      feature.properties[FEATURE_VISIBLE_PROPERTY_NAME] = isFeatureVisible;
    }

    if (shouldUpdateStore) {
      updateSourceData({ ...sourceResult.featureCollection });
    }
  }

  async _syncSource({
    startLoading,
    stopLoading,
    onLoadError,
    registerCancelCallback,
    dataFilters,
  }) {
    const requestToken = Symbol(`layer-${this.getId()}-${SOURCE_DATA_ID_ORIGIN}`);
    const searchFilters = this._getSearchFilters(dataFilters);
    const prevDataRequest = this.getSourceDataRequest();
    const canSkipFetch = await canSkipSourceUpdate({
      source: this.getSource(),
      prevDataRequest,
      nextMeta: searchFilters,
    });
    if (canSkipFetch) {
      return {
        refreshed: false,
        featureCollection: prevDataRequest.getData(),
      };
    }

    try {
      startLoading(SOURCE_DATA_ID_ORIGIN, requestToken, searchFilters);
      const layerName = await this.getDisplayName();
      const { data: sourceFeatureCollection, meta } = await this.getSource().getGeoJsonWithMeta(
        layerName,
        searchFilters,
        registerCancelCallback.bind(null, requestToken)
      );
      const layerFeatureCollection = assignFeatureIds(sourceFeatureCollection);
      stopLoading(SOURCE_DATA_ID_ORIGIN, requestToken, layerFeatureCollection, meta);
      return {
        refreshed: true,
        featureCollection: layerFeatureCollection,
      };
    } catch (error) {
      if (!(error instanceof DataRequestAbortError)) {
        onLoadError(SOURCE_DATA_ID_ORIGIN, requestToken, error.message);
      }
      return {
        refreshed: false,
      };
    }
  }

  async _syncSourceStyleMeta(syncContext) {
    if (this.getCurrentStyle().constructor.type !== LAYER_STYLE_TYPE.VECTOR) {
      return;
    }

    return this._syncStyleMeta({
      source: this.getSource(),
      sourceQuery: this.getQuery(),
      dataRequestId: SOURCE_META_ID_ORIGIN,
      dynamicStyleProps: this.getCurrentStyle()
        .getDynamicPropertiesArray()
        .filter(dynamicStyleProp => {
          return (
            dynamicStyleProp.getFieldOrigin() === FIELD_ORIGIN.SOURCE &&
            dynamicStyleProp.isFieldMetaEnabled()
          );
        }),
      ...syncContext,
    });
  }

  async _syncJoinStyleMeta(syncContext, join) {
    const joinSource = join.getRightJoinSource();
    return this._syncStyleMeta({
      source: joinSource,
      sourceQuery: joinSource.getWhereQuery(),
      dataRequestId: join.getSourceMetaDataRequestId(),
      dynamicStyleProps: this.getCurrentStyle()
        .getDynamicPropertiesArray()
        .filter(dynamicStyleProp => {
          const matchingField = joinSource.getMetricFieldForName(
            dynamicStyleProp.getField().getName()
          );
          return (
            dynamicStyleProp.getFieldOrigin() === FIELD_ORIGIN.JOIN &&
            !!matchingField &&
            dynamicStyleProp.isFieldMetaEnabled()
          );
        }),
      ...syncContext,
    });
  }

  async _syncStyleMeta({
    source,
    sourceQuery,
    dataRequestId,
    dynamicStyleProps,
    dataFilters,
    startLoading,
    stopLoading,
    onLoadError,
    registerCancelCallback,
  }) {
    if (!source.isESSource() || dynamicStyleProps.length === 0) {
      return;
    }

    const dynamicStyleFields = dynamicStyleProps.map(dynamicStyleProp => {
      return dynamicStyleProp.getField().getName();
    });

    const nextMeta = {
      dynamicStyleFields: _.uniq(dynamicStyleFields).sort(),
      sourceQuery,
      isTimeAware: this.getCurrentStyle().isTimeAware() && (await source.isTimeAware()),
      timeFilters: dataFilters.timeFilters,
    };
    const prevDataRequest = this._findDataRequestById(dataRequestId);
    const canSkipFetch = canSkipStyleMetaUpdate({ prevDataRequest, nextMeta });
    if (canSkipFetch) {
      return;
    }

    const requestToken = Symbol(`layer-${this.getId()}-${dataRequestId}`);
    try {
      startLoading(dataRequestId, requestToken, nextMeta);
      const layerName = await this.getDisplayName();
      const styleMeta = await source.loadStylePropsMeta(
        layerName,
        this.getCurrentStyle(),
        dynamicStyleProps,
        registerCancelCallback,
        nextMeta
      );
      stopLoading(dataRequestId, requestToken, styleMeta, nextMeta);
    } catch (error) {
      if (!(error instanceof DataRequestAbortError)) {
        onLoadError(dataRequestId, requestToken, error.message);
      }
    }
  }

  async _syncSourceFormatters(syncContext) {
    if (this.getCurrentStyle().constructor.type !== LAYER_STYLE_TYPE.VECTOR) {
      return;
    }

    return this._syncFormatters({
      source: this.getSource(),
      dataRequestId: SOURCE_FORMATTERS_ID_ORIGIN,
      fields: this.getCurrentStyle()
        .getDynamicPropertiesArray()
        .filter(dynamicStyleProp => {
          return dynamicStyleProp.getFieldOrigin() === FIELD_ORIGIN.SOURCE;
        })
        .map(dynamicStyleProp => {
          return dynamicStyleProp.getField();
        }),
      ...syncContext,
    });
  }

  async _syncJoinFormatters(syncContext, join) {
    const joinSource = join.getRightJoinSource();
    return this._syncFormatters({
      source: joinSource,
      dataRequestId: join.getSourceFormattersDataRequestId(),
      fields: this.getCurrentStyle()
        .getDynamicPropertiesArray()
        .filter(dynamicStyleProp => {
          const matchingField = joinSource.getMetricFieldForName(
            dynamicStyleProp.getField().getName()
          );
          return dynamicStyleProp.getFieldOrigin() === FIELD_ORIGIN.JOIN && !!matchingField;
        })
        .map(dynamicStyleProp => {
          return dynamicStyleProp.getField();
        }),
      ...syncContext,
    });
  }

  async _syncFormatters({ source, dataRequestId, fields, startLoading, stopLoading, onLoadError }) {
    if (fields.length === 0) {
      return;
    }

    const fieldNames = fields.map(field => {
      return field.getName();
    });
    const nextMeta = {
      fieldNames: _.uniq(fieldNames).sort(),
    };
    const prevDataRequest = this._findDataRequestById(dataRequestId);
    const canSkipUpdate = canSkipFormattersUpdate({ prevDataRequest, nextMeta });
    if (canSkipUpdate) {
      return;
    }

    const requestToken = Symbol(`layer-${this.getId()}-${dataRequestId}`);
    try {
      startLoading(dataRequestId, requestToken, nextMeta);

      const formatters = {};
      const promises = fields.map(async field => {
        const fieldName = field.getName();
        formatters[fieldName] = await source.getFieldFormatter(fieldName);
      });
      await Promise.all(promises);

      stopLoading(dataRequestId, requestToken, formatters, nextMeta);
    } catch (error) {
      onLoadError(dataRequestId, requestToken, error.message);
    }
  }

  async syncData(syncContext) {
    if (!this.isVisible() || !this.showAtZoomLevel(syncContext.dataFilters.zoom)) {
      return;
    }

    await this._syncSourceStyleMeta(syncContext);
    await this._syncSourceFormatters(syncContext);
    const sourceResult = await this._syncSource(syncContext);
    if (
      !sourceResult.featureCollection ||
      !sourceResult.featureCollection.features.length ||
      !this._hasJoins()
    ) {
      return;
    }

    const joinStates = await this._syncJoins(syncContext);
    await this._performInnerJoins(sourceResult, joinStates, syncContext.updateSourceData);
  }

  _getSourceFeatureCollection() {
    const sourceDataRequest = this.getSourceDataRequest();
    return sourceDataRequest ? sourceDataRequest.getData() : null;
  }

  _syncFeatureCollectionWithMb(mbMap) {
    const mbGeoJSONSource = mbMap.getSource(this.getId());
    const featureCollection = this._getSourceFeatureCollection();
    const featureCollectionOnMap = AbstractLayer.getBoundDataForSource(mbMap, this.getId());

    if (!featureCollection) {
      if (featureCollectionOnMap) {
        this.getCurrentStyle().clearFeatureState(featureCollectionOnMap, mbMap, this.getId());
      }
      mbGeoJSONSource.setData(EMPTY_FEATURE_COLLECTION);
      return;
    }

    // "feature-state" data expressions are not supported with layout properties.
    // To work around this limitation,
    // scaled layout properties (like icon-size) must fall back to geojson property values :(
    const hasGeoJsonProperties = this.getCurrentStyle().setFeatureStateAndStyleProps(
      featureCollection,
      mbMap,
      this.getId()
    );
    if (featureCollection !== featureCollectionOnMap || hasGeoJsonProperties) {
      mbGeoJSONSource.setData(featureCollection);
    }
  }

  _setMbPointsProperties(mbMap) {
    const pointLayerId = this._getMbPointLayerId();
    const symbolLayerId = this._getMbSymbolLayerId();
    const pointLayer = mbMap.getLayer(pointLayerId);
    const symbolLayer = mbMap.getLayer(symbolLayerId);

    // Point layers symbolized as circles require 2 mapbox layers because
    // "circle" layers do not support "text" style properties
    // Point layers symbolized as icons only contain a single mapbox layer.
    let markerLayerId;
    let textLayerId;
    if (this.getCurrentStyle().arePointsSymbolizedAsCircles()) {
      markerLayerId = pointLayerId;
      textLayerId = this._getMbTextLayerId();
      if (symbolLayer) {
        mbMap.setLayoutProperty(symbolLayerId, 'visibility', 'none');
      }
      this._setMbCircleProperties(mbMap);
    } else {
      markerLayerId = symbolLayerId;
      textLayerId = symbolLayerId;
      if (pointLayer) {
        mbMap.setLayoutProperty(pointLayerId, 'visibility', 'none');
        mbMap.setLayoutProperty(this._getMbTextLayerId(), 'visibility', 'none');
      }
      this._setMbSymbolProperties(mbMap);
    }

    this.syncVisibilityWithMb(mbMap, markerLayerId);
    mbMap.setLayerZoomRange(markerLayerId, this._descriptor.minZoom, this._descriptor.maxZoom);
    if (markerLayerId !== textLayerId) {
      this.syncVisibilityWithMb(mbMap, textLayerId);
      mbMap.setLayerZoomRange(textLayerId, this._descriptor.minZoom, this._descriptor.maxZoom);
    }
  }

  _setMbCircleProperties(mbMap) {
    const sourceId = this.getId();
    const pointLayerId = this._getMbPointLayerId();
    const pointLayer = mbMap.getLayer(pointLayerId);
    if (!pointLayer) {
      mbMap.addLayer({
        id: pointLayerId,
        type: 'circle',
        source: sourceId,
        paint: {},
      });
    }

    const textLayerId = this._getMbTextLayerId();
    const textLayer = mbMap.getLayer(textLayerId);
    if (!textLayer) {
      mbMap.addLayer({
        id: textLayerId,
        type: 'symbol',
        source: sourceId,
      });
    }

    const filterExpr = getPointFilterExpression(this._hasJoins());
    if (filterExpr !== mbMap.getFilter(pointLayerId)) {
      mbMap.setFilter(pointLayerId, filterExpr);
      mbMap.setFilter(textLayerId, filterExpr);
    }

    this.getCurrentStyle().setMBPaintPropertiesForPoints({
      alpha: this.getAlpha(),
      mbMap,
      pointLayerId,
    });

    this.getCurrentStyle().setMBPropertiesForLabelText({
      alpha: this.getAlpha(),
      mbMap,
      textLayerId,
    });
  }

  _setMbSymbolProperties(mbMap) {
    const sourceId = this.getId();
    const symbolLayerId = this._getMbSymbolLayerId();
    const symbolLayer = mbMap.getLayer(symbolLayerId);

    if (!symbolLayer) {
      mbMap.addLayer({
        id: symbolLayerId,
        type: 'symbol',
        source: sourceId,
      });
    }

    const filterExpr = getPointFilterExpression(this._hasJoins());
    if (filterExpr !== mbMap.getFilter(symbolLayerId)) {
      mbMap.setFilter(symbolLayerId, filterExpr);
    }

    this.getCurrentStyle().setMBSymbolPropertiesForPoints({
      alpha: this.getAlpha(),
      mbMap,
      symbolLayerId,
    });

    this.getCurrentStyle().setMBPropertiesForLabelText({
      alpha: this.getAlpha(),
      mbMap,
      textLayerId: symbolLayerId,
    });
  }

  _setMbLinePolygonProperties(mbMap) {
    const sourceId = this.getId();
    const fillLayerId = this._getMbPolygonLayerId();
    const lineLayerId = this._getMbLineLayerId();
    const hasJoins = this._hasJoins();
    if (!mbMap.getLayer(fillLayerId)) {
      mbMap.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: sourceId,
        paint: {},
      });
    }
    if (!mbMap.getLayer(lineLayerId)) {
      mbMap.addLayer({
        id: lineLayerId,
        type: 'line',
        source: sourceId,
        paint: {},
      });
    }
    this.getCurrentStyle().setMBPaintProperties({
      alpha: this.getAlpha(),
      mbMap,
      fillLayerId,
      lineLayerId,
    });

    this.syncVisibilityWithMb(mbMap, fillLayerId);
    mbMap.setLayerZoomRange(fillLayerId, this._descriptor.minZoom, this._descriptor.maxZoom);
    const fillFilterExpr = getFillFilterExpression(hasJoins);
    if (fillFilterExpr !== mbMap.getFilter(fillLayerId)) {
      mbMap.setFilter(fillLayerId, fillFilterExpr);
    }

    this.syncVisibilityWithMb(mbMap, lineLayerId);
    mbMap.setLayerZoomRange(lineLayerId, this._descriptor.minZoom, this._descriptor.maxZoom);
    const lineFilterExpr = getLineFilterExpression(hasJoins);
    if (lineFilterExpr !== mbMap.getFilter(lineLayerId)) {
      mbMap.setFilter(lineLayerId, lineFilterExpr);
    }
  }

  _syncStylePropertiesWithMb(mbMap) {
    this._setMbPointsProperties(mbMap);
    this._setMbLinePolygonProperties(mbMap);
  }

  _syncSourceBindingWithMb(mbMap) {
    const mbSource = mbMap.getSource(this.getId());
    if (!mbSource) {
      mbMap.addSource(this.getId(), {
        type: 'geojson',
        data: EMPTY_FEATURE_COLLECTION,
      });
    }
  }

  syncLayerWithMB(mbMap) {
    this._syncSourceBindingWithMb(mbMap);
    this._syncFeatureCollectionWithMb(mbMap);
    this._syncStylePropertiesWithMb(mbMap);
  }

  _getMbPointLayerId() {
    return this.makeMbLayerId('circle');
  }

  _getMbTextLayerId() {
    return this.makeMbLayerId('text');
  }

  _getMbSymbolLayerId() {
    return this.makeMbLayerId('symbol');
  }

  _getMbLineLayerId() {
    return this.makeMbLayerId('line');
  }

  _getMbPolygonLayerId() {
    return this.makeMbLayerId('fill');
  }

  getMbLayerIds() {
    return [
      this._getMbPointLayerId(),
      this._getMbTextLayerId(),
      this._getMbSymbolLayerId(),
      this._getMbLineLayerId(),
      this._getMbPolygonLayerId(),
    ];
  }

  ownsMbLayerId(mbLayerId) {
    return this.getMbLayerIds().includes(mbLayerId);
  }

  ownsMbSourceId(mbSourceId) {
    return this.getId() === mbSourceId;
  }

  _addJoinsToSourceTooltips(tooltipsFromSource) {
    for (let i = 0; i < tooltipsFromSource.length; i++) {
      const tooltipProperty = tooltipsFromSource[i];
      const matchingJoins = [];
      for (let j = 0; j < this.getJoins().length; j++) {
        if (
          this.getJoins()
            [j].getLeftField()
            .getName() === tooltipProperty.getPropertyKey()
        ) {
          matchingJoins.push(this.getJoins()[j]);
        }
      }
      if (matchingJoins.length) {
        tooltipsFromSource[i] = new JoinTooltipProperty(tooltipProperty, matchingJoins);
      }
    }
  }

  async getPropertiesForTooltip(properties) {
    let allTooltips = await this.getSource().filterAndFormatPropertiesToHtml(properties);
    this._addJoinsToSourceTooltips(allTooltips);

    for (let i = 0; i < this.getJoins().length; i++) {
      const propsFromJoin = await this.getJoins()[i].filterAndFormatPropertiesForTooltip(
        properties
      );
      allTooltips = [...allTooltips, ...propsFromJoin];
    }
    return allTooltips;
  }

  canShowTooltip() {
    return (
      this.isVisible() && (this.getSource().canFormatFeatureProperties() || this.getJoins().length)
    );
  }

  getFeatureById(id) {
    const featureCollection = this._getSourceFeatureCollection();
    if (!featureCollection) {
      return;
    }

    return featureCollection.features.find(feature => {
      return feature.properties[FEATURE_ID_PROPERTY_NAME] === id;
    });
  }
}
