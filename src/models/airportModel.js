const pool = require("../config/db");
const createAirport = (data) => {
  const { airport_name, city, country, airport_code } = data;
  let time = new Date().toISOString();
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO airports(airport_name, city, country, airport_code,created_at) VALUES('${airport_name}', '${city}', '${country}', '${airport_code}','${time}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getAllAirport = () => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * from airports`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getAirportsById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from airports WHERE id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const updateAirport = (id, data) => {
  const { airport_name, city, country, airport_code } = data;
  return new Promise((resolve, reject) =>
    pool.query(
      `UPDATE airports SET airport_name='${airport_name}',airport_name='${airport_name}', city='${city}', country=${country}, airport_code='${airport_code}' WHERE id = ${id}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const deleteAirportById = (id) => {
  return pool.query(
    `DELETE FROM airports WHERE id='${id}'`
  );
};
module.exports = {
  createAirport,
  getAllAirport,
  getAirportsById,
  updateAirport,
  deleteAirportById,
};
