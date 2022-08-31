import { Router } from 'express';
import Teams from '../database/models/teams';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const teamsService = new TeamsService(Teams);
const teamsController = new TeamsController(teamsService);

const teamsRouter = Router();

teamsRouter.get('/', async (req, res, next) => {
  await teamsController.getAll(req, res, next);
});

teamsRouter.get('/:id', async (req, res, next) => {
  await teamsController.findById(req, res, next);
});

export default teamsRouter;
