import express from 'express';
import upcomingMovieModel from './upcomingModel'
const router = express.Router();

router.get('/', (req, res, next) => {
  upcomingMovieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const movie = await upcomingMovieModel.findByMovieDBId(id);
  if (movie) {
    upcomingMovieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie))
      .catch(next);
  } else {
    res.status(404).send({ message: `Unable to find movie with id: ${id}.`, status: 404 });
  }
});

router.post('/', async (req, res, next) => {
  let newMovie = req.body;
  if (newMovie && newMovie.title) {
    //Adds a random id if missing. 
    !newMovie.id ? newMovie.id = Math.round(Math.random() * 10000) : newMovie;
    await upcomingMovieModel.create(newMovie).catch(next);
    res.status(201).send(newMovie);
  } else {
    res.status(405).send({
      message: "Invalid Movie Data.",
      status: 405
    });
  }
});



export default router;