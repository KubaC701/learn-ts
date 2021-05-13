import { ChangeEvent } from 'react';
import { useController } from 'react-hook-form';

import BaseLabel from '../BaseLabel/BaseLabel';

import Props from './BaseTextarea.types';

const BaseTextarea = ({
  className,
  cols,
  control,
  label,
  labelClassName,
  name,
  onChange,
  onFocus,
  placeholder,
  required,
  rows,
  rules,
  setValue,
  value,
}: Props): JSX.Element => {
  const {
    field: { ref, onChange: onControllerChange, ...inputProps },
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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onControllerChange(event);
    if (onChange) onChange(event);
  };
  return (
    <div className="base-textarea">
      {label && (
        <BaseLabel className={labelClassName} name={name}>
          {label}
        </BaseLabel>
      )}
      <textarea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
        ref={ref}
        className={`base-textarea__inner ${className} ${invalid && 'base-textarea__inner--error'}`}
        cols={cols}
        id={name}
        name={name}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
      {error && (
        <p className="base-textarea__error" data-testid="error">
          {error.message}
        </p>
      )}
    </div>
  );
};

BaseTextarea.defaultProps = {
  className: '',
  cols: 30,
  control: null,
  label: '',
  labelClassName: '',
  name: '',
  onChange: null,
  onFocus: null,
  placeholder: '',
  required: false,
  rows: 5,
  rules: null,
};

export default BaseTextarea;
