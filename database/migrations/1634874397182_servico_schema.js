'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicoSchema extends Schema {
  up () {
    this.create('servicos', (table) => {
      table.increments()
      table.string('nome', 45).notNullable()
      table.string('categoria', 45).notNullable()
      table.decimal('valor').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('servicos')
  }
}

module.exports = ServicoSchema
