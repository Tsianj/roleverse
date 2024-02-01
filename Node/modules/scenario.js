const express = require("express");
const router = express.Router();
const scenarioService = require("../services/scenarioService");

router.get("/", (req, res) => {
  scenarioService.fetchScenario().then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.error("Oops...", err);
    res.json({ "message": "Error" + err.sqlMessage });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  scenarioService.fetchScenarioById(id).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.error("Oops...", err);
    res.json({ "message": "Error" + err.sqlMessage });
  });
});

module.exports = router;