import { Field } from './Field';

export class FieldText extends Field {
    public input(): JSX.Element {
        return <input></input>;
    }
    public output(value: string): JSX.Element {
        return <span>{value}</span>;
    }
    public value(rawValue: any) {
        return String(rawValue);
    }
}
