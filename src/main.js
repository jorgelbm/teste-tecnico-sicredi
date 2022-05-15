// Questão 1: Implementar um gerenciador de limite de cartão de crédito.
// - As entradas são: limite e lista de compras;
// - A saída deve ser 1 se o limite foi excedido e 0 se o limite não foi;
// - O limite é excedido quando a soma das compras é maior que o limite.

// Criacao de uma classe Compra para abstrair uma compra qualquer no valor Y de uma empresa X
class Compra{
    constructor(empresa, valor) {
        this.empresa = empresa;
        this.valor = valor;
    }
}

function isLimiteExcedido(valorDoLimite, listaDeCompras){
    const saldoAposCompras =  listaDeCompras.reduce(
                                (acumulador, compraAtual)=>{
                                    return acumulador - compraAtual.valor
                                },
                                valorDoLimite)
    
    return saldoAposCompras < 0 ? true : false;
}



// Questão 2: Calcular o rendimento da poupança de acordo com os seguintes requisitos:
// - As entradas são: valor, quantidade de meses, Taxa SELIC e Taxa Referencial
// - Se a SELIC estiver abaixo de 8.5, a poupança rende 70% da SELIC + Taxa Referencial (ao mês)
// - Se a SELIC estiver acima, a poupança rende 0.5% + Taxa Referencial (ao mês)
// - A saída deve ser o resultado do investimento (inicial + rendimento).

// Questão 3: retornar não apenas o resultado, mas retornar de forma estruturada o valor inicial, resultado final do investimento e o resultado e rendimento mês a mês.


// Calcula os juros compostos seguinda a equacao:  M = C*((1+i)^t)
// Retorna uma string com valor com arredondado para as 2 casa decimais (toFixed(2))
function calcularJurosCompostosMensal(valor, taxaDeJurosMensal, qtdMeses){
    return (valor * ((1 + taxaDeJurosMensal) ** qtdMeses)).toFixed(2);
}

// Funcao que gera os detalhamentos mes a mes de um investimento na poupança, p/ detalhes leia o readme do projeto
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

// Funcao que calcula os rendimentos de um investimento na poupança, p/ detalhes leia o readme do projeto
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


// Questão Bônus: Descrever ou escrever testes para garantir que o código funciona nos casos mais comuns (acima da SELIC, abaixo da SELIC, etc.).

exports.Compra = Compra;
exports.isLimiteExcedido = isLimiteExcedido; 
exports.calcularJurosCompostosMensal = calcularJurosCompostosMensal; 
exports.gerarDetalhamentoRendimento = gerarDetalhamentoRendimento;
exports.calcularRendimentoPoupanca = calcularRendimentoPoupanca;