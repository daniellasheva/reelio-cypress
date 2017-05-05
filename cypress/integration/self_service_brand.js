describe('Self Service Brand', function (){
  var token
  beforeEach(function (){
// if you have a jwt, get it and save it
    if (token) {
      cy.window().then(function(win) {
        win.localStorage.setItem('jwt', token)
      })
    }
  })

  it('should login as self service brand', function(){
    cy.visit('http://localhost:8080')
    cy.title().should('include', 'Login')
    cy
      .get("input[type='email']")
      .as("email")
      .type("dafu@reeliolabs.com")
    cy
      .get("input[type='password']")
      .as("password")
      .type("password")
    cy
      .get("button[type='submit']")
      .click()

    cy.title().should('include', 'Campaigns')
    cy.window().then(function(win) {
      token = win.localStorage.getItem('jwt')
    })
  })

  it('should click New Campaign and select brand', function(){
    cy
      .get("button", {timeout: 6000}).contains("New Campaign", ).click()
	  .get(".styles__listText___251Z7").click()
  })

  it('should fill out campaign form', function(){
    cy
	  .get('div').contains("Da Fu's Campaign").parent().find("input").type(2)
	  .get("div").contains("Most Important Campaign Goal").parent().find("input").click()
	//select verticals
	cy
	  .get("li").contains("Views").click().click()
	  .get("div").contains("Auto/Vehicle").parent().find("label").click()
	  .get("div").contains("Education").parent().find("label").click()
	  .get("div").contains("Fitness/Health").parent().find("label").click()
	 cy
	   .get("div").contains("Describe your opportunity").parent().find("textarea")
	   .type("One you won't want to miss")
	   .get("div").contains("Describe your product").parent().find("textarea")
	   .type("I have the best product!")
	 cy
	   .get("div").contains("Enter your budget").parent().find("input")
	   .type(4300)
	   .get("button").contains("Submit").click()
   })

   it.skip('Should upload Campaign Banner', function(){
	   cy
	   	.get('button').contains('UPLOAD IMAGE').click()
	    //.fixture('images/frivolous_monkey.jpg')

   })

   it.skip('Should choose an application deadline', function(){
	 cy
	   .get("div").contains("Application Deadline").parent().find("input").click()
	   .get(".theme__month___27O28").children()
	   .get(".theme__days___3kAIy").children()
	   .get("span").contains(9).click()
	   .get("button").contains("Ok").click()
  })

  it('Should publish the campaign', function(){

  })

})
