import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IMatches from '../interfaces/IMatches';

export default class MatchesService {
  public matchesModel: typeof Matches;

  constructor(matchesModel: typeof Matches) {
    this.matchesModel = matchesModel;
  }

  async getAll(): Promise<IMatches[]> {
    const result = this.matchesModel.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return result;
  }
}
