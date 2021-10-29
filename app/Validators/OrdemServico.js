'use strict'

class OrdemServico {

  get validateAll() {
    return true;
  }

  get rules () {
    return {
      cliente_id: 'required|min:1',
      data_entrada: 'required|date',
      equipamento: 'required|min:5|max:100',
      relato: 'required|min:2|max:255',
      status: 'required|min:2|max:20',
      valor_total_bruto: 'number|min:0|max:5',
      desconto: 'min:0|number|max:3',
      valor_total_liquido: 'number|min:1',
      obs_tecnico: 'required|min:2|max:255',
      data_entrega: 'date',
      forma_pagto: 'min:2|max:20',
    }

  }

  get messages () {
    
    return {
      min: 'Preencha no mínimo {{argument.0}} caracteres(s)', 
      max: 'Preencha no máximo {{argument.0}} caractere(s)', 
      required: 'Campo {{field}} não pode ser vazio.',
      number: 'Digite somente números',
    }

  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }

}

module.exports = OrdemServico
