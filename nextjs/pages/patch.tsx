import React, { useState } from "react";

const Patch = () => {
  const [first, setFirst] = useState("");
  const [id, setId] = useState(1);
  const [returnValue, setReturnValue] = useState<any>(null);

  const patchData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: first,
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
      <label className="mr-2">ID:</label>
      <input
        type="number"
        min={1}
        max={100}
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />

      <button onClick={patchData}>Patch</button>
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

export default Patch;
