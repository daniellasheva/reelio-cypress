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

// stub segment requests
    cy
      .server()
      .route('POST', 'https://api.segment.io/**', 'fixture:segment')
// stub intercom requests
// this doesn't work
// see issue https://github.com/cypress-io/cypress/issues/442
    cy
      .server()
      .route('GET', '*//*.intercom.io/**', {})
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
    cy
      .get("input[direction='down']")
      .click()
      .get("li[class='theme__suggestion___shQpe']")
      .first()
      .click()
    cy
      .get("div").contains("Links")
      .parent()
      .find('input')
      .first()
      .type('http://www.example.com')
    cy
      .get("div").contains("Links")
      .parent()
      .find('input')
      .last()
      .type('https://www.youtube.com/channel/UC80plZ2umGMIvYiRHkzNDWQ')

    cy
      .fixture("logo.png").as("logo")
      .get("input[type=file]").then(function($input){

      // convert the logo base64 string to a blob
      return Cypress.Blob.base64StringToBlob(this.logo, "image/png").then(function(blob){

        var jsInput = $input[0]
        jsInput.files[0] = blob
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true )
        jsInput.dispatchEvent(evt)
      })
    })
  })
})
