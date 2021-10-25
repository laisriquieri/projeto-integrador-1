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
        Route.get('os/create', 'OrdemServicoController.create');
        Route.post('os/create', 'OrdemServicoController.store').validator('OrdemServicoStore');
        Route.get('os/show/:id', 'OrdemServicoController.show');
        Route.get('os/edit/:id', 'OrdemServicoController.edit');
        Route.post('os/update/:id', 'OrdemServicoController.update').validator('OrdemServicoUpdate');
        Route.post('os/destroy/:id', 'OrdemServicoController.destroy');

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
        Route.resource('produto', 'ProdutoController'); // Para obter a lista de rotas use o comando: adonis route:list
        Route.post('produto/destroy/:id', 'ProdutoController.destroy');//teste

        //Servicos
        Route.get('servicos', 'ServicoController.index');
        Route.post('servicos', 'ServicoController.index');
        Route.get('servico/create', 'ServicoController.create');
        Route.post('servico/create', 'ServicoController.store').validator('ServicoStore');
        Route.get('servico/show/:id', 'ServicoController.show');
        Route.get('servico/edit/:id', 'ServicoController.edit');
        Route.post('servico/update/:id', 'ServicoController.update').validator('ServicoUpdate');
        Route.post('servico/destroy/:id', 'ServicoController.destroy');

}).middleware('auth')


