/*
Brand agent critical path
*/

describe('Brand agent', function (){
  var token
  beforeEach(function (){
// if you have a jwt, get it and save it
    if (token) {
      cy.window().then(function(win) {
        win.localStorage.setItem('jwt', token)
      })
    }
  })

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

// get the jwt and save it
    cy.window().then(function(win) {
      token = win.localStorage.getItem('jwt')
    })
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
