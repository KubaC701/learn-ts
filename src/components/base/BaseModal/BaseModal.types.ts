import { ReactNode } from 'react';

export default interface Props {
  className?: string;
  children: ReactNode;
  heading?: string;
  setIsOpen: (isOpen: boolean) => void;
  rootElement: Element;
}
