'use strict'

class Relatorios {

  get validateAll() {
    return true;
  }

  get rules () {
    return {
      mes_ano: 'required',

    }

  }

  get messages () {
    
    return {
      required: 'Campo {{field}} não pode ser vazio.',
    }

  }

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }

}

module.exports = Relatorios
