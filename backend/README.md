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
Se precisar use o comando pra gerar o admin: npx ts-node src/scripts/createAdmin.ts

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

---

## Testes via Postamn/Insomnia

**Rotas Públicas (Não requerem token):**

1. **`POST /api/users` (Criar Usuário):**
   * **Método:** `POST`
   * **URL:** `http://localhost:3000/api/users`
   * **Corpo da Requisição (JSON):** Envie os dados necessários para criar um novo usuário. Isso provavelmente incluirá campos como `name`, `email`, `password`. Verifique o que o seu `UserController.create` espera.
   * **O que esperar na resposta:**
     * **Sucesso (Status 201 Created):** Uma resposta indicando que o usuário foi criado com sucesso. Pode incluir os dados do usuário criado (exceto a senha por segurança) ou uma mensagem de sucesso.
     * **Falha (Status 400 Bad Request, 409 Conflict):** Erros de validação (campos faltando, formato incorreto), ou erro se o email já estiver cadastrado (conflito). A resposta deve incluir detalhes sobre o erro.
2. **`POST /api/login` (Login do Usuário):**
   * **Método:** `POST`
   * **URL:** `http://localhost:3000/api/login`
   * **Corpo da Requisição (JSON):** Envie as credenciais do usuário para login, geralmente `email` e `password`.
   * **O que esperar na resposta:**
     * **Sucesso (Status 200 OK):** Uma resposta contendo um token JWT (geralmente em um campo como `token`). Este token será usado para acessar as rotas protegidas.
     * **Falha (Status 401 Unauthorized):** Credenciais inválidas (email ou senha incorretos). A resposta deve indicar erro de autenticação.
3. **`POST /api/forgot-password` (Recuperação de Senha):**
   * **Método:** `POST`
   * **URL:** `http://localhost:3000/api/forgot-password`
   * **Corpo da Requisição (JSON):** Geralmente requer o `email` do usuário que esqueceu a senha.
   * **O que esperar na resposta:**
     * **Sucesso (Status 200 OK):** Uma resposta indicando que um email de recuperação de senha foi enviado (mesmo que o email não exista, por segurança, muitas vezes a resposta é a mesma).
     * **Falha (Status 400 Bad Request):** Erros de validação do email.
4. **`POST /api/reset-password` (Redefinição de Senha):**
   * **Método:** `POST`
   * **URL:** `http://localhost:3000/api/reset-password`
   * **Corpo da Requisição (JSON):** Geralmente requer um `token` de redefinição (enviado por email) e a nova `password`.
   * **O que esperar na resposta:**
     * **Sucesso (Status 200 OK):** Uma resposta indicando que a senha foi redefinida com sucesso.
     * **Falha (Status 400 Bad Request, 401 Unauthorized):** Token inválido ou expirado, ou erros de validação da nova senha.
5. **`GET /api/verify-email/:token` (Verificação de Email):**
   * **Método:** `GET`
   * **URL:** `http://localhost:3000/api/verify-email/<token>` (substitua `<token>` pelo token de verificação enviado por email).
   * **Corpo da Requisição:** Geralmente não há corpo para requisições `GET`.
   * **O que esperar na resposta:**
     * **Sucesso (Status 200 OK, 302 Redirect):** Uma resposta indicando que o email foi verificado com sucesso. Pode ser uma mensagem JSON ou um redirecionamento para uma página web.
     * **Falha (Status 400 Bad Request, 404 Not Found):** Token inválido, expirado ou não encontrado.

**Rotas Protegidas (Requerem token JWT no cabeçalho `Authorization: Bearer <seu_token>`):**

Para testar essas rotas, você precisará primeiro obter um token JWT através da rota de login (`POST /api/login`).

6. **`GET /api/users` (Listar todos os usuários - Somente Admin):**
   * **Método:** `GET`
   * **URL:** `http://localhost:3000/api/users`
   * **Cabeçalho:** `Authorization: Bearer <seu_token_de_admin>` (Use o token de um usuário com a role de "admin").
   * **Corpo da Requisição:** Nenhum.
   * **O que esperar na resposta:**
     * **Sucesso (Status 200 OK):** Uma lista de todos os usuários no sistema.
     * **Falha (Status 401 Unauthorized, 403 Forbidden):** Token inválido ou ausente (401), ou o usuário autenticado não tem a role de "admin" (403).
7. **`GET /api/users/:id` (Buscar usuário por ID):**
   * **Método:** `GET`
   * **URL:** `http://localhost:3000/api/users/<id>` (substitua `<id>` pelo ID do usuário que você quer buscar).
   * **Cabeçalho:** `Authorization: Bearer <seu_token>` (Use o token de qualquer usuário autenticado).
   * **Corpo da Requisição:** Nenhum.
   * **O que esperar na resposta:**
     * **Sucesso (Status 200 OK):** Os dados do usuário com o ID especificado.
     * **Falha (Status 401 Unauthorized, 403 Forbidden, 404 Not Found):** Token inválido ou ausente (401), o usuário autenticado não tem permissão para acessar esse recurso (dependendo da sua lógica, pode ser sempre permitido para usuários logados ou ter outras restrições - 403), ou o usuário com o ID especificado não foi encontrado (404).
8. **`PUT /api/users/:id` (Atualizar usuário):**
   * **Método:** `PUT`
   * **URL:** `http://localhost:3000/api/users/<id>` (substitua `<id>` pelo ID do usuário que você quer atualizar).
   * **Cabeçalho:** `Authorization: Bearer <seu_token>` (Use o token do usuário que você quer atualizar OU um token de admin, dependendo da sua lógica de autorização).
   * **Corpo da Requisição (JSON):** Envie os dados que você quer atualizar (nome, email, senha, etc.).
   * **O que esperar na resposta:**
     * **Sucesso (Status 200 OK):** Uma resposta indicando que o usuário foi atualizado com sucesso. Pode incluir os dados do usuário atualizado.
     * **Falha (Status 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found):** Erros de validação, token inválido ou ausente, falta de permissão, ou usuário não encontrado.
9. **`DELETE /api/users/:id` (Deletar usuário - Somente Admin):**
   * **Método:** `DELETE`
   * **URL:** `http://localhost:3000/api/users/<id>` (substitua `<id>` pelo ID do usuário que você quer deletar).
   * **Cabeçalho:** `Authorization: Bearer <seu_token_de_admin>` (Use o token de um usuário com a role de "admin").
   * **Corpo da Requisição:** Nenhum.
   * **O que esperar na resposta:**
     * **Sucesso (Status 204 No Content, 200 OK):** Uma resposta indicando que o usuário foi deletado com sucesso (204 geralmente significa sucesso sem corpo na resposta).
     * **Falha (Status 401 Unauthorized, 403 Forbidden, 404 Not Found):** Token inválido ou ausente, falta de permissão (não é admin), ou usuário não encontrado.

**Dicas para Testar:**

* **Comece pelas rotas públicas:** Crie um usuário, tente fazer login e, se implementado, teste a recuperação de senha e a verificação de email.
* **Guarde o token:** Após o login bem-sucedido, copie o token JWT para usá-lo nas requisições para as rotas protegidas.
* **Teste diferentes cenários de erro:** Envie requisições com dados inválidos (por exemplo, email em formato incorreto, senhas curtas demais) para verificar se a sua API está lidando com os erros corretamente e retornando os status de erro apropriados com mensagens descritivas.
* **Verifique os status HTTP:** Os códigos de status HTTP são cruciais para entender o resultado da sua requisição.
* **Use o console do seu servidor:** Monitore os logs do seu servidor enquanto você envia as requisições pelo Postman. Isso pode fornecer informações adicionais sobre o que está acontecendo no backend.
