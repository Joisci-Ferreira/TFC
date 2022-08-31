import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

describe('Testando a rota "/login"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  const loginData = { email: 'admin@admin.com', password: 'secret_admin' };

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves( mock as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se a rota "POST /login" retorna status 200', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login').send(loginData);
  //      ...
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se a rota "POST /login" retorna token', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login').send(loginData);

   expect(chaiHttpResponse.body).to.have.a.property('token')
  });

  it('Seu sub-teste', () => {
  expect(true).to.be.eq(true);
  });
}); 
