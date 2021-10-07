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

Route.on('/').render('session.ordemservico')
Route.get('/', 'HomeController').as('frontend.home')
Route.get('/ordemservico', 'OrdemServicoController.index').as('ordemservico.master').middleware('auth')
Route.get('/categoria', 'CategoriaController.index').as('categoria.index').middleware('auth')
Route.get('/contato', 'ContatoController.index').as('contato.index').middleware('auth')
Route.get('/filmes', 'FilmesController.index').as('filmes.index').middleware('auth')


// Register Users
Route.get('register', 'UserController.create');
Route.post('register', 'UserController.store');

// Session
Route.get('login', 'SessionController.create');
Route.post('login', 'SessionController.store');
Route.get('logout', 'SessionController.delete');
