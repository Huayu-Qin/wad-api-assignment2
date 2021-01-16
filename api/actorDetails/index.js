import express from 'express';
import actorDetailModel from './actorDetailModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  actorDetailModel.find().then(actorDetails => res.status(200).send(actorDetails)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (actorDetailModel.findByActorDetailDBId(id)) {
    actorDetailModel.findByActorDetailDBId(id)
      .then(actorDetail => res.status(200).send(actorDetail))
      .catch((error) => next(error));
  } else {
    res.status(404).catch((error) => next(error));
  }
});

export default router;