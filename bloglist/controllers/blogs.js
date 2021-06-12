const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (body.title === undefined && body.url === undefined) {
    response.status(400).end();
    return;
  }
  const token = request.token;
  if (token === null || !request.user.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(request.user.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog.toJSON());
});

blogRouter.delete("/:id", async (request, response, next) => {
  const token = request.token;
  const user = request.user;
  if (token === null || request.user === null) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog.user._id.toString() === user.id) {
    await Blog.deleteOne({ _id: blogId });
    response.sendStatus(204);
  } else {
    response.status(403).json({ error: "forbidden: invalid user" });
  }
});

blogRouter.post("/:id", async (request, response, next) => {
  const body = request.body;
  if (body.title === undefined && body.url === undefined) {
    response.status(400).end();
    return;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedNote);
});
module.exports = blogRouter;
