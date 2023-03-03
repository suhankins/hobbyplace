import { Field } from './Field';

export const FieldNumber: Field = {
    input() {
        return <input className="input" type="number" placeholder="0" />;
    },
    output(value: number) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return Number(rawValue);
    },
};
