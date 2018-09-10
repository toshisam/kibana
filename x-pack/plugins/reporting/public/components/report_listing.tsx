/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

// TODO: Remove once typescript definitions are in EUI
declare module '@elastic/eui' {
  export const EuiBasicTable: React.SFC<any>;
}

import moment from 'moment';
import React, { Component } from 'react';
import { toastNotifications } from 'ui/notify';
import { jobQueueClient } from '../lib/job_queue_client';

import { EuiBasicTable, EuiPage, EuiPageBody, EuiPageContent, EuiTitle } from '@elastic/eui';

interface Props {
  xpackInfo: any;
  kbnUrl: any;
}

interface State {
  page: number;
  total: number;
  jobs: [];
  isLoading: boolean;
}

export class ReportListing extends Component<Props, State> {
  private mounted?: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      page: 0,
      total: 0,
      jobs: [],
      isLoading: false,
    };
  }

  public render() {
    return (
      <EuiPage restrictWidth>
        <EuiPageBody>
          <EuiPageContent horizontalPosition="center">
            <EuiTitle>
              <h1>Reports</h1>
            </EuiTitle>
            {this.renderTable()}
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }

  public componentWillMount() {
    this.mounted = true;
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public componentDidMount() {
    this.mounted = true;
    this.fetchJobs();
  }

  private renderTable() {
    const tableColumns = [
      {
        field: 'object_title',
        name: 'Report',
        render: (objectTitle: string, record: any) => {
          return (
            <div>
              <div>{objectTitle}</div>
              <div>{record.object_type}</div>
            </div>
          );
        },
      },
      {
        field: 'created_at',
        name: 'Created at',
        render: (createdAt: string, record: any) => {
          if (record.created_by) {
            return (
              <div>
                <div>this.formatDate(createdAt)</div>
                <span>{record.created_by}</span>
              </div>
            );
          }
          return this.formatDate(createdAt);
        },
      },
      {
        field: 'status',
        name: 'Status',
        render: (status: string, record: any) => {
          let maxSizeReached;
          if (record.max_size_reached) {
            maxSizeReached = <span> - max size reached</span>;
          }
          let statusTimestamp;
          if (status === 'processing') {
            statusTimestamp = this.formatDate(record.started_at);
          } else if (status === 'completed' || status === 'failed') {
            statusTimestamp = this.formatDate(record.completed_at);
          }
          return (
            <div>
              <div>
                {status}
                {maxSizeReached}
              </div>
              <div>{statusTimestamp}</div>
            </div>
          );
        },
      },
      {
        name: 'Actions',
        actions: [
          {
            render: (job: any) => {
              return <div />;
            },
          },
        ],
      },
    ];

    const pagination = {
      pageIndex: this.state.page,
      pageSize: 10,
      totalItemCount: this.state.total,
      hidePerPageOptions: true,
    };

    return (
      <EuiBasicTable
        itemId={'id'}
        items={this.state.jobs}
        loading={this.state.isLoading}
        columns={tableColumns}
        noItemsMessage="No reports have been created"
        pagination={pagination}
        onChange={this.onTableChange}
      />
    );
  }

  private onTableChange = ({ page }: { page: any }) => {
    const { index: pageIndex } = page;

    this.setState(
      {
        page: pageIndex,
      },
      this.fetchJobs
    );
  };

  private fetchJobs = async () => {
    this.setState({ isLoading: true, jobs: [] });

    let jobs;
    let total;
    try {
      jobs = await jobQueueClient.list(this.state.page);
      total = await jobQueueClient.total();
    } catch (kfetchError) {
      if (!this.licenseAllowsToShowThisPage()) {
        toastNotifications.addDanger(
          this.props.xpackInfo.get('features.reporting.management.message')
        );
        this.props.kbnUrl.redirect('/management');
        return;
      }

      if (kfetchError.res.status !== 401 && kfetchError.res.status !== 403) {
        toastNotifications.addDanger(kfetchError.res.statusText || 'Request failed');
      }
      if (this.mounted) {
        this.setState({ isLoading: false, jobs: [], total: 0 });
      }
      return;
    }

    if (this.mounted) {
      this.setState({
        isLoading: false,
        total,
        jobs: jobs.map((job: any) => {
          return {
            id: job._id,
            type: job._source.jobtype,
            object_type: job._source.payload.type,
            object_title: job._source.payload.title,
            created_by: job._source.created_by,
            created_at: job._source.created_at,
            started_at: job._source.started_at,
            completed_at: job._source.completed_at,
            status: job._source.status,
            content_type: job._source.output ? job._source.output.content_type : false,
            max_size_reached: job._source.output ? job._source.output.max_size_reached : false,
          };
        }),
      });
    }
  };

  private licenseAllowsToShowThisPage = () => {
    return (
      this.props.xpackInfo.get('features.reporting.management.showLinks') &&
      this.props.xpackInfo.get('features.reporting.management.enableLinks')
    );
  };

  private formatDate(timestamp: string) {
    try {
      return moment(timestamp).format('YYYY-MM-DD @ hh:mm A');
    } catch (error) {
      // ignore parse error and display unformatted value
      return timestamp;
    }
  }
}
