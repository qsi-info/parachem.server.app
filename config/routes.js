module.exports.routes = {

  '/' : 'HomeController.index',

  '/login' : 'AuthController.login',

  '/logout' : 'AuthController.logout',

  'post /auth/process' : 'AuthController.process',

}