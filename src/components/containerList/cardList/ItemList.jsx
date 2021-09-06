import React, { useState, useEffect } from "react";
import ItemCard from "./card/ItemCard";
import { collection, getDocs } from 'firebase/firestore';
import { stockData } from "../../../assets/data/data";
import "./ItemList.scss";
import { getData } from '../../../firebase';

export default function ItemList({ titleProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = async () => {
  //   const productsCollection = collection(getData(), 'products');
  //   const productsSnapshot = await getDocs(productsCollection);
  //   const productsSnapshotList = productsSnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
  //   console.log(productsSnapshotList);
  //   setProducts(productsSnapshotList);
  //   setLoading(false);
  // };

  useState(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(stockData), 1000);
    })
      .then((dataResolve) => {
        setLoading(false);
        setProducts(dataResolve);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  if (loading) {
    return <h1 className="loading">Cargando...</h1>;
  }

  return (
    <div>
      <div className="welcome">
        <h1>{titleProduct}</h1>
      </div>
      <div className="container-list">
        {products.map((stockProduct) => (
          <ItemCard
            key={stockProduct.id}
            id={stockProduct.id}
            img={stockProduct.img}
            title={stockProduct.title}
            price={stockProduct.price}
            summary={stockProduct.summary}
            stock={stockProduct.stock}
          />
        ))}
      </div>
    </div>
  );
}
