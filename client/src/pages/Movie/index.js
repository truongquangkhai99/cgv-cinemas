import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
import { getAllMoviesByStateAction } from '../../redux/actions/movieActions';
import { getMoviesSelector } from '../../redux/selectors/movieSelector';
import { Container, Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';

function Movie() {
  const { state } = useParams();
  const movies = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesByStateAction({ state: state }));
  }, [dispatch, state]);

  if (state !== 'now-showing' && state !== 'coming-soon') {
    return <Redirect to="/movies/now-showing" />;
  }

  return (
    <main className="flex-shrink-0">
      <Container className="w-60">
        <h1 className="text-center">
          {state === 'now-showing' ? 'Phim Đang Chiếu' : 'Phim Sắp Chiếu'}
        </h1>
        <Row md={4}>
          {movies.map((movie, i) => {
            const url = '/movies/detail/' + movie.slug;
            return (
              <Col className="d-flex align-items-end flex-column mt-3" key={i}>
                <Row className="movie-item">
                  <Link className="movie-item-link" to={url}>
                    <Image className="movie-poster" src={movie.poster} height={300} />
                    <h2 className="fw-bold fs-5 mt-2">{movie.title}</h2>
                  </Link>
                </Row>

                <Row className="mt-auto">
                  <div>
                    <span className="fw-bold mt-1">Thể loại: </span>
                    <span className="text-line">{movie.genre}</span>
                  </div>
                  <div>
                    <span className="fw-bold mt-1">Thời lượng: </span>
                    <span>{movie.running_time} phút</span>
                  </div>
                  <div>
                    <span className="fw-bold mt-1">Khởi chiếu: </span>
                    <span> {moment(movie.release_date).format('DD/MM/YYYY')}</span>
                  </div>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    </main>
  );
}

export default Movie;
