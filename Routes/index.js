const express = require("express");
const router  = express.Router();


router.get("/", function (req, res) {
  res.render("form");
});

router.post("/submit" , function (req,res){

  req.checkBody("Email" , "Email cannot be empty.").notEmpty();
  req.checkBody("username" , "Username must be at least 8 Characters Long.").islength(min:8);
  req.checkBody("username" , "Username must be less than 25 Characters Long.").isLength({max:25});
  // req.checkBody("Birthyear" , "Birthyear must be between 1900 and 2017.").isLength({min: 1900});
  // req.checkBody("Birthyear" , "Birthyear must be between 1900 and 2017.").isLength({max: 2017});
  req.checkBody("Password", "Password cannoy be empty").notEmpty({min: 8});
  req.checkBody("Password" , "Password cannot be empty.").notEmpty();

  let errors = req.getValidationResult();
  let messages = [];
  errors.then(function(result){
    result.array().forEach(function(error){
      messages.push(error.msg);
    });

    let data = {
      errors: messages,
      name: req.body.name,
      email: req.body.email,
      year: req.body.email,
      position: req.body.position,
      password: req.body.password,
    };

    res.render('results', data);
    });
    });
    module.exports = r
