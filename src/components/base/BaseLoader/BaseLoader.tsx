import Props from './BaseLoader.types';

import './BaseLoader.scss';

const BaseLoader = ({ className }: Props): JSX.Element => (
  <div className={`base-loader ${className}`} />
);

BaseLoader.defaultProps = {
  className: '',
};

export default BaseLoader;
