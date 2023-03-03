'use client';

import {
    ChangeEventHandler,
    FocusEventHandler,
    ForwardedRef,
    forwardRef,
} from 'react';
import { Field } from './Field';

export const FieldText: Field = {
    input: forwardRef(
        (
            params: {
                onChange: ChangeEventHandler;
                onBlur: FocusEventHandler;
                name: string;
            },
            ref
        ) => {
            return (
                <input
                    className="input w-full"
                    type="text"
                    placeholder="..."
                    onChange={params.onChange}
                    onBlur={params.onBlur}
                    name={params.name}
                    ref={ref as ForwardedRef<HTMLInputElement>}
                />
            );
        }
    ),
    output(value: string) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return String(rawValue);
    },
};
