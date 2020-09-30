/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { XY_MIN_LAT, XY_MAX_LAT, XY_MIN_LON, XY_MAX_LON } from './constants';

const LAT_RANGE = XY_MAX_LAT - XY_MIN_LAT;
const LON_RANGE = XY_MAX_LON - XY_MIN_LON;

export function scaleLonToXDomain(lon: number, xMin: number, xDomainRange: number) {
  return scale(lon, XY_MIN_LON, LON_RANGE, xMin, xDomainRange);
}

export function scaleLatToYDomain(lat: number, yMin: number, yDomainRange: number) {
  return scale(lat, XY_MIN_LAT, LAT_RANGE, yMin, yDomainRange);
}

export function scaleXDomainToLat(x: number, xMin: number, xDomainRange: number) {
  return scale(x, xMin, xDomainRange, XY_MIN_LON, LON_RANGE);
}

export function scaleYDomainToLon(x: number, yMin: number, yDomainRange: number) {
  return scale(x, yMin, yDomainRange, XY_MIN_LAT, LAT_RANGE);
}

function scale(
  oldValue: number,
  oldMin: number,
  oldRange: number,
  newMin: number,
  newRange: number
) {
  return ((oldValue - oldMin) * newRange) / oldRange + newMin;
}
