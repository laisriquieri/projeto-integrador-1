'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//-----------------------------------
//ROTAS DESPROTEGIDAS
//-----------------------------------
// Login
Route.get('login', 'LoginController.index');
Route.post('login', 'LoginController.store');
Route.get('logout', 'LoginController.delete');

// Usuarios (PROVISORIO)
Route.get('usuario', 'UserController.create');       //create.edge provisório
Route.post('usuario/store', 'UserController.store').validator('UserStore'); //provisório

//-----------------------------------
//ROTAS PROTEGIDAS
//-----------------------------------
Route.group(() => {

        // Raiz
        Route.get('/', 'OrdemServicoController.index');

        // Ordens de Serviços
        Route.get('os', 'OrdemServicoController.index');
        Route.post('os', 'OrdemServicoController.index');
        Route.get('os/create-step0', 'OrdemServicoController.escolheCliente'); // Escolhe cliente
        Route.post('os/create-step0', 'OrdemServicoController.escolheCliente'); // Pesquisa cliente

        Route.get('os/create-step1/:cliente_id', 'OrdemServicoController.create'); // Formulario informações OS
        Route.post('os/store-step1', 'OrdemServicoController.store').validator('OrdemServico'); // Grava informações OS

        Route.get('os/show/:id', 'OrdemServicoController.show');

        Route.get('os/edit/:id', 'OrdemServicoController.edit');
        Route.post('os/update/:id', 'OrdemServicoController.update').validator('OrdemServico');
        
        Route.post('os/destroy/:id', 'OrdemServicoController.destroy');      
        
        Route.get('os/create-step2/:id', 'ServicosDasOrdensServicoController.create'); // Formulario serviços
        Route.post('os/create-step2/:id', 'ServicosDasOrdensServicoController.create'); // Formulario serviços pesquisa
        Route.post('os/store-step2', 'ServicosDasOrdensServicoController.store').validator('ServicosDasOrdensServico'); // Grava serviços OS
        Route.get('os/edit-step2/:ordem_servico_id/:servico_id/', 'ServicosDasOrdensServicoController.edit'); // Formulario serviços edição
        Route.post('os/update-step2/:ordem_servico_id/:servico_id/', 'ServicosDasOrdensServicoController.update').validator('ServicosDasOrdensServico'); // Formulario serviços edição
        Route.post('os/destroy-step2/:ordem_servico_id/:servico_id/', 'ServicosDasOrdensServicoController.destroy'); // Formulario serviços edição
        
        Route.get('os/create-step3/:id', 'ProdutosDasOrdensServicoController.create'); // Formulario produtos
        Route.post('os/create-step3/:id', 'ProdutosDasOrdensServicoController.create'); // Formulario produtos pesquisa
        Route.post('os/store-step3', 'ProdutosDasOrdensServicoController.store').validator('ProdutosDasOrdensServico'); // Grava produtos OS
        Route.get('os/edit-step3/:ordem_servico_id/:produto_id/', 'ProdutosDasOrdensServicoController.edit'); // Formulario produtos edição
        Route.post('os/update-step3/:ordem_servico_id/:produto_id/', 'ProdutosDasOrdensServicoController.update').validator('ProdutosDasOrdensServico'); // Formulario produtos edição
        Route.post('os/destroy-step3/:ordem_servico_id/:produto_id/', 'ProdutosDasOrdensServicoController.destroy'); // Formulario produtos edição
        
        //Usuários
        Route.get('usuarios', 'UserController.index');
        Route.post('usuarios', 'UserController.index');
        Route.get('usuario/create', 'UserController.create'); //Por enquanto tem rota desprotegida também
        Route.post('usuario/create', 'UserController.store').validator('UserStore'); //Por enquanto tem rota desprotegida também
        Route.get('usuario/show/:id', 'UserController.show');
        Route.get('usuario/edit/:id', 'UserController.edit');
        Route.post('usuario/update/:id', 'UserController.update').validator('UserUpdate');
        Route.post('usuario/destroy/:id', 'UserController.destroy');

        // Clientes
        Route.get('clientes', 'ClienteController.index');
        Route.post('clientes', 'ClienteController.index');
        Route.get('cliente/create', 'ClienteController.create');
        Route.post('cliente/create', 'ClienteController.store').validator('ClienteStore');
        Route.get('cliente/show/:id', 'ClienteController.show');
        Route.get('cliente/edit/:id', 'ClienteController.edit');
        Route.post('cliente/update/:id', 'ClienteController.update').validator('ClienteUpdate');
        Route.post('cliente/destroy/:id', 'ClienteController.destroy');

        //Produtos
        //Route.resource('produto', 'ProdutoController'); // Para obter a lista de rotas use o comando: adonis route:list
        Route.get('produtos', 'ProdutoController.index');
        Route.post('produtos', 'ProdutoController.index');
        Route.get('produto/create', 'ProdutoController.create');
        Route.post('produto/create', 'ProdutoController.store').validator('ProdutoStore');
        Route.get('produto/show/:id', 'ProdutoController.show');
        Route.get('produto/edit/:id', 'ProdutoController.edit');
        Route.post('produto/update/:id', 'ProdutoController.update').validator('ProdutoUpdate');
        Route.post('produto/destroy/:id', 'ProdutoController.destroy');


        //Servicos
        Route.get('servicos', 'ServicoController.index');
        Route.post('servicos', 'ServicoController.index');
        Route.get('servico/create', 'ServicoController.create');
        Route.post('servico/create', 'ServicoController.store').validator('ServicoStore');
        Route.get('servico/show/:id', 'ServicoController.show');
        Route.get('servico/edit/:id', 'ServicoController.edit');
        Route.post('servico/update/:id', 'ServicoController.update').validator('ServicoUpdate');
        Route.post('servico/destroy/:id', 'ServicoController.destroy');

        //Relatorios
        Route.get('relatorios', 'RelatorioController.index');
        Route.get('relatorios/aniversariantes', 'RelatorioController.aniversariantes');
        Route.get('relatorios/os-mes-ano', 'RelatorioController.osPorMes').validator('Relatorios');;

}).middleware('auth')


