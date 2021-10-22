'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdemServicoSchema extends Schema {
  up () {
    this.create('ordem_servicos', (table) => {
      table.increments('Numero')
      //table.integer('idCliente').references('idCliente').intable('Clientes').onUpdate('CASCADE').onDelete('CASCADE')
      table.date('DtEntrada').notNullable()
      table.string('Equipameto', 100).notNullable()
      table.string('Relato', 255).notNullable()
      table.string('Status', 10).notNullable()
      //table.integer('idServico').references('idServico').intable('Servicos').onUpdate('CASCADE').onDelete('CASCADE')
      //table.integer('idProduto').references('idProduto').intable('Produtos').onUpdate('CASCADE').onDelete('CASCADE')
      table.real('Valor').notNullable()
      table.real('Desconto')
      table.string('ObsTecnico', 200)
      table.date('DtEntrega')
      table.string('FormaPagto', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('ordem_servicos')
  }
}

module.exports = OrdemServicoSchema
