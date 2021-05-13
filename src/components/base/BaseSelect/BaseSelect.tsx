import { useController } from 'react-hook-form';

import BaseLabel from '../BaseLabel/BaseLabel';

import Props from './BaseSelect.types';

import './BaseSelect.scss';

const BaseSelect = ({
  className,
  control,
  label,
  name,
  options,
  placeholder,
  required,
  rules,
  setValue,
  value,
}: Props): JSX.Element => {
  const {
    field: { ref, onChange, ...selectProps },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules: {
      required: {
        message: `The ${label} field is required`,
        value: required,
      },
      ...rules,
    },
  });

  return (
    <div className={`base-select ${className}`}>
      {label && <BaseLabel name={name}>{label}</BaseLabel>}
      <select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...selectProps}
        ref={ref}
        className={`base-select__inner ${invalid && 'base-select__inner--error'}`}
        id={name}
        name={name}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event);
        }}
        value={value}
      >
        <option className="base-select__placeholder" hidden value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="base-select__error">{error.message}</p>}
    </div>
  );
};

BaseSelect.defaultProps = {
  className: '',
  control: null,
  label: '',
  name: '',
  placeholder: '',
  required: false,
  rules: null,
};

export default BaseSelect;
