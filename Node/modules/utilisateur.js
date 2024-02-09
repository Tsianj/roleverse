const express = require("express");
const utilisateurService = require("../services/utilisateurService");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  let data = req.body;
  // hash du mdp
  bcrypt.hash(data.passwords, 5, (err, hash) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Erreur lors du cryptage du mot de passe." });
      return;
    }
    // Remplace le mdp par le mdp crypté
    data.passwords = hash;
    // Ajouter l'utilisateur
    utilisateurService
      .addUtilisateur(data)
      .then((result) => {
        // Générer un token pour le nouvel utilisateur
        const token = jwt.sign({ user: data }, SECRET, { expiresIn: "1 hour" });
        res.status(201);
        res.json({ access_token: token, user: data });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "Votre ajout ne s'est pas bien passé" });
      });
  });
});
router.get("/:email", (req, res) => {
  const email = req.params.email;
  utilisateurService
    .fetchUtilisateur(email)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Oops...", err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.patch("/", (req, res) => {
  const modifyUti = req.body;
  utilisateurService
    .modifyUtilisateur(modifyUti)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Oops...", err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});
router.delete("/:email", (req, res) => {
  const deleteUti = req.params.email;
  utilisateurService
    .deleteUtilisateur(req, res, deleteUti)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Oops...", err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

module.exports = router;
