'use strict'

const ClienteController = require('./ClienteController');
const Database = use('Database')
const OrdemServico = use('App/Models/OrdemServico');
const ServicosDasOrdensServico = use('App/Models/ServicosDasOrdensServico');
const Cliente = use('App/Models/Cliente');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ordensservicos
 */
class OrdemServicoController {
 
  /**
   * Show a list of all ordensservicos.
   * GET ordensservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */   
  async index ({ view, request }) {  
    
    const perPage = 3 // OrdemServicos por página
    const page = await request.all().p || 1;
    const testeSearch = await request.all().search;
    const testeS = await request.all().s;
    var ordensservicos = "";
    var search = "";
        
    if ( !(typeof testeSearch === "undefined") && !(testeSearch == null) ) {
      var search = testeSearch.replace(/[^a-zA-Z0-9]/gi, '');
    }
    
    if ( ((typeof testeSearch === "undefined") && !(typeof testeS === "undefined")) ) {
      var search = await testeS.replace(/[^a-zA-Z0-9]/gi, '');
    } 

    var ordensservicos = await this.search(search, page, perPage);


    var pages = ordensservicos['pages'];
    ordensservicos = ordensservicos['rows'];

    const formataReais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    
    ordensservicos.forEach( os => {
      os.valor_total_liquido = formataReais.format( os.valor_total_liquido );
    } )

    return view.render('frontend.ordensservicos.index',  { 
      ordensservicos: ordensservicos,
      pages:    pages,
      search:   search
    });
  }
  
  /**
     * Query for search.
     * GET ordensservicos/create
     *
     */
  async search(search, page, perPage) {
    return await OrdemServico.query()
                        .where('id', 'like', '%'+search+'%')
                        .orWhere('status', 'like', '%'+search+'%')
                        .with('cliente')
                        .paginate(page, perPage);
  }
  
  /**
   * Render a form to be used for creating a new ordensservico.
   * GET ordensservicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, params }) {
      

      const cliente = await Cliente.findOrFail(params.cliente_id)

      return view.render('frontend.ordensservicos.create-os',  { 
        clienteOS: cliente,
      });
  }

  /**
   * Render a form to be used for creating a new ordensservico.
   * 
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async escolheCliente ({ request, response, view }) {

    const perPage = 3 // Clientes por página
      const page = await request.all().p || 1;
      const testeSearch = await request.all().search;
      const testeS = await request.all().s;
      var clientes = "";
      var search = "";
         
      if ( !(typeof testeSearch === "undefined") && !(testeSearch == null) ) {
        var search = testeSearch.replace(/[^a-zA-Z0-9]/gi, '');
      }
      
      if ( ((typeof testeSearch === "undefined") && !(typeof testeS === "undefined")) ) {
        var search = await testeS.replace(/[^a-zA-Z0-9]/gi, '');
      } 

      var clienteController = new ClienteController();
      var clientes = await clienteController.search(search, page, perPage);

      return view.render('frontend.ordensservicos.escolhe-cliente',  { 
        clientes: clientes['rows'],
        pages:    clientes['pages'],
        search:   search
      });
  }

  /**
   * Create/save a new ordensservico.
   * POST ordensservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    
    const data = request.only(OrdemServico.fillable()); 
    const ordensservico = await OrdemServico.create(data);  
    
    session.flash({ notification: 'Ordem de Servico cadastrada com sucesso' });
    return response.redirect(`/os/show/${ordensservico.id}`);
  
  }

  /**
   * Display a single ordensservico.
   * GET ordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const ordensservico = await OrdemServico.query()
                                            .where('id', params.id)
                                            .with('cliente').first();



    const servico_ordensservico = await Database.select('*')
                                        .from('servicos_das_ordens_servicos as sos')
                                        .innerJoin('servicos as s', 's.id', 'sos.servico_id')
                                        .where('sos.ordem_servico_id', ordensservico.id )

    const produto_ordensservico = await Database.select('*')
                                        .from('produtos_das_ordens_servicos as pos')
                                        .innerJoin('produtos as p', 'p.id', 'pos.produto_id')
                                        .where('pos.ordem_servico_id', ordensservico.id )


    const formataReais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

    ordensservico.data_entrada = await ordensservico.toJSON().data_entrada
    ordensservico.data_entrega = await ordensservico.toJSON().data_entrega    
    
    ordensservico.valor_total_bruto = formataReais.format( ordensservico.valor_total_bruto );
    ordensservico.valor_total_liquido = formataReais.format( ordensservico.valor_total_liquido );

    servico_ordensservico.forEach( servico => {
      const valor_total = servico.valor * servico.quantidade;
      servico.valor = formataReais.format( servico.valor );
      servico.valor_total = formataReais.format(valor_total);
    } )


    produto_ordensservico.forEach( produto => {
      const valor_total = produto.valor_venda * produto.quantidade;
      produto.valor_venda = formataReais.format( produto.valor_venda );
      produto.valor_total = formataReais.format(valor_total);
      console.log(produto)
    } )

    return  view.render('frontend.ordensservicos.show', 
        { ordensservico, servico_ordensservico, produto_ordensservico } )

  }

  /**
   * Render a form to update an existing ordensservico.
   * GET ordensservicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    const ordensservico = await OrdemServico.query()
                                            .where('id', params.id)
                                            .with('cliente').first();
    
    return view.render('frontend.ordensservicos.edit-os', {ordensservico})

  }

  /**
   * Update ordensservico details.
   * PUT or PATCH ordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {

    const data = request.only(OrdemServico.fillable());  
    data['desconto'] = data['desconto']/100
    let ordensservico_update = await OrdemServico.find(params.id); 
    ordensservico_update.merge(data);
    await ordensservico_update.save();

    const ordensservico = await this.calculaTotal({ os_id: ordensservico_update.id})

    session.flash({ notification: 'Ordem de Servico atualizada com sucesso' });
    return response.redirect(`/os/show/${ordensservico.id}`);

  }

  /**
   * Delete a ordensservico with id.
   * DELETE ordensservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {

    //colocar TRANSACAO aqui
    await Database.table('servicos_das_ordens_servicos')
                  .where('ordem_servico_id', params.id)
                  .delete()

    await Database.table('produtos_das_ordens_servicos')
                  .where('ordem_servico_id', params.id)
                  .delete()

    const ordensservico = await OrdemServico.findOrFail(params.id)
    await ordensservico.delete()

    session.flash({ notification: 'Ordem de servico deletada com sucesso' });
    return response.redirect('/os');

  }

  async calculaTotal ({ os_id }) {

  const vServicos = await Database.raw(
    `SELECT SUM(valor * quantidade) as valor_total_bruto FROM servicos_das_ordens_servicos WHERE ordem_servico_id = ${os_id}`)

  const vProdutos = await Database.raw(
    `SELECT SUM(valor_venda * quantidade) as valor_total_bruto FROM produtos_das_ordens_servicos WHERE ordem_servico_id = ${os_id}`)
  
  let ordensservico = await OrdemServico.find(os_id); 

  var valor_total_servicos = vServicos[0][0].valor_total_bruto === null ? 0 : vServicos[0][0].valor_total_bruto;
  var valor_total_produtos = vProdutos[0][0].valor_total_bruto === null ? 0 : vProdutos[0][0].valor_total_bruto;
  var valor_total_bruto =  valor_total_servicos + valor_total_produtos;
  var valor_total_liquido = valor_total_bruto*(1-ordensservico.desconto);

  ordensservico.merge({ valor_total_bruto: valor_total_bruto,
                        valor_total_liquido: valor_total_liquido  });
  await ordensservico.save();

  return ordensservico
  }

}

module.exports = OrdemServicoController

