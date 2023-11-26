const user = {
  name: 'Don Testme',
  username: 'root',
  password: 'sekret'
}

const blog = {
  title: 'The Ultimate Blog',
  author: 'Teh Ultimate Poaster',
  url: 'getout!'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('[data-cy="username"]')
    cy.get('[data-cy="password"]')
    cy.get('[data-cy="login"]')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-cy="username"]').type('root')
      cy.get('[data-cy="password"]').type('sekret')
      cy.get('[data-cy="login"]').click()

      cy.get('[data-cy="new blog"]')
      cy.get('[data-cy="log out"]')
      cy.contains('Don Testme logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[data-cy="username"]').type('wrongperson')
      cy.get('[data-cy="password"]').type('madeuppassword')
      cy.get('[data-cy="login"]').click()

      cy.contains('Wrong credentials')
      cy.get('[data-cy="username"]')
      cy.get('[data-cy="password"]')
      cy.get('[data-cy="login"]')

      cy.get('[data-cy="new blog"]').should('not.exist')
      cy.get('[data-cy="log out"]').should('not.exist')
      cy.contains('logged in').should('not.exist')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('[data-cy="username"]').type('root')
      cy.get('[data-cy="password"]').type('sekret')
      cy.get('[data-cy="login"]').click()
    })

    it('A blog can be created', function() {
      cy.get('[data-cy="new blog"]').click()
      cy.get('[data-cy="blog-title"]').type(blog.title)
      cy.get('[data-cy="blog-author"]').type(blog.author)
      cy.get('[data-cy="blog-url"]').type(blog.url)
      cy.get('[data-cy="submit-blog"]').click()

      cy.get('.blog')
        .contains(blog.title)
        .contains(blog.author)
    })
  })
})