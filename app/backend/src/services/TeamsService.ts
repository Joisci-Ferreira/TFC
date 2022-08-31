import Teams from '../database/models/teams';
import ITeams from '../interfaces/ITeams';

export default class TeamsService {
  public teamsModel: typeof Teams;

  constructor(teamsModel: typeof Teams) {
    this.teamsModel = teamsModel;
  }

  async getAll(): Promise<ITeams[]> {
    const result = await this.teamsModel.findAll();

    return result;
  }

  async findById(id: string): Promise<ITeams | null> {
    const team = await this.teamsModel.findByPk(id);

    return team;
  }
}
