import express from "express";
const app = express();
app.use(express.json());

// 1) Crie um método GET chamado [idade] que receba os parâmetros do tipo QueryParams (anonascimento e anoatual), calcule e retorne a idade.
app.get("/idade", (request, response) => {
  const anonascimento = parseInt(request.query.anonascimento);
  const anoatual = parseInt(request.query.anoatual);
  const idade = anoatual - anonascimento;
  response.json({ idade: idade });
});

// 2) Crie um método GET chamado [traduzir] que receba o parâmetro do tipo RouteParam com o nome de um fruta em português, implemente a tradução de pelo menos 10 frutas em seu código, caso a fruta informada não seja localizada retorne a seguinte mensagem [Sem tradução].

const traducaoFrutas = {
  maca: "apple",
  banana: "banana",
  laranja: "orange",
  uva: "grape",
  morango: "strawberry",
  abacaxi: "pineapple",
  limao: "lemon",
  melancia: "watermelon",
  manga: "mango",
  pera: "pear",
};

app.get("/traduzir/:fruta", (request, response) => {
  const frutaParametro = request.params.fruta;
  const frutaTraduzida = traducaoFrutas[frutaParametro];

  if (frutaTraduzida) {
    response.send(frutaTraduzida); // encontrou -> manda a tradução
  } else {
    response.send("Sem traducao"); // nao encontrou -> manda a mensagem
  }
});

/*
3) Crie um método POST chamado [validaridade] que receba um json com as seguintes informações: nome e idade.
Em sua implementação verifique se a pessoa é maior ou menor de idade, retornando uma mensagem conforme a
verificação:
 - Se for maior de idade: [NOME você é maior de idade]
 - Se for menor de idade: [NOME você é menor de idade]
*/

app.post("/validaridade", (req, res) => {
  // Assim você pega o que veio no JSON
  const nome = req.body.nome;
  const idade = req.body.idade;

  if (idade >= 18) {
    req.send(`${nome} você é maior de idade`);
  } else {
    res.send(`${nome} você é menor de idade`);
  }
});

/*
4) Crie um método GET chamado [calcularimc] que receba os parâmetros peso e altura (ambos do tipo QueryParams),
calcule o Índice de Massa Corporal (IMC) e retorne o resultado
*/

app.get("/calcularimc", (req, res) => {
  const peso = parseInt(req.query.peso);
  const altura = req.query.altura;
  const imc = 

});

app.listen(4000, () => {
  console.log("API rodando na porta 4000.");
});
