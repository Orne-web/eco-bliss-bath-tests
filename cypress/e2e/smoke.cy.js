describe("Smoke tests - Eco Bliss Bath", () => {
    it("doit afficher les éléments du formulaire de connexion", () => {
      cy.visit("http://localhost:4200");
  
      cy.contains("Connexion").click();
  
      cy.contains("Se connecter").should("be.visible");
  
      cy.contains("Email").should("be.visible");
  
      cy.contains("Mot de passe").should("be.visible");
  
      cy.get('[data-cy="login-input-username"]').should("be.visible");
  
      cy.get('input[type="password"]').should("be.visible");
    });

    it("doit afficher le bouton Ajouter au panier pour un utilisateur connecté", () => {
          cy.loginApi().then((token) => {
      
            cy.visit("/", {
                onBeforeLoad(win) {
                  win.localStorage.setItem("user", token);
                }
              });
              
              cy.visit("/#/products/4");
      
          cy.get('[data-cy="detail-product-add"]')
            .should("be.visible");
        });
      });

    it("doit afficher la disponibilité du produit", () => {
        cy.visit("/#/products/4");
      
        cy.get('[data-cy="detail-product-stock"]')
          .should("be.visible")
          .and("contain.text", "en stock");
      });
      
    it("doit afficher le champ de saisie de quantité", () => {
        cy.visit("/#/products/4");
      
        cy.get('[data-cy="detail-product-quantity"]')
          .should("be.visible")
          .and("have.attr", "type", "number");
      });

  });