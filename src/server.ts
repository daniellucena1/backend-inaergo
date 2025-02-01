import express from "express";
import authRoutes from './routes/authRoute'
import adminRoutes from './routes/adminRoute'
import employeeRoutes from './routes/employeeRoute';
import managerRoutes from './routes/managerRoute';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(authRoutes, adminRoutes, employeeRoutes, managerRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
