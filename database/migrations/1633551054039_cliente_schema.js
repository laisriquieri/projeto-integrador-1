'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.string('tipo',2).notNullable()
      table.string('nome', 254).notNullable()
      table.string('cpf_cnpj', 14).notNullable()
      table.date('data_nascimento')
      table.string('telefone', 11).notNullable()
      table.string('email', 254)
      table.string('cep', 8)
      table.string('endereco', 250)
      table.integer('numero_endereco', 10)
      table.string('complemento', 200)
      table.string('bairro', 60)
      table.string('cidade', 60)
      table.string('estado', 2)
      table.string('observacoes', 200)
      table.boolean('ativo').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClienteSchema