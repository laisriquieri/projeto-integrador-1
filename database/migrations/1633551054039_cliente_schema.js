'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      //table.increments()
      table.increments('idCliente')
      table.boolean('tipo').notNullable()
      table.string('nome', 60).notNullable()
      table.decimal('cpf_cnpj', 14).notNullable()
      table.date('DtNascimento')
      table.decimal('Telefone', 11).notNullable()
      table.string('email', 254)
      table.decimal('CEP', 8)
      table.string('endereco', 60)
      table.string('numero', 10)
      table.string('complemento', 200)
      table.string('bairro', 60)
      table.string('cidade', 60)
      table.string('estado', 50)
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
