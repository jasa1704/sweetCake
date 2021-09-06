import React, {useState, useCallback} from "react";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";
import "./CartList.scss";
import ItemCard from '../containerList/cardList/card/ItemCard'

export default function CartList() {

  const { products } = useContext(CartContext);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const quantityProducts = ()=> {
    forceUpdate();
  }

  return (
    <>
      <div className="container-item-list">
        <div className="list">
          <div>
            <div className="title-category">
              <h1> Tu compra </h1>
            </div>
              {
                products.length === 0 && 
                <div>
                  <h1>Aun no has agregado productos al carrito</h1> 
                  <a className="add-products" href="/products">Ver productos</a>
                </div>}
                <div className="container-list">{
                products.map((product) =>
                <ItemCard
                  key={product.item.id}
                  id={product.item.id}
                  img={product.item.img}
                  title={product.item.title}
                  price={product.item.price}
                  summary={product.item.summary}
                  stock={product.item.stock}
                  quantity={product.quantity}
                  quantityProducts={quantityProducts}
                />
              )}</div>
          </div>
        </div>
      </div>
    </>
  );
}
