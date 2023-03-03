import { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react';
import { Field } from './Field';
import { UseFormSetValue, FieldValues } from 'react-hook-form';
import { MDEInput } from '../MDEInput';

export const FieldMarkdown: Field = {
    input(params: {
        onChange: ChangeEventHandler;
        onBlur: FocusEventHandler;
        name: string;
        ref: LegacyRef<HTMLInputElement>;
        setValue: UseFormSetValue<FieldValues>;
    }) {
        return <MDEInput {...params} />;
    },
    output(value: string) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return String(rawValue);
    },
};
