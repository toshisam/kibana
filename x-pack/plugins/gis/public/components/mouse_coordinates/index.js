/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { connect } from 'react-redux';
import { MouseCoordinates } from './mouse_coordinates';
import { getMouseCoordinates } from "../../selectors/map_selectors";

function mapStateToProps(state = {}) {
  return {
    mouseCoordinates: getMouseCoordinates(state),
  };
}

const connectedMouseCoordinates = connect(mapStateToProps, null, null,
  { withRef: true })(MouseCoordinates);
export { connectedMouseCoordinates as MouseCoordinates };
