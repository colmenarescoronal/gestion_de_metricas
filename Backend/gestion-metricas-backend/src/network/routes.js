const indicadores = require('../api/components/indicadores/network');
const datos = require('../api/components/datos/network');
const login = require('../api/components/login/network');
const auth = require('../auth/auth');

const routes = (server) => {
  server.use('/indicadores',auth.check, indicadores);
  server.use('/datos',auth.check, datos);

  //------Rutas sin  validacion por token------------------
  server.use('/login',login);
  //------------------------------------------------------
};

module.exports = routes;
