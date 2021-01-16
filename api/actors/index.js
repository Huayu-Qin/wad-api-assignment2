import express from 'express';
import actorModel from './actorModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  actorModel.find().then(actors => res.status(200).send(actors)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (actorModel.findByActorDBId(id)) {
    actorModel.findByActorDBId(id)
      .then(actor => res.status(200).send(actor))
      .catch((error) => next(error));
  } else {
    res.status(404).catch((error) => next(error));
  }
});

export default router;