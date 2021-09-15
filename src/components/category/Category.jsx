import React, { useEffect, useState }  from "react";
import { strCategory } from '../../assets/data/strCategory';
import ItemCard from '../card/ItemCard';
import "./Category.scss";
import { useParams, useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import { getDataBase } from '../../firebase';
import Loader from '../loader/Loader'


export default function Category() {

  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();

  const [titleCategory, setTitleCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading]  = useState(['...Cargando']);

  const getProducts = async () => {
    setLoading(true);
    const db = getDataBase();
    const productsCollection = db.collection("products").where('category', "==", id);
    productsCollection.get().then((querySnapshot) => {
      if(querySnapshot.size === 0){
        history.push('/error')
      }
      const productsSnapshotList = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
      setTitleCategory(strCategory[productsSnapshotList[0].category]);
      setProducts(productsSnapshotList);
    }).catch((error) => {
      console.log("Error searching products", error);
    }).finally(() =>{
      setLoading(false);
    })
  };

  useEffect(
    () => {
      getProducts();
    },
    [location]
  )

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="list">
      <div>
        <div className="title-category">
          <h1>Categoria {titleCategory.category} </h1>
        </div>
        <div className="container-list">
        {products.map((stockProduct) => (
          <ItemCard key={stockProduct.id} id={stockProduct.id} img={stockProduct.img} title={stockProduct.title} price={stockProduct.price} summary={stockProduct.summary} stock={stockProduct.stock}/>
        ))}
        </div>
      </div>
    </div>
  );
}