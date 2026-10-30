const express = require("express");

const athleteControllers = require("../controllers/athleteControllers");

const router = express.Router();

router
  .route("/")
  .get(athleteControllers.getAllAthletes)
  .post(athleteControllers.createAthlete);

router
  .route("/:id")
  .get(athleteControllers.getAthleteById)
  .put(athleteControllers.updateAthlete)
  .delete(athleteControllers.deleteAthlete);

module.exports = router;
