const conn = require("./database");

const fetchRaces = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT RA_ID, RA_Nom, RA_Description, RA_Bonus, RA_Img FROM race;`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
const fetchRacesById = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT RA_ID, RA_Nom, RA_Description, RA_Bonus, RA_Img FROM race WHERE RA_ID=?;`;
    let query = conn.query(sql, [id], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  fetchRaces,
  fetchRacesById
};