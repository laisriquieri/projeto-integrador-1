'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServicosDasOrdensServico extends Model {

    static fillable() {
        return [ 
            'servico_id',
            'ordem_servico_id',
            'quantidade',
            'valor']
    }
}

module.exports = ServicosDasOrdensServico