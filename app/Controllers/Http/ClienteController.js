'use strict';

const Cliente = use('App/Models/Cliente');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


    async index ({ view }) {

    const clientes = await Cliente.all();

    return view.render('frontend.clientes.index',  { clientes: clientes['rows'] });
    }

  /**
   * Render a form to be used for creating a new cliente.
   * GET clientes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('frontend.clientes.create');
  }

  /**
   * Create/save a new cliente.
   * POST clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {

    const data = request.only(['tipo'
                              ,'nome'
                              ,'cpf_cnpj'
                              ,'data_nascimento'
                              ,'telefone'
                              ,'email'
                              ,'CEP'
                              ,'endereco'
                              ,'numero_endereco'
                              ,'complemento'
                              ,'bairro'
                              ,'cidade'
                              ,'estado'
                              ,'observacoes']);

    const cliente = await Cliente.store(data);

    //Implementar no front as mensagens flash
    session.flash({ notification: 'Cliente created successfully' });

    return response.redirect('/clientes');

  }

  /**
   * Display a single cliente.
   * GET clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const cliente = await Cliente.find(params.id);
    return  view.render('frontend.clientes.show', {cliente} )

  }

  /**
   * Render a form to update an existing cliente.
   * GET clientes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    const cliente = await Cliente.find(params.id);
    //console.log(cliente)
    return view.render('frontend.clientes.edit', {cliente})

  }

  /**
   * Update cliente details.
   * PUT or PATCH clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a cliente with id.
   * DELETE clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ClienteController
