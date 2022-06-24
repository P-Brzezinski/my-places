const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "max@gmail.com",
    password: "1234",
  },
  {
    id: "u2",
    name: "Manu",
    email: "manu@gmail.com",
    password: "4321",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = USERS.find((user) => user.email === email);
  if (hasUser) {
    throw new HttpError("Coulnd not create user, email already exists", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = USERS.find((user) => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user.", 401);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
