const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
  const emptyList = [];
  test("of empty list", () => {
    expect(totalLikes(emptyList)).toBe(0);
  });
  const oneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  test("list with one blog", () => {
    expect(totalLikes(oneBlog)).toBe(5);
  });
  const multipleBlogs = [
    {
      title: "test",
      author: "talha",
      url: "google.com",
      likes: 50,
      id: "60b57a83bb5442ada5e06d75",
    },
    {
      title: "fundemental theorem of algebra",
      author: "gauss",
      url: "google.com",
      likes: 10000,
      id: "60b57ab8bb5442ada5e06d76",
    },
  ];
  test("multiple blogs", () => {
    expect(totalLikes(multipleBlogs)).toBe(10050);
  });
});
