const INDICADORES = require('./model');
const store = require('../../../store/mysql');
const response = require('../../../network/response');
const { STRING } = require('mysql/lib/protocol/constants/types');

const list = async (req, res) => {

  let thelist = null;
  try {

    thelist = await store.list(INDICADORES.TABLA);
    response.success(req, res, thelist, 200);
  } catch (error) {
    response.error(req, res, 'Problema al procesar la petición', 400);
  }
};

const count = async (req, res) => {
  let total = null;
  try {
    total = await store.count(INDICADORES.TABLA, INDICADORES.ID);
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
        objeto = await store.get(INDICADORES.TABLA, req.params.id);
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

  if (
    req.body.DES_NOMBRE !== null &&
    req.body.DES_NOMBRE !== undefined &&
    req.body.DES_NOMBRE !== ''
  ) {
    try {
      objeto = await store.insert(INDICADORES.TABLA, req.body);
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
        objeto = await store.update(INDICADORES.TABLA, req.body);
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
  if (req.params.ID !== '') {
    try {
      id = req.params.ID;
      objeto = await store.remove(INDICADORES.TABLA, id);
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
          INDICADORES.TABLA,
          params.columName,
          params.value,
          'contains'
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

const totalDatos = async (req, res) => {

  let indicadoresLista = [];

  try {
    indicadores = await store.custom(`SELECT * FROM indicadores WHERE ESTATUS = 1`);

    for (let index = 0; index < indicadores.length; index++) {
      idIndicador = indicadores[index].ID;
      nombreIndicador = indicadores[index].DES_NOMBRE;

      datos = await store.custom(`SELECT COUNT(*) AS total FROM datos WHERE ID_INDICADOR = ${idIndicador} AND ESTATUS = 1`);
      datos = datos[0].total;

      console.log(datos);


      respuesta = {
        NOMBRE_INDICADOR: '',
        TOTAL_DATOS: ''
      }

      respuesta.NOMBRE_INDICADOR = nombreIndicador;
      respuesta.TOTAL_DATOS = datos;

      indicadoresLista.push(respuesta);
    }

    response.success(req, res, indicadoresLista, 200);
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
  totalDatos
};
