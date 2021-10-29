'use strict'

class ProdutosDasOrdensServico {

  get validateAll() {
    return true;
  }

  get rules () {
    return {
      produto_id: 'required|min:1',
      ordem_servico_id: 'required|min:1',
      quantidade: 'required|number|min:1|max:5',
      valor_venda: 'required|min:1|number|max:9',
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

module.exports = ProdutosDasOrdensServico
