'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosDasOrdensServicoSchema extends Schema {
  up () {
    this.create('produtos_das_ordens_servicos', (table) => {
      table.integer('produto_id').unsigned().references('id').inTable('produtos')//.onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('ordem_servico_id').unsigned().references('id').inTable('ordem_servicos')//.onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('quantidade')
      table.decimal('valor_compra').notNullable()
      table.decimal('valor_venda').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos_das_ordens_servicos')
  }
}

module.exports = ProdutosDasOrdensServicoSchema
