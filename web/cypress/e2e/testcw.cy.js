it('Teste auth com token cw', () => {


    cy.request({
        method: 'POST',
        url: 'https://clinicweb-api.stag.clinicweb.linx.com.br/auth/login',
        body: {
            username: "pedro.felix",
            password: "b2cRL%&9&tYjdL"
        }
    }).then((response) => {
        expect(response.status).to.eq(200);

        const token = response.body.token;
        cy.visit('https://clinicweb.stag.clinicweb.linx.com.br/clinicweb/home.jsp', {
            onBeforeLoad(win) {
                win.localStorage.setItem('cw_api_jwt_token', token);
                // win.localStorage.setItem('nofiticationData', nofiticationData);
            }
        })
    })

});