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

import { wrapArray } from './util';
import { Metric, UiStatsMetric, createUiStatsMetric } from './metrics';

import { Storage, ReportStorageManager } from './storage';
import { Report, ReportManager } from './report';

export interface ReporterConfig {
  http: ReportHTTP;
  storage?: Storage;
  checkInterval?: number;
  debug?: boolean;
  storageKey?: string;
}

export type ReportHTTP = (report: Report) => Promise<void>;

export class Reporter {
  checkInterval: number;
  private interval: any;
  private http: ReportHTTP;
  private reportManager: ReportManager;
  private storageManager: ReportStorageManager;
  private debug: boolean;

  constructor(config: ReporterConfig) {
    const { http, storage, debug, checkInterval = 10000, storageKey = 'analytics' } = config;

    this.http = http;
    this.checkInterval = checkInterval;
    this.interval = null;
    this.storageManager = new ReportStorageManager(storageKey, storage);
    const storedReport = this.storageManager.get();
    this.reportManager = new ReportManager(storedReport);
    this.debug = !!debug;
  }

  private saveToReport(newMetrics: Metric[]) {
    this.reportManager.assignReports(newMetrics);
    this.storageManager.store(this.reportManager.report);
  }

  private flushReport() {
    this.reportManager.clearReport();
    this.storageManager.store(this.reportManager.report);
  }

  public start() {
    if (!this.interval) {
      this.interval = setTimeout(() => {
        this.interval = null;
        this.sendReports();
      }, this.checkInterval);
    }
  }

  private log(message: any) {
    if (this.debug) {
      // eslint-disable-next-line
      console.debug(message);
    }
  }

  public reportUiStats(
    appName: string,
    type: UiStatsMetric['type'],
    eventNames: string | string[],
    count?: number
  ) {
    const metrics = wrapArray(eventNames).map(eventName => {
      if (this) this.log(`${type} Metric -> (${appName}:${eventName}):`);
      const report = createUiStatsMetric({ type, appName, eventName, count });
      this.log(report);
      return report;
    });
    this.saveToReport(metrics);
  }

  public async sendReports() {
    if (!this.reportManager.isReportEmpty()) {
      try {
        await this.http(this.reportManager.report);
        this.flushReport();
      } catch (err) {
        this.log(`Error Sending Metrics Report ${err}`);
      }
    }
    this.start();
  }
}

export function createReporter(reportedConf: ReporterConfig) {
  const reporter = new Reporter(reportedConf);
  reporter.start();
  return reporter;
}
