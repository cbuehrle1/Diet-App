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


  })

  return router;
}
