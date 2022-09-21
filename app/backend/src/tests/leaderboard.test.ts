import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import leaderboardHome from './mocks/leaderboardHome';
import allTeams from './mocks/allTeams'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota GET "/leaderboard"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

   before(async () => {
    sinon
       .stub(Matches, "findAll")
       .resolves(leaderboardHome as unknown as Matches[]);
    sinon
       .stub(Teams, "findAll")
       .resolves(allTeams as unknown as Teams[]);   
  });

  after(()=>{
    sinon.restore();
  });

  it(`Verifica se  a rota "/leaderboard/home" retorna status 200`, async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');
    // ...
   // expect(chaiHttpResponse.body).to.be.eql(leaderboardHome);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});