import React from "react";

const Cart = ({
  products,
  user,
  emptyCart,
}: {
  products: {
    _id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  user: string;
  emptyCart: () => void;
}) => {
  const totalPrice = products.reduce((total, product) => {
    const { price, quantity } = product;
    return total + price * quantity;
  }, 0);

  const postData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
      method: "POST",
      body: JSON.stringify({
        owner: user,
        totalPrice: totalPrice,
        products: products.map(({ _id, quantity }) => ({
          product: _id,
          quantity: quantity,
        })),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <div className="fixed left-20 top-6  bg-slate-500 border border-black w-[500px] h-96">
      {products.map((product) => (
        <div className="flex flex-row justify-between" key={product._id}>
          <span className="w-[300px]">{product.title}</span>
          <span className="w-[10px]">{product.quantity}</span>
          <span className="w-[10px]">X</span>
          <span className="w-[50px]">{product.price}</span>
        </div>
      ))}
      <h1>Total Price: {totalPrice}</h1>

      <button onClick={postData} className="bg-green-500 text-white p-4 ">
        Create order
      </button>
      <button className="bg-red-500 text-white p-4 " onClick={emptyCart}>
        Empty Cart
      </button>
    </div>
  );
};

export default Cart;
