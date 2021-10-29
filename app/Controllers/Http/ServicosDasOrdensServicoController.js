'use strict'

const OrdemServico = use('App/Models/OrdemServico');
const ServicosDasOrdensServico = use('App/Models/ServicosDasOrdensServico');
const OrdemServicoController = require('./OrdemServicoController');
const ServicoController = require('./ServicoController');
const Servico = use('App/Models/Servico');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicosdasordensservicos
 */
class ServicosDasOrdensServicoController {
  /**
   * Show a list of all servicosdasordensservicos.
   * GET servicosdasordensservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new servicosdasordensservico.
   * GET servicosdasordensservicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, params }) {

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

      var servicoController = new ServicoController();
      var servicos = await servicoController.search(search, page, perPage);
      const ordem_servico_id = await params.id

      return view.render('frontend.ordensservicos.create-servico',  { 
        servicos: servicos['rows'],
        pages:    servicos['pages'],
        search:   search,
        ordem_servico_id
      });

  }

  /**
   * Create/save a new servicosdasordensservico.
   * POST servicosdasordensservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {

  const data = request.only(ServicosDasOrdensServico.fillable());
  
  const testeExistencia = await Database
                              .table('servicos_das_ordens_servicos')
                              .where('servico_id', data.servico_id )
                              .where('ordem_servico_id', data.ordem_servico_id)
                              .first();
  
  if (typeof testeExistencia === "undefined") {
    const servico_ordensservico = await ServicosDasOrdensServico.create(data);  
    
    const ordensServicoController = new OrdemServicoController();
    const ordensservico = await ordensServicoController.calculaTotal({ os_id: servico_ordensservico.ordem_servico_id})
    
    session.flash({ notification: 'Serviço incluido na Ordem de Servico com sucesso' });

  } else {
    session.flash({ notification: 'Ops... Serviço já existe na Ordem de Servico, use opção de editar' });
  }
                              
    return response.redirect(`/os/show/${data.ordem_servico_id}`);
  }

  /**
   * Display a single servicosdasordensservico.
   * GET servicosdasordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing servicosdasordensservico.
   * GET servicosdasordensservicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

  const servico_ordensservico = await Database
                                      .table('servicos_das_ordens_servicos')
                                      .where('servico_id', params.servico_id )
                                      .where('ordem_servico_id', params.ordem_servico_id)
                                      .first();

  const servico = await Servico.find(params.servico_id);
  
  return view.render('frontend.ordensservicos.edit-servico', { servico_ordensservico, servico })

  }

  /**
   * Update servicosdasordensservico details.
   * PUT or PATCH servicosdasordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {

    const data = request.only(ServicosDasOrdensServico.fillable())
    const servico_ordensservico = await Database
                                      .table('servicos_das_ordens_servicos')
                                      .where('servico_id', data.servico_id )
                                      .where('ordem_servico_id', data.ordem_servico_id)
                                      .update('quantidade', data.quantidade);

    const ordensServicoController = new OrdemServicoController();
    const ordensservico = await ordensServicoController.calculaTotal({ os_id: data.ordem_servico_id})
  
    session.flash({ notification: 'Serviço editado na Ordem de Servico com sucesso' });
    return response.redirect(`/os/show/${ordensservico.id}`);
  }

  /**
   * Delete a servicosdasordensservico with id.
   * DELETE servicosdasordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {

  const servico_ordensservico = await Database
                                      .table('servicos_das_ordens_servicos')
                                      .where('servico_id', params.servico_id )
                                      .where('ordem_servico_id', params.ordem_servico_id)
                                      .delete()
 
  const ordensServicoController = new OrdemServicoController();
  const ordensservico = await ordensServicoController.calculaTotal({ os_id: params.ordem_servico_id})

  session.flash({ notification: 'Serviço excluido da Ordem de Servico com sucesso' });
  return response.redirect(`/os/show/${ordensservico.id}`);

  }
}

module.exports = ServicosDasOrdensServicoController
