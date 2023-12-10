import Image from "next/image";
import React, { useEffect, useState } from "react";

const GetOrders = () => {
  const [customerId, setCustomerId] = useState("");
  const [orders, setOrders] = useState<any[]>();
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}customers`);
      const data = await res.json();
      setCustomers(data);
    };
    getData();
  }, []);

  // Function to fetch product details
  const fetchProductDetails = async (productId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`
    );
    const product = await res.json();
    console.log(product);

    return product;
  };

  // Update fetchOrders to include product details
  const fetchOrders = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}orders/customer/${customerId}`
    );
    const ordersData = await res.json();

    // Fetch product details for each order
    const ordersWithProductDetails = await Promise.all(
      ordersData.map(async (order: any) => {
        const products = await Promise.all(
          order.products.map(async (item: any) => {
            const productDetails = await fetchProductDetails(item.product);
            return { ...item, productDetails };
          })
        );
        return { ...order, products };
      })
    );

    setOrders(ordersWithProductDetails);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center">
        {customers.map((el, i) => (
          <div
            onClick={() => setCustomerId(el._id)}
            className="border-2 border-black p-2"
            key={el._id}
          >
            <h1>{`UserId: ${el._id} - ID: ${i}`}</h1>
            <h1>{el.name}</h1>
            <p>{el.address}</p>
          </div>
        ))}
      </div>
      <button onClick={fetchOrders}>list orders</button>
      <div>
        {orders?.map((order, orderIndex) => (
          <div key={order._id}>
            <h1>Order ID: {order._id}</h1>
            <div className="flex flex-row">
              {order.products.map((item: any, itemIndex: number) => (
                <div
                  key={`${orderIndex}-${itemIndex}`}
                  className="flex flex-row items-center"
                >
                  <div className="border border-black p-2 w-32">
                    <h1>{item.productDetails.title}</h1>
                    <h1>{item.productDetails.price}</h1>
                    <Image
                      src={item.productDetails.img}
                      alt={item.productDetails.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <span>X {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetOrders;
