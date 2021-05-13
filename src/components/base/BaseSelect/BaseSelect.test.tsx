import { fireEvent, render, screen } from '@testing-library/react';

import BaseSelect from './BaseSelect';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useController: () => ({
    field: {
      onChange: jest.fn(),
      ref: null,
    },
    fieldState: { error: null, invalid: false },
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('should update value on select option', () => {
  const mockedSetValue = jest.fn();
  render(
    <BaseSelect
      label="label"
      name="test"
      options={[
        { id: '1', name: '1name' },
        { id: '2', name: '2name' },
        { id: '3', name: '3name' },
      ]}
      placeholder="Select type"
      setValue={mockedSetValue}
      value=""
    />
  );
  fireEvent.change(screen.getByLabelText('label'), { target: { value: '1' } });

  expect(mockedSetValue).toHaveBeenCalledWith('1');
});
