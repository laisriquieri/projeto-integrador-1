'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {

    static fillable() {
        return [ 'id'
                ,'nome'
                ,'descricao'
                ,'preco'
                ,'valor_compra'
                ,'valor_venda']
    }
}

module.exports = Produto
