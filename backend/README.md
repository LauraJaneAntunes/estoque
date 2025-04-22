# 📦 Backend - Estoque API

API RESTful desenvolvida em Node.js com TypeScript, Prisma ORM e MySQL, seguindo o padrão de arquitetura MVC. Esta API foi criada para gerenciar produtos de um sistema de estoque.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

---

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma      # Modelos do banco de dados
│   └── migrations/        # Histórico de migrações
├── src/
│   ├── config/            # Configuração do Prisma Client
│   ├── controllers/       # Camada de controle (Express)
│   ├── models/            # Camada de modelo (opcional se usar direto o Prisma)
│   ├── routes/            # Rotas da aplicação
│   ├── services/          # Regras de negócio
│   ├── app.ts             # App Express
│   └── server.ts          # Inicialização do servidor
├── .env                   # Variáveis de ambiente (não versionado)
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/LauraJaneAntunes/estoque.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados no MySQL com o nome `estoque`.

Depois, configure o arquivo `.env`:

```env
DATABASE_URL="mysql://root@localhost:3306/estoque"
```

### 4. Crie o schema no banco com Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Rode o servidor

```bash
npm run dev
```

Servidor rodando em: `http://localhost:3000`

---

## ✨ Funcionalidades previstas

- [X] Cadastro de produtos
- [ ] Atualização de estoque
- [ ] Histórico de movimentações
- [ ] Login/autenticação com JWT
- [ ] Integração com frontend React Native

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## Lista de Commits

* `feat: adicionar endpoint de cadastro de produto`
* `fix: corrigir bug de consulta de produtos no banco`
* `docs: atualizar README com exemplos de requisições cURL`
* `style: ajustar espaçamento e remover código morto`
* `chore: configurar ESLint para o projeto`
* `refactor: melhorar a legibilidade da função de cálculo de preço`
* `test: adicionar testes para o controller de produtos`
* `perf: otimizar a consulta de produtos para maior performance`
* `ci: adicionar configuração de CI com GitHub Actions`
* `build: ajustar configurações do Webpack`
* `revert: reverter "feat: adicionar endpoint de cadastro de produto"`

---

## 🧑‍💻 Exemplos de Requisições

### **Cadastrar Produto**

**cURL**

```bash
curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome": "Produto A", "preco": 19.99, "quantidade": 100}'
```

**Postman**

- **URL**: `POST http://localhost:3000/produtos`
- **Body** (JSON):

```json
{
  "nome": "Produto A",
  "preco": 19.99,
  "quantidade": 100
}
```

### **Obter Todos os Produtos**

**cURL**

```bash
curl http://localhost:3000/produtos
```

**Postman**

- **URL**: `GET http://localhost:3000/produtos`
- **Sem body**

### **Obter Produto por ID**

**cURL**

```bash
curl http://localhost:3000/produtos/1
```

**Postman**

- **URL**: `GET http://localhost:3000/produtos/1`
- **Sem body**
