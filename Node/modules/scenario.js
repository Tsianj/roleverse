const express = require("express");
const router = express.Router();
const scenarioService = require("../services/scenarioSerivce");

router.get("/", (req, res) => {
    escapesService.fetchEscapes().then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

module.exports = router;
