import { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Props from './BaseButton.types';

import './BaseButton.scss';

const BaseButton = ({
  children,
  className,
  Icon,
  variant,
  type,
  to,
  onClick,
}: Props): JSX.Element => {
  const history = useHistory();

  const setClasses = () => {
    switch (variant) {
      case 'primary':
        return 'base-button--primary';
      case 'cta':
        return 'base-button--cta';
      case 'outline':
        return 'base-button--outline';
      case 'text':
        return 'base-button--text';

      default:
        return '';
    }
  };
  const classes = setClasses();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (to) {
      history.push(to);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={`base-button ${classes} ${className}`}
      onClick={handleClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {Icon && <span className="base-button__icon">{Icon}</span>}
      {children}
    </button>
  );
};

BaseButton.defaultProps = {
  className: '',
  Icon: null,
  to: '',
  variant: 'primary',
  type: 'button',
};

export default BaseButton;
