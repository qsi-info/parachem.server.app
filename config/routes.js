module.exports.routes = {

  '/' : 'HomeController.index',

  '/login' : 'AuthController.login',

  '/logout' : 'AuthController.logout',

  'post /auth/process' : 'AuthController.process',





  '/admin/client/new' : 'AdminController.newClient',
  'post /admin/client/create' : 'AdminController.createClient',
  '/admin/client/dashboard/:id' : 'AdminController.clientDashboard',
  '/admin/client/settings/:id' : 'AdminController.clientSettings',
  'post /admin/client/update' : 'AdminController.updateClient',
  '/admin/client/authentification/:id' : 'AdminController.clientAuthentification',

}