import { FieldDefinition } from './FieldDefinition';

export const FieldNumber: FieldDefinition = {
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
