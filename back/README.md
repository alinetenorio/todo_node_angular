## 🚀 Build e Execução

### ⚙️ Requisitos

- Node.js >= 16.x  
- NPM ou Yarn  
- MongoDB ou outro banco de dados (se usado)  
- Variáveis de ambiente (.env)

---

### 📆 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo

# Instale as dependências
npm install
# ou
yarn install
```

---

### 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo (ajuste conforme necessário):

```env
PORT=3000
ACCESS_TOKEN_SECRET=suaChaveSecretaJWT
```

---

### ▶️ Executar localmente

```bash
npm run dev
# ou
yarn dev
```

O servidor estará rodando em:  
👉 `http://localhost:3000`

A documentação da API estará em:  
👉 `http://localhost:3000/api-docs`

---

### 🧪 Rodar os testes

```bash
npm test
# ou
yarn test
```

Para visualizar a cobertura de testes:

```bash
npm run test:coverage
# ou
yarn test:coverage
```

---

### 🛠️ Build da aplicação

Se estiver usando TypeScript e quiser gerar os arquivos compilados:

```bash
npm run build
# ou
yarn build
```

Os arquivos compilados estarão na pasta `/dist`.

---

### ☁️ Deploy (Exemplo com Node + Express)

#### **Deploy na AWS (EC2)**

1. Acesse sua instância EC2.
2. Clone o repositório e configure o ambiente (`.env`).
3. Execute os comandos:

```bash
npm install
npm run build
npm start
```

> Você pode usar **PM2** para manter o app rodando:
```bash
npm install -g pm2
pm2 start dist/server.js
```

#### **Outras opções de deploy:**
- Vercel (para frontend)
- Render.com
- Docker + ECS (Amazon)
- Heroku