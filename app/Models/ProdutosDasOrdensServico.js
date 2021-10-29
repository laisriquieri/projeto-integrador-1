'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProdutosDasOrdensServico extends Model {

    static fillable() {
    return [ 
        'produto_id',
        'ordem_servico_id',
        'quantidade',
        'valor_venda']
    }
}

module.exports = ProdutosDasOrdensServico
