describe('Brand agent', function (){
  it('should login as brand agent', function(){
    cy.visit('http://localhost:8080')
    cy.title().should('include', 'Login')
    cy
      .get("input[type='email']")
      .as("email")
      .type("reeliotestagent@gmail.com")
    cy
      .get("input[type='password']")
      .as("password")
      .type("password")
    cy
      .get("button[type='submit']")
      .click()
    cy.title().should('include', 'Campaigns')

    cy
      .server()
      .route({
        method: "GET",
        url: "https://staging.reelio.com/api/v3/notifications/?limit=10",
        response: "fixture:enterprises_me"
      })
    cy
      .server()
      .route({
        method: "GET",
        url: "https://staging.reelio.com/api/v3/resources/status/?limit=10",
        response: "fixture:resources_status"
      })
  })

  it.skip('should navigate to brands list', function(){
    cy
      .get("button").contains("Brands")
      .as("Brands")
      .click()
  })

})
