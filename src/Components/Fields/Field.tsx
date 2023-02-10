export abstract class Field {
    public abstract input(): JSX.Element;
    public abstract output(value: any): JSX.Element;
    public abstract value(rawValue: any): any;
}
