import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { Row, Input, Col } from 'antd';
import MovieCard from '../MovieCard';
import LoadingSpinner from '../LoadingSpinner';
import ShowAlert from '../ShowAlert/ShowAlert';
import PaginationComponent from '../PaginationComponent';

function Movie({ guestSessionId, handleRatingUpdate }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Запрос фильмов
  const fetchMovies = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=716129ae124d90d45aa6c2493a69e577&query=${query}&page=${page}`,
      );

      if (!response.ok) throw new Error('Ошибка загрузки данных');

      const json = await response.json();
      setMovies(json.results.slice(0, 6));
      setTotalResults(json.total_results);
    } catch {
      setError('Не удалось загрузить данные.');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
        setPage(1);
      }, 500),
    [],
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ShowAlert message={error} type="error" />;

  return (
    <div
      style={{
        maxWidth: '1010px',
        margin: '0 auto',
        backgroundColor: '#FFF',
      }}
    >
      <Input
        placeholder="Type to search..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          marginBottom: '20px',
          width: '100%',
        }}
      />
      {movies.length === 0 && query && !loading && <p>Ничего не найдено</p>}
      <Row gutter={[16, 16]} justify="center">
        {movies.map((movie) => (
          <Col
            key={movie.id}
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            style={{ margin: '0' }}
          >
            <MovieCard
              movie={movie}
              guestSessionId={guestSessionId}
              onRateSuccess={handleRatingUpdate}
            />
          </Col>
        ))}
      </Row>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <PaginationComponent
          current={page}
          total={totalResults}
          pageSize={6}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default Movie;
