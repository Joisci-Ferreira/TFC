import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/:home', async (req, res, next) => {
  await LeaderboardController.getAll(req, res, next);
});

export default leaderboardRouter;
