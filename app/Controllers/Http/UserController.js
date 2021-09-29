//https://howtocode.io/adonis-js-5-user-authentication/

'use strict';

const User = use('App/Models/User');

class UserController {
  
  create({ view }) {
    return view.render('frontend.register');
  }


  async store({ auth, session, request, response }) {
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);

    session.flash({ notification: 'User created successfully' });

    return response.redirect('/');
  }

}

module.exports = UserController;
