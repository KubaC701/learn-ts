import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import AddHeroModal from '../../components/pages/HeroesList/AddHeroModal/AddHeroModal';
import BaseButton from '../../components/base/BaseButton/BaseButton';
import BaseLoader from '../../components/base/BaseLoader/BaseLoader';
import ErrorInfo from '../../components/reusable/ErrorInfo/ErrorInfo';
import HeroListItem from '../../components/pages/HeroesList/HeroListItem/HeroListItem';

import useFetch from '../../hooks/useFetch';
import useNotificationContext from '../../hooks/useNotificationContext';

import fetchData from '../../helpers/fetchData';

import ApiResponse from './HeroesList.types';
import Hero from '../../types/Hero';

import './HeroesList.scss';

const HeroesList = (): JSX.Element => {
  const ITEMS_TO_FETCH = 12;

  const [isEndOfTheList, setIsEndOfTheList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [skip, setSkip] = useState(0);

  const { data, isLoading, error } = useFetch<ApiResponse>(
    `${process.env.REACT_APP_API_URL}/heroes?skip=${skip}&first=${ITEMS_TO_FETCH}`,
    [skip]
  );
  const { ref, inView } = useInView({
    rootMargin: '50px',
  });
  const { dispatchNotifications } = useNotificationContext();

  useEffect(() => {
    if (inView && !isEndOfTheList) {
      setSkip(skip + ITEMS_TO_FETCH);
    }
  }, [inView, isEndOfTheList, skip]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.total_count <= heroes.length + data.data.length) {
      setIsEndOfTheList(true);
    }
    setHeroes([...heroes, ...data.data]);
  }, [data, heroes]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (hero: Hero) => {
    fetchData<Hero>(
      `${process.env.REACT_APP_API_URL}/heroes`,
      {
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
          // trigger fetch new hero to end of the list
          setSkip(heroes.length);
          setIsModalOpen(false);
          dispatchNotifications({
            notification: {
              status: 'success',
              text: 'Your hero was added!',
            },
            type: 'ADD_NOTIFICATION',
          });
        },
      },
      {
        body: JSON.stringify(hero),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
  };

  return (
    <div className="heroes-list">
      <BaseButton
        className="heroes-list__button"
        Icon={<img alt="" src="/icons/plus.svg" />}
        onClick={openModal}
        variant="cta"
      >
        Add hero
      </BaseButton>
      {heroes.length > 0 && (
        <>
          <div className="heroes-list__header">
            <p className="heroes-list__header-item">Heros</p>
            <p className="heroes-list__header-item">Type</p>
            <p className="heroes-list__header-item">Description</p>
          </div>
          <ul className="heroes-list__content">
            {heroes.map((hero) => (
              <HeroListItem key={hero.id} hero={hero} />
            ))}
          </ul>
          <div ref={ref} className="heroes-list__trigger">
            {isEndOfTheList && (
              <>
                <p className="heroes-list__bottom-text">
                  You&apos;ve seen every hero in the world. Maybe it&apos;s time to add another one?
                </p>
                <BaseButton
                  className="heroes-list__add-hero"
                  Icon={<img alt="" src="/icons/plus.svg" />}
                  onClick={openModal}
                  variant="cta"
                >
                  Add hero
                </BaseButton>
              </>
            )}
          </div>
        </>
      )}
      {isLoading && <BaseLoader />}
      {error && <ErrorInfo errorMessage={error} />}

      {isModalOpen && <AddHeroModal onSubmit={handleSubmit} setIsOpen={setIsModalOpen} />}
    </div>
  );
};

export default HeroesList;
