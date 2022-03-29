const DATOS = require('./model');
const store = require('../../../store/mysql');
const response = require('../../../network/response');

const list = async (req, res) => {

  let thelist = null;
  try {

    thelist = await store.list(DATOS.TABLA);
    response.success(req, res, thelist, 200);
  } catch (error) {
    response.error(req, res, 'Problema al procesar la petición', 400);
  }
};

const count = async (req, res) => {
  let total = null;
  try {
    total = await store.count(DATOS.TABLA, DATOS.ID);
    response.success(req, res, total, 200);
  } catch (error) {
    response.error(req, res, 'Problema al procesar la petición', 400);
  }
};

const get = async (req, res) => {
  let objeto = null;
  if (req.params.ID) {
    if (req.params.ID !== '') {
      try {
        objeto = await store.get(DATOS.TABLA, req.params.ID);
        response.success(req, res, objeto, 200);
      } catch (error) {
        response.error(req, res, 'Problema al procesar la petición', 400);
      }
    } else {
      response.error(req, res, 'El id no puede estár vacío', 400);
    }
  } else {
    response.error(req, res, 'No se ha recibido un campo id', 400);
  }
};

const insert = async (req, res) => {
  let objeto = null;

  if (
    req.body.ID_INDICADOR !== null &&
    req.body.ID_INDICADOR !== undefined &&
    req.body.ID_INDICADOR !== '' &&
    req.body.DES_NOMBRE !== null &&
    req.body.DES_NOMBRE !== undefined &&
    req.body.DES_NOMBRE !== ''
  ) {
    try {
      objeto = await store.insert(DATOS.TABLA, req.body);
      response.success(req, res, objeto, 200);
    } catch (error) {
      response.error(req, res, 'Problema al procesar la petición', 400);
    }
  } else {
    response.error(req, res, 'No se han recibido todos los datos', 400);
  }
};

const update = async (req, res) => {
  let objeto = null;
  if (req.body !== '') {
    if (
      req.body.ID !== null &&
      req.body.ID !== undefined &&
      req.body.ID !== ''
    ) {
      try {
        objeto = await store.update(DATOS.TABLA, req.body);
        response.success(req, res, objeto, 200);
      } catch (error) {
        response.error(req, res, 'Problema al procesar la petición', 400);
      }
    } else {
      response.error(req, res, 'No hay un campo id a actualizar', 400);
    }
  } else {
    response.error(req, res, 'No se han recibido datos', 400);
  }
};

const remove = async (req, res) => {
  let objeto = null;
  if (req.params.ID !== '') {
    try {
      id = req.params.ID;
      objeto = await store.remove(DATOS.TABLA, id);
      response.success(req, res, objeto, 200);
    } catch (error) {
      response.error(req, res, 'Problema al procesar la petición', 400);
    }
  } else {
    response.error(req, res, 'No se ha recibido id', 400);
  }
};

const search = async (req, res) => {
  let body = req.body;
  let params = req.params;
  let objeto = null;
  if (body !== '') {
    if (params.columName && params.value) {
      try {
        objeto = await store.search(
          DATOS.TABLA,
          params.columName,
          params.value,
          'equals'
        );
        response.success(req, res, objeto, 200);
      } catch (error) {
        response.error(req, res, 'Problema al procesar la petición', 400);
      }
    } else {
      response.error(
        req,
        res,
        'No se ha ingresado columna o valor a buscar',
        400
      );
    }
  } else {
    response.error(req, res, 'No se han recibido datos', 400);
  }
};

const datosExportar = async (req, res) => {

  let data = []

  try {
    datos = await store.custom(`SELECT * FROM ${DATOS.TABLA} WHERE ESTATUS = 1 ORDER BY ID_INDICADOR ASC`);

    for (let index = 0; index < datos.length; index++) {

      dato = datos[index].DES_NOMBRE;
      idIndicador = datos[index].ID_INDICADOR;
      indicador = await store.custom(`SELECT DES_NOMBRE FROM indicadores WHERE ID = ${idIndicador}`);
      indicador = indicador[0].DES_NOMBRE;

      respuesta = {
        indicador: '', 
        dato: ''
      }

      respuesta.indicador = indicador;
      respuesta.dato = dato;

      data.push(respuesta);

    }

    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, 'Problema al procesar la petición', 400);
  }

};

module.exports = {
  list,
  count,
  get,
  insert,
  update,
  remove,
  search,
  datosExportar
};
