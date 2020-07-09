const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateForgotPasswordInput = require("../../validation/ForgotPassword");
const validateChangePasswordInput = require("../../validation/changePassword");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // password2: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/changePassword", (req, res) => {
  let { errors, isValid } = validateChangePasswordInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  var { email, oldPassword, newPassword } = req.body;
  // const email = req.body.email;
  // const oldPassword = req.body.oldPassword;
  // const newPassword = req.body.newPassword;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(oldPassword, user.password).then((isMatch) => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            User.findOneAndUpdate(
              req.userId,
              { $set: { password: newPassword } },
              () => res.json({ success: "Password changed Successfully." })
            );
          });
        });
      } else {
        return res
          .status(400)
          .json({ error: "Incorrect old password, Please try again." });
      }
    });
  });
});

router.post("/forgotPassword", (req, res) => {
  const { errors, isValid } = validateForgotPasswordInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  var { email, newPassword } = req.body;

  // const email = req.body.email;
  // const newPassword = req.body.newPassword;

  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err;
        newPassword = hash;
        User.findOneAndUpdate(
          req.userId,
          { $set: { password: newPassword } },
          () => res.json({ success: "Password changed successfully." })
        );
      });
    });
  });
});

router.post("/send", (req, res, next) => {
  const { errors, isValid } = validateForgotPasswordInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;

  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    var readHTMLFile = function(path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
        if (err) {
          throw err;
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };

    var transport = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "hasmukhgagal70@gmail.com",
        pass: "@h141099",
      },
    };

    var transporter = nodemailer.createTransport(transport);

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take messages");
      }
    });

    readHTMLFile("client/public/email.html", function(err, html) {
      var name = req.body.name;
      var email = req.body.email;
      var verificationCode = req.body.code;
      var content = `name: ${name} \n email: ${email} `;

      var template = handlebars.compile(html);
      var htmlToSend = template(replacements);
      var replacements = {
        userName: req.body.name,
      };

      var mail = {
        from: name,
        to: email, //Change to email address that you want to receive messages on
        subject: "Reset Password",
        text: "1234",
        html: htmlToSend + verificationCode,
      };

      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.json({
            msg: "fail",
          });
        } else {
          res.json({
            msg: "success",
          });
        }
      });
    });
  });

  // router.get('/veri')
});
module.exports = router;
