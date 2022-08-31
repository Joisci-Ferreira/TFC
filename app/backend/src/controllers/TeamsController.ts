import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  public teamsService: TeamsService;

  constructor(teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamsService.getAll();

      return res.status(200).json(teams);
    } catch (err) {
      return next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.teamsService.findById(id);

      return res.status(200).json(team);
    } catch (err) {
      return next(err);
    }
  }
}
