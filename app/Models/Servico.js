'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Servico extends Model {

     static fillable() {
        return [ 'tipo'
                ,'nome'
                ,'categoria'
                ,'descricao'
                ,'valor']
    }

}

module.exports = Servico
