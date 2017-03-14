e
var Diet = require("./models/diet.js");
var Catagory = require("./models/catagory.js");
var uuid = require("node-uuid");

module.exports = function() {

  var router = express.Router();

  router.post("/api/diet", function(req, res) {

    var cb = (err, data) => {
      // console.log(data);
      res.send(data);r
    }

    var diet = new Diet();
    diet.userId = req.user._id;
    diet.name = req.body.diet;
    diet.calories = req.body.calories;
    diet.fat = req.body.fats;
    diet.carbohydrates = req.body.carbs;
    diet.protein = req.body.protein;
    diet.active = false;
    diet.save(cb);
  });

  router.get("/api/diet", function(req, res) {

    var diets = []

    Diet.find({
      userId: req.user._id
    })
    .exec(function(err, data) {

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
          id: diet._id,
          active: diet.active
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

  router.post("/api/makeactive/:dietId", function(req, res) {

    var cb1 = (err, data) => {
      // console.log(data);
      res.send(data);
    }

    var cb = (err, data) => {
      // console.log(data);

      Diet.findByIdAndUpdate(
        req.params.dietId,
        {active: true},
        {safe: true, new: true},
        cb1)
      }

    Diet.findOneAndUpdate(
      { active: true },
      { active: false },
      {safe: true, new: true},
      cb)


  });

  router.delete("/api/diet/:dietId", function(req, res) {
    var cb = (err, data) => {
      res.sendStatus(204);
    }
    Diet.findByIdAndRemove(req.params.dietId, cb);
  });

  router.post("/api/catagory", function(req, res) {

    var cb = (err, data) => {
      console.log(data);
      res.send(data);
    }

    console.log(req.body);

    var catagory = new Catagory();
    catagory.dietId = req.body.dietId;
    catagory.name = req.body.name;
    catagory.save(cb);

  });

  router.get("/api/catagory/:dietId", function(req, res) {
    console.log(req.params.dietId);
    Catagory.find({
      dietId: req.params.dietId
    })
    .exec(function (err, data) {
      // console.log(data);
      if (err) {
        console.log(err)
      }

      var catagories = []

      if (data === undefined) {
        // console.log(data)
        res.send( {} );
      } else {

        data.forEach(function(catagory) {

         var item = {
           id: catagory._id,
           name: catagory.name,
           recipes: catagory.recipes
         }

         catagories.push(item);
       });

       res.send({
         catagories: catagories
       });

      }

    });
  });

  router.post("/api/catagory/:catagoryId/recipe", function(req, res) {

    var cb = (err, data) => {
      console.log(data);
      res.send(data);
    }

    console.log(req.body);

    var recipe = {
      id: uuid.v4(),
      name: req.body.name,
      servings: req.body.servings,
      readyInMinutes: req.body.readyInMinutes,
      image: req.body.image,
      nutrients: req.body.nutrients,
      extendedIngredients: req.body.extendedIngredients,
      analyzedInstructions: req.body.analyzedInstructions
    }

    Catagory.findByIdAndUpdate(
      req.params.catagoryId,
      {$push: {"recipes": recipe}},
      {safe: true, upsert: true, new: true},
      cb)

  })

  router.post("/api/catagory/:catagoryId/recipe/:recipeId", function(req, res) {

    var cb = (err, data) => {

      if (err) {
        console.log(err);
      }

      res.send(data);
    }

    var info;

    var newArr = (err, data) => {
      var recipeArr = []

      data.recipes.forEach((recipe, index) => {

        if (recipe.id !== req.params.recipeId) {
            recipeArr.push(recipe)
        }

      });

      info = recipeArr;

      Catagory.findByIdAndUpdate(req.params.catagoryId, { recipes: info }, {new: true, safe: true}, cb)
    }

    Catagory.findById(req.params.catagoryId, newArr);


  })

  return router;
}
