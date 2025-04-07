import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import MovieCard from '../MovieCard';
import LoadingSpinner from '../LoadingSpinner';
import ShowAlert from '../ShowAlert/ShowAlert';
import PaginationComponent from '../PaginationComponent';

function RatedMovies({ ratedMovies, fetchRatedMovies }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        await fetchRatedMovies();
        setTotalResults(ratedMovies.length);
      } catch {
        setError('Не удалось загрузить оцененные фильмы.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchRatedMovies, ratedMovies.length]);
  useEffect(() => {
    setTotalResults(ratedMovies.length);
  }, [ratedMovies]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ShowAlert message={error} type="error" />;

  return (
    <div
      style={{
        maxWidth: '1010px',
        margin: '0 auto',
      }}
    >
      <Row gutter={[16, 16]} justify="center">
        {ratedMovies.map((movie) => (
          <Col key={movie.id} xs={24} sm={24} md={24} lg={12} xl={12}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <PaginationComponent
          current={page}
          total={totalResults}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default RatedMovies;
