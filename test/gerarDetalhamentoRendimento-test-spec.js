'use strict'

const chai = require('chai')
const expect = chai.expect
const main = require('../src/main')

const gerarDetalhamentoRendimento = main.gerarDetalhamentoRendimento;

// Criação de objetos de detalhamento de rendimento para testagem
const detalhamentoRendimento1 = {
    valorInicial: 389.3,
    resultadoInvestimento: '408.04',
    qtdMeses: 2,
    mes1: { resultadoAtual: '398.56', rendimentoAtual: '9.26' },
    mes2: { resultadoAtual: '408.04', rendimentoAtual: '18.74' }
  }
const detalhamentoRendimento2 = {
    valorInicial: 1000,
    resultadoInvestimento: '1020.15',
    qtdMeses: 4,
    mes1: { resultadoAtual: '1005.00', rendimentoAtual: '5.00' },
    mes2: { resultadoAtual: '1010.02', rendimentoAtual: '10.02' },
    mes3: { resultadoAtual: '1015.08', rendimentoAtual: '15.08' },
    mes4: { resultadoAtual: '1020.15', rendimentoAtual: '20.15' }
}


//Descrição dos testes
describe('gerarDetalhamentoRendimento test', function () {
  it('should return true', function () {
    expect(gerarDetalhamentoRendimento(389.30, 2, 0.02379166666666666666666666666667, '408.04')).to.eql(detalhamentoRendimento1);
  });
  it('should return true', function () {
    expect(gerarDetalhamentoRendimento(1000, 4, 0.005, '1020.15')).to.eql(detalhamentoRendimento2);
  });
})