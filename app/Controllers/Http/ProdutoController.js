'use strict'

const Produto = use('App/Models/Produto');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({view, request }) {
    const perPage = 3 // produtos por página
    const page = await request.all().p || 1;
    const testeSearch = await request.all().search;
    const testeS = await request.all().s;
    var produtos = "";
    var search = "";

    if ( !(typeof testeSearch === "undefined") && !(testeSearch == null) ) {
      var search = testeSearch.replace(/[^a-zA-Z0-9]/gi, '');
    }

    if ( ((typeof testeSearch === "undefined") && !(typeof testeS === "undefined")) ) {
      var search = await testeS.replace(/[^a-zA-Z0-9]/gi, '');
    }

    var produtos = await this.search(search, page, perPage);

    return view.render('frontend.produtos.index',  {
      produtos: produtos['rows'],
      pages:    produtos['pages'],
      search:   search
    });
  }

    /**
     * Query for search.
     * GET produtos/create
     *
     */
  async search(search, page, perPage) {
    return await Produto.query()
                        .where('nome', 'like', '%'+search+'%')
                        .paginate(page, perPage);
  }

    /**
   * Render a form to be used for creating a new produto.
   * GET produtos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('frontend.produtos.create');
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const data = request.only(Produto.fillable());
    const produto = await Produto.create(data);

    //Implementar no front as mensagens flash
    session.flash({ notification: 'Produto criado com sucesso' });
    return response.redirect(`/produto/show/${produto.id}}`);

  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const produto = await Produto.find(params.id);
    return  view.render('frontend.produtos.show', {produto} )

  }

  /**
   * Render a form to update an existing produto.
   * GET produtos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    const produto = await Produto.find(params.id);
    return view.render('frontend.produtos.edit', {produto})

  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const data = request.only(Produto.fillable());
    const produto = await Produto.find(params.id);
    produto.merge(data);
    await produto.save();

    session.flash({ notification: 'Produto atualizado com sucesso' });
    return response.redirect('/produto');


  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const produto = await Produto.find(params.id);
    await produto.delete();

    session.flash({ notification: 'Produto excluído com sucesso' });
    return response.redirect('/produto');

  }
}

module.exports = ProdutoController
