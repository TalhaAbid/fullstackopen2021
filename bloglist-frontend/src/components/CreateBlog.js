import React, { useState } from "react";

const CreateBlog = ({
  blogInputs,
  blogsInputHandler,
  blogSubmitHandler,
  createBlog,
}) => {
  return (
    <form onSubmit={blogSubmitHandler}>
      <div>
        title:{" "}
        <input
          name="title"
          type="text"
          value={blogInputs["title"]}
          onChange={(event) => blogsInputHandler(event)}
        />
      </div>
      <div>
        author:{" "}
        <input
          name="author"
          type="text"
          value={blogInputs["author"]}
          onChange={(event) => blogsInputHandler(event)}
        />
      </div>
      <div>
        url:{" "}
        <input
          name="url"
          type="text"
          value={blogInputs["url"]}
          onChange={(event) => blogsInputHandler(event)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlog;
