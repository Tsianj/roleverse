const conn = require("./database");

const fetchUtilisateur = (email) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT UT_Mail, UT_Nom, UT_Password, UT_Bio, UT_NiveauMJ, UT_NiveauJoueur FROM utilisateur WHERE UT_Mail = ?;`;
        let query = conn.query(sql, [email], (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}
const addUtilisateur = (utilisateur) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO utilisateur(UT_Nom, UT_Mail, UT_Password) VALUES (?, ?, ?)`;
        let query = conn.query(sql, [utilisateur.nom_uti, utilisateur.mail_uti, utilisateur.passwords], (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const connUtilisateur = (utilisateur) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT UT_Mail, UT_Nom, UT_Password FROM utilisateur WHERE UT_Mail = ?;`;
        let query = conn.query(sql, [utilisateur.mailConn_uti], (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    fetchUtilisateur, 
    addUtilisateur,
    connUtilisateur
};