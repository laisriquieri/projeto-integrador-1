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
      nome: 'required|min:3',
      cpf_cnpj: 'required|unique:clientes|min:3',
      data_nascimento: 'required',
      telefone: 'required|min:3',
      email: 'required|email',
      CEP: 'required|min:3',
      endereco: 'required|min:3',
      numero_endereco: 'required',
      //complemento: '',
      bairro: 'required|min:3',
      cidade: 'required|min:3',
      estado: 'required|min:2|max:2',
      //observacoes: ''
    }

  }

  get messages () {
    return {
      min: 'Preencha no mínimo {{argument.0}} caracteres(s)', 
      max: 'Preencha no máximo {{argument.0}} caractere(s)', 
      required: 'Campo {{field}} não pode ser vazio.',
      'cpf_cnpj.unique': 'Esse cliente já possui cadastro!', 
      'email.required': 'Por gentileza, insira um {{field}} válido.',
      'email.email': 'Insira um {{field}} válido.',

      //Outros exemplos:
      //min: 'Campo {{field}} precisa conter pelo menos {{argument.0}} caracteres',
      //max: 'Campo {{field}} precisa conter até {{argument.0}} caracteres',
      //'username.unique': 'Já existe alguém usando este apelido',
      //'email.unique': 'Esse email já está cadastrado.',
      //'username.required': 'Preencha o apelido.',
      //'username.email': 'Preencha o email.',
      //'password.email': 'Preencha a senha.',
    }

  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }

}

module.exports = Cliente
