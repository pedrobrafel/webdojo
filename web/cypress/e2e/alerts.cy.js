// Essa suite de teste é para conferir alertas do navegador
// Esses alertas não são HTML

describe('Validações de alertas em JavaScript', () => {
    beforeEach(() => {
        cy.loginXpress();
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    });

    it('Deve validar a mensagem de alerta', () => {
        // Alert Box é um componente do navegador
        // para simular no console digite e dê enter: alert('hello world');

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!');
        });
        // on é um listener
        // precisa ficar antes do click
        // nao é um step procedural. Eu declaro e depois clico para ação acontecer

        cy.contains('button', 'Mostrar Alert').click();
    });

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        // Confirm Box é um alerta com decisão
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!');
            return true; // True simula o clique no botão OK.
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!');
        });

        cy.contains('button', 'Mostrar Confirm').click();

    });

    it('Deve cancelar um dialogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!');
            return false; // False simula o cancelar
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!');
        })

        cy.contains('button', 'Mostrar Confirm').click();
    });

    it('Deve interagir com um prompt, inserir e validar uma mensagem', () => {
        // Prompt Box é um alerta com um input

        // A função 'window' acessa a janela do navegador
        // A função 'stub' simula o comportamento do prompt
        // .returns preenche o campo e confirma
        cy.window().then((win)=>{
            cy.stub(win, 'prompt').returns('Pedro')
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Pedro! Boas-vindas ao WebDojo!');
        })

        cy.contains('button', 'Mostrar Prompt').click();
    });
});