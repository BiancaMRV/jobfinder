import express from "express"; // incluir biblioteca express

const app = express(); // gerencia as requisicoes , rotas, URLS etc

app.get("/api", (req, res) => {
  // rota principal, req = pedido feito pela pessoa, res = resposta do servidor
  console.log(req); // mensagem no terminal

  res.send("Hello World!"); // resposta da rota
});

app.listen(3000); // porta que o servidor vai rodar
console.log("Server running at http://localhost:3000/"); // mensagem no terminal
