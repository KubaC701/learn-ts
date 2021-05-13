import Hero from '../../../../types/Hero';

export default interface Props {
  onSubmit: (hero: Hero) => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
}
