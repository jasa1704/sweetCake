import React, { useEffect } from "react";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

export default function Cart() {
  const { itemDetail } = useContext(CartContext);

  useEffect(() => {
    console.log(itemDetail);
  }, {});

  return (
    <div>
      <h1>Resumen de la compra</h1>
      <div>
        {/* {itemDetail.item} */}
      </div>
      <div>{itemDetail.quantity}</div>
    </div>
  );
}
