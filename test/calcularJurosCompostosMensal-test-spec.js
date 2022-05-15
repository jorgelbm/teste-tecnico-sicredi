'use strict'

const chai = require('chai')
const expect = chai.expect
const main = require('../src/main')

const calcularJurosCompostosMensal = main.calcularJurosCompostosMensal;

//Descrição dos testes
describe('calcularJurosCompostosMensal', function () {
  it('should return true', function () {
    expect(calcularJurosCompostosMensal(523, 0.052, 7)).to.equal('745.78');
  });
  it('should return true', function () {
    expect(calcularJurosCompostosMensal(23.51, 0.0123, 18)).to.equal('29.30');
  });
  it('should return true', function () {
    expect(calcularJurosCompostosMensal(5431.95, 0.0783, 12)).to.equal('13422.43');
  });
})