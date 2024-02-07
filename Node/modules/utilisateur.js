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
            // Générer un token pour le nouvel utilisateur
            const token = jwt.sign({ user: data }, SECRET, { expiresIn: "1 hour" });
            res.status(201);
            res.json({ access_token: token, user: data });
          })
          .catch((err) => {
            console.log(err);
            res.send({ message: "Votre ajout ne s'est pas bien passé" });
          });
    })
   
  });
  router.get("/:email", (req, res) => {
    const email = req.params.email;
    console.log(email);
    utilisateurService.fetchUtilisateur(email).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.error("Oops...", err);
      res.json({ "message": "Error" + err.sqlMessage });
    });
  });

module.exports = router;

// const express = require("express");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const utilisateurService = require("../services/utilisateurService");
// const router = express.Router();

// const SECRET = "secret";  // Assurez-vous d'utiliser la même clé secrète pour signer vos tokens

// router.post("/authentification", async (req, res) => {
//     let data = req.body;

//     try {
//         // Vérifier si l'utilisateur existe pour la connexion
//         const existingUser = await utilisateurService.connUtilisateur(data);

//         if (existingUser.length > 0) {
//             // L'utilisateur existe, comparer les mots de passe
//             bcrypt.compare(data.passwordsConn, existingUser[0].UT_Password, (err, resultCompare) => {
//                 if (resultCompare) {
//                     // Connexion réussie, générer un token
//                     const token = jwt.sign({ user: existingUser[0] }, SECRET, { expiresIn: "1 hour" });

//                     res.status(200);
//                     res.json({ access_token: token, user: existingUser[0] });
//                 } else {
//                     // Mot de passe incorrect
//                     res.status(401);
//                     res.json({ message: "Erreur de mot de passe" });
//                 }
//             });
//         } else {
//             // L'utilisateur n'existe pas, procéder à l'inscription
//             bcrypt.hash(data.passwords, 5, (err, hash) => {
//                 if (err) {
//                     res.status(500).send({ message: "Erreur lors du cryptage du mot de passe." });
//                     return;
//                 }
//                 // Remplace le mot de passe par le mot de passe crypté
//                 data.passwords = hash;

//                 // Ajouter l'utilisateur
//                 utilisateurService.addUtilisateur(data).then((result) => {
//                     // Générer un token pour le nouvel utilisateur
//                     const token = jwt.sign({ user: data }, SECRET, { expiresIn: "1 hour" });

//                     res.status(201);
//                     res.json({ access_token: token, user: data });
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     res.status(500).send({ message: "Erreur lors de l'ajout de l'utilisateur." });
//                 });
//             });
//         }
//     } catch (err) {
//         // Erreur lors de l'authentification ou de l'inscription
//         res.status(500).send({ message: "Erreur lors de l'authentification." });
//     }
// });

// module.exports = router;
