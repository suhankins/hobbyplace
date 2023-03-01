import { Field } from './Field';

export class FieldNumber extends Field {
    public input(): JSX.Element {
        return <input></input>;
    }
    public output(value: number): JSX.Element {
        return <span>{value}</span>;
    }
    public value(rawValue: any) {
        return Number(rawValue);
    }
}
