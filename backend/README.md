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

* JWT (jsonwebtoken)
* Nodemailer
* bcrypt

---

## 📁 Estrutura do Projeto

```
backend/
├── prisma/                # Configuração do banco de dados
│   ├── schema.prisma      # Modelos do banco de dados
│   ├── migrations/        # Histórico de migrações
├── src/
│   ├── config/            # Configurações globais
│   ├── controllers/       # Camada de controle (Express)
│   ├── middlewares/       # Middlewares de autenticação e autorização
│   ├── routes/            # Rotas da aplicação
│   ├── services/          # Regras de negócio
│   ├── utils/             # Utilitários (envio de email, autenticação)
│   ├── app.ts             # Configuração do Express
│   └── server.ts          # Inicialização do servidor
├── .env                   # Variáveis de ambiente (não versionado)
├── tsconfig.json          # Configuração do TypeScript
├── package.json           # Dependências do projeto
└── README.md
```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/LauraJaneAntunes/estoque.git
cd estoque
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados no MySQL com o nome `estoque`.

Depois, configure o arquivo `.env`:

DATABASE_URL="mysql://usuario:senha@localhost:3306/estoque"
JWT_SECRET=SEU_SEGREDO_AQUI
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_app_password
PORT=3000

```env
span
```

### 4. Crie o schema no banco com Prisma

```bash
npx prisma migrate dev --name init
```
obs.: se fizer alguma alteração no schema.prisma, rode: npx prisma generate


### 5. Rode o servidor

```bash
npm run dev
```

Servidor rodando em: `http://localhost:3000`

---

## ✨ Funcionalidades previstas

- [X] Cadastro de produtos
- [X] Atualização de estoque
- [X] Histórico de movimentações
- [X] Login/autenticação com JWT
- [X] Integração com frontend React Native
- [X] Recuperação de Senha via Email
- [X] Verificação de Email ao cadastrar
- [X] Gerenciamento de Usuários (admin)

---



## 🔑 Autenticação e Segurança

A API usa **JWT** para autenticação e define middlewares para controle de acesso:

* `authenticateToken` → Garante que o usuário está autenticado
* `authorizeAdmin` → Apenas usuários admin podem acessar certas rotas
* `authorizeUser` → Apenas o próprio usuário pode acessar seus dados

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
