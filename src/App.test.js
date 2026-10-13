import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app title and action buttons', () => {
  render(<App />);

  expect(screen.getByText(/Containerize And Deploy An App/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create User/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Delete All Users/i })).toBeInTheDocument();
});

test('shows the table headers for user management', () => {
  render(<App />);

  expect(screen.getByText(/Username/i)).toBeInTheDocument();
  expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
});
