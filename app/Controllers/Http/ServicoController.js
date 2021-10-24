'use strict'

const Servico = use('App/Models/Servico');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicos
 */
class ServicoController {
 
/**
   * Show a list of all servicos.
   * GET servicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */   
    async index ({ view, request }) {  
      
      const perPage = 3 // Servicos por página
      const page = await request.all().p || 1;
      const testeSearch = await request.all().search;
      const testeS = await request.all().s;
      var servicos = "";
      var search = "";
         
      if ( !(typeof testeSearch === "undefined") && !(testeSearch == null) ) {
        var search = testeSearch.replace(/[^a-zA-Z0-9]/gi, '');
      }
      
      if ( ((typeof testeSearch === "undefined") && !(typeof testeS === "undefined")) ) {
        var search = await testeS.replace(/[^a-zA-Z0-9]/gi, '');
      } 

      var servicos = await this.search(search, page, perPage);

      return view.render('frontend.servicos.index',  { 
        servicos: servicos['rows'],
        pages:    servicos['pages'],
        search:   search
      });
    }
  
      /**
       * Query for search.
       * GET servicos/create
       *
       */
    async search(search, page, perPage) {
      return await Servico.query()
                          .where('nome', 'like', '%'+search+'%')
                          .orWhere('categoria', 'like', '%'+search+'%')
                          .orWhere('descricao', 'like', '%'+search+'%')
                          .paginate(page, perPage);
    }
  
  /**
   * Render a form to be used for creating a new servico.
   * GET servicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('frontend.servicos.create');
  }

  /**
   * Create/save a new servico.
   * POST servicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    
    const data = request.only(Servico.fillable()); 
    const servico = await Servico.create(data);  

    session.flash({ notification: 'Servico cadastrado com sucesso' });
    return response.redirect(`/servico/show/${servico.id}`);
  
  }

  /**
   * Display a single servico.
   * GET servicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const servico = await Servico.find(params.id);
    servico.data_nascimento = await servico.toJSON().data_nascimento;
    return  view.render('frontend.servicos.show', {servico} )

  }

  /**
   * Render a form to update an existing servico.
   * GET servicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    const servico = await Servico.find(params.id);
    servico.data_nascimento = await servico.toJSON().data_nascimento
    return view.render('frontend.servicos.edit', {servico})

  }

  /**
   * Update servico details.
   * PUT or PATCH servicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {

    const data = request.only(Servico.fillable());  
    let servico = await Servico.find(params.id); 
    servico.merge(data);
    await servico.save();

    session.flash({ notification: 'Servico atualizado com sucesso' });
    return response.redirect(`/servico/show/${servico.id}`);

  }

  /**
   * Delete a servico with id.
   * DELETE servicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {

    const servico = await Servico.findOrFail(params.id)
    await servico.delete()

    session.flash({ notification: 'Servico deletado com sucesso' });
    return response.redirect('/servicos');

  }
}

module.exports = ServicoController
