import * as React from 'react';
import { Omit } from '@material-ui/core';
import { BasePickerProps } from '../_shared/BasePicker';
import { OuterInlineWrapperProps } from '../wrappers/InlineWrapper';
import { BaseTimePickerProps } from './TimePicker';
export interface TimePickerInlineProps extends BasePickerProps, BaseTimePickerProps, Omit<OuterInlineWrapperProps, 'onChange' | 'value'> {
}
export declare const TimePickerInline: React.SFC<TimePickerInlineProps>;
declare const _default: React.ForwardRefExoticComponent<TimePickerInlineProps & React.RefAttributes<{}>>;
export default _default;
