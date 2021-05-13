import { FormEvent } from 'react';
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';

export default interface Props {
  className?: string;
  cols?: number;
  control?: Control<FieldValues>;
  label?: string;
  labelClassName?: string;
  name: string;
  onChange?: (event: FormEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FormEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required: boolean;
  rows?: number;
  rules?: RegisterOptions;
  setValue: (value: string) => void;
  value: string;
}
