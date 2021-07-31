import React from "react";
import { Card, Button,ListGroup } from "react-bootstrap";
import ItemCount from "../itemCount/ItemCount";
import logo from "../../assets/img/cakes/red-velvet.jpg";

export default function ItemCard({stock=2}) {

  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>Paste red velvet</Card.Title>
          <ListGroup variant="flush">
            <ItemCount stock={stock}/>
            <Button variant="primary">Agregar</Button>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-muted">Unidades disponibles {stock}</Card.Footer>
      </Card>
    </>
  );
}