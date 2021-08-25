import React, { useEffect, useState }  from "react";
import { stockData } from '../../assets/data/data';
import ItemCard from '../containerList/cardList/card/ItemCard';
import "./Category.scss";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router'


export default function Category() {

  const location = useLocation();
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading]  = useState(['...Cargando']);

  const getItems = () => {
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(stockData), 2000);
    })
      .then((dataResolve) => {
        let category = dataResolve.filter(item => item.category.toString() === id);
        setProducts(category);
        setLoading(false);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }

  useEffect(
    () => {
      getItems();
    },
    [location]
  )

  return (
    <div className="list">
      <div>
        <div className="loading">{loading}</div>
        <div className="container-list">
        {products.map((stockProduct) => (
          <ItemCard key={stockProduct.id} id={stockProduct.id} img={stockProduct.img} title={stockProduct.title} price={stockProduct.price} summary={stockProduct.summary} stock={stockProduct.stock}/>
        ))}
        </div>
      </div>
    </div>
  );
}