const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const utilisateur = require("./modules/utilisateur");
const scenario = require("./modules/scenario");
const utilisateurService = require("./services/utilisateurService");
const app = express();
const port = 3000;
const mailer = require("./modules/nodemailer");
app.use(express.json());
const SECRET = "secret";
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

/* Partie Token */
/* Récupération du header bearer */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};
/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Présence d'un token
  if (!token) {
    return res.status(401).json({ message: "Token inexistant" });
  }
  // Véracité du token
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Mauvais token" });
    } else {
      return next();
    }
  });
};

app.get("/", checkTokenMiddleware, (req, res) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Décodage du token
  const decoded = jwt.decode(token, { complete: false });

  if (decoded != null && decoded != undefined) {
    res.send("Hello World!");
  } else {
  }
});
/* Fin partie token */
app.use("/utilisateur", utilisateur);
app.use("/scenario", scenario);
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
            const token = jwt.sign(
              {
                user: result[0],
              },
              SECRET,
              { expiresIn: "1 hours" }
            );
            res.status(200);
            res.json({access_token: token, user: result[0]});
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
// app.post("/connexion", async (req, res) => {
//   let data = req.body;

//   try {
//     const existingUser = await utilisateurService.connUtilisateur(data);

//     if (existingUser.length > 0) {
//       bcrypt.compare(data.passwordsConn, existingUser[0].UT_Password, (err, resultCompare) => {
//         if (resultCompare) {
//           const token = jwt.sign({ user: existingUser[0] }, SECRET, { expiresIn: "1 hour" });
//           res.status(200);
//           res.json({ access_token: token, user: existingUser[0] });
//         } else {
//           res.status(401);
//           res.json({ message: "Erreur de mot de passe" });
//         }
//       });
//     } else {
//       bcrypt.hash(data.passwords, 5, (err, hash) => {
//         if (err) {
//           res.status(500).send({ message: "Erreur lors du cryptage du mot de passe." });
//           return;
//         }
//         data.passwords = hash;

//         utilisateurService.addUtilisateur(data).then((result) => {
//           const token = jwt.sign({ user: data }, SECRET, { expiresIn: "1 hour" });
//           res.status(201);
//           res.json({ access_token: token, user: data });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).send({ message: "Erreur lors de l'ajout de l'utilisateur." });
//         });
//       });
//     }
//   } catch (err) {
//     res.status(500).send({ message: "Erreur lors de l'authentification." });
//   }
// });

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
