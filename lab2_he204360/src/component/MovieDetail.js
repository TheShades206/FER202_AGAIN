import { Button, Modal } from "react-bootstrap";

function MovieDetail({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  return (
    <Modal show onHide={onClose} aria-labelledby="movie-detail-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="movie-detail-title">{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <dl className="row mb-3">
          <dt className="col-sm-4">Thể loại</dt>
          <dd className="col-sm-8">{movie.genre}</dd>
          <dt className="col-sm-4">Năm phát hành</dt>
          <dd className="col-sm-8">{movie.year}</dd>
          <dt className="col-sm-4">Đạo diễn</dt>
          <dd className="col-sm-8">{movie.director}</dd>
          <dt className="col-sm-4">Thời lượng</dt>
          <dd className="col-sm-8">{movie.duration} phút</dd>
          <dt className="col-sm-4">Đánh giá</dt>
          <dd className="col-sm-8"> ⭐ {movie.rating.toFixed(1)}/10</dd>
        </dl>
        <p className="mb-0">{movie.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieDetail;
