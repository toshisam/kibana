/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import chrome from 'ui/chrome';
import './saved_gis_map';
import { uiModules } from 'ui/modules';
import { SavedObjectLoader } from 'ui/courier/saved_object/saved_object_loader';
import { SavedObjectRegistryProvider } from 'ui/saved_objects/saved_object_registry';
import { SavedObjectsClientProvider } from 'ui/saved_objects';

const module = uiModules.get('app/maps');

// Register this service with the saved object registry so it can be
// edited by the object editor.
SavedObjectRegistryProvider.register({
  service: 'gisMapSavedObjectLoader',
  title: 'gisMaps'
});

function mapSavedObjectLoaderProvider(Private, SavedGisMap, kbnIndex, kbnUrl, $http, chrome) {
  const savedObjectClient = Private(SavedObjectsClientProvider);
  return new SavedObjectLoader(SavedGisMap, kbnIndex, kbnUrl, $http, chrome, savedObjectClient);
}

export const getMapSavedObjectLoader = async () => {
  const $injector = await chrome.dangerouslyGetActiveInjector();
  return mapSavedObjectLoaderProvider(
    $injector.get('Private'),
    $injector.get('SavedGisMap'),
    $injector.get('kbnIndex'),
    $injector.get('kbnUrl'),
    $injector.get('$http'),
    $injector.get('chrome')
  );
}

// This is the only thing that gets injected into controllers
module.service('gisMapSavedObjectLoader', mapSavedObjectLoaderProvider);
