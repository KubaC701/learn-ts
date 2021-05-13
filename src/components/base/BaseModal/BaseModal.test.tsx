import { fireEvent, render, within } from '@testing-library/react';

import BaseModal from './BaseModal';

test('should fire function to close modal on button click', () => {
  const setIsOpen = jest.fn();
  const rootElement = document.createElement('div');
  render(
    <BaseModal rootElement={rootElement} setIsOpen={setIsOpen}>
      <span>children</span>
    </BaseModal>
  );
  const { getByRole } = within(rootElement);
  fireEvent.click(getByRole('button'));
  expect(setIsOpen).toHaveBeenCalled();
});

test('should fire function to close modal on outside click', () => {
  const setIsOpen = jest.fn();
  const rootElement = document.createElement('div');
  render(
    <BaseModal rootElement={rootElement} setIsOpen={setIsOpen}>
      <span>children</span>
    </BaseModal>
  );
  fireEvent.click(document, { target: {} });
  expect(setIsOpen).toHaveBeenCalled();
});
