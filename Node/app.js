const express = require("express");
const cors = require("cors");
const utilisateur = require("./modules/utilisateur");
const utilisateurService = require("./services/utilisateurService");
const app = express();
const port = 3000;
const mailer = require("./modules/nodemailer");
app.use(express.json());
const bcrypt = require("bcrypt");

const allowedOrigins = ["http://localhost:3001", "http://127.0.0.1:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use("/utilisateur", utilisateur);
app.post("/connexion", (req, res) => {
  let data = req.body;
  console.log(data);
  utilisateurService
    .connUtilisateur(data)
    .then((result) => {
      bcrypt.compare(
        data.passwordsConn,
        result[0].UT_Password,
        function (err, resultCompare) {
          if (resultCompare == true) {
            res.status(200);
            res.json(result[0]);
          } else {
            res.status(401);
            res.json({ message: "Erreur de mot de passe" });
            return;
          }
        }
      );
    })
    .catch((err) => {
      res.status(401);
      res.send({ message: "Vérifiez votre adresse mail et votre mot de passe." });
    });
});

app.post("/mail", (req, res) => {
  const data = req.body;
  mailer
    .main(data)
    .then(() => {
      res.json({ message: "Email envoyé!" });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: `Erreur : ${e}` });
    });
});

app.listen(port, () => {
  console.log(
    `Application exemple à l'écoute sur le port http://localhost:${port}/ !`
  );
  console.log(`Route utilisateur : http://localhost:${port}/utilisateur !`);
});
