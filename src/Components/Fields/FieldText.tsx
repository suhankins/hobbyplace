import { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react';
import { Field } from './Field';

export const FieldText: Field = {
    input(params: {
        onChange: ChangeEventHandler;
        onBlur: FocusEventHandler;
        name: string;
        ref: LegacyRef<HTMLInputElement>;
    }) {
        return <input className="input" type="text" placeholder="..." {...params} />;
    },
    output(value: string) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return String(rawValue);
    },
};
