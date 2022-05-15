# Resolução do teste técnico Desenvolvetech Sicredi 2022
Repositório contendo as soluções, em Javascript, para o teste técnico do Desenvolvetech Sicredi 2022

# Sumário
* Como fazer o projeto funcionar no seu computador
* Documentação do projeto
  - Linguagem escolhida
  - Resolução da Questão 1
  - Resolução da Questão 2 e 3
  - Resolução da Questão Bônus (Testes de código)

## Como fazer o projeto funcionar no seu computador:
* Tenha instalado:
  - Node.js
  - NPM
* Clone este projeto
* Em seguida vá para a pasta base do projeto, onde está localizado o arquivo package.json e execute:
  - npm install
* Para executar os testes, ainda na mesma pasta, execute:
  - npm test
 
 ## Documentação do projeto
 
 ### 1 - Linguagem escolhida

A linguagem escolhida para o desenvolvimento da resolução do teste técnico foi o Javascript, por conta de uma maior familiaridade com a linguagem.

### 2 - Resolução da Questão 1

Questão 1 - Implementar um gerenciador de limite de cartão de crédito.
* As entradas são: limite e lista de compras;
* A saída deve ser 1 se o limite foi excedido e 0 se o limite não foi;
* O limite é excedido quando a soma das compras é maior que o limite.

Para a resolução dessa questão, criei uma simples classe chamada Compra (contendo apenas o nome da empresa e o valor da compra), para abstração de uma compra qualquer, que pode ser vista abaixo:
```
class Compra{
    constructor(empresa, valor) {
        this.empresa = empresa;
        this.valor = valor;
    }
}
```
A partir dela, será possível criar uma lista de compras que é utilizada tanto na função como,  também, para realizar os testes mostrados no tópico 4.

Com isso feito, criei uma função “isLimiteExcedido”, que será o gerenciador de limite de cartão de crédito. A seguir são detalhados o funcionamento e o código da própria função.

Parâmetros da Função:
* valorDoLimite (Referente ao limite do cartão de crédito)
* listaDeCompras (Referente a uma lista de objetos da classe Compra)

Funcionamento:
* Cria-se uma constante (saldoAposCompras) que irá receber o valor gerado através do método reduce sobre listaDeCompras. O método reduce utiliza um acumulador que recebe como valor inicial o valorDoLimite, dessa maneira, a cada iteração sobre a listaDeCompras é subtraído do acumulador o valor da compra atual.
* Após isso, é verificado se o saldoAposCompras é menor que zero (excedeu o limite do cartão), caso positivo, retorna true, caso contrário (o limite do cartão não foi excedido) retorna false.

Método reduce:
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce 
```
function isLimiteExcedido(valorDoLimite, listaDeCompras){
    const saldoAposCompras =  listaDeCompras.reduce(
                                (acumulador, compraAtual)=>{
                                    return acumulador - compraAtual.valor
                                },
                                valorDoLimite)
   
    return saldoAposCompras < 0 ? true : false;
}
```

### 3 - Resolução da Questão 2 e 3

Questão 2 - Calcular o rendimento da poupança de acordo com os seguintes requisitos:
* As entradas são: valor, quantidade de meses, Taxa SELIC e Taxa Referencial
* Se a SELIC estiver abaixo de 8.5, a poupança rende 70% da SELIC + Taxa Referencial (ao mês)
* Se a SELIC estiver acima, a poupança rende 0.5% + Taxa Referencial (ao mês)
* A saída deve ser o resultado do investimento (inicial + rendimento).

Questão 3 - Retornar não apenas o resultado, mas retornar de forma estruturada o valor inicial resultado final do investimento e o resultado e rendimento mês a mês.

Visto que a questão 3 se trata de um incremento da questão 2, decidi reunir a resolução das duas questões em um único tópico. Sendo assim, abaixo, irei comentar sobre os detalhes da função criada para a resolução dessas duas questões.

A função que irá calcular o rendimento da poupança se chama “calcularRendimentoPoupanca”, que possui as seguintes características:

Parâmetros da Função:
* valor (Referente ao valor do investimento)
* qtdMeses (Referente a quantidade de meses do investimento)
* taxaSelic (Taxa Selic anual em porcentagem)
* taxaReferencial (Taxa Referencial mensal em porcentagem)

Funcionamento:
* Inicialmente são declaradas as variáveis resultadoInvestimento (que irá armazenar o resultado do cálculo de rendimento da poupança) e taxaDeJuros (que irá armazenar a taxa de juros a ser utilizada de acordo com a taxaSelic) e, por fim, tem-se a declaração da constante taxaSelicMensal, que armazenará a Taxa Selic mensal.
* Em seguida, verifica-se a cotação da taxa selic anual, em que:
  - Caso a taxaSelic seja menor ou igual a 8,5:
    - A taxaDeJuros será equivalente a 70% da taxaSelicMensal somados a taxaReferencial
    - E o resultadoInvestimento irá receber o retorno da função calcularJurosCompostosMensal, que será explicada mais adiante.
  - Caso a taxaSelic seja maior que 8,5:
    - A taxaDeJuros será equivalente a 0.5% somadas a taxaReferencial
    - E o resultadoInvestimento irá receber o retorno da função CalcularJurosCompostosMensal
* Por fim, a função retorna um objeto contendo o valor inicial do investimento, o resultado do investimento, a quantidade de meses de investimento e o detalhamento mês a mês que contém o resultado e rendimentos atuais de cada mês. Esse objeto é o retorno de uma outra função utilizada, chamada gerarDetalhamentoRendimento, que será explicada em seguida.
```
function calcularRendimentoPoupanca(valor, qtdMeses, taxaSelic, taxaReferencial){
    let resultadoInvestimento;
    let taxaDeJuros;
    const taxaSelicMensal = taxaSelic/12;
   
    if(taxaSelic <= 8.5){
        taxaDeJuros = (((70/100) * (taxaSelicMensal/100)) + (taxaReferencial/100));
        resultadoInvestimento = calcularJurosCompostosMensal(valor, taxaDeJuros, qtdMeses);
    }
    else{
        taxaDeJuros = ((0.5/100) + (taxaReferencial/100));
        resultadoInvestimento = calcularJurosCompostosMensal(valor, taxaDeJuros, qtdMeses);
    }
 
    return gerarDetalhamentoRendimento(valor, qtdMeses, taxaDeJuros, resultadoInvestimento);
   
}
```
Como foi visto, a função calcularRendimentoPoupanca utiliza outras duas funções auxiliares, que serão explicadas agora.

Função calcularJurosCompostosMensal:

Parâmetros:
* valor
* taxaDeJurosMensal
* qtdMeses

Funcionamento:
* Essa função retorna a string do montante do cálculo dos juros compostos seguindo a equação: M = C(1+i)^t , onde C seria “valor”, i seria “taxaDeJurosMensal” e t seria “qtdMeses”
* O valor retornado possui arredondamento para 2 casas decimais ao utilizar o método toFixed(2).
```
function calcularJurosCompostosMensal(valor, taxaDeJurosMensal, qtdMeses){
    return (valor * ((1 + taxaDeJurosMensal) ** qtdMeses)).toFixed(2);
}
```

Função gerarDetalhamentoRendimento

Parâmetros:
* valor (Referente ao valor investido)
* qtdMeses (Referente a quantidade de meses do investimento)
* taxaDeJuros (A taxa de juros mensal)
* resultadoInvestimento (Resultado do investimento calculado em calcularRendimentoPoupanca)

Funcionamento:
* Inicialmente é criado um objeto chamado detalhamentoRendimento, adicionando chaves e valores referentes ao valorInicial, resultadoInvestimento e qtdMeses.
* Em seguida, é utilizado um for loop, iterando a quantidade de meses passada no argumento, adicionando, a cada iteração, uma chave referente ao mês, que irá conter um objeto que contém o resultadoAtual e rendimentoAtual daquele mês, utilizando a função calcularJurosCompostosMensal.
* Por fim, é retornado esse objeto contendo todas as informações solicitadas de maneira estruturada.
```
function gerarDetalhamentoRendimento(valor, qtdMeses, taxaDeJuros, resultadoInvestimento){
    const detalhamentoRendimento = {
        valorInicial: valor,
        resultadoInvestimento: resultadoInvestimento,
        qtdMeses: qtdMeses
    }
 
    for(let i=1; i <= qtdMeses; i++){
        resultadoDoMes = calcularJurosCompostosMensal(valor, taxaDeJuros, i);
        detalhamentoRendimento[`mes${i}`] = {
            resultadoAtual: resultadoDoMes,
            rendimentoAtual: (resultadoDoMes - valor).toFixed(2)
        };
    }
 
    return detalhamentoRendimento;
}
```

### 4 - Resolução da Questão Bônus (Testes de código)

Foram realizados testes para todas as funções criadas para as resoluções das questões. Para isso, foram utilizadas as seguintes bibliotecas:
* Mocha  ( https://mochajs.org/ )
* Chai  ( https://www.chaijs.com/ )

Os testes utilizados podem ser encontrados na pasta tests, para executá-los, basta executar o seguinte comando na pasta base do projeto:
* npm test
