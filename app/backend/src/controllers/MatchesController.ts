import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.matchesService.getAll();

      return res.status(200).json(matches);
    } catch (err) {
      return next(err);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await this.matchesService.save(req.body);

      return res.status(201).json(create);
    } catch (err) {
      return next(err);
    }
  }

  async change(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.matchesService.change(Number(id));

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.matchesService.update(req.body, Number(id));

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
}
