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
  'post /admin/client/endpoints/update' : 'AdminController.updateEndpoints',
  '/admin/client/endpoints/:id' : 'AdminController.clientEndpoints',
  '/admin/client/users/:id' : 'AdminController.clientUsers',
  'post /admin/settings/update' : 'AdminController.updateSettings',
  '/admin/user/new': 'AdminController.newUser',
  'post /admin/user/create' : 'AdminController.createUser',
  '/admin/user/edit/:id' : 'AdminController.editUser',
  'post /admin/user/update' : 'AdminController.updateUser',
  'post /admin/client/user/update' : 'AdminController.updateClientUser',
  'post /admin/delete-user-permission' : 'AdminController.deleteUserPermission',
  'post /admin/revoke-token' : 'AdminController.revokeToken',
  '/admin/client-count' : 'AdminController.clientCount',

}