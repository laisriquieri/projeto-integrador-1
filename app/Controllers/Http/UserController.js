'use strict'

const User = use('App/Models/User');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
 
/**
   * Show a list of all usuarios.
   * GET usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */   
    async index ({ view, request }) {  
      
      const perPage = 3 // Usuários por página
      const page = await request.all().p || 1;
      const testeSearch = await request.all().search;
      const testeS = await request.all().s;
      var usuarios = "";
      var search = "";
         
      if ( !(typeof testeSearch === "undefined") && !(testeSearch == null) ) {
        var search = testeSearch.replace(/[^a-zA-Z0-9]/gi, '');
      }
      
      if ( ((typeof testeSearch === "undefined") && !(typeof testeS === "undefined")) ) {
        var search = await testeS.replace(/[^a-zA-Z0-9]/gi, '');
      } 

      var usuarios = await this.search(search, page, perPage);

      return view.render('frontend.usuarios.index',  { 
        usuarios: usuarios['rows'],
        pages:    usuarios['pages'],
        search:   search
      });
    }
  
      /**
       * Query for search.
       * GET usuarios/create
       *
       */
    async search(search, page, perPage) {
      return await User.query()
                          .where('username', 'like', '%'+search+'%')
                          .orWhere('email', 'like', '%'+search+'%')
                          .paginate(page, perPage);
    }
  
  /**
   * Render a form to be used for creating a new usuario.
   * GET usuarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('frontend.usuarios.create');
  }

  /**
   * Create/save a new usuario.
   * POST usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, session, request, response }) {
    const data = request.only(User.fillable());
    const user = await User.create(data);
    session.flash({ notification: 'Usuário cadastrado com sucesso' });
    return response.redirect('/usuarios');
  
  }

  /**
   * Display a single usuario.
   * GET usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const usuario = await User.find(params.id);
    return  view.render('frontend.usuarios.show', {usuario} )

  }

  /**
   * Render a form to update an existing usuario.
   * GET usuarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    const usuario = await User.find(params.id);
    return view.render('frontend.usuarios.edit', {usuario})

  }

  /**
   * Update usuario details.
   * PUT or PATCH usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {

    const data = request.only(User.fillable());  
    let usuario = await User.find(params.id); 
    usuario.merge(data);
    await usuario.save();

    session.flash({ notification: 'Usuário atualizado com sucesso' });
    return response.redirect(`/usuario/show/${usuario.id}`);

  }

  /**
   * Delete a usuario with id.
   * DELETE usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {

    const usuario = await User.findOrFail(params.id)
    await usuario.delete()

    session.flash({ notification: 'Usuário deletado com sucesso' });
    return response.redirect('/usuarios');

  }
}

module.exports = UserController;
