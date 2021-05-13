import { fireEvent, render, screen } from '@testing-library/react';

import BaseButton from './BaseButton';

test('should render children', () => {
  render(<BaseButton onClick={() => null}>Test</BaseButton>);
  expect(screen.getByRole('button')).toHaveTextContent('Test');
});

describe('classes', () => {
  test('should have primary, default class', () => {
    render(<BaseButton onClick={() => null}>Test</BaseButton>);
    expect(screen.getByRole('button')).toHaveClass('base-button--primary');
  });

  test('should have cta class', () => {
    render(
      <BaseButton onClick={() => null} variant="cta">
        Test
      </BaseButton>
    );
    expect(screen.getByRole('button')).toHaveClass('base-button--cta');
  });

  test('should have outline class', () => {
    render(
      <BaseButton onClick={() => null} variant="outline">
        Test
      </BaseButton>
    );
    expect(screen.getByRole('button')).toHaveClass('base-button--outline');
  });

  test('should have text class', () => {
    render(
      <BaseButton onClick={() => null} variant="text">
        Test
      </BaseButton>
    );
    expect(screen.getByRole('button')).toHaveClass('base-button--text');
  });
});

test('should render icon', () => {
  render(
    <BaseButton onClick={() => null} Icon={<span data-testid="icon">Icon</span>}>
      Test
    </BaseButton>
  );
  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('should call onClick function', () => {
  const handleClick = jest.fn();

  render(<BaseButton onClick={handleClick}>Test</BaseButton>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toBeCalledTimes(1);
});
