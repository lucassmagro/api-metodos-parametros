// Importar uma ferramenta que ajuda a criar APIs
import express from "express";

// Criar a aplicação
// express() liga o motor e app é o carro
const app = express();

// Ensinar a aplicação a entender dados no formato JSON
app.use(express.json());

// É um objeto JS que funciona como um dicionario
// Ex: traducaoFrutas["maca"] = "apple"
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

// Isso cria um endereço na API, quando alguém acessar /traduzir/maca, o trecho é ativado
/*
app. get -> responde a requisições do tipo GET (consulta)
"/traduzir/:fruta" -> o :fruta é um parametro variavel, pode ser qualquer palavra
request -> o que chegou (a pergunta do usuário)
response ->m o que vai mandar de volta (a resposta)
*/

app.get("/traduzir/:fruta", (request, response) => {
  // captura o que o usuário digitou na URL
  const frutaParametro = request.params.fruta;
  // consulta o dicionário
  const frutaTraduzida = traducaoFrutas[frutaParametro];

  if (frutaTraduzida) {
    response.send(frutaTraduzida); // encontrou -> manda a tradução
  } else {
    response.send("Sem traducao"); // nao encontrou -> manda a mensagem
  }
});

// Liga o server na porta 4000
app.listen(4000, () => {
  console.log("API rodando na porta 4000.");
});
