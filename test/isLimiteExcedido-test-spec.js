'use strict'

const chai = require('chai')
const expect = chai.expect
const main = require('../src/main')
let Compra = main.Compra; // importando classe Compra

const isLimiteExcedido = main.isLimiteExcedido;

// Criacao de objetos de Compra para testar funcao isLimiteExcedido
const compra1 = new Compra("Empresa 1", 237.78);
const compra2 = new Compra("Empresa 2", 17.79);
const compra3 = new Compra("Empresa 3", 128.51);
const compra4 = new Compra("Empresa 4", 199.99);
const compra5 = new Compra("Empresa 5", 399.00);

// Criacao de um array de compras para testar funcao isLimiteExcedido
const listaDeCompras = [compra1, compra2, compra3, compra4, compra5]

//Descrição dos testes a serem realizados
describe('isLimiteExcedido test', function () {
  it('should return false', function () {
    expect(isLimiteExcedido(1000, listaDeCompras)).to.equal(false);
  });
  it('should return true', function () {
    expect(isLimiteExcedido(789.05, listaDeCompras)).to.equal(true);
  });
  it('should return false', function () {
    expect(isLimiteExcedido(983.07, listaDeCompras)).to.equal(false);
  });
  it('should return true', function () {
    expect(isLimiteExcedido(983.0, listaDeCompras)).to.equal(true);
  });
})