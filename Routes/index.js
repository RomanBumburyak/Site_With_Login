const express = require("express"); //only need these two on this page
const router  = express.Router();
// const expressValidator = require('express-validator');
// const bodyParser = require('body-parser'),

let user = { username: "IronYard", password: "IronPints"};

function authenticate(req, res, next) {
  if (req.session.token) {
    res.redirect("/results");
  } else {
    console.log("No token");
    next();
  }
}

router.get("/", authenticate, function(req, res) {
  res.render("login"); // When you render it's a mustache, WE RENDER VIEWS
});

router.get("/results", function(req, res, next) {
  if (req.session.token) {
    next();
  } else {
    res.redirect("/")
  }
}, function(req, res) {
  res.render("results", req.session.user);
});

router.post("/results", function(req, res) {
  let obj = {
    username: req.body.username,
    password: req.body.password
  };

  if (obj.username == user.username && obj.password == user.password) {
    req.session.user = obj;
    req.session.token = "afs29628";
    res.redirect("/results");
  } else {
    res.redirect("/");
  }
});

router.get("/logout", function(req, res) {
  // req.session.destroy(); is good too
  req.session.destroy(function(err) {
    console.log(err);
  });

  res.redirect("/");
});
//VALIDATIONS========================================================================
  router.post("/", function(req, res) {
    req.checkBody("username" , "username cannot be empty.").notEmpty();
    req.checkBody("username" , "Username must be at least 8 Characters Long.").isLength({min:8});
    req.checkBody("username" , "Username must be at least 8 Characters Long.").alphaNummeric({min:8});

    req.checkBody("username" , "Username must be less than 25 Characters Long.").isLength({max:25});
    // req.checkBody("Birthyear" , "Birthyear must be between 1900 and 2017.").isLength({min: 1900});
    // req.checkBody("Birthyear" , "Birthyear must be between 1900 and 2017.").isLength({max: 2017});
    req.checkBody("Password", "Password cannot be empty").notEmpty({min: 8});
    req.checkBody("Password" , "Password cannot be empty.").notEmpty();
    req.check('Password', 'Error Message').notEmpty().isInt();


  // app.use(bodyParser.bodyParser({ extended: true })); //ASK BRICE
  // app.use(expressValidator([options]));  //ASK BRICE

  let errors = req.getValidationResult();
  let messages = [];
  errors.then(function(result){
    result.array().forEach(function(error){
      messages.push(error.msg);
    });

    let data = {
      errors: messages,
      username: req.body.name,
      password: req.body.password
    };

    res.render('results', data);
    });
  });

    module.exports = router;
