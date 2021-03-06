const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const auth = require("basic-auth");

const authenticateUser = (req, res, next) => {
  const credentials = auth(req);
  if (credentials) {
    User.findOne({ where: { emailAddress: credentials.name } }).then(user => {
      if (user) {
        const authenticated = bcrypt.compareSync(
          credentials.pass,
          user.password
        );
        if (authenticated) {
          req.logedUser = user;
          next();
        } else {
          res.status(401).json({ errors: ["access denied"] });
        }
      } else {
        res.status(401).json({ errors: ["user does not exist"] });
      }
    });
  } else {
    res.status(401).json({ errors: ["no credentials received"] });
  }
};

router.get("/", authenticateUser, (req, res) => {
  res.json({
    id: req.logedUser.id,
    firstName: req.logedUser.firstName,
    lastName: req.logedUser.lastName,
    emailAddress: req.logedUser.emailAddress
  });
});

router.post("/", (req, res) => {
  const reqUser = req.body;

  User.findOne({ where: { emailAddress: reqUser.emailAddress } })
    .then(foundUser => {
      if (foundUser) {
        res.status(400).json({ errors: ["the user alredy exist"] });
      } else {
        if (reqUser.password) {
          reqUser.password = bcrypt.hashSync(reqUser.password);
        } else {
          reqUser.password = "";
        }
        User.create(reqUser)
          .then(() =>
            res
              .status(201)
              .location("/")
              .end()
          )
          .catch(err => {
            let resCode = 0;
            if (
              err.name === "SequelizeValidationError"
            ) {
              resCode = 400;
            } else {
              resCode = 500;
            }
            let errors = [];
            err.errors.forEach(error => errors.push(error.message));
            res.status(resCode).json({ errors: errors });
          });
      }
    })
    .catch(err => res.status(400).json({ errors: err.errors }));
});

module.exports = router;
