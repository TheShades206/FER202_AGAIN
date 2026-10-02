function MovieStat({ movies, visibleCount }) {
  const total = movies.length;
  const favoriteCount = movies.filter((movie) => movie.isFavorite).length;

  return (
    <section aria-label="Thống kê phim" className="my-4">
      <p className="mb-0">
        Tổng: <strong>{total}</strong>{" · "}
        Yêu thích: <strong>{favoriteCount}</strong>{" · "}
        Hiển thị: <strong>{visibleCount}</strong>
      </p>
    </section>
  );
}

export default MovieStat;
