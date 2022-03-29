const LOGIN = require('./model');
const store = require('../../../store/mysql');
const response = require('../../../network/response');
const auth = require('../../../auth/auth');


const login = async (req, res, next) => {

  if (req.body.USUARIO !== null &&
    req.body.USUARIO !== undefined &&
    req.body.USUARIO !== '' &&
    req.body.CONTRASENA !== null &&
    req.body.CONTRASENA !== undefined &&
    req.body.CONTRASENA !== '') {

    usuario = req.body.USUARIO;
    contrasena = req.body.CONTRASENA;

    await store.login(usuario, contrasena, LOGIN.TABLA)
      .then((usuario) => {
        if ((Object.keys(usuario).length == 0) == false) {
          //Evitar generar token con contraseña incorrecta
          const token = auth.createToken(usuario[0].ID);
          response.success(req, res, token, 200);
        } else {
          response.error(req, res, 'Usuario/Contraseña incorrectos', 400);
        }
      })
      .catch(next);
  }
  else {
    response.error(req, res, 'No se han recibido todos los datos', 400);
  }
};

const registrarse = async (req, res, next) => {

  if (req.body.USUARIO !== null &&
    req.body.USUARIO !== undefined &&
    req.body.USUARIO !== '' &&
    req.body.CONTRASENA !== null &&
    req.body.CONTRASENA !== undefined &&
    req.body.CONTRASENA !== '') {
    try {
      objeto = await store.insert(LOGIN.TABLA, req.body);

      response.success(req, res, objeto, 200);
    }
    catch (err) {
      response.error(req, res, 'Problema al procesar la petición', 400);
    }
  }
  else {
    response.error(req, res, 'No se han recibido todos los datos', 400);
  }
};

module.exports = {
  login,
  registrarse,
};
