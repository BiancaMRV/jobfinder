import express, { urlencoded } from "express"; // incluir biblioteca express
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as authRouter } from "./routes/authRoutes";
import { router as applicationRouter } from "./routes/applicationRoutes";
import { router as companyRouter } from "./routes/companyRoutes";
import { router as jobRouter } from "./routes/jobOfferRoutes";
import { router as userRouter } from "./routes/userRoutes";

const app = express(); // gerencia as requisicoes , rotas, URLS etc
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/", authRouter); // rota de autenticação
app.use("/", applicationRouter); // rota de aplicação
app.use("/", companyRouter); // rota de empresa
app.use("/", jobRouter); // rota de trabalho
app.use("/", userRouter); // rota de utilizador

app.listen(3000, "0.0.0.0"); // porta que o servidor vai rodar
console.log("Server running at http://localhost:3000/"); // mensagem no terminal
