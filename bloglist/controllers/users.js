const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (body.password === undefined || body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password is too short or missing" })
      .end();
  }
  const saltRounds = 10;
  let hash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name || body.username,
    passwordHash: hash,
  });

  const savedUser = await user.save();
  response.json(savedUser.toJSON());
});

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
