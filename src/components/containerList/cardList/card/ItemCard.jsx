import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import ItemCount from "./count/ItemCount";
import "./ItemCard.scss";

export default function ItemCard(props) {
  return (
    <>
        <Card style={{ width: "20rem" }}>
          <Card.Img style={{ height: "60%" }} variant="top" src={props.img} />
          <Card.Body>
            <Card.Title>{props.title} </Card.Title>
            <Card.Title>${props.price}</Card.Title>
            <ListGroup variant="flush">
              <ItemCount stock={props.stock} />
              <Button variant="primary">Agregar</Button>
            </ListGroup>
          </Card.Body>
          <Card.Footer className="text-muted">
            Unidades disponibles {props.stock}
          </Card.Footer>
        </Card>
    </>
  );
}
