/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { CombinedField } from './types';
import {
  FindFileStructureResponse,
  IngestPipeline,
  Mappings,
} from '../../../../../../common/types/file_datavisualizer';

const COMMON_LAT_NAMES = ['latitude', 'lat'];
const COMMON_LON_NAMES = ['longitude', 'long', 'lon'];

export function getDefaultCombinedFields(results: FindFileStructureResponse) {
  const combinedFields: CombinedField[] = [];
  const geoPointField = getGeoPointField(results);
  if (geoPointField) {
    combinedFields.push(geoPointField);
  }
  return combinedFields;
}

export function addCombinedFieldsToMappings(mappings: Mappings, combinedFields: CombinedField[]) {
  const updatedMappings = { ...mappings };
  combinedFields.forEach((combinedField) => {
    updatedMappings.properties[combinedField.combinedFieldName] = {
      type: combinedField.mappingType,
    };
  });
  return updatedMappings;
}

export function removeCombinedFieldsFromMappings(
  mappings: Mappings,
  combinedFields: CombinedField[]
) {
  const updatedMappings = { ...mappings };
  combinedFields.forEach((combinedField) => {
    delete updatedMappings.properties[combinedField.combinedFieldName];
  });
  return updatedMappings;
}

export function addCombinedFieldsToPipeline(
  pipeline: IngestPipeline,
  combinedFields: CombinedField[]
) {
  const updatedPipeline = _.cloneDeep(pipeline);
  combinedFields.forEach((combinedField) => {
    updatedPipeline.processors.push({
      set: {
        field: combinedField.combinedFieldName,
        value: combinedField.fieldNames
          .map((fieldName) => {
            return `{{${fieldName}}}`;
          })
          .join(combinedField.delimiter),
      },
    });
  });
  return updatedPipeline;
}

export function removeCombinedFieldsFromPipeline(
  pipeline: unknown,
  combinedFields: CombinedField[]
) {
  return {
    ...pipeline,
    processors: pipeline.processors.filter((processor: IngestPipeline) => {
      return processor.hasOwnProperty('set')
        ? !combinedFields.some((combinedField) => {
            return processor.set.field === combinedField.combinedFieldName;
          })
        : true;
    }),
  };
}

export function isWithinLatRange(fieldName: string, fieldStats: unknown) {
  return (
    fieldStats.hasOwnProperty(fieldName) &&
    fieldStats[fieldName].hasOwnProperty('max_value') &&
    fieldStats[fieldName].max_value <= 90 &&
    fieldStats[fieldName].hasOwnProperty('min_value') &&
    fieldStats[fieldName].min_value >= -90
  );
}

export function isWithinLonRange(
  fieldName: string,
  fieldStats: FindFileStructureResponse['field_stats']
) {
  return (
    fieldStats.hasOwnProperty(fieldName) &&
    fieldStats[fieldName].hasOwnProperty('max_value') &&
    fieldStats[fieldName].max_value <= 180 &&
    fieldStats[fieldName].hasOwnProperty('min_value') &&
    fieldStats[fieldName].min_value >= -180
  );
}

export function createGeoPointCombinedField(
  latField: string,
  lonField: string,
  geoPointField: string
): CombinedField {
  return {
    mappingType: 'geo_point',
    delimiter: ',',
    combinedFieldName: geoPointField,
    fieldNames: [latField, lonField],
  };
}

export function getNameCollisionMsg(name: string) {
  return i18n.translate('xpack.ml.fileDatavisualizer.nameCollisionMsg', {
    defaultMessage: '"{name}" already exists, please provide a unique name',
    values: { name },
  });
}

function getGeoPointField(results: FindFileStructureResponse) {
  const latField = results.column_names.find((columnName) => {
    return (
      COMMON_LAT_NAMES.includes(columnName.toLowerCase()) &&
      isWithinLatRange(columnName, results.field_stats)
    );
  });

  const lonField = results.column_names.find((columnName) => {
    return (
      COMMON_LON_NAMES.includes(columnName.toLowerCase()) &&
      isWithinLonRange(columnName, results.field_stats)
    );
  });

  if (!latField || !lonField) {
    return null;
  }

  const combinedFieldNames = [
    'location',
    'point_location',
    `${latField}_${lonField}`,
    `location_${uuid()}`,
  ];
  // Use first combinedFieldNames that does not have a naming collision
  const geoPointField = combinedFieldNames.find((name) => {
    return !results.column_names.includes(name);
  });

  return geoPointField ? createGeoPointCombinedField(latField, lonField, geoPointField) : null;
}
