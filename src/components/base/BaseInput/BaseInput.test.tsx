import { fireEvent, render, screen } from '@testing-library/react';

import BaseInput from './BaseInput';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useController: () => ({
    field: {
      onBlur: jest.fn(),
      onChange: jest.fn(),
      ref: null,
    },
    fieldState: { error: null, invalid: false },
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('should update value on typing', () => {
  let value = '';
  const setValue = (updatedValue: string) => {
    value = updatedValue;
  };
  render(<BaseInput label="label" name="test" setValue={setValue} value={value} />);
  fireEvent.change(screen.getByLabelText('label'), { target: { value: 'test' } });

  expect(value).toBe('test');
});

test('should call on blur handler and trim the value', () => {
  const handleBlur = jest.fn();
  const value = 'test   ';
  const setValue = jest.fn();
  render(
    <BaseInput label="label" name="test" onBlur={handleBlur} setValue={setValue} value={value} />
  );
  fireEvent.blur(screen.getByLabelText('label'));
  expect(setValue).toHaveBeenCalledWith('test');
  expect(handleBlur).toHaveBeenCalled();
});

test('should call on change handler', () => {
  const handleChange = jest.fn();
  render(
    <BaseInput label="label" name="test" onChange={handleChange} setValue={() => null} value="" />
  );
  fireEvent.change(screen.getByLabelText('label'), { target: { value: 'test' } });
  expect(handleChange).toHaveBeenCalled();
});
