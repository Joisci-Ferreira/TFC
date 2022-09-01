import { Router } from 'express';
import Matches from '../database/models/matches';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);
const matchesRouter = Router();

matchesRouter.get('/', async (req, res, next) => {
  await matchesController.getAll(req, res, next);
});

export default matchesRouter;
