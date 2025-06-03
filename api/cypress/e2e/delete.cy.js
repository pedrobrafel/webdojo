describe('DELETE /api/user/:id', () => {

    context('Remoção com sucesso', () => {
        let userId

        const user = {
            name: 'Bruce Banner',
            email: 'smash@hulk.com',
            password: 'hu1ksm4sh'
        }

        before(() => {
            cy.task('deleteUser', user.email);
            cy.postUser(user).then((response) => {
                userId = response.body.user.id
            })
        });

        it('Deve remover um usuário existente', () => {
            cy.deleteUser(userId).then((response) => {
                expect(response.status).to.eq(204)
            })
        });

        after(() => {
            cy.getUsers().then((response) => {
                const hulk = response.body.find(user => user.id === userId)
                expect(hulk).to.be.undefined //garante que o item foi removido
            });
        })
    });

    context('Quando o id não existe', () => {
        let userId

         const user = {
            name: 'Tony Stark',
            email: 'tony@stark.com',
            password: 'b1lionare'
        }

        before(() => {
            cy.task('deleteUser', user.email);
            cy.postUser(user).then((response) => {
                userId = response.body.user.id
            });
            cy.task('deleteUser', user.email);
        });

        it('Deve retornar 404 e user not found', () => {
            cy.deleteUser(userId).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        });
    });

});