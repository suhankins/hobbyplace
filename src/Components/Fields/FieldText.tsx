import { Field } from './Field';

export const FieldText: Field = {
    input() {
        return <input className="input" type="text" placeholder="..." />;
    },
    output(value: string) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return String(rawValue);
    },
};
