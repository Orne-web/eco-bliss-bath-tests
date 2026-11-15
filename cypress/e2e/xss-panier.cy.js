
describe("Sécurité XSS - Panier Eco Bliss Bath", () => {
    it("doit refuser une injection HTML/JavaScript dans la quantité du panier", () => {
      const payload = "<img src=x onerror=alert('XSS_TEST')>";
  
      
    cy.loginApi().then((token) => {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("apiUrl")}/orders/add`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        product: 4,
        quantity: payload
      },
      failOnStatusCode: false,
      log: false
    
   }).then((response) => {
    expect(
        response.status,
        "L'API doit refuser une quantité contenant du HTML/JavaScript"
      ).to.eq(400);
      expect(response.body.error.quantity)
    .to.include("This value is not valid.");
    expect(JSON.stringify(response.body))
    .not.to.include(payload);
  });
  
  });
  
  
    });
  });
  