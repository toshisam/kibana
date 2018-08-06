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
import PropTypes from 'prop-types';
import {
  EuiFlexGrid,
  EuiFlexItem,
} from '@elastic/eui';

import { SampleDataSetCard } from './sample_data_set_card';

import {
  listSampleDataSets,
  installSampleDataSet,
  uninstallSampleDataSet
} from '../sample_data_sets';

export class SampleDataSetCards extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sampleDataSets: [],
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;

    this.loadSampleDataSets();
  }

  loadSampleDataSets = async () => {
    const sampleDataSets = await listSampleDataSets();

    if (!this._isMounted) {
      return;
    }

    this.setState({
      sampleDataSets: sampleDataSets
        .map((sampleDataSet) => {
          sampleDataSet.isProcessing = false;
          return sampleDataSet;
        })
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        }),
    });
  }

  install = async (id) => {
    const {
      getConfig,
      setConfig,
      clearIndexPatternsCache,
    } = this.props;

    const targetSampleDataSet = this.state.sampleDataSets.find((sampleDataSet) => {
      return sampleDataSet.id === id;
    });
    targetSampleDataSet.isProcessing = true;

    this.setState({
      sampleDataSets: this.state.sampleDataSets.map((sampleDataSet) => {
        if (sampleDataSet.id === id) {
          return targetSampleDataSet;
        }
        return sampleDataSet;
      }),
    });

    await installSampleDataSet(id, targetSampleDataSet.name, targetSampleDataSet.defaultIndex,
      getConfig, setConfig, clearIndexPatternsCache);
    if (!this._isMounted) {
      return;
    }

    this.loadSampleDataSets();
  }

  uninstall = async (id) => {
    const {
      getConfig,
      setConfig,
      clearIndexPatternsCache,
    } = this.props;

    const targetSampleDataSet = this.state.sampleDataSets.find((sampleDataSet) => {
      return sampleDataSet.id === id;
    });
    targetSampleDataSet.isProcessing = true;

    this.setState({
      sampleDataSets: this.state.sampleDataSets.map((sampleDataSet) => {
        if (sampleDataSet.id === id) {
          return targetSampleDataSet;
        }
        return sampleDataSet;
      }),
    });

    await uninstallSampleDataSet(id, targetSampleDataSet.name, targetSampleDataSet.defaultIndex,
      getConfig, setConfig, clearIndexPatternsCache);
    if (!this._isMounted) {
      return;
    }

    this.loadSampleDataSets();
  }

  render() {
    return (
      <EuiFlexGrid columns={4}>
        {
          this.state.sampleDataSets.map(sampleDataSet => {
            return (
              <EuiFlexItem key={sampleDataSet.id}>
                <SampleDataSetCard
                  id={sampleDataSet.id}
                  description={sampleDataSet.description}
                  name={sampleDataSet.name}
                  launchUrl={this.props.addBasePath(`/app/kibana#/dashboard/${sampleDataSet.overviewDashboard}`)}
                  status={sampleDataSet.status}
                  isProcessing={sampleDataSet.isProcessing}
                  statusMsg={sampleDataSet.statusMsg}
                  previewUrl={this.props.addBasePath(sampleDataSet.previewImagePath)}
                  onInstall={this.install}
                  onUninstall={this.uninstall}
                />
              </EuiFlexItem>
            );
          })
        }
      </EuiFlexGrid>
    );
  }
}

SampleDataSetCards.propTypes = {
  getConfig: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  clearIndexPatternsCache: PropTypes.func.isRequired,
  addBasePath: PropTypes.func.isRequired,
};
