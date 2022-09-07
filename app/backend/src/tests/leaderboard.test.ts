import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';
import matchesFinish from './mocks/matchesFinish';
import leaderboard from './mocks/leaderboard';
// import homeLeaderboard from './mocks/homeLeaderboard';

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
       .resolves(matchesFinish as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it(`Verifica se  a rota "/leaderboard" retorna a lista ordenada da classificação dos times`, async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');
    // ...

    expect(chaiHttpResponse.body).to.be.eql(leaderboard);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});