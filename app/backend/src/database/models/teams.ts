import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id: number;
  public teamName: string;
}

Teams.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
