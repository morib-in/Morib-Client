import { FIELDS, FIELDS_MAP } from '@/shared/constants/fields';

export type FieldType = (typeof FIELDS)[number];

export type FieldTypeMapped = (typeof FIELDS_MAP)[FieldType];
