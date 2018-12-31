import * as React from 'react';
import { Omit } from '@material-ui/core';
import { BasePickerProps } from '../_shared/BasePicker';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { BaseDateTimePickerProps } from './DateTimePicker';
export interface DateTimePickerModalProps extends BasePickerProps, BaseDateTimePickerProps, Omit<ModalWrapperProps, 'onChange' | 'value'> {
}
export declare const DateTimePickerModal: React.SFC<DateTimePickerModalProps>;
declare const _default: React.ForwardRefExoticComponent<DateTimePickerModalProps & React.RefAttributes<{}>>;
export default _default;
