import Image from "next/image";
import React, { useEffect, useState } from "react";

const Get = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}customers`);
      const data = await res.json();
      setCustomers(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}products?page=${currentPage}`
      );
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [currentPage]);

  return (
    <div>
      <h1>Get</h1>

      <button
        onClick={() => setCurrentPage((pre) => (pre - 1 === 0 ? 1 : pre - 1))}
      >
        {"<"}
      </button>
      {currentPage}
      <button
        onClick={() => setCurrentPage((pre) => (pre + 1 === 10 ? 9 : pre + 1))}
      >
        {">"}
      </button>
      <div className="flex flex-wrap gap-2 justify-center">
        {customers.map((el, i) => (
          <div className="border-2 border-black p-2" key={el._id}>
            <h1>{`UserId: ${el._id} - ID: ${i}`}</h1>
            <h1>{el.name}</h1>
            <p>{el.address}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {products.map((el) => (
          <div className="border-2 border-black p-2 w-52" key={el._id}>
            <h1 className=" font-bold underline">{el.title}</h1>
            <p>{el.desc}</p>
            <p className=" font-bold">${el.price}</p>
            <Image
              src={el.img}
              alt={el.title}
              width={200}
              height={200}
              style={{ aspectRatio: 1, width: 200 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Get;
