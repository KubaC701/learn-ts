import { MouseEvent, ReactNode } from 'react';

export default interface Props {
  children: ReactNode;
  className?: string;
  Icon?: JSX.Element;
  variant: 'primary' | 'cta' | 'outline' | 'text';
  type: 'button' | 'submit' | 'reset';
  to?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
