'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicoSchema extends Schema {
  up () {
    this.create('servicos', (table) => {
      table.increments('idServico')
      table.string('Nome', 45).notNullable()
      table.string('Categoria', 45).notNullable()
      table.real('Valor').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('servicos')
  }
}

module.exports = ServicoSchema
