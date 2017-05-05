//Creator Pitching to Marketplace

describe('Creatir', function (){
  var token
  beforeEach(function (){
// if you have a jwt, get it and save it
    if (token) {
      cy.window().then(function(win) {
        win.localStorage.setItem('jwt', token)
      })
    }
  })

  it('should login as creator', function(){
// run the site locally
    cy.visit('http://localhost:8080')
    cy.title().should('include', 'Login')
    cy
      .get("input[type='email']")
      .as("email")
      .type("tblakemarkets@gmail.com")
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

  it('should navigate to marketplace', function(){
	cy
	  .get("button").contains("Marketplace")
	  .as("Marketplace")
	  .click()

	cy.title().should('include', 'Marketplace')
  })

  it('should click on a marketplace campaign', function(){
	cy
	 .get(".styles__detailedListCard___1m778").first().click()
	//you should be on marketplace campaign
  })

  it('should pitch to the marketplace campaign', function(){
	cy
	 .get("button").contains("Pitch").click()
	//you should be on marketplace campaign
  })
 })
