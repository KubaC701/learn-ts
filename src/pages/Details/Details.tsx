import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import BaseButton from '../../components/base/BaseButton/BaseButton';
import BaseLoader from '../../components/base/BaseLoader/BaseLoader';
import BaseModal from '../../components/base/BaseModal/BaseModal';

import useFetch from '../../hooks/useFetch';
import useNotificationContext from '../../hooks/useNotificationContext';

import fetchData from '../../helpers/fetchData';

import Hero from '../../types/Hero';
import Props from './Details.types';

import './Details.scss';

const Details = ({ modalRoot }: Props): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { data: hero, isLoading, error } = useFetch<Hero>(
    `${process.env.REACT_APP_API_URL}/heroes/${id}`
  );
  const { dispatchNotifications } = useNotificationContext();

  useEffect(() => {
    if (error) history.push('/404');
  }, [error, history]);

  const handleDeleteHero = async () => {
    fetchData<Hero>(
      `${process.env.REACT_APP_API_URL}/heroes/${id}`,
      {
        atLast: () => history.push('/'),
        reject: (err: string) => {
          dispatchNotifications({
            notification: {
              status: 'error',
              text: err,
            },
            type: 'ADD_NOTIFICATION',
          });
        },
        resolve: () => {
          dispatchNotifications({
            notification: {
              status: 'success',
              text: `${hero?.full_name} was deleted`,
            },
            type: 'ADD_NOTIFICATION',
          });
        },
      },
      {
        method: 'DELETE',
      }
    );
  };

  return (
    <BaseModal className="details" rootElement={modalRoot} setIsOpen={() => history.push('/')}>
      {hero && (
        <>
          <div className="details__content">
            <img alt={hero.full_name} className="details__avatar" src={hero.avatar_url} />
            <h1 className="details__name">{hero.full_name}</h1>
            <h2 className="details__type">{hero.type.name}</h2>
            <p className="details__description">{hero.description}</p>
          </div>
          <BaseButton
            className="details__delete"
            Icon={<img alt="" src="/icons/trash.svg" />}
            onClick={handleDeleteHero}
            variant="text"
          >
            Delete hero
          </BaseButton>
        </>
      )}
      {isLoading && <BaseLoader />}
    </BaseModal>
  );
};

export default Details;
