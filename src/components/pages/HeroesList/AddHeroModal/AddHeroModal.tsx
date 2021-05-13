import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import BaseButton from '../../../base/BaseButton/BaseButton';
import BaseInput from '../../../base/BaseInput/BaseInput';
import BaseLoader from '../../../base/BaseLoader/BaseLoader';
import BaseModal from '../../../base/BaseModal/BaseModal';
import BaseSelect from '../../../base/BaseSelect/BaseSelect';
import BaseTextarea from '../../../base/BaseTextarea/BaseTextarea';
import ErrorInfo from '../../../reusable/ErrorInfo/ErrorInfo';

import useFetch from '../../../../hooks/useFetch';

import Props from './AddHeroModal.types';
import Hero, { HeroType } from '../../../../types/Hero';

import './AddHeroModal.scss';

const AddHeroModal = ({ setIsOpen, onSubmit }: Props): JSX.Element => {
  const [hero, setHero] = useState<Hero>({
    avatar_url: '',
    description: '',
    full_name: '',
    id: '',
    type: {
      id: '',
      name: '',
    },
  });

  const [isValidImage, setIsValidImage] = useState(true);
  const { data: types, isLoading, error } = useFetch<HeroType[]>(
    `${process.env.REACT_APP_API_URL}/types`,
    []
  );
  const { handleSubmit, control } = useForm({
    mode: 'onBlur',
  });

  const updateHeroData = (data: Partial<Hero>) => {
    setHero({ ...hero, ...data });
  };

  useEffect(() => {
    setIsValidImage(true);
  }, [hero.avatar_url]);

  return (
    <BaseModal className="add-hero-modal" heading="Add hero" setIsOpen={setIsOpen}>
      {types && (
        <form className="add-hero-modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-hero-modal__wrapper">
            <div className="add-hero-modal__avatar">
              {isValidImage && hero.avatar_url && (
                <img
                  alt=""
                  className="add-hero-modal__avatar-image"
                  onError={() => setIsValidImage(false)}
                  src={hero.avatar_url}
                />
              )}
            </div>
            <BaseInput
              className="add-hero-modal__field"
              control={control}
              label="Avatar URL"
              name="avatar_url"
              required
              rules={{
                pattern: {
                  message: 'The Avatar URL field must be a valid URL address',
                  value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                },
              }}
              setValue={(value) => updateHeroData({ avatar_url: value })}
              value={hero.avatar_url}
            />
            <BaseInput
              className="add-hero-modal__field"
              control={control}
              label="Full name"
              name="full_name"
              required
              setValue={(value) => updateHeroData({ full_name: value })}
              value={hero.full_name}
            />
            <BaseSelect
              className="add-hero-modal__field"
              control={control}
              label="Type"
              name="type"
              options={types}
              placeholder="Select type"
              required
              setValue={(value) =>
                updateHeroData({
                  type: { id: value, name: types.find((type) => type.id === value)?.name ?? '' },
                })
              }
              value={hero.type.id}
            />
            <BaseTextarea
              className="add-hero-modal__field"
              control={control}
              label="Description"
              name="description"
              required
              setValue={(value) => updateHeroData({ description: value })}
              value={hero.description}
            />
          </div>
          <BaseButton className="add-hero-modal__submit" type="submit" variant="cta">
            Save
          </BaseButton>
        </form>
      )}
      {isLoading && <BaseLoader />}
      {error && <ErrorInfo errorMessage={error} />}
    </BaseModal>
  );
};

export default AddHeroModal;
