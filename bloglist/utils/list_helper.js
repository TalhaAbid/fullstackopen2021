const lodash = require("lodash");
const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, current) => {
    return accumulator + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, current) => (max.likes > current.likes ? max : current),
    { likes: -1 }
  );
};
const mostBlogs = (blogs) => {
  let maxAuthor = blogs.reduce(
    (currMax, current) => {
      let temp = blogs.filter((blog) => blog.author === current.author);
      return temp.length > currMax.blogs
        ? { author: temp[0].author, blogs: temp.length }
        : currMax;
    },
    { blogs: 0, author: "empty" }
  );
  return maxAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let newList = lodash(blogs).groupBy("author").value();
  let mostLikes = Object.keys(newList).map((key) => [key, newList[key]]);
  let maxList = mostLikes.reduce(
    (maxBlogList, currentBlogList) => {
      return maxBlogList.likes >= totalLikes(currentBlogList[1])
        ? maxBlogList
        : { author: currentBlogList[0], likes: totalLikes(currentBlogList[1]) };
    },
    { likes: -1 }
  );
  return maxList;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
