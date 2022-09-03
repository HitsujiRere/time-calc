import { render, screen } from '@testing-library/react';
import { TimeCalc } from './TimeCalc';

test('renders learn react link', () => {
  render(<TimeCalc />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
