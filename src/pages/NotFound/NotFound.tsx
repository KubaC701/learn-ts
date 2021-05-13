import BaseButton from '../../components/base/BaseButton/BaseButton';

import './NotFound.scss';

const NotFound = (): JSX.Element => (
  <div className="not-found">
    <h1 className="not-found__heading">OOPS!</h1>
    <p className="not-found__text">We can&apos;t find the page you&apos;re looking for</p>
    <BaseButton to="/" variant="outline">
      Visit homepage
    </BaseButton>
  </div>
);

export default NotFound;
