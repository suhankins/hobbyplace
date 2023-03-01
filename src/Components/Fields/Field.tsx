export interface Field {
    input(): JSX.Element;
    output(value: any): JSX.Element;
    value(rawValue: any): any;
}
