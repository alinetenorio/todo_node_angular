import express from 'express';
import userRoutes from './routes/user.route';
import taskRoutes from './routes/task.route';
import swaggerSpec from './swagger';
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true 
  }));


app.use(express.json()); 
app.use('/', userRoutes); 
app.use('/', taskRoutes); 

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

}

export default app;