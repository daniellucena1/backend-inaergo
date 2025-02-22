import express from "express";
import authRoutes from './routes/authRoute'
import userRoutes from './routes/userRoute'
import employeeRoutes from './routes/employeeRoute';
import importRoutes from './routes/importRoute';
import formsRoutes from './routes/formsRoute';
import answerRoutes from './routes/answerRoute';
import dashboardRoutes from './routes/dashboardRoute';
import companyRoutes from './routes/companyRoute';
import { notFoundRoute } from './routes/notFoundRoute';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(authRoutes, userRoutes, employeeRoutes, importRoutes, formsRoutes, answerRoutes, dashboardRoutes, companyRoutes, notFoundRoute);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
