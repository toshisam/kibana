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

import expect from 'expect.js';
import { getSavedObjects } from './get_saved_objects';

const indexPatternTitle = 'dynamic index pattern title';

const configMock = {
  get: () => {
    return indexPatternTitle;
  }
};

const serverMock = {
  config: () => { return configMock; }
};

test('should dynamically set index title to "xpack.apm.indexPattern" yaml config value', () => {
  const savedObjects = getSavedObjects(serverMock);
  const indexPattern = savedObjects[0];
  expect(indexPattern.type).to.be('index-pattern');
  // if index pattern id changes, ensure other saved objects point to the new id
  expect(indexPattern.id).to.be('12e52550-6354-11e8-9d01-ed6a4badd083');
  expect(indexPattern.attributes.title).to.be(indexPatternTitle);
});
