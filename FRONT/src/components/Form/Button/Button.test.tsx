import { render, screen } from '@testing-library/react';
import Button from './Button';

test('Render Button', () => {
  render(<Button>Test</Button>);
  const element = screen.getByText('Test');
  expect(element).toBeInTheDocument();
});