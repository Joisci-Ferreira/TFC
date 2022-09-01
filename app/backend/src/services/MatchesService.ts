import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IMatches from '../interfaces/IMatches';
import IMatch from '../interfaces/IMatch';

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

  async save(match: IMatch) {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals, inProgress = true } = match;
    const result = this.matchesModel.create({
      awayTeam, awayTeamGoals, homeTeam, homeTeamGoals, inProgress,
    });

    return result;
  }

  async change(id: number) {
    const result = await this.matchesModel
      .update({ inProgress: false }, { where: { id } });

    return result;
  }

  async update(match: IMatch, id: number) {
    const result = await this.matchesModel.update(match, { where: { id } });

    return result;
  }
}
