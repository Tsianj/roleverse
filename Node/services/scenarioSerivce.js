const conn = require("./database");

const fetchScenario = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT SC_ID, SC_Nom, SC_Description, SC_Resume, SC_Img FROM scenario;`;
        let query = conn.query(sql, (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}


module.exports = {
    fetchScenario
};