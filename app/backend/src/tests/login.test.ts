import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';
import * as jwt from 'jsonwebtoken';

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

const loginData = { email: 'admin@admin.com', password: 'secret_admin' };

describe('Testando a rota "/login"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

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

describe('Testando a rota "/login" faltando algun dado', () => {
  describe('Quando não permite o acesso sem informar o email', () => {

    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves( mock as Users);
  });

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
  })

    it('Verifica se retorna status 400', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({ password: 'secret_admin' });
//      ...
     expect(chaiHttpResponse.status).to.be.equal(400);
  });

    it('Verifica se retorna a mensagem "All fields must filled"', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({ password: 'secret_admin' });
//      ...
     expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });
});

  describe('Quando não permite o acesso sem informar a senha', () => {

    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves( mock as Users);
   });

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
   })

    it('Verifica se retorna status 400', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({ email: 'admin@admin.com' });

     expect(chaiHttpResponse.status).to.be.equal(400);
   });

    it('Verifica se retorna a mensagem "All fields must filled"', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({ email: 'admin@admin.com' });

     expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
   });
  });
});




describe('Testando a rota "GET /login/validate"', () => {
  describe('Verifica que nao tem um Token JWT', () => {

    // let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves( mock as Users);
      sinon
        .stub(jwt, "verify")
        .resolves({ email: 'admin@admin.com',
         password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' });   
  });

    after(()=>{
      sinon.restore();
  })

    it('Verifica se retorna status 200', async () => {
     const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate').set('authorization', 'sgdget');

      expect(chaiHttpResponse).to.have.status(200);

      });
  });
});

 