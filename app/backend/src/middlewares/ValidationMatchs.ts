import { Request, Response, NextFunction } from 'express';
import Teams from '../database/models/teams';

export default class ValidationMatches {
  static async validate(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const home = await Teams.findByPk(homeTeam);
    const away = await Teams.findByPk(awayTeam);

    if (!home || !away) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    return next();
  }
}
