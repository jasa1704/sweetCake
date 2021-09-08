import React, { useState, useEffect } from "react";
import ItemCard from "../card/ItemCard";
import "./ItemList.scss";
import { getDataBase } from '../../firebase';
import Loader from '../loader/Loader'

export default function ItemList({ titleProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const db = getDataBase();
    const productsCollection = db.collection("products");
    productsCollection.get().then((querySnapshot) => {
      if(querySnapshot.size === 0){
        console.log("No results");
      }
      const productsSnapshotList = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
      console.log(productsSnapshotList);
      setProducts(productsSnapshotList);
    }).catch((error) => {
      console.log("Error searching products", error);
    }).finally(() =>{
      setLoading(false);
    })
  };

  if (loading) {
    return <Loader/>;
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
