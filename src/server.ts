import express from "express";
import authRoutes from './routes/authRoute'
import userRoutes from './routes/userRoute'
import employeeRoutes from './routes/employeeRoute';
import importRoutes from './routes/importRoute';
import formsRoutes from './routes/formsRoute';
import answerRoutes from './routes/answerRoute';
import dashboardRoutes from './routes/dashboardRoute';
import companyRoutes from './routes/companyRoute';
import reviewRoute from './routes/reviewRoute';
import { notFoundRoute } from './routes/notFoundRoute';
import cors from 'cors';
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(authRoutes, userRoutes, employeeRoutes, importRoutes, formsRoutes, answerRoutes, dashboardRoutes, companyRoutes, reviewRoute, notFoundRoute, errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
