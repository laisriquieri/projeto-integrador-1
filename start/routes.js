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
Route.get('login', 'LoginController.create');
Route.post('login', 'LoginController.store');
Route.get('logout', 'LoginController.delete');

// Usuarios (PROVISORIO)
Route.get('usuario', 'UserController.create'); // create.edge provisório
Route.post('usuario/store', 'UserController.store');

//-----------------------------------
//ROTAS PROTEGIDAS
//-----------------------------------
Route.group(() => {
 
       // Raiz
        Route.get('/', 'OrdemServicoController.show');

        // Ordens de Serviços
        Route.get('os', 'OrdemServicoController.show');
        Route.get('os/create', 'OrdemServicoController.create'); // Pensar sobre CSS e Montar form.
        //Route.post('os/store', 'OrdemServicoController.store'); // Aguardando form.

        // Clientes
        Route.get('clientes', 'ClienteController.show'); // Aguardando página Laís

}).middleware('auth')


