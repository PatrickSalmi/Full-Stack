describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      username: 'testy',
      name: 'Testy Tester',
      password: 'password'
    }
    const user2 = {
      username: 'wrongtesty',
      name: 'Not Testy',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testy')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Testy Tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testy')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testy', password: 'password' })
      cy.createBlog({ title: 'Auto Blog', author: 'Auto Author', url: 'url.com', likes: 2 })
      cy.login({ username: 'wrongtesty', password: 'password' })
      cy.createBlog({ title: 'Another Blog', author: 'Wrong', url: 'url.com', likes: 1 })
      cy.createBlog({ title: 'Third Blog', author: 'Auto Author', url: 'url.com' })
    })
    it('A blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title-input').type('Test Blog')
      cy.get('#author-input').type('Tester')
      cy.get('#url-input').type('test.url')
      cy.get('#submit-button').click()

      cy.get('.notification')
        .should('contain', 'a new blog Test Blog by Tester added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Test Blog Tester')
    })

    it('A blog can be liked', function() {
      cy.get('#toggle-button').click()
      cy.contains('0')
      cy.get('#like-button').click()
      cy.contains('1')
    })

    it('A blog can be deleted by creator', function() {
      cy.login({ username: 'testy', password: 'password' })
      cy.contains('Auto Blog')
        .get('#toggle-button').click()
        .get('#delete-button').click()

      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true)
      })

      cy.contains('Auto Blog').should('not.exist')
    })

    it('Blogs are ordered according to likes', function() {
      cy.get('.blog').eq(0)
        .contains('Auto Blog')
      cy.get('.blog').eq(1)
        .contains('Another Blog')
      cy.get('.blog').eq(2)
        .contains('Third Blog')
    })
  })
})