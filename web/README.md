# 🧪 Testes Automatizados com Cypress - Webdojo

Este repositório contém os testes automatizados de interface para a aplicação **Webdojo**, utilizando o framework [Cypress](https://www.cypress.io/).

## 🚀 Executando a Aplicação

A aplicação Webdojo está no mesmo repositório. Para executá-la localmente, utilize o seguinte comando:

```bash
npm run dev
```

Isso iniciará a aplicação utilizando o pacote `serve`, apontando para a pasta `dist` e rodando na porta `3000`.

---

## 🧰 Scripts de Teste

O projeto utiliza os seguintes scripts para execução dos testes com Cypress:

```json
"scripts": {
  "dev": "serve -s dist -p 3000",
  "test": "npx cypress run --config viewportWidth=1440,viewportHeight=900",
  "test:ui": "npx cypress open",
  "test:login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1440,viewportHeight=900",
  "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896"
}
```

### ✅ Detalhes:

- `test`: Executa todos os testes em modo headless.
- `test:ui`: Abre a interface gráfica do Cypress.
- `test:login`: Executa apenas o teste de login em viewport desktop.
- `test:login:mobile`: Executa apenas o teste de login em viewport mobile.

---

## 🗂️ Estrutura de Pastas

Abaixo está a estrutura das pastas principais no diretório `cypress/`:

```plaintext
cypress/
├── e2e/                       # Arquivos dos testes E2E
├── fixtures/                  # Dados mockados e arquivos de suporte
│   ├── cep.json
│   ├── consultancy.json
│   └── document.pdf
├── support/                   # Arquivos de suporte aos testes
│   ├── actions/               # Ações customizadas reutilizáveis
│   │   └── consultancy.actions.js
│   ├── commands.js            # Comandos customizados Cypress
│   ├── e2e.js                 # Setup dos testes E2E
│   └── utils.js               # Funções utilitárias
```

---

## 📦 Dependências Recomendadas

Certifique-se de instalar as dependências antes de rodar os testes:

```bash
npm install
```

---

## 💡 Observações

- O arquivo `document.pdf` na pasta `fixtures` pode ser utilizado para testes de upload ou leitura de conteúdo.
- Os arquivos `.json` servem como massa de dados para alimentar os testes automatizados.
- As ações reutilizáveis foram centralizadas na pasta `support/actions`.

---

## ✍️ Contribuição

Sinta-se livre para abrir issues ou pull requests com melhorias nos testes, novas funcionalidades ou sugestões de boas práticas!