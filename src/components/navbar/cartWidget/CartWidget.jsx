import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../../../context/cartContext";
import { useContext } from "react";
import './CartWidget.scss';

export default function CartWidget() {
  const { products } = useContext(CartContext);

  return (
    <>
      <div className="container-cart-widget">
        <FontAwesomeIcon icon={faShoppingCart} />
        {products.length > 0 && <span class="badge">{products.length}</span>}
      </div>
    </>
  );
}
