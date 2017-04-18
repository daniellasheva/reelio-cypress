/*
Brand agent critical path
*/

describe('Brand agent', function (){
  it('should login as brand agent', function(){

// run the site locally
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

// stubbing these three with blank responses
    cy
      .server()
      .route("GET", "https://staging.reelio.com/api/v3/notifications/?limit=10", {})
    cy
      .server()
      .route("GET", "https://staging.reelio.com/api/v3/resources/status/?limit=10", {})
    cy
      .server()
      .route("GET", "https://staging.reelio.com/api/v3/campaigns/?&ordering=-latest_event_dtime&limit=10", {})
  })

  it('should navigate to brands list', function(){
    cy
      .get("button").contains("Brands")
      .as("Brands")
      .click()

    cy.title().should('include', 'Brands')
  })

  it('should click Create New', function(){
    cy
      .get("button").contains("Create New")
      .click()

// stubbing verticals and keywords with actual data
// this isn't working, though

    cy
      .server()
      .route({
        method: "GET",
        url: "https://staging.reelio.com/api/v3/annotations/?category=verticals&limit=10",
        response: "fixture:category_verticals"
      })
    cy
      .server()
      .route({
        method: "GET",
        url: "https://staging.reelio.com/api/v3/annotations/?category=keywords&limit=10",
        response: "fixture:category_keywords"
      })
  })

  it('should fill in Create Brand form', function(){
    cy
      .get("input[maxlength='50']")
      .type("brand name")
    cy
      .get("textarea")
      .type("about")
    cy
      .get("div[data-react-toolbox='check']")
      .first()
      .click()
  })

})
