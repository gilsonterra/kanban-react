import { render, screen } from '@testing-library/react';
import Input from './Input';

test('Render Input', () => {
  render(<Input defaultValue="Test" />);
  const element = screen.getByDisplayValue('Test');
  expect(element).toBeInTheDocument();
});