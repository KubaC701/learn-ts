import Props from './BaseLabel.types';

import './BaseLabel.scss';

const BaseLabel = ({ children, className, name }: Props): JSX.Element => (
  <label className={`base-label ${className}`} htmlFor={name}>
    {children}
  </label>
);

BaseLabel.defaultProps = {
  className: '',
};

export default BaseLabel;
