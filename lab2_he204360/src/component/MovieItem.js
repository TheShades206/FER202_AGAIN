import { Button } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";

function MovieItem({ movie, onToggleFavorite, onSelectMovie }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 py-3 border-bottom">
      <div
        className="d-flex align-items-center gap-3 flex-grow-1"
        style={{ minWidth: 0 }}
      >
        {movie.isFavorite ? (
          <BsStarFill
            size={26}
            className="text-warning flex-shrink-0"
            aria-hidden="true"
          />
        ) : (
          <BsStar
            size={26}
            className="text-body-secondary flex-shrink-0"
            aria-hidden="true"
          />
        )}
        <div
          className="d-flex align-items-center flex-nowrap gap-3 overflow-x-auto overflow-y-hidden"
          style={{ minWidth: 0 }}
        >
          <h5 className="flex-shrink-0 text-nowrap mb-0">{movie.title}</h5>
          <p className="d-flex align-items-center flex-nowrap flex-shrink-0 gap-2 text-body-secondary text-nowrap mb-0">
            <span>{movie.genre}</span>
            <span aria-hidden="true">·</span>
            <span>{movie.year}</span>
            <span aria-hidden="true">·</span>
            <span>⭐{movie.rating.toFixed(1)}/10</span>
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Button
          type="button"
          variant={movie.isFavorite ? "warning" : "outline-warning"}
          size="sm"
          className="text-nowrap"
          aria-label={`${movie.isFavorite ? "Bỏ thích" : "Yêu thích"} ${movie.title}`}
          aria-pressed={movie.isFavorite}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {movie.isFavorite ? "Bỏ thích" : "Yêu thích"}
        </Button>
        <Button
          type="button"
          variant="outline-primary"
          size="sm"
          aria-label={`Chi tiết ${movie.title}`}
          onClick={() => onSelectMovie(movie.id)}
        >
          Chi tiết
        </Button>
      </div>
    </div>
  );
}

export default MovieItem;
