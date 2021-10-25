'use strict'

class ProdutoUpdate {

  get validateAll() {
    return true;
  }

  get rules () {
    return {
      nome: 'required|min:3|max:100',
      descricao: 'required|min:3|max:200',
      valor_compra: 'required|min:1|number|max:10',
      valor_venda: 'required|min:1|number|max:10',
    }
    
  }

  get messages() {

    return {
      min: 'Preencha no mínimo {{argument.0}} caracteres(s)',
      max: 'Preencha no máximo {{argument.0}} caracteres(s)',
      required: 'Campo {{field}} não pode ser vazio.',
      number: 'Digite somente números',
      'nome.unique': 'Esse produto já possui cadastro!',
    }

  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }

}

module.exports = ProdutoUpdate
