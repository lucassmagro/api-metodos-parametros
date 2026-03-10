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
    res.send(`${nome} você é maior de idade`);
  } else {
    res.send(`${nome} você é menor de idade`);
  }
});

/*
4) Crie um método GET chamado [calcularimc] que receba os parâmetros peso e altura (ambos do tipo QueryParams),
calcule o Índice de Massa Corporal (IMC) e retorne o resultado
*/

app.get("/calcularimc", (req, res) => {
  const peso = parseFloat(req.query.peso);
  const altura = parseFloat(req.query.altura);
  const imc = peso / (altura * altura);

  res.send(`O IMC é ${imc}`);
});

/*
5) Crie um método POST chamado [calcularmedia] que receba um JSON com uma lista de números e retorne a média
desses números.
*/

app.post("/calcularmedia", (req, res) => {
  const numeros = req.body.numeros;
  let soma = 0;

  for (let numero of numeros) {
    soma = soma + numero;
  }

  const media = soma / numeros.length;

  res.send(`A media e ${media}.`);
});

/*
6) Crie um método GET chamado [calculararea] que receba os parâmetros base e altura (ambos do tipo RouteParams)
e calcule a área de um retângulo.
*/

app.get("/calculararea/:base/:altura", (req, res) => {
  const base = parseFloat(req.params.base);
  const altura = parseFloat(req.params.altura);

  const areaRetangulo = base * altura;

  res.send(`A area do retangulo e ${areaRetangulo}.`);
});

/*
7) Crie um método POST| chamado [convertermoeda] que receba os parâmetros valor, moedaOrigem e moedaDestino
(todos em json com BodyParams) e realize a conversão da moeda de origem para a moeda de destino. Utilize taxas de câmbio fictícias.
*/

app.post("/convertermoeda", (req, res) => {
  const valor = req.body.valor;
  const moedaOrigem = req.body.moedaOrigem;
  const moedaDestino = req.body.moedaDestino;

  const taxas = {
    BRL: 0.2,
    USD: 1.0,
    EUR: 1.1,
  };

  const valorBase = valor / taxas[moedaOrigem];
  const valorFinal = valorBase * taxas[moedaDestino];

  res.send(`Valor convertido: ${valorFinal.toFixed(2)} ${moedaDestino}`);
});

/*
8) Crie um método POST chamado [calcularfrete] que receba um JSON com as informações do pedido (peso,
distância, tipo de entrega) e calcule o valor do frete. Você deve escolher qual o valor cobrado por kg e por km para
considerar no cálculo. Considere valores diferentes para cada tipo de entrega (normal ou rápida).
*/

app.post("/calcularfrete", (req, res) => {
  const peso = req.body.peso;
  const distancia = req.body.distancia;
  const tipoEntrega = req.body.tipoEntrega;

  const taxas = {
    normal: { porKg: 2.0, porKm: 0.5 },
    rapida: { porKg: 4.0, porKm: 1.0 },
  };

  const taxaEscolhida = taxas[tipoEntrega];
  const frete = peso * taxaEscolhida.porKg + distancia * taxaEscolhida.porKm;

  res.send(`O valor do frete é R$ ${frete.toFixed(2)}`);
});

/*
9) Crie um método GET chamado [autenticarusuario] que receba os parâmetros usuario e senha através do
HeaderParams. Implemente um sistema de autenticação simples (por exemplo, comparando com um conjunto fixo de
credenciais) e retorne uma mensagem indicando se a autenticação foi bem-sucedida ou falhou.
*/

app.get("/autenticarusuario", (req, res) => {
  const usuario = req.headers.usuario;
  const senha = req.headers.senha;

  const credenciais = {
    usuario: "admin",
    senha: "1234",
  };

  if (usuario == credenciais.usuario && senha == credenciais.senha) {
    res.send("Atenticacao realizada com sucesso!");
  } else {
    res.send("Autenticacao falhou!");
  }
});

/*
10) Crie um método GET chamado [verificarmes] que receba o parâmetro ms numérico de 1 a 12 através do
HeaderParams. Retorne o mês escrito por extenso.
*/

app.get("/verificarmes", (req, res) => {
  const ms = req.headers.ms;
  const meses = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };
  const mesPorExtenso = meses[ms];

  if (mesPorExtenso) {
    res.send(`O mes e: ${mesPorExtenso}`);
  } else {
    res.send("Mês inválido!");
  }
});

/*
11) Crie um método POST chamado [calculartotal] que receba um json com uma lista de produtos: nome, valorunitario, quantidade. 
Implemente o cálculo do valor total de toda a lista de produtos. Exemplo de json:
[
  {"nome": "Produto A", "quantidade": 2, "valorunitario": 1.5},
  {"nome": "Produto B", "quantidade": 8, "valorunitario": 6.2}
]
*/

app.post("/calculartotal", (req, res) => {
  const produtos = req.body; // pega a lista inteira
  let total = 0;

  for (let produto of produtos) {
    const subtotal = produto.quantidade * produto.valorunitario;

    total = total + subtotal; // dentro do for
  }

  res.send(`O valor total é R$ ${total.toFixed(2)}`);
});

app.listen(4000, () => {
  console.log("API rodando na porta 4000.");
});
