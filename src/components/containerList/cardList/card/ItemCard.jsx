import React, { useState } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../../../count/ItemCount";
import "./ItemCard.scss";
import ItemSummary from "../../../summary/ItemSummary";

export default function ItemCard(props) {

  const [showDetail, setShowDetail]=useState(false);
  
  const handleClick = function () {
    showDetail ? setShowDetail(false) : setShowDetail(true);
  }

  return (
    <>
        <Card style={{ width: "20rem" }}>
          <Card.Img onClick={handleClick} style={{ height: "60%" }} variant="top" src={props.img} />
          {showDetail ? <ItemSummary summary={props.summary}/> : null}
          <Card.Body>
            <Card.Title>{props.title} </Card.Title>
            <Card.Title>${props.price}</Card.Title>
            <ListGroup variant="flush">
              <ItemCount stock={props.stock} />
              <Button as={Link} to={`/products-detail/${props.id}`} variant="primary">Detalle del producto</Button>
            </ListGroup>
          </Card.Body>
          <Card.Footer className="card-footer">
            <Button style={{paddingRight:"10px"}} variant="primary">Agregar</Button>
            <div>Unidades disponibles {props.stock}</div>
          </Card.Footer>
        </Card>
    </>
  );
}
