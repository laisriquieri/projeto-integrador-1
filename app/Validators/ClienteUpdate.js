'use strict'

class ClienteUpdate {
 
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
      tipo: 'required|min:2|max:2', 
      nome: 'required|min:3|max:254',
      cpf_cnpj: 'required|min:3|max:14|number',
      data_nascimento: 'required|date',
      telefone: 'required|min:10|number|max:11',
      email: 'required|email|min:5|max:254',
      cep: 'required|min:3|max:8|number',
      endereco: 'required|min:3|max:250',
      numero_endereco: 'required|number|max:10',
      //complemento: '',
      bairro: 'required|min:3|max:60',
      cidade: 'required|min:3|max:60',
      estado: 'required|min:2|max:2',
      //observacoes: ''
    }

  }

  get messages () {
    return {
      min: 'Preencha no mínimo {{argument.0}} caracteres(s)', 
      max: 'Preencha no máximo {{argument.0}} caractere(s)', 
      required: 'Campo {{field}} não pode ser vazio.',
      number: 'Digite somente números',
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

module.exports = ClienteUpdate
