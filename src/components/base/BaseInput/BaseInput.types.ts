import { FormEvent } from 'react';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';

export default interface Props {
  className?: string;
  cols?: string;
  control?: Control<FieldValues>;
  label?: string;
  labelClassName?: string;
  name: string;
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
  onFocus?: (event: FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required: boolean;
  rows?: string;
  rules?: RegisterOptions;
  setValue: (value: string) => void;
  type: 'number' | 'text' | 'password' | 'search';
  value: string;
}
