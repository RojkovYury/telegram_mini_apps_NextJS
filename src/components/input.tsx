import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { ForwardedRef, forwardRef } from 'react';
import { IMaskMixin } from 'react-imask';

interface InputProps extends OutlinedTextFieldProps {
  mask?: string;
}

// TODO: разобраться с мержем типов

// @ts-ignore
const MaskedStyledInput = IMaskMixin((props: InputProps) => (
  <TextField {...props} />
));

const Input = forwardRef((props: InputProps, ref: ForwardedRef<any>) => (
// @ts-ignore
  <MaskedStyledInput
    inputRef={ref}
    {...props}
  />
));

export default Input;
