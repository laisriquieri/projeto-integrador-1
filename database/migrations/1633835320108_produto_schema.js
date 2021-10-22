'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      //table.increments()
      table.increments('idProduto')
      table.string('nome',60).notNullable()
      table.string('descricao', 100)
      table.real('valor_compra').notNullable()
      table.real('valor_venda').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema
