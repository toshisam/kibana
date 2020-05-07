/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { getIndexESListItemMock } from '../../../common/schemas/elastic_query/index_es_list_item_schema.mock';
import { LIST_ITEM_INDEX, TIE_BREAKERS, VALUE_2 } from '../../../common/constants.mock';

import { createListItemsBulk } from './create_list_items_bulk';
import { getCreateListItemBulkOptionsMock } from './create_list_items_bulk.mock';

describe('crete_list_item_bulk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It calls "callCluster" with body, index, and the bulk items', async () => {
    const options = getCreateListItemBulkOptionsMock();
    await createListItemsBulk(options);
    const firstRecord = getIndexESListItemMock();
    const secondRecord = getIndexESListItemMock(VALUE_2);
    [firstRecord.tie_breaker_id, secondRecord.tie_breaker_id] = TIE_BREAKERS;
    expect(options.callCluster).toBeCalledWith('bulk', {
      body: [
        { create: { _index: LIST_ITEM_INDEX } },
        firstRecord,
        { create: { _index: LIST_ITEM_INDEX } },
        secondRecord,
      ],
      index: LIST_ITEM_INDEX,
    });
  });

  test('It should not call the dataClient when the values are empty', async () => {
    const options = getCreateListItemBulkOptionsMock();
    options.value = [];
    expect(options.callCluster).not.toBeCalled();
  });
});
