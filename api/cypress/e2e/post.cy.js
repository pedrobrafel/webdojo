describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {
    const user = {
      name: 'Logan',
      email: 'wolverine@xmen.com',
      password: 'S3nha'
    }

    // Remover o cadastro antes do teste
    cy.task('deleteUser', user.email);

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Usuário cadastrado com sucesso!')
      expect(response.body.user.id).to.match(/^[-]?\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })
  });

  it('Não deve cadastrar um usuário com e-mail duplicado', () => {
    const user = {
      name: 'Scott',
      email: 'cyclops@xmen.com',
      password: 'S3nha'
    }

    cy.task('deleteUser', user.email);

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Email already registered!')
    })
  });

  it('O campo name deve ser obrigatório', () => {
    const user = {
      email: 'xavierprofessor@xmen.com',
      password: 'S3nha'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Name is required!')
    })
  });

  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Jean Grey',
      password: 'S3nha'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Email is required!')
    })
  });

  it('O campo password deve ser obrigatório', () => {
    const user = {
      name: 'Curtis',
      email: 'nigthcrowler@xmen.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Password is required!')
    })
  });

  it('Não deve prosseguir quando o JSON for mal formatado', () => {

    const user = `{
      name: 'Magneto',
      email: 'testemiddleware@ninja.com.br
      password: 'pwd123'
    }`

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format.')
    })
  });

})

