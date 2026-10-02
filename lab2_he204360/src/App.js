import { Container } from "react-bootstrap";
import Header from "./component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { movies } from "./data/movies";
import SearchBar from "./component/SearchBar";
import GenreFilter from "./component/GenreFilter";
import MovieList from "./component/MovieList";
import MovieDetail from "./component/MovieDetail";
import MovieStat from "./component/MovieStat";
import useLocalStorage from "./hook/useLocalStorage";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(
    "lab2_he204360-favorites",
    [],
  );
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const keyword = search.trim().toLowerCase();
  const movieList = movies.map((movie) => ({
    ...movie,
    isFavorite: favoriteIds.includes(movie.id),
  }));

  const filteredMovies = movieList.filter((movie) => {
    const matchesGenre = genre === "all" || movie.genre === genre;
    const matchesSearch = movie.title.toLowerCase().includes(keyword);

    return matchesGenre && matchesSearch;
  });

  if (sortBy === "high") {
    filteredMovies.sort((first, second) => second.rating - first.rating);
  } else if (sortBy === "low") {
    filteredMovies.sort((first, second) => first.rating - second.rating);
  }

  const selectedMovie = movieList.find((movie) => movie.id === selectedMovieId);

  const handleToggleFavorite = (movieId) => {
    setFavoriteIds((previousIds) =>
      previousIds.includes(movieId)
        ? previousIds.filter((id) => id !== movieId)
        : [...previousIds, movieId],
    );
  };

  return (
    <ThemeProvider>
      <div className="min-vh-100 bg-body text-body py-4">
        <Container>
          <Header />

          <SearchBar search={search} onSearchChange={setSearch} />

          <GenreFilter
            genre={genre}
            sortBy={sortBy}
            onGenreChange={setGenre}
            onSortChange={setSortBy}
          />

          <MovieStat movies={movieList} visibleCount={filteredMovies.length} />

          <MovieList
            movies={filteredMovies}
            onToggleFavorite={handleToggleFavorite}
            onSelectMovie={setSelectedMovieId}
          />

          {filteredMovies.length === 0 && (
            <p className="text-center text-body-secondary mt-3">
              Không có phim phù hợp.
            </p>
          )}

          <MovieDetail
            movie={selectedMovie}
            onClose={() => setSelectedMovieId(null)}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
