//https://howtocode.io/adonis-js-5-user-authentication/

'use strict';

class LoginController {

  index({ view }) {
    return view.render('frontend.login.index');
  }

  async store({ auth, request, response, session }) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
    } catch (e) {
      session.flashExcept(['password']);

      session.flash({
        notification: 'Não localizemos um usuário com as credenciais informadas.',
      });

      return response.redirect('login');
    }

    //session.flash({ notification: 'Login efetuado com sucesso.}}' });
    return response.redirect('/');
  }

    async delete({ auth, response, session }) {
    await auth.logout();
    session.flash({ notification: 'Logout efetuado com sucesso' });

    return response.redirect('/login');
  }
}

module.exports = LoginController;
