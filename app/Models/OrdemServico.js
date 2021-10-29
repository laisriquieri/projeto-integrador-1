'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrdemServico extends Model {

    cliente () {
        return this.belongsTo('App/Models/Cliente')
    }

    static fillable() {
        return [
            'cliente_id',
            'data_entrada',
            'equipamento',
            'relato',
            'status',
            'valor_total_bruto',
            'desconto',
            'valor_total_liquido',
            'obs_tecnico',
            'data_entrega',
            'forma_pagto'
        ]
    }

    static get dates() {
        return super.dates.concat(['data_entrada', 'data_entrega'])
    }
      
    static castDates(field, value) {
        if (field === 'data_entrada') {
            return value.format('YYYY-MM-DD')
        }
        if (field === 'data_entrega') {
            return value.format('YYYY-MM-DD')
        }
    }

}

module.exports = OrdemServico