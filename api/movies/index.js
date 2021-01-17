import express from 'express';
import { getMovieReviews } from '../tmdb-api';
import movieModel from './movieModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

// router.get('/:id', (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (movieModel.findByMovieDBId(id)) {
//     // getMovie(id)
//     // .then((movie) => res.status(200).send(movie))
//     // .catch((error) => next(error));
//     movieModel.findByMovieDBId(id)
//       .then(movie => res.status(200).send(movie))
//       .catch((error) => next(error));
//   } else {
//     res.status(404).send({ message: `Unable to find movie with id: ${id}.`, status: 404 });
//   }

// });

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id)
  .then(movie => res.status(201).json(movie.reviews))
  .catch((error) => next(error));
});

router.get('/:id/similar', (req, res, next) => {
  const id = parseInt(req.params.id);
  getSimilarMovies(id)
  .then(similarMovies => res.status(200).send(similarMovies))
  .catch((error)=> next(error));
});


router.post('/', async (req, res, next) => {
  let newMovie = req.body;
  if (newMovie && newMovie.title) {
    //Adds a random id if missing. 
    !newMovie.id ? newMovie.id = Math.round(Math.random() * 10000) : newMovie;
    await movieModel.create(newMovie).catch(next);
    res.status(201).send(newMovie);
  } else {
    res.status(405).send({
      message: "Invalid Movie Data",
      status: 405
    });
  }
});


// router.put('/:id', (req, res) => {
//   const key = parseInt(req.params.id);
//   const updateMovie = req.body;
//   const index = moviesObject.movies.map((movie) => {
//     return movie.id;
//   }).indexOf(key);
//   if (index !== -1) {
//     !updateMovie.id ? updateMovie.id = key : updateMovie;
//     moviesObject.movies.splice(index, 1, updateMovie);
//     res.status(200).send(updateMovie);
//   } else {
//     res.status(404).send({
//       message: 'Unable to find Movie',
//       status: 404
//     });
//   }
// });


router.delete('/:id', async (req,res, next)=>{
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if(movie){
  movieModel.deleteOne({id: id}).then(res.status(200).send("delete successfully"))
  .catch(next);
  } else{
    res.status(404).send("Not find the moive to delete");
  }
});





export default router;