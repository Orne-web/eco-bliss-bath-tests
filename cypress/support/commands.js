Cypress.Commands.add("loginApi", () => {
    return cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: Cypress.env("testUsername"),
        password: Cypress.env("testPassword")
      },
      log: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.be.a("string").and.not.be.empty;
  
      return response.body.token;
    });
  });

Cypress.Commands.add("getProductsApi", () => {
    return cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/products`
    });
  });
  