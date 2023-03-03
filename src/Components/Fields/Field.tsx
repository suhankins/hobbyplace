import { ForwardRefExoticComponent } from 'react';

export interface Field {
    input: ForwardRefExoticComponent<any>;
    output(value: any): JSX.Element;
    value(rawValue: any): any;
}
