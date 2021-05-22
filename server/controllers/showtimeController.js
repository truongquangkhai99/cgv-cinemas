import { Showtime, Movie } from '../models';
import moment from 'moment';

const create = async (req, res, next) => {
  try {
    const { movie_id, cinema_id, start_time, price } = req.body;

    const movie = await Movie.findByPk(movie_id);

    const end_time = moment(start_time)
      .add(movie.running_time, 'minutes')
      .format('YYYY-MM-DD HH:mm');

    const newShowtime = await Showtime.create({
      movie_id,
      cinema_id,
      start_time,
      end_time,
      price,
    });

    if (newShowtime) {
      return res.status(200).send({ message: 'Success', newShowtime });
    } else {
      return res.status(400).send({ message: 'Fail' });
    }
  } catch (error) {
    next(error);
  }
};

const getByMovieId = async (req, res, next) => {
  try {
    const { movie_id } = req.body;
    const showtimes = await Showtime.findAll({
      where: { movie_id },
      include: [
        {
          model: Movie,
          attributes: ['title'],
        },
      ],
    });
    if (showtimes) {
      //   let { start_time, end_time } = showtimes;
      //   start_time = moment(start_time).format('HH:mm A');
      //   end_time = moment(end_time).format('HH:mm A');
      return res.status(200).send({ showtimes });
    } else {
      return res.status(400).send({ error: 'Showtimes not found' });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getByMovieId };