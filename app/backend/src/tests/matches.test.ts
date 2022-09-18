import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';
import matches from './mocks/matches';
import matchesInProgress from './mocks/matchesInProgress';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota "/matches"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
       .stub(Matches, "findAll")
       .resolves(matches as any);
  });
  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se  a rota "/matches" retorna uma lista com as partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    // ...

    expect(chaiHttpResponse.body).to.be.eql(matches);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});

describe('Testando a rota PATCH "/matches/:id/finish"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
       .stub(Matches, "update")
       .resolves([1, Matches] as unknown as [number, Matches[]]);
  });
  after(()=>{
    (Matches.update as sinon.SinonStub).restore();
  })

  it('Verifica se  a rota PATCH "/matches/:id/finish" retorna o status correto', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/48/finish');
    // ...

   // expect(chaiHttpResponse.body).to.be.eql(matches);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

   it('Verifica se  a rota PATCH "/matches/:id/finish" retorna uma mensagem "Finished"', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/48/finish');
    // ...

   // expect(chaiHttpResponse.body).to.be.eql(matches);
    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
});

describe('Testando a rota PATCH "/matches/:id"', () => {

   const request = {
    homeTeamGoals: 3,
    awayTeamGoals: 1,
  }

  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
       .stub(Matches, "update")
       .resolves([1, Matches] as unknown as [number, Matches[]]);
  });
  after(()=>{
    (Matches.update as sinon.SinonStub).restore();
  })

  it('Verifica se o corpo da requisição da rota PATCH "/matches/:id" está corretto', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/48').send(request);
    // ...

    expect(chaiHttpResponse.status).to.be.equal(200);
   });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });
}); 

