/* global cy */

describe('HN', () => {
	it('has <title> correct', () => {
		cy.server();
		cy.route({
			method: 'GET',
			url: 'https://node-hnapi.herokuapp.com/news?page=1',
			response: []
		});
		cy.visit('/');
		cy.title().should('eq', 'preact-book-example');
	});
	it('has Top as main heading', () => {
		cy.get('h1').should('contain', 'Top');
	});
	it('has three items in the menu', () => {
		cy.get('nav > a').should($a => {
			expect($a).to.have.length(3);
			expect($a.first()).to.contain('Top');
			expect($a.eq(1)).to.contain('New');
			expect($a.eq(2)).to.contain('Best');
		});
	});
	it('navigates to new when clicked', () => {
		cy
			.get('nav')
			.contains('New')
			.click();
		cy.get('h1').should('contain', 'New');
	});
});
