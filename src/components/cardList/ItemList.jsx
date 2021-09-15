import React, { useState, useEffect } from "react";
import ItemCard from "../card/ItemCard";
import { useHistory } from "react-router-dom";
import "./ItemList.scss";
import { getDataBase } from '../../firebase';
import Loader from '../loader/Loader'

export default function ItemList({ titleProduct }) {
  const history = useHistory();
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
        history.push('/error')
      }
      const productsSnapshotList = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
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
        {products.map((product) => (
          <ItemCard
            key={product.id}
            id={product.id}
            img={product.img}
            title={product.title}
            price={product.price}
            summary={product.summary}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
}
