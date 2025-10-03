/// <reference types="cypress" />

describe('API Testing Reqres.in', () => {
  
  const baseUrl = 'https://reqres.in/api';
  const headers = { "x-api-key": "reqres-free-v1" };

  //1. GET list users
  it('GET - List Users', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      headers
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.page).to.eq(2);
    });
  });

  //2. GET single user
  it('GET - Single User', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data.id).to.eq(2);
    });
  });

  //3. GET single user not found
  it('GET - Single User Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  //4. POST create user
  it('POST - Create User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers,
      body: {
        name: "morpheus",
        job: "leader"
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
    });
  });

  //5. PUT update user
  it('PUT - Update User', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        name: "neo",
        job: "the one"
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.job).to.eq("the one");
    });
  });

  //6. PATCH update user
  it('PATCH - Update User', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        job: "zion warrior"
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.job).to.eq("zion warrior");
    });
  });

  //7. DELETE user
  it('DELETE - User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers
    }).then((res) => {
      expect(res.status).to.eq(204);
    });
  });

  //8. POST register user success
  it('POST - Register Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers,
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol"
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
    });
  });

});