const User = require("../models/User");
const { compare, hash } = require("bcrypt");

// TODO add all fields required as per exam description
async function register(username, password) {
  const existing = await getUserByUsername(username);

  if (existing) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await hash(password, 10);

  const user = new User({
    username,
    hashedPassword,
  });

  await user.save();

  return user;
}

// TODO change identifier
async function login(username, password) {
  const user = await getUserByUsername(username);
  // console.log(user);

  if (!user) {
    throw new Error("User doesn't exist.")
  }

  const hasMatch = await compare(password, user.hashedPassword);
  if (!hasMatch) {
    throw new Error("Incorrect password");
  }
  return user;
}

// TODO identify user by given identifier
async function getUserByUsername(username) {
  const user = await User.findOne({ username });
  return user;
}

module.exports = {
  login,
  register
};