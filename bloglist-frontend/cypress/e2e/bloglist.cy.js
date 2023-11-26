describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Don Testme',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('[data-cy="username"]')
    cy.get('[data-cy="password"]')
    cy.get('[data-cy="login"]')
  })
})

/*const blog = {
        title: "The Ultimate Blog",
        author: "Teh Ultimate Poaster",
        url: "getout!"
      }*/