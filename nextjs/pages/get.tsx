import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { useRouter } from "next/navigation";
const Get = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUser, setcurrentUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}customers/${currentUserId}`
      );
      const data = await res.json();
      setcurrentUser(data);
    };
    getCurrentUser();
  }, [currentUserId]);

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

  const addToCart = (productId: string) => {
    setCartProducts((pre) => [...pre, productId]);
  };
  const handleCartProducts = () => {
    const idCounts: {
      [_id: string]: {
        _id: string;
        title: string;
        price: number;
        quantity: number;
      };
    } = {};

    cartProducts.forEach((item) => {
      const { _id, title, price } = item;

      if (idCounts[_id]) {
        idCounts[_id].quantity++;
      } else {
        idCounts[_id] = { _id, title, price, quantity: 1 };
      }
    });

    const resultArray = Object.values(idCounts);

    return resultArray;
  };

  return (
    <div>
      <h1>Get</h1>
      <h1>Current user: {currentUser?.name}</h1>
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
      <button
        onClick={() => setIsCartVisible((pre) => !pre)}
        className="border border-black p-2"
      >
        Cart
      </button>
      <button
        onClick={() => router.push("/get-orders")}
        className="border border-black p-2 ml-2"
      >
        go to orders
      </button>
      {isCartVisible && (
        <Cart
          products={handleCartProducts()}
          emptyCart={() => setCartProducts([])}
          user={currentUserId}
        />
      )}
      <div className="flex flex-wrap gap-2 justify-center">
        {customers.map((el, i) => (
          <div
            onClick={() => setCurrentUserId(el._id)}
            className="border-2 border-black p-2"
            key={el._id}
          >
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
            <button
              onClick={() => addToCart(el)}
              className=" bg-blue-500 rounded-full p-2 border border-black"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Get;
