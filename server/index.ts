import express, { urlencoded } from "express"; // incluir biblioteca express
import cookieParser from "cookie-parser";
import { routers } from "./routes/authRoutes";

const app = express(); // gerencia as requisicoes , rotas, URLS etc
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  // rota principal, req = pedido feito pela pessoa, res = resposta do servidor
  console.log(req); // mensagem no terminal

  res.send("Hello World!"); // resposta da rota
});

app.use("/auth", routers);

app.listen(3000); // porta que o servidor vai rodar
console.log("Server running at http://localhost:3000/"); // mensagem no terminal
