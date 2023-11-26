import { useEffect, useState } from "react";
interface Product {
  _id: string;
  title: string;
  desc: string;
  price: number;
  img: string;
  createedAt: Date;
  updatedAt: Date;
  __v: number;
}

const GetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("rerender");

    const fetchProducts = async () => {
      const res = await fetch(
        `http://localhost:8000/products?page=${currentPage}`
      );
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [currentPage]);

  return (
    <div>
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
        {products.map((el) => (
          <div className="border-2 border-black p-2 w-52" key={el._id}>
            <h1 className=" font-bold underline">{el.title}</h1>
            <p>{el.desc}</p>
            <p className=" font-bold">${el.price}</p>
            <img
              className=" aspect-square"
              src={el.img}
              alt={el.title}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetProducts;
