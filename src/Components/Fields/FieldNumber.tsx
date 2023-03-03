import {
    ChangeEventHandler,
    FocusEventHandler,
    ForwardedRef,
    forwardRef,
} from 'react';
import { Field } from './Field';

export const FieldNumber: Field = {
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
                    className="input"
                    type="number"
                    placeholder="0"
                    onChange={params.onChange}
                    onBlur={params.onBlur}
                    name={params.name}
                    ref={ref as ForwardedRef<HTMLInputElement>}
                />
            );
        }
    ),
    output(value: number) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return Number(rawValue);
    },
};
