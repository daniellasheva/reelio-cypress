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

// stub intercom requests, this doesn't work, see issue https://github.com/cypress-io/cypress/issues/442
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

  it('should navigate to Brands list', function(){
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
      .type("Test Brand")
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
      .parentsUntil('.styles__depth1___cH29P')
      .find('input')
      .first()
      .type('http://www.example.com')
    cy
      .get("div").contains("Links")
      .parentsUntil('.styles__depth1___cH29P')
      .find('input')
      .last()
      .type('https://www.youtube.com/channel/UC80plZ2umGMIvYiRHkzNDWQ')

// get file input element, convert image into a blob, insert blob into FileList, add file name, create 'change' event and dispatch
    cy
      .fixture("logo.png").as("logo")
      .get("input[type=file]").then(function($input){
      return Cypress.Blob.base64StringToBlob(this.logo, "image/png").then(function(blob){
        var jsInput = $input[0]
        jsInput.files[0] = blob
        jsInput.files[0].name = 'logo.png'
        var evt = document.createEvent("HTMLEvents")
        evt.initEvent('change', true, true)
        jsInput.dispatchEvent(evt)
      })
    })
    cy
      .get('nav')
      .find('button').contains('Crop')
      .click()
    cy
      .get('button').contains('Create Brand')
      .parent()
      .click()
    cy.title().should('include', 'Brands')
  })

  it('should navigate to Campaigns list', function(){
    cy
      .get("button").contains("Campaigns")
      .click()
    cy.title().should('include', 'Campaigns')
  })

  it('should click New Campaign', function(){
    cy
      .get("button").contains("New Campaign")
      .click()
  })

  it('should choose test brand from list', function(){
    cy
      .get("section")
      .find("button").contains("Load More")
      .parent()
      .click()
    cy
      .get("section")
      .contains("Test Brand")
      .parentsUntil('li')
      .find("button")
      .click()
  })

  it('should fill in Create Campaign form', function(){
    cy
      .contains("Campaign Name")
      .parent()
      .type("Test Campaign")
    cy
      .contains("Most Important Campaign Goal")
      .parent()
      .click()
      .get("li")
      .first()
      .click()
    cy
      .get("div[data-react-toolbox='check']")
      .first()
      .click()
    cy
      .get("div").contains("Products and Requirements")
      .parentsUntil('.styles__depth1___cH29P')
      .find('textarea')
      .first()
      .type("opportunity and requirements")
    cy
      .get("div").contains("Products and Requirements")
      .parentsUntil('.styles__depth1___cH29P')
      .find('textarea')
      .last()
      .type("product")
    cy
      .get("div").contains("Products and Requirements")
      .parentsUntil('.styles__depth1___cH29P')
      .find('input')
      .type("http://www.example.com")
    cy
      .get("div").contains("Budget")
      .parentsUntil('.styles__depth1___cH29P')
      .find('input')
      .type("10000")
    cy
      .get("div").contains("Campaign View Goal")
      .parentsUntil('.styles__depth1___cH29P')
      .find('input')
      .type("10000")
    cy
      .get("div").contains("Marketplace Listing")
      .parentsUntil('.styles__depth1___cH29P')
      .find("div[data-react-toolbox='check']")
      .click()
    cy
      .fixture("banner.jpg").as("banner")
      .get("input[type=file]").then(function($input){
      return Cypress.Blob.base64StringToBlob(this.banner, "image/jpg").then(function(blob){
        var jsInput = $input[0]
        jsInput.files[0] = blob
        jsInput.files[0].name = 'banner.jpg'
        var evt = document.createEvent("HTMLEvents")
        evt.initEvent('change', true, true)
        jsInput.dispatchEvent(evt)
      })
    })
    cy
      .get('nav')
      .find('button').contains('Crop')
      .click()
    cy
      .get("div").contains("Marketplace Listing")
      .parentsUntil('.styles__depth1___cH29P')
      .find("input[type=text]")
      .click()
    cy
      .get('nav')
      .find('button').contains('Ok')
      .click()
    cy
      .get('button').contains('Publish')
      .parent()
      .click()
  })
})
