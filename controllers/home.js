const { getPosts, getPostById } = require("../services/postService");
const { postViewModel } = require("../util/mappers");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Home page" });
});

router.get("/catalog", async (req, res) => {
  const posts = (await getPosts()).map(postViewModel);
  res.render("catalog", { title: "Catalog page", posts });
});

router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const post = postViewModel(await getPostById(id));

  if(req.session.user) {
    post.hasUser = true;
    if (req.session.user._id == post.author._id) { 
      post.isAuthor = true;
    }
  } 

  res.render("details", { title: post.title, post });
});

module.exports = router;
