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

import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideCode,
  GuideDemo,
  GuidePage,
  GuideSection,
  GuideSectionTypes,
  GuideText,
} from '../../components';

import ContextMenu from './context_menu';
const contextMenuSource = require('!!raw-loader!./context_menu');
const contextMenuHtml = renderToHtml(ContextMenu);

import SinglePanel from './single_panel';
const singlePanelSource = require('!!raw-loader!./single_panel');
const singlePanelHtml = renderToHtml(SinglePanel);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="Context Menu"
      source={[{
        type: GuideSectionTypes.JS,
        code: contextMenuSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: contextMenuHtml,
      }]}
    >
      <GuideText>
        <GuideCode>KuiContextMenu</GuideCode> is a nested menu system useful
        for navigating complicated trees. It lives within a <GuideCode>KuiPopover</GuideCode>
        which itself can be wrapped around any component (like a button in this example).
      </GuideText>

      <GuideDemo style={{ height: 280 }}>
        <ContextMenu />
      </GuideDemo>

      <GuideDemo isDarkTheme={true} style={{ height: 280 }}>
        <ContextMenu />
      </GuideDemo>
    </GuideSection>

    <GuideSection
      title="Single panel"
      source={[{
        type: GuideSectionTypes.JS,
        code: singlePanelSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: singlePanelHtml,
      }]}
    >
      <GuideText>
        You can put a single panel inside of the menu using the
        <GuideCode>KuiContextMenuPanel</GuideCode> component directly.
      </GuideText>

      <GuideDemo style={{ height: 280 }}>
        <SinglePanel />
      </GuideDemo>
    </GuideSection>
  </GuidePage>
);
