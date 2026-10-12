import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from './App';

function renderPage(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </MemoryRouter>
  );
}

test('home displays four dishes and navbar navigation works', () => {
  renderPage();
  expect(screen.getByRole('heading', { name: 'Home Component' })).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(4);
  fireEvent.click(screen.getByRole('link', { name: 'About' }));
  expect(screen.getByRole('heading', { name: 'About Component' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Contact' }));
  expect(screen.getByRole('heading', { name: 'Contact Component' })).toBeInTheDocument();
});

test('user links open the correct resource and allow returning to the list', () => {
  renderPage('/users');
  expect(screen.getAllByText(/^ID:/)).toHaveLength(5);
  expect(screen.getByRole('link', { name: 'John Smith' })).toHaveAttribute('href', '/users/2');
  fireEvent.click(screen.getByRole('link', { name: 'John Smith' }));
  expect(screen.getByRole('heading', { name: 'John Smith : 30' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Back to users' }));
  fireEvent.click(screen.getByRole('link', { name: 'John Done' }));
  expect(screen.getByRole('heading', { name: 'John Done : 25' })).toBeInTheDocument();
});

test.each([
  ['/users/0', 'John Done : 25'],
  ['/users/4', 'William Davis : 34'],
  ['/users/99', 'User not found'],
  ['/users/invalid', 'User not found'],
  ['/users/01', 'User not found'],
])('direct user route %s renders %s', (path, heading) => {
  renderPage(path);
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
});

test.each([
  ['Uthappizza', '0', '$4.99', 'mains'],
  ['Zucchipakoda', '1', '$1.99', 'appetizer'],
  ['Vadonut', '2', '$1.99', 'appetizer'],
  ['ElaiCheese Cake', '3', '$2.99', 'dessert'],
])('clicking %s displays its resource details', (name, id, price, category) => {
  renderPage('/dishes');
  expect(screen.getByRole('link', { name })).toHaveAttribute('href', `/dishes/${id}`);
  fireEvent.click(screen.getByRole('link', { name }));
  expect(screen.getByRole('heading', { name })).toBeInTheDocument();
  expect(screen.getByText(price)).toBeInTheDocument();
  expect(screen.getByText(category)).toBeInTheDocument();
  expect(screen.getByRole('img', { name })).toHaveAttribute('src', expect.stringMatching(/^\/images\/.+\.png$/));
  fireEvent.click(screen.getByRole('link', { name: 'Back to dishes' }));
  expect(screen.getByRole('heading', { name: 'Dishes' })).toBeInTheDocument();
});

test('direct dish URL renders without visiting the list', () => {
  renderPage('/dishes/0');
  expect(screen.getByRole('heading', { name: 'Uthappizza' })).toBeInTheDocument();
  expect(screen.getByText('Featured')).toBeInTheDocument();
});

test.each(['/dishes/99', '/dishes/invalid'])('invalid dish route %s is handled', (path) => {
  renderPage(path);
  expect(screen.getByRole('heading', { name: 'Dish not found' })).toBeInTheDocument();
});

test('optional profile parameter works without and with an ID', () => {
  renderPage('/profile');
  expect(screen.getByRole('heading', { name: 'Profile Component' })).toBeInTheDocument();
  expect(screen.getByText('No user selected.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Profile with ID' }));
  expect(screen.getByRole('heading', { name: 'John Smith : 30' })).toBeInTheDocument();
});

test('products route remains available from exercise 20', () => {
  renderPage('/products');
  expect(screen.getByRole('heading', { name: 'Products Page' })).toBeInTheDocument();
});

test('unknown routes show a recovery link', () => {
  renderPage('/missing');
  expect(screen.getByRole('heading', { name: '404 - Page not found' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Back to home' }));
  expect(screen.getByRole('heading', { name: 'Home Component' })).toBeInTheDocument();
});
