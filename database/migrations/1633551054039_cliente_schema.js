'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.string('tipo', 4).notNullable()
      table.string('nome', 254).notNullable()
      table.string('cpf_cnpj', 254).notNullable()
      table.date  ('data_nascimento')
      table.string('telefone', 60).notNullable()
      table.string('email', 254)
      table.string('CEP', 8)
      table.string('endereco', 50)
      table.string('numero_endereco', 10)
      table.string('complemento', 50)
      table.string('bairro', 50)
      table.string('cidade', 50)
      table.string('estado', 50)
      table.text  ('observacoes')
      table.boolean('ativo').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema
