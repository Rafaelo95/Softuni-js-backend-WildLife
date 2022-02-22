const { isUser, isGuest } = require("../middleware/guards");
const { register, login } = require("../services/userService");
const {mapErrors} = require("../util/mappers");

const router = require("express").Router();

router.get("/register", isGuest(), (req, res) => {
  res.render("register", { title: "Register Page" });
});

// TODO check form input fields/names etc.
router.post("/register", isGuest(), async (req, res) => {
  console.log(req.body.username);
  try {
    if (req.body.password.trim() == "") {
      throw new Error("Password is required");
    } else if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match");
    }

    const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.log(err);

    const errors = mapErrors(err);
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }
    res.render("register", {
      data,
      errors,
      title: "Register Page",
    });
  }
});

router.get("/login", isGuest(), (req, res) => {
  res.render("login", { title: "Login Page" });
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password);
    req.session.user = user;
    res.redirect("/"); 
  } catch (err) {
    console.log(err);

    const data = {
      email: req.body.email,
    }
    const errors = mapErrors(err);
    res.render("login", {
      data,
      errors,
      title: "Login Page",
    });
  }
});

router.get("/logout", isUser(), (req, res) => {
  delete req.session.user;
  res.redirect("/");
});

module.exports = router;
