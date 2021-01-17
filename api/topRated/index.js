import express from 'express';
import topRatedModel from './topRatedModel';

const router = express.Router();
 
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
    topRatedModel.find().then(topRatedMovies => res.status(200).send(topRatedMovies)).catch(next);
});



export default router;