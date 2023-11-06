import React, { useState } from "react";

const Delete = () => {
  const [id, setId] = useState(1);
  const DeleteData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(() => console.log("delete success"));
  };
  return (
    <div>
      Delete
      <label className="mr-2">ID:</label>
      <input
        type="number"
        min={1}
        max={100}
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button onClick={DeleteData}>delete</button>
    </div>
  );
};

export default Delete;
