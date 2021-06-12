const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./testHelper");
const app = require("../app");
const api = supertest(app);
const jsonType = /application\/json/;
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

let token;
beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const passwordHash = await bcrypt.hash("secret", 10);
  const user = new User({
    username: "root",
    name: "root",
    passwordHash,
  });
  const savedUser = await user.save();
  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };
  token = jwt.sign(userForToken, process.env.SECRET);

  for (let blog of helper.sampleBlogs) {
    blog.user = savedUser._id;
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("When there is initially some blogs saved", () => {
  test("notes are returned as json", async () => {
    await api.get("/api/blogs").expect(200).expect("Content-Type", jsonType);
  });
  test("get /api/blogs returns all the blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.sampleBlogs.length);
  });
  test("specific blog is within returned  notes", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((blog) => blog.title);
    expect(contents).toContain("React patterns");
  });
  test("unique id exists", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).toBe(undefined);
  });
});
describe("addition of a new blog", () => {
  test("succesful additon of a valid blog", async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", jsonType);
    const blogsAfterAddition = await helper.getAllInDB();
    expect(blogsAfterAddition).toHaveLength(helper.sampleBlogs.length + 1);
    const blogTitles = blogsAfterAddition.map((blog) => blog.title);
    expect(blogTitles).toContain("React patterns");
  });
  test("if the likes property is missing then it will default to 0", async () => {
    const blogsBeforeAddition = await helper.getAllInDB();
    const missingLikesBlog = {
      title: "This blog doesnt have the likes property",
      author: "Talha Abid",
      url: "https://google.com",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(missingLikesBlog)
      .expect(200)
      .expect("Content-Type", jsonType);

    const blogsAfterAddition = await helper.getAllInDB();
    expect(blogsAfterAddition).toHaveLength(blogsBeforeAddition.length + 1);
    const [newBlog] = blogsAfterAddition.filter(
      (blog) => blog.title === "This blog doesnt have the likes property"
    );
    expect(newBlog.likes).toBe(0);
  });
  test("if the title and url are missing then proper response is given", async () => {
    const blogsBeforeReq = await helper.getAllInDB();
    const emptyBlog = {
      author: "Robert C. Martin",
      likes: 10,
    };
    await api.post("/api/blogs").send(emptyBlog).expect(400);
    const blogsAfterReq = await helper.getAllInDB();
    expect(blogsAfterReq).toHaveLength(blogsBeforeReq.length);
  });
  test("adding fails with improper authorization with the correct response", async () => {
    const blogsBeforeReq = await helper.getAllInDB();
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
    const blogsAfterReq = await helper.getAllInDB();
    expect(blogsAfterReq).toHaveLength(blogsBeforeReq.length);
  });
});

describe("test delete", () => {
  test("delete with  the proper id works", async () => {
    const preDelete = await helper.getAllInDB();
    const toDelete = preDelete[0];
    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);
    const postDelete = await helper.getAllInDB();
    expect(postDelete).toHaveLength(preDelete.length - 1);
  });
});
describe("post with valid id updates the blog", () => {
  test("valid id", async () => {});
});

describe("When there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "talha",
      name: "Talha Abid",
      password: "sekretpassword",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
  test("creation fails with a non unique username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "rooot",
      password: "secret",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    const usersnames = usersAtEnd.filter(
      (user) => user.username === newUser.username
    );
    expect(usersnames).toHaveLength(1);
  });
  test("creation fails with a missing password", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "unique username",
      name: "unique name",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    const userNames = usersAtEnd.filter(
      (user) => user.username === newUser.username
    );
    expect(userNames).toHaveLength(0);
  });
  test("creation fails with a password length less than 3", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "unique username",
      name: "unique name",
      password: "ab",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    const userNames = usersAtEnd.filter(
      (user) => user.username === newUser.username
    );
    expect(userNames).toHaveLength(0);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
