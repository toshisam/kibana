/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import expect from '@kbn/expect';
import { getTestAlertData } from './utils';
import { ES_ARCHIVER_ACTION_ID, SPACE_1_ES_ARCHIVER_ACTION_ID } from './constants';
import { FtrProviderContext } from '../../ftr_provider_context';

export default function createUpdateTests({ getService }: FtrProviderContext) {
  const supertest = getService('supertest');
  const esArchiver = getService('esArchiver');

  describe('update', () => {
    let alertId: string;
    let space1AlertId: string;

    before(async () => {
      await esArchiver.load('actions/basic');
      await supertest
        .post('/api/alert')
        .set('kbn-xsrf', 'foo')
        .send(getTestAlertData())
        .expect(200)
        .then((resp: any) => {
          alertId = resp.body.id;
        });
      await supertest
        .post('/s/space_1/api/alert')
        .set('kbn-xsrf', 'foo')
        .send(getTestAlertData())
        .expect(200)
        .then((resp: any) => {
          space1AlertId = resp.body.id;
        });
    });
    after(async () => {
      await supertest
        .delete(`/api/alert/${alertId}`)
        .set('kbn-xsrf', 'foo')
        .expect(204, '');
      await supertest
        .delete(`/s/space_1/api/alert/${space1AlertId}`)
        .set('kbn-xsrf', 'foo')
        .expect(204, '');
      await esArchiver.unload('actions/basic');
    });

    it('should return 200 when updating an alert', async () => {
      const alert = {
        alertTypeParams: {
          foo: true,
        },
        interval: '12s',
        actions: [
          {
            group: 'default',
            id: ES_ARCHIVER_ACTION_ID,
            params: {
              message:
                'UPDATED: instanceContextValue: {{context.instanceContextValue}}, instanceStateValue: {{state.instanceStateValue}}',
            },
          },
        ],
      };
      await supertest
        .put(`/api/alert/${alertId}`)
        .set('kbn-xsrf', 'foo')
        .send(alert)
        .expect(200)
        .then((resp: any) => {
          expect(resp.body).to.eql({
            ...alert,
            id: alertId,
          });
        });
    });

    it('should return 404 when updating an alert from another space', async () => {
      await supertest
        .put(`/api/alert/${space1AlertId}`)
        .set('kbn-xsrf', 'foo')
        .send({
          alertTypeParams: {
            foo: true,
          },
          interval: '12s',
          actions: [
            {
              group: 'default',
              id: ES_ARCHIVER_ACTION_ID,
              params: {
                message:
                  'UPDATED: instanceContextValue: {{context.instanceContextValue}}, instanceStateValue: {{state.instanceStateValue}}',
              },
            },
          ],
        })
        .expect(404);
    });

    it('should return 200 when updating an alert in a space', async () => {
      const alert = {
        alertTypeParams: {
          foo: true,
        },
        interval: '12s',
        actions: [
          {
            group: 'default',
            id: SPACE_1_ES_ARCHIVER_ACTION_ID,
            params: {
              message:
                'UPDATED: instanceContextValue: {{context.instanceContextValue}}, instanceStateValue: {{state.instanceStateValue}}',
            },
          },
        ],
      };
      await supertest
        .put(`/s/space_1/api/alert/${space1AlertId}`)
        .set('kbn-xsrf', 'foo')
        .send(alert)
        .expect(200)
        .then((resp: any) => {
          expect(resp.body).to.eql({
            ...alert,
            id: space1AlertId,
          });
        });
    });

    it('should return 400 when attempting to change alert type', async () => {
      await supertest
        .put(`/api/alert/${alertId}`)
        .set('kbn-xsrf', 'foo')
        .send({
          alertTypeId: '1',
          alertTypeParams: {
            foo: true,
          },
          interval: '12s',
          actions: [
            {
              group: 'default',
              id: ES_ARCHIVER_ACTION_ID,
              params: {
                message:
                  'UPDATED: instanceContextValue: {{context.instanceContextValue}}, instanceStateValue: {{state.instanceStateValue}}',
              },
            },
          ],
        })
        .expect(400)
        .then((resp: any) => {
          expect(resp.body).to.eql({
            statusCode: 400,
            error: 'Bad Request',
            message: '"alertTypeId" is not allowed',
            validation: {
              source: 'payload',
              keys: ['alertTypeId'],
            },
          });
        });
    });

    it('should return 400 when payload is empty and invalid', async () => {
      await supertest
        .put(`/api/alert/${alertId}`)
        .set('kbn-xsrf', 'foo')
        .send({})
        .expect(400)
        .then((resp: any) => {
          expect(resp.body).to.eql({
            statusCode: 400,
            error: 'Bad Request',
            message:
              'child "interval" fails because ["interval" is required]. child "alertTypeParams" fails because ["alertTypeParams" is required]. child "actions" fails because ["actions" is required]',
            validation: {
              source: 'payload',
              keys: ['interval', 'alertTypeParams', 'actions'],
            },
          });
        });
    });

    it(`should return 400 when alertTypeConfig isn't valid`, async () => {
      const { body: customAlert } = await supertest
        .post('/api/alert')
        .set('kbn-xsrf', 'foo')
        .send(
          getTestAlertData({
            alertTypeId: 'test.validation',
            alertTypeParams: {
              param1: 'test',
            },
          })
        )
        .expect(200);
      await supertest
        .put(`/api/alert/${customAlert.id}`)
        .set('kbn-xsrf', 'foo')
        .send({
          interval: '10s',
          alertTypeParams: {},
          actions: [],
        })
        .expect(400)
        .then((resp: any) => {
          expect(resp.body).to.eql({
            statusCode: 400,
            error: 'Bad Request',
            message:
              'alertTypeParams invalid: [param1]: expected value of type [string] but got [undefined]',
          });
        });
    });

    it(`should return 400 when interval is wrong syntax`, async () => {
      const { body: error } = await supertest
        .put(`/api/alert/${alertId}`)
        .set('kbn-xsrf', 'foo')
        .send(getTestAlertData({ interval: '10x', enabled: undefined }))
        .expect(400);
      expect(error).to.eql({
        statusCode: 400,
        error: 'Bad Request',
        message:
          'child "interval" fails because ["interval" with value "10x" fails to match the seconds pattern, "interval" with value "10x" fails to match the minutes pattern, "interval" with value "10x" fails to match the hours pattern, "interval" with value "10x" fails to match the days pattern]. "alertTypeId" is not allowed',
        validation: {
          source: 'payload',
          keys: ['interval', 'interval', 'interval', 'interval', 'alertTypeId'],
        },
      });
    });
  });
}
