/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { visualizations } from 'plugins/visualizations';
import { i18n } from '@kbn/i18n';
import { APP_ID, APP_ICON, MAP_BASE_URL } from '../common/constants';

const VIS_TYPE_DESCRIPTION = `Create and style maps with multiple layers and indices.
Use the Maps app instead of Coordinate Map visualizations and Region Map visualizations.
The Maps app offers more functionality and is easier to use.`;

visualizations.types.visTypeAliasRegistry.add({
  url: MAP_BASE_URL,
  name: APP_ID,
  title: i18n.translate('xpack.maps.visTypeAlias.title', {
    defaultMessage: 'Maps'
  }),
  description: i18n.translate('xpack.maps.visTypeAlias.description', {
    defaultMessage: VIS_TYPE_DESCRIPTION
  }),
  icon: APP_ICON,
});

