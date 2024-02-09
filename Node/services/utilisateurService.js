const conn = require("./database");

const fetchUtilisateur = (email) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT UT_Mail, UT_Nom, UT_Password, UT_Bio, UT_NiveauMJ, UT_NiveauJoueur FROM utilisateur WHERE UT_Mail = ?;`;
    conn.query(sql, [email], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const addUtilisateur = (utilisateur) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO utilisateur(UT_Nom, UT_Mail, UT_Password) VALUES (?, ?, ?)`;
    conn.query(
      sql,
      [utilisateur.nom_uti, utilisateur.mail_uti, utilisateur.passwords],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const connUtilisateur = (utilisateur) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT UT_Mail, UT_Nom, UT_Password FROM utilisateur WHERE UT_Mail = ?;`;
    conn.query(sql, [utilisateur.mailConn_uti], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const modifyUtilisateur = (utilisateur) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE utilisateur SET UT_Nom = ?, UT_Bio = ?, UT_NiveauMJ = ? , UT_NiveauJoueur = ? WHERE UT_Mail = ?;`;
    conn.query(
      sql,
      [
        utilisateur.UT_Nom,
        utilisateur.UT_Bio,
        utilisateur.UT_NiveauMJ,
        utilisateur.UT_NiveauJoueur,
        utilisateur.UT_Mail,
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const deleteUtilisateur = (req, res, deleteUti) => {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM utilisateur WHERE UT_Mail = ?;`;
      conn.query(
        sql,
        [deleteUti],
        (err, result, field) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
};

module.exports = {
  fetchUtilisateur,
  addUtilisateur,
  connUtilisateur,
  modifyUtilisateur,
  deleteUtilisateur,
};
