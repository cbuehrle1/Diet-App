var express = require('express');
var User = require("./models/user.js");
var Diet = require("./models/diet.js");

module.exports = function() {

  var router = express.Router();

  router.get("/api/user", function(req, res) {
    var userInfo = {}

    User.find({
      _id: req.user._id
    })
    .exec(function(err, data) {
      console.log(data);
      if (err) {
        console.log(err);
      }

      userInfo = {
        id: data[0]._id,
        email: data[0].username,
        displayName: data[0].displayName
      }

      res.send(userInfo);
    });
  });

  router.post("/api/diet", function(req, res) {

    var cb = (err, data) => {
      console.log(data);
      res.send(data);
    }

    var diet = new Diet();
    diet.userId = req.user._id;
    diet.name = req.body.diet;
    diet.calories = req.body.calories;
    diet.fat = req.body.fats;
    diet.carbohydrates = req.body.carbs;
    diet.protein = req.body.protein;
    diet.save(cb);
  });

  router.get("/api/diet", function(req, res) {

    var diets = []

    Diet.find({
      userId: req.user._id
    })
    .exec(function(err, data) {
      console.log(data);
      if (err) {
        console.log(err);
      }

      data.map(function(diet) {
        var item = {
          diet: diet.name,
          calories: diet.calories,
          fat: diet.fat,
          carbs: diet.carbohydrates,
          protein: diet.protein,
          id: diet._id
        }
        diets.push(item)
      });

      res.send({
        diets: diets
      });

    });
  });

  router.get("/api/diet/:dietId", function(req, res) {

    var diet;

    Diet.find({
      _id: req.params.dietId
    })
    .exec(function(err, data) {
      if (err) {
        console.log(err)
      }

      diet = data;

      res.send({
        diet: diet
      });
    });

  });

  router.post("/api/diet/:dietId", function(req, res) {

    var cb = (err, data) => {
      console.log(data);
      res.send(data);
    }

    Diet.findByIdAndUpdate(
      req.params.dietId,
      {name: req.body.diet,
      calories: req.body.calories,
      fat: req.body.fats,
      carbohydrates: req.body.carbs,
      protein: req.body.protein},
      {safe: true, new: true},
      cb);
  });

  return router;
}
