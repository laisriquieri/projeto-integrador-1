'use strict'

const OrdemServico = use('App/Models/OrdemServico');
const ProdutosDasOrdensServico = use('App/Models/ProdutosDasOrdensServico');
const OrdemServicoController = require('./OrdemServicoController');
const ProdutoController = require('./ProdutoController');
const Produto = use('App/Models/Produto');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtosdasordensservicos
 */
class ProdutosDasOrdensServicoController {
  /**
   * Show a list of all produtosdasordensservicos.
   * GET produtosdasordensservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new produtosdasordensservico.
   * GET produtosdasordensservicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, params }) {

    const perPage = 3 // Produtos por página
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

      var produtoController = new ProdutoController();
      var produtos = await produtoController.search(search, page, perPage);
      const ordem_servico_id = await params.id

      return view.render('frontend.ordensservicos.create-produto',  { 
        produtos: produtos['rows'],
        pages:    produtos['pages'],
        search:   search,
        ordem_servico_id
      });

  }

  /**
   * Create/save a new produtosdasordensservico.
   * POST produtosdasordensservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {

  const data = request.only(ProdutosDasOrdensServico.fillable());
  const produto = await Produto.find(data.produto_id)
  data['valor_compra'] = produto.valor_compra
     
  const testeExistencia = await Database
                              .table('produtos_das_ordens_servicos')
                              .where('produto_id', data.produto_id )
                              .where('ordem_servico_id', data.ordem_servico_id)
                              .first();
  
  if (typeof testeExistencia === "undefined") {
    const produto_ordensservico = await ProdutosDasOrdensServico.create(data);  
    
    const ordensServicoController = new OrdemServicoController();
    const ordensservico = await ordensServicoController.calculaTotal({ os_id: produto_ordensservico.ordem_servico_id})
    
    session.flash({ notification: 'Produto incluido na Ordem de Servico com sucesso' });

  } else {
    session.flash({ notification: 'Ops... Produto já existe na Ordem de Servico, use opção de editar' });
  }
                              
    return response.redirect(`/os/show/${data.ordem_servico_id}`);
  }

  /**
   * Display a single produtosdasordensservico.
   * GET produtosdasordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing produtosdasordensservico.
   * GET produtosdasordensservicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

  const produto_ordensservico = await Database
                                      .table('produtos_das_ordens_servicos')
                                      .where('produto_id', params.produto_id )
                                      .where('ordem_servico_id', params.ordem_servico_id)
                                      .first();

  const produto = await Produto.find(params.produto_id);
  
  return view.render('frontend.ordensservicos.edit-produto', { produto_ordensservico, produto })

  }

  /**
   * Update produtosdasordensservico details.
   * PUT or PATCH produtosdasordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {

    
    const data = request.only(ProdutosDasOrdensServico.fillable())

    const produto_ordensservico = await Database
                                      .table('produtos_das_ordens_servicos')
                                      .where('produto_id', data.produto_id )
                                      .where('ordem_servico_id', data.ordem_servico_id)
                                      .update('quantidade', data.quantidade);

    const ordensServicoController = new OrdemServicoController();
    const ordensservico = await ordensServicoController.calculaTotal({ os_id: data.ordem_servico_id})
  
    session.flash({ notification: 'Produto editado na Ordem de Servico com sucesso' });
    return response.redirect(`/os/show/${ordensservico.id}`);
  }

  /**
   * Delete a produtosdasordensservico with id.
   * DELETE produtosdasordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {

  const produto_ordensservico = await Database
                                      .table('produtos_das_ordens_servicos')
                                      .where('produto_id', params.produto_id )
                                      .where('ordem_servico_id', params.ordem_servico_id)
                                      .delete()
 
  const ordensServicoController = new OrdemServicoController();
  const ordensservico = await ordensServicoController.calculaTotal({ os_id: params.ordem_servico_id})

  session.flash({ notification: 'Produto excluido da Ordem de Servico com sucesso' });
  return response.redirect(`/os/show/${ordensservico.id}`);

  }
}

module.exports = ProdutosDasOrdensServicoController
