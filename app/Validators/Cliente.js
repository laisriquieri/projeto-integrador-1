'use strict'

class Cliente {
  get validateAll() {
    return true;
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get rules () {
    return {
      //username: 'required|unique:users|min:3|max:16',    
      tipo: 'required', 
      nome: 'required',
      cpf_cnpj: 'required|unique:clientes',
      data_nascimento: 'required',
      telefone: 'required',
      email: 'required|email|unique:clientes',
      CEP: 'required',
      endereco: 'required',
      numero_endereco: 'required',
      complemento: '',
      bairro: 'required',
      cidade: 'required',
      estado: 'required',
      observacoes: 'required'
    }

  }

  get messages () {
    return {
      //'username.required': 'Preencha o apelido.',
      //'username.email': 'Preencha o email.',
      //'password.email': 'Preencha a senha.',
      'email.required': 'Por gentileza, insira um {{field}} válido.',
      'email.email': 'Por gentileza, insira um {{field}} válido: exemplo@exemplo.br .',
      //min: 'Campo {{field}} precisa conter pelo menos {{argument.0}} caracteres',
      //max: 'Campo {{field}} precisa conter até {{argument.0}} caracteres',
      //'username.unique': 'Já existe alguém usando este apelido',
      'email.unique': 'Esse email já está cadastrado.',
    }

  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }

}

module.exports = Cliente
