import React, { useState } from "react";

const Post = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [returnValue, setReturnValue] = useState<any>(null);

  const postData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: first,
        body: second,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setReturnValue(json);
      });
  };
  return (
    <div>
      <label className="mr-2">Title:</label>
      <input
        type="text"
        value={first}
        onChange={(e) => setFirst(e.target.value)}
      />
      <label className="mr-2">Body:</label>
      <input
        type="text"
        value={second}
        onChange={(e) => setSecond(e.target.value)}
      />
      <button onClick={postData}>Post</button>
      {returnValue && (
        <div>
          <p>userId: {returnValue.userId}</p>
          <p>id: {returnValue.id}</p>
          <p>title: {returnValue.title}</p>
          <p>body: {returnValue.body}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
