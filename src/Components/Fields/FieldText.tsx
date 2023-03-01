import { FieldDefinition } from './FieldDefinition';

export const FieldText: FieldDefinition = {
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
