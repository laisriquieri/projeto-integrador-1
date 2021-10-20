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
Route.post('usuario/store', 'UserController.store'); //provisório

//-----------------------------------
//ROTAS PROTEGIDAS
//-----------------------------------
Route.group(() => {

       // Raiz
        Route.get('/', 'OrdemServicoController.index');

        // Ordens de Serviços
        Route.get('os', 'OrdemServicoController.index');
        Route.get('os/create', 'OrdemServicoController.create'); // Aguardando form.
        //Route.post('os/store', 'OrdemServicoController.store'); // Aguardando form.

        // Clientes
        Route.get('clientes', 'ClienteController.index'); 
        Route.post('clientes', 'ClienteController.index'); 
        Route.get('cliente/create', 'ClienteController.create');
        Route.post('cliente/create', 'ClienteController.store').validator('Cliente');
        Route.get('cliente/show/:id', 'ClienteController.show'); 
        Route.get('cliente/edit/:id', 'ClienteController.edit'); 
        Route.post('cliente/update/:id', 'ClienteController.update'); 
        Route.post('cliente/destroy/:id', 'ClienteController.destroy');

        //Produtos
        Route.resource('produto', 'ProdutoController'); // Para obter a lista de rotas use o comando: adonis route:list

}).middleware('auth')


