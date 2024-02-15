const express = require("express");
const router = express.Router();
const racesService = require("../services/racesService");

router.get("/", (req, res) => {
  racesService.fetchRaces().then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.error("Oops...", err);
    res.json({ "message": "Error" + err.sqlMessage });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  racesService.fetchRacesById(id).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.error("Oops...", err);
    res.json({ "message": "Error" + err.sqlMessage });
  });
});

module.exports = router;