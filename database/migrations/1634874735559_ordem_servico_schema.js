'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdemServicoSchema extends Schema {
  up () {
    this.create('ordem_servicos', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes')//.onUpdate('CASCADE').onDelete('CASCADE')
      table.date('data_entrada').notNullable()
      table.string('equipameto', 100).notNullable()
      table.string('relato', 255).notNullable()
      table.string('status', 10).notNullable()
      table.decimal('valor_total_bruto').notNullable()
      table.float('desconto',4,4)
      table.decimal('valor_total_liquido').notNullable()
      table.string('obs_tecnico', 200)
      table.date('data_entrega')
      table.string('forma_pagto', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('ordem_servicos')
  }
}

module.exports = OrdemServicoSchema
