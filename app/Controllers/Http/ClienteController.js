'use strict';

const Cliente = use('App/Models/Cliente');
//const ClienteValidator = use('App/Validators/Cliente');
//const { validate } = use('Validator')

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
    
    const data = request.only(Cliente.fillable());
    
    //const rules = await ClienteValidator.rules();
    //const messages = await ClienteValidator.messages();
    
    //const validation = await validate(data, rules, messages)
    
    //if (validation.fails()) {
    //  session.withErrors(validation.messages())

    //  return response.redirect('back')
    //}

    const cliente = await Cliente.create(data);

    session.flash({ notification: 'Cliente salvo com sucesso' });
    return response.redirect(`/cliente/show/${cliente.id}`);
  
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
  async update ({ params, request, response, session }) {

    const data = request.only(Cliente.fillable());  
    let cliente = await Cliente.find(params.id); 
    cliente.merge(data);
    await cliente.save();

    session.flash({ notification: 'Cliente atualizado com sucesso' });
    return response.redirect(`/cliente/show/${cliente.id}`);

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

    const cliente = await Cliente.findOrFail(params.id)
    await cliente.delete()

    session.flash({ notification: 'Cliente deletado com sucesso' });
    return response.redirect('back');

  }
}

module.exports = ClienteController
