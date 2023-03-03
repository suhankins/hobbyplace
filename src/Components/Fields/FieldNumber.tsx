import { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react';
import { Field } from './Field';

export const FieldNumber: Field = {
    input(params: {
        onChange: ChangeEventHandler;
        onBlur: FocusEventHandler;
        name: string;
        ref: LegacyRef<HTMLInputElement>;
    }) {
        return <input className="input" type="number" placeholder='0' {...params} />;
    },
    output(value: number) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return Number(rawValue);
    },
};
