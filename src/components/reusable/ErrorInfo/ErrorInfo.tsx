import Props from './ErrorInfo.types';

import './ErrorInfo.scss';

const ErrorInfo = ({ errorMessage }: Props): JSX.Element => (
  <div className="error-info">
    <img alt="" className="error-info__icon" src="/icons/error.svg" />
    <p className="error-info__message">{errorMessage}</p>
  </div>
);

export default ErrorInfo;
