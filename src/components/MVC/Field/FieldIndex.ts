import { FieldMarkdown } from './FieldMarkdown';
import { FieldNumber } from './FieldNumber';
import { FieldText } from './FieldText';

export type FieldType = 'text' | 'number' | 'markdown';

export const FieldTypes = ['text', 'number', 'markdown'] as FieldType[];

export const FieldIndex = {
    text: FieldText,
    number: FieldNumber,
    markdown: FieldMarkdown,
};
