// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByTestId('app')
//   expect(linkElement).toBeInTheDocument();
// });

// test('renders search input', () => {
//   render(<App />);
//   const searchInput = screen.getByPlaceholderText('Search Gists for the username');
//   expect(searchInput).toBeInTheDocument();
// });

// test('allows input to be typed into search', () => {
//   render(<App />);
//   const searchInput = screen.getByPlaceholderText('Search Gists for the username');
  
//   userEvent.type(searchInput, 'westc');

//   expect(searchInput).toHaveValue('westc');
// });

// test('makes API call on search', async () => {
//   render(<App />);
//   const searchInput = screen.getByPlaceholderText('Search Gists for the username');
//   userEvent.type(searchInput, 'westc');
// });
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders header and gist list', async () => {
  render(<App />);

  // Wait for the public gists to load
  await waitFor(() => screen.getByTestId('gist-list'));

  // Check if the header is rendered
  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();

  // Check if the gist list is rendered
  const gistListElement = screen.getByTestId('gist-list');
  expect(gistListElement).toBeInTheDocument();
});

test('loads and displays public gists', async () => {
  render(<App />);

  // Wait for the public gists to load
  await waitFor(() => screen.getByTestId('gist-list'));

  // Check if public gists are displayed
  const gistItems = screen.getAllByTestId('gist-item');
  expect(gistItems.length).toBeGreaterThan(0);
});

test('loads user-specific gists when searched', async () => {
  render(<App />);

  // Wait for the public gists to load
  await waitFor(() => screen.getByTestId('gist-list'));

  // Search for user-specific gists
  const searchInput = screen.getByPlaceholderText('Search by username');
  fireEvent.change(searchInput, { target: { value: 'exampleUser' } });

  // Click the search button
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);

  // Wait for the user-specific gists to load
  await waitFor(() => screen.getByTestId('gist-list'));

  // Check if user-specific gists are displayed
  const gistItems = screen.getAllByTestId('gist-item');
  expect(gistItems.length).toBeGreaterThan(0);
});

