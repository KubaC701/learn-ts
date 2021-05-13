/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { fireEvent, render, screen } from '@testing-library/react';
import BaseTextarea from './BaseTextarea';

jest.mock('react-hook-form', () => ({
  useController: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  const { useController } = require('react-hook-form');
  useController.mockReturnValue({
    field: {
      onChange: jest.fn(),
      ref: null,
    },
    fieldState: { error: null, invalid: false },
  });
});

test('should update value on typing', () => {
  let value = '';
  const setValue = (updatedValue: string) => {
    value = updatedValue;
  };
  render(<BaseTextarea label="label" name="test" setValue={setValue} value={value} />);
  fireEvent.change(screen.getByLabelText('label'), { target: { value: 'test' } });

  expect(value).toBe('test');
});

test('should call on change handler', () => {
  const handleChange = jest.fn();

  render(
    <BaseTextarea
      label="label"
      name="test"
      onChange={handleChange}
      setValue={() => null}
      value=""
    />
  );
  fireEvent.change(screen.getByLabelText('label'), { target: { value: 'test' } });

  expect(handleChange).toHaveBeenCalled();
});

test('should display error message', () => {
  const { useController } = require('react-hook-form');
  useController.mockReturnValueOnce({
    field: {
      onChange: jest.fn(),
      ref: null,
    },
    fieldState: { error: { message: 'Error' }, invalid: false },
  });

  const { getByTestId } = render(<BaseTextarea name="test" setValue={() => null} value="" />);

  expect(getByTestId('error')).toBeInTheDocument();
});
