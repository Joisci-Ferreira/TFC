import { Router } from 'express';
import Matches from '../database/models/matches';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import ValidationMatches from '../middlewares/ValidationMatchs';
import TokenValidate from '../middlewares/TokenValidate';

const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);
const matchesRouter = Router();

matchesRouter.get('/', async (req, res, next) => {
  await matchesController.getAll(req, res, next);
});

matchesRouter.post(
  '/',
  async (req, res, next) => {
    await TokenValidate.handle(req, res, next);
  },
  async (req, res, next) => {
    await ValidationMatches.validate(req, res, next);
  },
  async (req, res, next) => {
    await matchesController.save(req, res, next);
  },
);

matchesRouter.patch('/:id/finish', async (req, res, next) => {
  await matchesController.change(req, res, next);
});

matchesRouter.patch('/:id', async (req, res, next) => {
  await matchesController.update(req, res, next);
});

export default matchesRouter;
