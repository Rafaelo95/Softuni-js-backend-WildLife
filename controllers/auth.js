const { register, login } = require("../services/userService");

const router = require("express").Router();

router.get("/register", (req, res) => {
  res.render("register", { layout: false });
});

// TODO check form input fields/names etc.
router.post("/register", async (req, res) => {
  console.log(req.body.username);
  try {
    if (req.body.password != req.body.repass) {
      throw new Error("Passwords don't match");
    }

    const user = await register(req.body.username, req.body.password);
    req.session.user = user;
    res.redirect("/"); // TODO check redirect requirements
  } catch (err) {

      //TODO send error messages
    res.render("register", {
      layout: false,
      data: { username: req.body.username },
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

// TODO check form action, method, field names etc.
router.post("/login", async (req, res) => {
  try {
    const user = await login(req.body.username, req.body.password);
    req.session.user = user;
    res.redirect("/"); // TODO CHECK redirect requirements
  } catch (err) {
    console.log(err);

    //TODO send error messages
    res.render("login", {
      layout: false,
      data: { username: req.body.username },
    });
  }
});

module.exports = router;
