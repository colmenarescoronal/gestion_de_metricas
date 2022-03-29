const conexion = require('./conexion');


const conmysql = async (consulta, datas) => {
  console.log(consulta);
  return await conexion.query(consulta, datas);
};

const login = (usuario, contrasena,tabla) => {
  let consulta = `SELECT ID FROM ${tabla} WHERE USUARIO = '${usuario}' 
  AND CONTRASENA = '${contrasena}' AND ESTATUS = 1`;
  return conmysql(consulta);
}

const list = (table) => {
  let consulta = `SELECT * FROM ${table}`;
  return conmysql(consulta);
};

const count = (table, columName) => {
  let consulta = `SELECT COUNT(${columName}) as TOTAL FROM ${table}`;
  return conmysql(consulta);
};

const get = (table, id) => {
  let consulta = `SELECT * FROM ${table} WHERE id = ${id}`;
  return conmysql(consulta);
};

const search = (table, columName, value, comparator) => {
  let consulta;
  switch (comparator) {
    case 'equals':
      consulta = `SELECT * FROM ${table} WHERE ${columName} = '${value}' `;
      break;

    case 'contains':
      consulta = `SELECT * FROM ${table} WHERE ${columName} LIKE '%${value}%' `;
      break;
  }
  return conmysql(consulta);
};

const insert = (table, data) => {
  let consulta = `INSERT INTO ${table}  SET ?`;
  return conmysql(consulta, data);
};

const update = (table, data) => {
  let consulta = `UPDATE ${table} SET ? WHERE id=?`;
  return conmysql(consulta, [data, data.ID]);
};

const remove = (table, id) => {
  let consulta = `DELETE FROM ${table} WHERE id = ${id}`;
  return conmysql(consulta);
};

const removeCustom = (table, columName, id) => {
  let consulta = `DELETE FROM ${table} WHERE ${columName} = ${id}`;
  return conmysql(consulta);
};

const query = (table, query) => {
  let consulta = `SELECT * FROM ${table} WHERE ?`;
  return conmysql(consulta, query);
};

const custom = (query) => {
  return conmysql(query);
};

const customProps = (query, data) => {
  return conmysql(query, data);
};

module.exports = {
  list,
  login,
  get,
  insert,
  update,
  remove,
  query,
  search,
  count,
  custom,
  customProps,
  removeCustom,
};
