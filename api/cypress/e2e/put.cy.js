describe('PUT /api/users/:id', () => {
    context('Atualização com sucesso', () => {
        let userId //variavel receber o id do usuario cadastrado no before

        const originalUser = {
            name: 'Peter Stark',
            email: 'pitistart@ninja.com',
            password: 'p1t3r'
        }

        const updatedUser = {
            name: 'Peter Parker',
            email: 'parker@spider.com',
            password: 'sp1d3r'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email);
            cy.task('deleteUser', updatedUser.email);

            cy.postUser(originalUser).then((response) => {
                userId = response.body.user.id;
            })
        });

        it('Deve atualizar um usuário existente', () => {
            cy.putUser(userId, updatedUser).then((response) => {
                expect(response.status).to.eq(204);
            });
        });

        after(() => {
            cy.getUsers().then((response) => {
                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updatedUser.name)
                expect(spider.email).to.eq(updatedUser.email)
            });
        })
    });
    context('Campos obrigatórios', () => {
        it('O campo name deve ser obrigatório', () => {
            const user = {
                email: 'xavierprofessor@xmen.com',
                password: 'S3nha'
            }

            cy.putUser(user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Name is required!')
            })
        });

        it('O campo email deve ser obrigatório', () => {
            const user = {
                name: 'Jean Grey',
                password: 'S3nha'
            }

            cy.putUser('1', user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Email is required!')
            })
        });

        it('O campo password deve ser obrigatório', () => {
            const user = {
                name: 'Curtis',
                email: 'nigthcrowler@xmen.com'
            }

            cy.putUser('1', user).then((response) => {
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

            cy.putUser('1', user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid JSON format.')
            })
        });
    });

     context('Quando o id não existe', () => {
        let userId

         const originalUser = {
            name: 'Tony Stark',
            email: 'tony@stark.com',
            password: 'b1lionare'
        }

        const updatedUser = {
            name: 'Iron Man',
            email: 'iron@man.com',
            password: 'f1lantr0pe'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email);
            cy.task('deleteUser', updatedUser.email);

            cy.postUser(originalUser).then((response) => {
                userId = response.body.user.id
            });

            cy.task('deleteUser', originalUser.email);
        });

        it('Deve retornar 404 e user not found', () => {

            cy.putUser(userId, updatedUser).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        });
    });
});