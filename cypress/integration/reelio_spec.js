describe('Reelio Staging', function(){

	it('should visit site', function(){
		cy.visit('3.1-staging.reelio.com')
		.get('#app')
		.get('h1')
		.get('svg')
		.should('contain', 'Reelio')
	})

	it('Should log in as AM: brittany@reeliolabs.com', function(){
		cy.visit('3.1-staging.reelio.com')
		cy.get('#app')
		.get('form').find('input').first()
		.type('brittany@reeliolabs.com')
		cy.get('form').find('input').last()
		.type('password')
		.get('button').last().click()
		cy.wait(7000)
		// cy.server({
		// 	delay: 1000,
		// 	method: 'GET',
		// 	response: {}
		// })
		// .route(/campaigns/, "fixtures:campaigns.json")
		cy.get('button').contains('New Campaign').click()
	})

	it('Should click Create New Campaign', function(){
		cy.get('button').contains('New Campaign').click()
		cy.wait(4000)
		cy.find('input').first().click()
	})

})
