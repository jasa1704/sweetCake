import React, { useState } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../../../count/ItemCount";
import "./ItemCard.scss";
import ItemSummary from "../../../summary/ItemSummary";
import { CartContext } from "../../../../context/cartContext";
import { useContext } from "react";

export default function ItemCard({id, img, title, price, summary, stock, quantity=0}) {

  const product = {
    id,
    img,
    title,
    price,
    summary,
    stock
  }

  const {setProducts} = useContext(CartContext);
  const [showDetail, setShowDetail]=useState(false);
  const [countDetail, setCountDetail] = useState(0);
  
  const handleClick = function () {
    showDetail ? setShowDetail(false) : setShowDetail(true);
  }

  const addItem = () => {
    setProducts(prods => 
      existProduct(prods) ? updateProduct(prods) :
        [{item:product,quantity:countDetail},...prods]
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
        element.quantity = countDetail;
      }
    });
    return prods;
  };

  const removeItem = (prods) => {
    console.log(prods); // Pendiente ajuste proxima Desafio
  };

  const clear = (prods) => {
    console.log(prods); // Pendiente ajuste proxima Desafio
  };

  return (
    <>
        <Card style={{ width: "20rem" }}>
          <Card.Img onClick={handleClick} style={{ height: "60%" }} variant="top" src={img} />
          {showDetail ? <ItemSummary summary={summary}/> : null}
          <Card.Body>
            <Card.Title>{title} </Card.Title>
            <Card.Title>${quantity === 0 ?price: price*quantity}</Card.Title>
            <ListGroup variant="flush">
              <ItemCount stock={stock} quantity={quantity} setCountDetail={setCountDetail}/>
              { quantity === 0 ? <Button as={Link} to={`/products-detail/${id}`} variant="primary">Detalle del producto</Button>: ''}
            </ListGroup>
          </Card.Body>
          <Card.Footer className="card-footer">
            { countDetail > 0 &&
              <Button style={{paddingRight:"10px"}} variant="primary" as={Link} to="/cart" onClick={addItem}>Agregar</Button>
            }
            {
              quantity > 0 && 
              <Button style={{paddingRight:"10px"}} variant="primary" onClick={clear}>Eliminar</Button>
            }
            <div>Unidades disponibles { quantity === 0 ? stock : stock - quantity}</div>
          </Card.Footer>
        </Card>
    </>
  );
}
