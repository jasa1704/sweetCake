import React, { useState, useEffect } from "react";
import ItemCard from './card/ItemCard'
import { stockData } from '../../../assets/data/data'
import "./ItemList.scss";

export default function ItemList() {

  const [products, setProducts]  = useState([]);
  const [loading, setLoading]  = useState(['...Cargando']);

  useEffect(() => {
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(stockData), 3000);
      })
        .then((dataResolve) => {
         setLoading('');
          setProducts(dataResolve);
        })
        .catch((error) => {
          console.log("err", error);
        });
  }, []);

  return (
    <div>    
      <div className="loading">{loading}</div>
      <div className="container-list">
      {products.map((stockProduct) => (
        <ItemCard key={stockProduct.id} id={stockProduct.id} img={stockProduct.img} title={stockProduct.title} price={stockProduct.price} summary={stockProduct.summary} stock={stockProduct.stock}/>
      ))}
      </div>
    </div>
  );
}