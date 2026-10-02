import MovieItem from "./MovieItem";

function MovieList({ movies, onToggleFavorite, onSelectMovie }) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;
