import { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react';
import { UseFormSetValue, FieldValues } from 'react-hook-form';

export interface Field {
    input(params: {
        onChange: ChangeEventHandler;
        onBlur: FocusEventHandler;
        name: string;
        ref: LegacyRef<HTMLInputElement>;
        setValue?: UseFormSetValue<FieldValues>;
    }): JSX.Element;
    output(value: any): JSX.Element;
    value(rawValue: any): any;
}
