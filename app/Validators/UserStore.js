'use strict'

class UserStore {

  get validateAll() {
    return true;
  }

  get rules () {
    return {
      username: 'required|unique:users|min:3|max:80',
      email: 'required|unique:users|min:5|max:254',
      password: 'required|min:5|max:60',
    }

  }

  get messages () {
    
    return {
      min: 'Preencha no mínimo {{argument.0}} caracteres(s)', 
      max: 'Preencha no máximo {{argument.0}} caractere(s)', 
      //required: 'Campo {{field}} não pode ser vazio.',
      'username.required': 'Campo nome não pode ser vazio.', 
      'email.required': 'Campo e-mail não pode ser vazio.', 
      'password.required': 'Campo nome não pode ser vazio.', 
      'username.unique': 'Esse nome já possui cadastro!', 
      'email.unique': 'Esse email já possui cadastro!', 
    }

  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }

}

module.exports = UserStore
