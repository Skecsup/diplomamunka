import React, { useState } from "react";

const Put = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [id, setId] = useState(1);
  const [userId, setUserId] = useState(1);
  const [returnValue, setReturnValue] = useState<any>(null);

  const putData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: first,
        body: second,
        userId: userId,
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
      <label className="mr-2">ID:</label>
      <input
        type="number"
        min={1}
        max={100}
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <label className="mr-2">UserID:</label>
      <input
        type="number"
        min={1}
        max={10}
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <button onClick={putData}>Post</button>
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

export default Put;
