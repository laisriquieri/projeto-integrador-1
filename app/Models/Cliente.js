'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {

    static fillable() {
        return [ 'tipo'
                ,'nome'
                ,'cpf_cnpj'
                ,'data_nascimento'
                ,'telefone'
                ,'email'
                ,'CEP'
                ,'endereco'
                ,'numero_endereco'
                ,'complemento'
                ,'bairro'
                ,'cidade'
                ,'estado'
                ,'observacoes']
    }
}

module.exports = Cliente
