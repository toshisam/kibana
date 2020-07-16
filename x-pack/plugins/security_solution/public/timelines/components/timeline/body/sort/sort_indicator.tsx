/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiIcon, EuiToolTip } from '@elastic/eui';
import React from 'react';

import { Direction } from '../../../../../graphql/types';
import * as i18n from '../translations';

import { SortDirection } from '.';

enum SortDirectionIndicatorEnum {
  SORT_UP = 'sortUp',
  SORT_DOWN = 'sortDown',
}

export type SortDirectionIndicator = undefined | SortDirectionIndicatorEnum;

/** Returns the symbol that corresponds to the specified `SortDirection` */
export const getDirection = (sortDirection: SortDirection): SortDirectionIndicator => {
  switch (sortDirection) {
    case Direction.asc:
      return SortDirectionIndicatorEnum.SORT_UP;
    case Direction.desc:
      return SortDirectionIndicatorEnum.SORT_DOWN;
    case 'none':
      return undefined;
    default:
      throw new Error('Unhandled sort direction');
  }
};

interface Props {
  sortDirection: SortDirection;
}

/** Renders a sort indicator */
export const SortIndicator = React.memo<Props>(({ sortDirection }) => {
  const direction = getDirection(sortDirection);

  if (direction != null) {
    return (
      <EuiToolTip
        content={
          direction === SortDirectionIndicatorEnum.SORT_UP
            ? i18n.SORTED_ASCENDING
            : i18n.SORTED_DESCENDING
        }
        data-test-subj="sort-indicator-tooltip"
      >
        <EuiIcon data-test-subj="sortIndicator" type={direction} />
      </EuiToolTip>
    );
  } else {
    return <EuiIcon data-test-subj="sortIndicator" type={'empty'} />;
  }
});

SortIndicator.displayName = 'SortIndicator';
