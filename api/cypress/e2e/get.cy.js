describe('GET /api/users', () => {

    const heroes = [
        {
            "name": "Clark Kent",
            "email": "superman@justiceleague.com",
            "password": "krypton123"
        },
        {
            "name": "Bruce Wayne",
            "email": "batman@justiceleague.com",
            "password": "darkknight456"
        },
        {
            "name": "Diana Prince",
            "email": "wonderwoman@justiceleague.com",
            "password": "themyscira789"
        },
        {
            "name": "Barry Allen",
            "email": "flash@justiceleague.com",
            "password": "speedforce321"
        },
        {
            "name": "Arthur Curry",
            "email": "aquaman@justiceleague.com",
            "password": "atlantis654"
        }
    ]

    before(() => {
        heroes.forEach((hero) => {
            cy.task('deleteUser', hero.email);
            cy.postUser(hero);
        })
    });

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then((response => {
            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {
                const found = response.body.find((user) => user.email === hero.email);

                expect(found.name).to.eq(hero.name)
                expect(found.email).to.eq(hero.email)
                expect(found).to.have.property('id')
            })

        }))
    });
});