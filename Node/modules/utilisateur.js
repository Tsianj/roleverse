const express = require("express");
const utilisateurService = require("../services/utilisateurService");
const router = express.Router();
const bcrypt = require ('bcrypt');

router.post("/", (req, res) => {
    let data = req.body;
    // hash du mdp 
    bcrypt.hash(data.passwords, 5, (err, hash) => {
        if (err) {
            res.status(500).send({"message" : "Erreur lors du cryptage du mot de passe."})
            return;
        }
        // Remplace le mdp par le mdp crypté
        data.passwords = hash;
        // Ajouter l'utilisateur
        utilisateurService.addUtilisateur(data).then((result) => {
            res.status(201);
            res.json(data);
          })
          .catch((err) => {
            console.log(err);
            res.send({ message: "Votre ajout ne s'est pas bien passé" });
          });
    })
   
  });


module.exports = router;