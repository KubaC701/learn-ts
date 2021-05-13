import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
import { HeroType } from '../../../types/Hero';

export default interface Props {
  className?: string;
  control?: Control<FieldValues>;
  label?: string;
  name: string;
  placeholder?: string;
  required: boolean;
  rules?: RegisterOptions;
  setValue: (value: string) => void;
  value: string;
  options: HeroType[];
}
