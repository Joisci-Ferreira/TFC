import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';
import allTeams from './mocks/allTeams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota "/teams"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
       .stub(Teams, "findAll")
       .resolves(allTeams as unknown as Teams[]);
  });
  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se  a rota "/teams" retorna a lista de todos os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    // ...

    expect(chaiHttpResponse.body).to.be.eql(allTeams);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});

describe('Testando a rota "/teams/:id"', () => {

  const team ={
    id: 2,
    teamName: "Bahia"
  }
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
       .stub(Teams, "findByPk")
       .resolves(team as unknown as Teams);
  });
  after(()=>{
    (Teams.findByPk as sinon.SinonStub).restore();
  })

  it('Verifica se  a rota "/teams/2" retorna os dados do time', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/2');
    // ...

    expect(chaiHttpResponse.body).to.be.eql(team);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});
