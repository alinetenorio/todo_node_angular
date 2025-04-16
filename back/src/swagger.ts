const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Tasks',
      version: '1.0.0',
      description: 'Documentação da API de usuários e tarefas',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts'], // ou .ts se você estiver usando TypeScript
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
