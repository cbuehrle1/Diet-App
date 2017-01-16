var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var setUpPassport = require("./setuppassport");
var User = require("./models/user");

var app = express();

mongoose.connect("mongodb://localhost:27017/foodpairing");

setUpPassport();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(session({
  secret: "bananaapple1305%$3#orange44521$$GdAGVvf!",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", function(req, res) {
  User.find()
    .sort({ createAt: "descending" })
    .exec(function(err, users) {
      if (err) { return next(err) }
      res.render("index", { users: users });
    });
});

app.get("/login", function(req, res) {
  res.render("login.ejs");
});

app.get("/signup", function(req, res) {
  res.render("signup.ejs")
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

app.post("/signup", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      return res.redirect("/login");
    }

    var newUser = new User ({
      username: username,
      password: password
    });

    newUser.save(next);

    });
  }, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
}));


app.listen(5000, function() {
  console.log('listening on port 5000.');
});
