import React, { useEffect, useState }  from "react";
import { stockData } from '../../assets/data/data'
import "./ItemDetailContainer.scss";
import { useParams } from "react-router-dom";

export default function ItemDetailContainer() {

  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const getItems = () => {
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(stockData), 2000);
    })
      .then((dataResolve) => {
        let itemDetail = dataResolve.find(item => item.id === id);
        setProduct(itemDetail);
        setLoading(false);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }

  useEffect(() => {
    getItems();
  }, {});

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div>
       <h1 key={product.id}>{product.title}</h1>
       <img src={product.img}></img>
       <h3>${product.price}</h3>
       <p>{product.summary}</p>
    </div>
  );
}