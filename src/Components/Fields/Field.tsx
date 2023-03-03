import { ChangeEventHandler, FocusEventHandler, ForwardedRef, ForwardRefExoticComponent } from 'react';
import { UseFormSetValue, FieldValues } from 'react-hook-form';

export interface Field {
    input: ForwardRefExoticComponent<any>;
    output(value: any): JSX.Element;
    value(rawValue: any): any;
}
