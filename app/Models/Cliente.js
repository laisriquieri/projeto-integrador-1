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
                ,'cep'
                ,'endereco'
                ,'numero_endereco'
                ,'complemento'
                ,'bairro'
                ,'cidade'
                ,'estado'
                ,'observacoes']
    }

    static get dates() {
        return super.dates.concat(['data_nascimento'])
    }
      
    static castDates(field, value) {
        if (field === 'data_nascimento') {
            return value.format('YYYY-MM-DD')
        }
    }
}

module.exports = Cliente
