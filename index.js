import express from "express";

// os parametros request e response sao obrigatorios pela documentacao do express
// uma recebe dados da requisicao e a outra manda a resposta
// as query params enviadas pela url vem pela request
const app = express();
app.use(express.json());

app.get("/ola", (request, response) => {
  console.log(request.query); // exibir query params
  const n = request.query.nome; // pega dentro da query a variavel chamada nome e guarda na variavel n

  // tratar erro de variavel undefined quando nao tem nada enviado na query
  if (n) {
    return response.json({ mensagem: "Bem vindo " + n });
  } else {
    return resposta.status(400).json({ erro: "Parâmetro nome é obrigatório." });
  }
});
// metodo = /ola e tipo get

//parametro de rota
// com /: na frente o express entende que é rout params
app.get("/ola/:nome", (req, res) => {
  const n = req.params.nome;
  return res.send("Hello " + n);
});

app.post("/ola", (req, res) => {
  return res.status(300).send("Seja bem vindo.");
});

app.post("/cadastro", (req, res) => {
  const b = req.body;
  return res.status(200).send(b);
});

app.listen(4000, () => {
  console.log("API rodando na porta 4000");
}); // vai fazer a api rodar
// node index.js roda o programa
// ctrl + c derruba

// nao podem existir rotas na API com o mesmo nome
//get: receber dados
//post: enviar algo para o backend
