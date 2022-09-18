import { Request, Response, NextFunction } from 'express';
import Leaderboard from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { home } = req.params;
      const leaderboard = await Leaderboard.leaderboardOrder(home);

      return res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }
}
