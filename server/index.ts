import express, { urlencoded } from "express"; // incluir biblioteca express
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as authRouter } from "./routes/authRoutes";
import { router as applicationRouter } from "./routes/applicationRoutes";
import { router as companyRouter } from "./routes/companyRoutes";
import { router as jobRouter } from "./routes/jobOfferRoutes";
import { router as userRouter } from "./routes/userRoutes";
import { clientS3 } from "./config/s3"; // importar o cliente S3
import type { S3File } from "bun";

const app = express(); // gerencia as requisicoes , rotas, URLS etc
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // URL exata do seu frontend
    credentials: true, // Permite envio de cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use("/auth", authRouter);
app.use("/applications", applicationRouter);
app.use("/companies", companyRouter);
app.use("/jobs", jobRouter);
app.use("/users", userRouter);

app.listen(3000, "0.0.0.0"); // porta que o servidor vai rodar
console.log("Server running at http://localhost:3000/"); // mensagem no terminal

// const s3file: S3File = clientS3.file("123.json");

// await s3file.write(JSON.stringify({ name: "John", age: 30 }), {
//   type: "application/json",
// });
// const json = await s3file.json();
// console.log(json);
