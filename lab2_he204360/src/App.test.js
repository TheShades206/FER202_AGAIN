import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';
import { movies } from './data/movies';

const favoritesKey = 'lab2_he204360-favorites';
const displayedTitles = () =>
  screen.getAllByRole('heading', { level: 5 }).map((heading) => heading.textContent);

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-bs-theme');
});

afterEach(() => {
  document.documentElement.removeAttribute('data-bs-theme');
});

test('shows the movie collection and its initial statistics', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /Mini Movie Manager/i })).toBeInTheDocument();
  expect(displayedTitles()).toEqual(movies.map((movie) => movie.title));

  const statistics = screen.getByRole('region', { name: 'Thống kê phim' });
  expect(statistics).toHaveTextContent(/Tổng:\s*6/);
  expect(statistics).toHaveTextContent(/Yêu thích:\s*0/);
  expect(statistics).toHaveTextContent(/Hiển thị:\s*6/);
});

test('searches immediately with trimmed, case-insensitive movie titles', () => {
  render(<App />);
  const search = screen.getByRole('searchbox', { name: 'Tìm tên phim' });

  fireEvent.change(search, { target: { value: '  iNtEr  ' } });
  expect(displayedTitles()).toEqual(['Interstellar']);
  expect(screen.getByRole('region', { name: 'Thống kê phim' })).toHaveTextContent(/Hiển thị:\s*1/);

  fireEvent.change(search, { target: { value: 'no matching movie' } });
  expect(screen.queryAllByRole('heading', { level: 5 })).toHaveLength(0);
  expect(screen.getByRole('region', { name: 'Thống kê phim' })).toHaveTextContent(/Hiển thị:\s*0/);

  fireEvent.change(search, { target: { value: '' } });
  expect(displayedTitles()).toHaveLength(6);
});

test('combines genre filtering, title searching, and rating sorting independently', () => {
  render(<App />);
  const genre = screen.getByRole('combobox', { name: 'Thể loại' });
  const sort = screen.getByRole('combobox', { name: 'Sắp xếp theo điểm' });
  const search = screen.getByRole('searchbox', { name: 'Tìm tên phim' });
  const highToLow = [...movies].sort((first, second) => second.rating - first.rating);

  fireEvent.change(sort, { target: { value: 'high' } });
  expect(displayedTitles()).toEqual(highToLow.map((movie) => movie.title));

  fireEvent.change(genre, { target: { value: 'Sci-Fi' } });
  expect(displayedTitles()).toEqual(['Interstellar']);
  fireEvent.change(search, { target: { value: 'Knight' } });
  expect(screen.queryAllByRole('heading', { level: 5 })).toHaveLength(0);

  fireEvent.change(genre, { target: { value: 'all' } });
  expect(displayedTitles()).toEqual(['The Dark Knight']);
  fireEvent.change(search, { target: { value: '' } });
  expect(displayedTitles()).toEqual(highToLow.map((movie) => movie.title));

  fireEvent.change(sort, { target: { value: 'low' } });
  expect(displayedTitles()).toEqual([...highToLow].reverse().map((movie) => movie.title));
  fireEvent.change(sort, { target: { value: 'default' } });
  expect(displayedTitles()).toEqual(movies.map((movie) => movie.title));
});

test('keeps favorite selections and statistics after remounting', async () => {
  const { unmount } = render(<App />);
  const interstellarFavorite = screen.getByRole('button', { name: 'Yêu thích Interstellar' });
  expect(interstellarFavorite).toHaveAttribute('aria-pressed', 'false');
  expect(interstellarFavorite).toHaveTextContent('Yêu thích');
  fireEvent.click(interstellarFavorite);
  fireEvent.click(screen.getByRole('button', { name: 'Yêu thích Your Name' }));

  expect(screen.getByRole('region', { name: 'Thống kê phim' })).toHaveTextContent(/Yêu thích:\s*2/);
  await waitFor(() => {
    expect(JSON.parse(localStorage.getItem(favoritesKey))).toEqual(expect.arrayContaining([1, 6]));
    expect(JSON.parse(localStorage.getItem(favoritesKey))).toHaveLength(2);
  });

  unmount();
  render(<App />);
  expect(screen.getByRole('button', { name: 'Bỏ thích Interstellar' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: 'Bỏ thích Interstellar' })).toHaveTextContent('Bỏ thích');
  expect(screen.getByRole('button', { name: 'Bỏ thích Your Name' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('region', { name: 'Thống kê phim' })).toHaveTextContent(/Yêu thích:\s*2/);

  fireEvent.click(screen.getByRole('button', { name: 'Bỏ thích Interstellar' }));
  expect(screen.getByRole('button', { name: 'Yêu thích Interstellar' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('button', { name: 'Yêu thích Interstellar' })).toHaveTextContent('Yêu thích');
  expect(screen.getByRole('region', { name: 'Thống kê phim' })).toHaveTextContent(/Yêu thích:\s*1/);
  await waitFor(() => expect(JSON.parse(localStorage.getItem(favoritesKey))).toEqual([6]));
});

test('opens movie details and closes the dialog using its footer button', async () => {
  render(<App />);
  const movie = movies[0];
  fireEvent.click(screen.getByRole('button', { name: `Chi tiết ${movie.title}` }));

  const dialog = await screen.findByRole('dialog', { name: movie.title });
  expect(dialog).toHaveTextContent(movie.director);
  expect(dialog).toHaveTextContent(String(movie.duration));
  expect(dialog).toHaveTextContent(movie.description);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Đóng', exact: true }));

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('toggles the page theme and restores the previous theme on unmount', () => {
  document.documentElement.setAttribute('data-bs-theme', 'previous-theme');
  const { unmount } = render(<App />);

  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'light');
  fireEvent.click(screen.getByRole('button', { name: '🔆 Light' }));
  expect(screen.getByRole('button', { name: '🌙 Dark' })).toBeInTheDocument();
  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'dark');
  fireEvent.click(screen.getByRole('button', { name: '🌙 Dark' }));
  expect(screen.getByRole('button', { name: '🔆 Light' })).toBeInTheDocument();
  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'light');

  unmount();
  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'previous-theme');
});

test('loads the collection safely when saved favorites contain invalid JSON', () => {
  localStorage.setItem(favoritesKey, '{invalid json');
  render(<App />);

  expect(displayedTitles()).toHaveLength(6);
  expect(screen.getByRole('region', { name: 'Thống kê phim' })).toHaveTextContent(/Yêu thích:\s*0/);
  expect(screen.getByRole('button', { name: 'Yêu thích Interstellar' })).toHaveAttribute('aria-pressed', 'false');
});
