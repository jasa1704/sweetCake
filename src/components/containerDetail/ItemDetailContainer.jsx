import React, { useEffect, useState }  from "react";
import { stockData } from '../../assets/data/data'
import "./ItemDetailContainer.scss";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../../components/containerList/cardList/card/count/ItemCount";

export default function ItemDetailContainer() {

  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [countDetail, setCountDetail] = useState(0);

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
       <ItemCount stock={product.stock} setCountDetail={setCountDetail}/>
       {countDetail > 0 ? <Button as={Link} to={`/cart`} variant="primary">Terminar compra</Button>: null}
    </div>
  );
}