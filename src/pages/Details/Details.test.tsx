import { render, within } from '@testing-library/react';

import Details from './Details';

import useFetch from '../../hooks/useFetch';
import useNotificationContext from '../../hooks/useNotificationContext';

const mockedUseFetch = useFetch as jest.Mock;
const mockedUseNotificationContext = useNotificationContext as jest.Mock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: '',
  }),
}));
jest.mock('../../hooks/useFetch');
jest.mock('../../hooks/useNotificationContext');

beforeEach(() => {
  mockedUseFetch.mockReturnValue({
    data: { type: { id: '', name: '' } },
    error: true,
    isLoading: false,
  });
  mockedUseNotificationContext.mockReturnValue({
    dispatchNotifications: () => null,
  });
});

test('should display data about hero', () => {
  const hero = {
    avatar_url: 'avatar',
    description: 'description',
    full_name: 'Name',
    type: {
      name: 'Type',
    },
  };
  mockedUseFetch.mockReturnValueOnce({
    data: hero,
    error: false,
    isLoading: false,
  });
  const rootElement = document.createElement('div');
  render(<Details modalRoot={rootElement} />);

  expect(within(rootElement).getByText(hero.full_name)).toBeTruthy();
  expect(within(rootElement).getByText(hero.type.name)).toBeTruthy();
  expect(within(rootElement).getByAltText(hero.full_name)).toHaveAttribute('src', hero.avatar_url);
});
