type team = {
  teamName: string,
};

export default interface IMatches {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?: team,
  teamAway?: team,
}
