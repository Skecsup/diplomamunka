import React, { useEffect, useState } from "react";

const Get = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = () => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => setData(json));
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Get</h1>
      <div className="flex flex-wrap gap-2 justify-center">
        {data.map((el) => (
          <div
            className="border-2 border-black w-40 p-2"
            key={`${el.userId} - ${el.id}`}
          >
            <h1>{`UserId: ${el.userId} - ID: ${el.id}`}</h1>
            <h1>{el.title}</h1>
            <p>{el.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Get;
