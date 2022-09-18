import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import ITeams from '../interfaces/ITeams';
import IMatches from '../interfaces/IMatches';

export interface ILeaderboardHome {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface ITeamMatch {
  team: ITeams,
  match: IMatches[],
}

export default class LeaderBrHome {
  static async getHome(casa: string) {
    const homes: ITeams[] = await Teams.findAll();
    const finishMatches: IMatches[] = await Matches.findAll({ where: { inProgress: false } });

    const defTeams = homes.reduce((acc: ITeamMatch[], home) => {
      const finishMatchesFilter = finishMatches
        .reduce((acc2: IMatches[], finishMatche) => {
          if (casa === 'home') {
            if (finishMatche.homeTeam === home.id) acc2.push(finishMatche);
          } else if (finishMatche.awayTeam === home.id) acc2.push(finishMatche);

          return acc2;
        }, []);

      acc.push({ team: home, match: finishMatchesFilter });
      return acc;
    }, []);

    return defTeams as ITeamMatch[];
  }

  // eslint-disable-next-line max-lines-per-function
  static getTotalPoints(matches: IMatches[], home: string): number {
    // eslint-disable-next-line max-lines-per-function
    const totalPoints = matches.reduce((acc, match) => {
      let count: number = acc;
      let team1;
      let team2;
      if (home === 'home') {
        team1 = match.homeTeamGoals;
        team2 = match.awayTeamGoals;
      } else {
        team2 = match.homeTeamGoals;
        team1 = match.awayTeamGoals;
      }
      switch (true) {
        case team1 > team2:
          count += 3;
          return count;
        case team1 === team2:
          count += 1;
          return count;
        case team1 < team2:
          count += 0;
          return count;
        default:
          return acc;
      }
    }, 0);

    return totalPoints;
  }

  // eslint-disable-next-line max-lines-per-function
  static getResults(matches: IMatches[], home: string): number[] {
    // eslint-disable-next-line max-lines-per-function
    const totalPoints = matches.reduce(([vitoria, empate, derrota], match) => {
      let victories = vitoria;
      let losses = derrota;
      let draw = empate;
      let team1;
      let team2;
      if (home === 'home') {
        team1 = match.homeTeamGoals;
        team2 = match.awayTeamGoals;
      } else {
        team2 = match.homeTeamGoals;
        team1 = match.awayTeamGoals;
      }
      switch (true) {
        case team1 > team2:
          victories += 1;
          return [victories, empate, derrota];
        case team1 === team2:
          draw += 1;
          return [vitoria, draw, derrota];
        case team1 < team2:
          losses += 1;
          return [vitoria, empate, losses];
        default: return [vitoria, empate, derrota];
      }
    }, [0, 0, 0]);

    return totalPoints;
  }

  static getGoals(matches: IMatches[], home: string): number[] {
    const [goalsFavor, goalsOwn] = matches.reduce(([goalsFav, goalsOw], match) => {
      let gF = goalsFav;
      let gO = goalsOw;
      if (home === 'home') {
        gF += match.homeTeamGoals;
        gO += match.awayTeamGoals;
      } else {
        gO += match.homeTeamGoals;
        gF += match.awayTeamGoals;
      }

      return [gF, gO];
    }, [0, 0]);

    return [goalsFavor, goalsOwn, goalsFavor - goalsOwn];
  }

  static getEfficiency(points: number, rounds: number) {
    return ((points / (rounds * 3)) * 100).toFixed(2);
  }

  static builderLeaderboardHome(teamsAndMatches: ITeamMatch[], home: string) {
    return teamsAndMatches.map((teamsAndMatch) => {
      const [totalVictories, totalDraws, totalLosses] = LeaderBrHome
        .getResults(teamsAndMatch.match, home);

      return {
        name: teamsAndMatch.team.teamName,
        totalPoints: LeaderBrHome.getTotalPoints(teamsAndMatch.match, home),
        totalGames: teamsAndMatch.match.length,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor: LeaderBrHome.getGoals(teamsAndMatch.match, home)[0],
        goalsOwn: LeaderBrHome.getGoals(teamsAndMatch.match, home)[1],
        goalsBalance: LeaderBrHome.getGoals(teamsAndMatch.match, home)[2],
        efficiency: Number(LeaderBrHome
          .getEfficiency(LeaderBrHome
            .getTotalPoints(teamsAndMatch.match, home), teamsAndMatch.match.length)),
      };
    });
  }

  static orderTeams(resultTeam: ILeaderboardHome[]) {
    return resultTeam.sort((defTeamA, defTeamB) => {
      if (defTeamB.totalPoints > defTeamA.totalPoints) return 1;
      if (defTeamB.totalPoints < defTeamA.totalPoints) return -1;
      if (defTeamB.totalVictories > defTeamA.totalVictories) return 1;
      if (defTeamB.totalVictories < defTeamA.totalVictories) return -1;
      if (defTeamB.goalsBalance > defTeamA.goalsBalance) return 1;
      if (defTeamB.goalsBalance < defTeamA.goalsBalance) return -1;
      if (defTeamB.goalsFavor > defTeamA.goalsFavor) return 1;
      if (defTeamB.goalsFavor < defTeamA.goalsFavor) return -1;
      if (defTeamB.goalsOwn > defTeamA.goalsOwn) return -1;
      if (defTeamB.goalsOwn < defTeamA.goalsOwn) return 1;
      return 0;
    });
  }

  static async leaderboardOrder(home: string) {
    const teamsAndMatches = await LeaderBrHome.getHome(home);
    const result = LeaderBrHome.builderLeaderboardHome(teamsAndMatches, home);
    const leaderboard = LeaderBrHome.orderTeams(result);
    return leaderboard;
  }
}
