import React, { useEffect, useState }  from "react";
import { stockData } from '../../assets/data/data'
import "./ItemDetailContainer.scss";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../count/ItemCount";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";

export default function ItemDetailContainer() {

  const { id } = useParams();
  const {setItemDetail} = useContext(CartContext);

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
    return <h1 className="loading">Cargando...</h1>;
  }

  const handleChange = () => {
    setItemDetail({item:product,quantity:countDetail});
  }
  
  return (
    <div>
      <div className="title-detail">
          <h1>Detalle del producto</h1>
      </div>
      <div className="container-list-detail">
       <div className="img-detail">
         <img src={product.img}></img>
       </div>
       <div className="detail">
          <h1 key={product.id}>{product.title}</h1>
          <p>{product.summary}</p>
          <h3>${product.price}</h3>
          <h4>Pasteles disponibles {product.stock}</h4>
          <div className="quantity-size">
            <ButtonGroup aria-label="Basic example">
              <Button>Grande</Button>
              <Button>Mediano</Button>
              <Button>Pequeño</Button>
            </ButtonGroup>
            <ItemCount stock={product.stock} setCountDetail={setCountDetail}/>
          </div>
          {countDetail > 0 ? <Button variant="primary" as={Link} to="/cart" onClick={handleChange} >Agregar al carrito</Button>: null}
       </div>
      </div>
    </div>
  );
}