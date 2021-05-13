import { ChangeEvent, FormEvent } from 'react';
import { useController } from 'react-hook-form';

import BaseLabel from '../BaseLabel/BaseLabel';

import Props from './BaseInput.types';

import './BaseInput.scss';

const BaseInput = ({
  className,
  control,
  label,
  labelClassName,
  name,
  onBlur,
  onFocus,
  onChange,
  placeholder,
  rules,
  required,
  setValue,
  type,
  value,
}: Props): JSX.Element => {
  const {
    field: { ref, onChange: onControllerChange, onBlur: onControllerBlur, ...inputProps },
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
  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (typeof value === 'string') {
      setValue(value.trim());
    }
    onControllerBlur();
    if (onBlur) onBlur(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onControllerChange(event);
    if (onChange) onChange(event);
  };
  return (
    <div className="base-input">
      {label && (
        <BaseLabel className={labelClassName} name={name}>
          {label}
        </BaseLabel>
      )}
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
        ref={ref}
        className={`base-input__inner ${className} ${invalid && 'base-input__inner--error'}`}
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <p className="base-input__error">{error.message}</p>}
    </div>
  );
};

BaseInput.defaultProps = {
  className: '',
  control: null,
  label: '',
  labelClassName: '',
  name: '',
  onBlur: null,
  onChange: null,
  onFocus: null,
  placeholder: '',
  required: false,
  rules: null,
  type: 'text',
};

export default BaseInput;
