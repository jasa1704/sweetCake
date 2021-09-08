import React, { useState } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../count/ItemCount";
import "./ItemCard.scss";
import ItemSummary from "../summary/ItemSummary";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";
import { useLocation } from 'react-router';

export default function ItemCard({id, img, title, price, summary, stock, quantity = 0, quantityProducts = false }) {

  const location = useLocation();

  const product = {
    id,
    img,
    title,
    price,
    summary,
    stock
  }
  const {setProducts, quantityTemp, setQuantityTemp} = useContext(CartContext);
  const [showDetail, setShowDetail]=useState(false);
  const [countDetail, setCountDetail] = useState(0);
  
  const handleClick = function () {
    showDetail ? setShowDetail(false) : setShowDetail(true);
  }

  const addItem = () => {
    
    setProducts(prods => {
      if(existProduct(prods))
      {
        return updateProduct(prods)
      }else{
        setQuantityTemp([{id:id,quantityTemp:countDetail}]);
        return [{item:product,quantity:countDetail},...prods];
      }
    }
    );
  }

  const existProduct = (prods) => {
    let exit = false;
    prods.forEach((element) => {
      if (element.item.id === product.id) {
        exit = true;
      }
    });
    return exit;
  };

  const updateProduct = (prods) => {
    prods.forEach((element) => {
      if (element.item.id === product.id) {
        element.quantity += countDetail;
        updateQuantityTemp(product.id);
      }
    });
    return prods;
  };

  const updateQuantityTemp = (id) => {
    quantityTemp.forEach(item=>{
      if(item.id === id){
        setQuantityTemp([{id:id,quantityTemp:countDetail+item.quantityTemp}]);
      }
    })
  }

  const validateStock = () => {
    let onStock = stock;
    quantityTemp.forEach(item=>{
      if(item.id === id){
        onStock = stock - item.quantityTemp;
      }
    })
    return onStock;
  }

  const clear = () => {
    setProducts(prods => clearProduct(prods));
  };

  const clearProduct = (prods) => {
    prods.forEach((element) => {
      if (element.item.id === product.id) {
        let index = prods.indexOf(element);
        prods.splice(index, 1);
        setQuantityTemp([{id:id,quantityTemp:0}]);
        quantityProducts();
      }
    });
    return prods;
  }

  return (
    <>
        <Card style={{ width: "20rem" }}>
          <Card.Img onClick={handleClick} style={{ height: "60%" }} variant="top" src={img} />
          {showDetail ? <ItemSummary summary={summary}/> : null}
          <Card.Body>
            <Card.Title>{title} </Card.Title>
            { location.pathname !== '/cart' && 
              <div>
                <Card.Title>Precio: ${price}</Card.Title>
              </div>
            }
            {
              location.pathname === '/cart' && 
                <div>
                <Card.Title> Precio: ${price}</Card.Title>
                <Card.Title> Precio total: ${price*quantity}</Card.Title>
                <Card.Title> Unidades compradas: {quantity} </Card.Title>
                </div>
              }

            {
               location.pathname !== '/cart' &&<ListGroup variant="flush">
              <ItemCount id={id} stock={validateStock()} countDetail={countDetail} setCountDetail={setCountDetail}/>
              <Button as={Link} to={`/products-detail/${id}`} variant="primary">Detalle del producto</Button>
            </ListGroup>}
          </Card.Body>
          <Card.Footer className="card-footer">
            { (location.pathname !== '/cart' && countDetail > 0) &&
              <Button style={{paddingRight:"10px"}} variant="primary" as={Link} to="/cart" onClick={addItem}>Agregar</Button>
            }
            {
              location.pathname === '/cart' && 
              <Button style={{paddingRight:"10px"}} variant="primary" onClick={clear}>Eliminar</Button>
            }
            {
              location.pathname === '/cart' ? <div>Unidades disponibles { stock - quantity }</div>:
              <div>Unidades disponibles { validateStock() }</div>}
            
          </Card.Footer>
        </Card>
    </>
  );
}
