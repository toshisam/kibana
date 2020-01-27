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
import angular from 'angular'; // just used in embeddables and discover controller
import { DiscoverServices } from './build_services';

let angularModule: any = null;
let services: DiscoverServices | null = null;

/**
 * set bootstrapped inner angular module
 */
export function setAngularModule(module: any) {
  angularModule = module;
}

/**
 * get boostrapped inner angular module
 */
export function getAngularModule() {
  return angularModule;
}

export function getServices(): DiscoverServices {
  if (!services) {
    throw new Error('Discover services are not yet available');
  }
  return services;
}

export function setServices(newServices: any) {
  services = newServices;
}

// import directives that
import 'ui/directives/css_truncate';
import 'ui/directives/field_name';

// EXPORT legacy static dependencies, should be migrated when available in a new version;
export { angular };
export { wrapInI18nContext } from 'ui/i18n';
export { buildVislibDimensions } from '../../../visualizations/public';
// @ts-ignore
export { callAfterBindingsWorkaround } from 'ui/compat';
export { getRequestInspectorStats, getResponseInspectorStats } from '../../../data/public';
// @ts-ignore
export { intervalOptions } from 'ui/agg_types/buckets/_interval_options';
// @ts-ignore
export { migrateLegacyQuery } from 'ui/utils/migrate_legacy_query';
// @ts-ignore
export { RequestAdapter } from 'ui/inspector/adapters';
export { SavedObjectSaveModal } from 'ui/saved_objects/components/saved_object_save_modal';
export { showSaveModal } from 'ui/saved_objects/show_saved_object_save_modal';
export { stateMonitorFactory } from 'ui/state_management/state_monitor_factory';
export { subscribeWithScope } from 'ui/utils/subscribe_with_scope';
// @ts-ignore
export { timezoneProvider } from 'ui/vis/lib/timezone';
// @ts-ignore
export { tabifyAggResponse } from 'ui/agg_response/tabify';
export { ensureDefaultIndexPattern } from 'ui/legacy_compat';
export { unhashUrl } from '../../../../../plugins/kibana_utils/public';
// @ts-ignore
export { formatMsg, formatStack } from 'ui/notify/lib/index';

// EXPORT types
export { Vis } from 'ui/vis';
export {
  IndexPatternsContract,
  IIndexPattern,
  IndexPattern,
  indexPatterns,
  hasSearchStategyForIndexPattern,
  IFieldType,
  SearchSource,
  ISearchSource,
  EsQuerySortValue,
  SortDirection,
} from '../../../../../plugins/data/public';
export { ElasticSearchHit } from './np_ready/doc_views/doc_views_types';
export { Adapters } from 'ui/inspector/types';
export { registerTimefilterWithGlobalStateFactory } from 'ui/timefilter/setup_router';
export { FieldName } from 'ui/directives/field_name/field_name';
export { getFormat } from 'ui/visualize/loader/pipeline_helpers/utilities';
// @ts-ignore
export { buildPointSeriesData } from 'ui/agg_response/point_series/point_series';
