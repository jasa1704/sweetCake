import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './CartWidget.scss';

export default function CartWidget() {
  return (
    <>
      <div className="container-cart-widget">
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </>
  );
}
