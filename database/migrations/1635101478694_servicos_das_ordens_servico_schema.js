'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicosDasOrdensServicoSchema extends Schema {
  up () {
    this.create('servicos_das_ordens_servicos', (table) => {
      table.integer('servico_id').unsigned().references('id').inTable('servicos')//.onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('ordem_servico_id').unsigned().references('id').inTable('ordem_servicos')//.onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('quantidade')
      table.decimal('valor').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('servicos_das_ordens_servicos')
  }
}

module.exports = ServicosDasOrdensServicoSchema
