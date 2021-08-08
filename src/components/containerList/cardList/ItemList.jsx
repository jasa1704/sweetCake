import React, { useState } from "react";
import ItemCard from './card/ItemCard'
import { stockData } from '../../../assets/data/data'
import { useEffect } from "react";
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
    <>    
      <div>{loading}</div>
      <div className="container-list">
      {products.map((stockProducts) => (
        <ItemCard key={stockProducts.id} img={stockProducts.img} title={stockProducts.title} price={stockProducts.price} stock={stockProducts.stock}/>
      ))}
      </div>
    </>
  );
}