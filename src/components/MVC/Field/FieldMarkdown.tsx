'use client';

import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import { Field } from './Field';
import { UseFormSetValue, FieldValues } from 'react-hook-form';
import { MDEInput } from '../MDEInput';

export const FieldMarkdown: Field = {
    input: forwardRef(
        (
            params: {
                onChange: ChangeEventHandler;
                onBlur: FocusEventHandler;
                name: string;
                setValue: UseFormSetValue<FieldValues>;
            },
            ref
        ) => {
            return <MDEInput {...params} ref={ref} />;
        }
    ),
    output(value: string) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return String(rawValue);
    },
};
