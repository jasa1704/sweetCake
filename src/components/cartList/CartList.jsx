import React, { useState, useCallback } from "react";
import { CartContext } from "../../context/cartContext";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { useContext } from "react";
import { getDataBase } from '../../firebase';
import "./CartList.scss";
import ItemCard from "../card/ItemCard";
import firebase from "firebase";

export default function CartList() {
  const { products } = useContext(CartContext);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [show, setShow] = useState(false);
  const [client, setClient] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [orderRef, setOrderRef] = useState('');

  const quantityProducts = () => {
    forceUpdate();
  };

  const handleClose = () => {
    setClient({
      name: '',
      phone: '',
      email: ''
    });
    setOrderRef('');
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleBuy = async () =>{
    const db = getDataBase();
    const orderCollection = db.collection('orders');
    const items = products.map(product => product.item);
    const order = {
      buyer: client,
      items: items,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      total: getTotal()
    }
    const orderReference = await orderCollection.add(order);
    setOrderRef(orderReference.id);
  }

  const getTotal = () =>{
    let total = 0;
    products.forEach(product => {
      total += product.item.price * product.quantity;
    });
    return total;
  }

  const handleChange = (value, key) =>{
    setClient({
      ...client,
      [key]: value
    });
  }

  return (
    <>
      <div className="container-item-list">
        <div className="list">
          <div>
            <div className="title-category">
              <h1> Tu compra </h1>
            </div>
            {products.length === 0 && (
              <div>
                <h1>Aun no has agregado productos al carrito</h1>
                <a className="add-products" href="/products">
                  Ver productos
                </a>
              </div>
            )}
            <div className="container-list">
              {products.map((product) => (
                <ItemCard
                  key={product.item.id}
                  id={product.item.id}
                  img={product.item.img}
                  title={product.item.title}
                  price={product.item.price}
                  summary={product.item.summary}
                  stock={product.item.stock}
                  quantity={product.quantity}
                  quantityProducts={quantityProducts}
                />
              ))}
            </div>
            {products.length !== 0 && (
              <div>
                <Button variant="primary" onClick={handleShow}>
                  Realizar la compra
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del comprador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Todos los campos son obligatorios</h6>
          <br />
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">* Nombre</InputGroup.Text>
            <FormControl
              id="name"
              aria-label="name"
              aria-describedby="inputGroup-sizing-sm"
              value={client.name}
              onChange={evt => handleChange(evt.target.value, 'name')}
            />
          </InputGroup>
          <br />
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">* Telefono</InputGroup.Text>
            <FormControl
              id="phone"
              aria-label="phone"
              aria-describedby="inputGroup-sizing-sm"
              value={client.phone}
              onChange={evt => handleChange(evt.target.value, 'phone')}
            />
          </InputGroup>
          <br />
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">* Correo</InputGroup.Text>
            <FormControl
              id="email"
              aria-label="email"
              aria-describedby="inputGroup-sizing-sm"
              value={client.email}
              onChange={evt => handleChange(evt.target.value, 'email')}
            />
          </InputGroup>
        </Modal.Body>
        { orderRef !== '' && <div className="product-buy">
          <h6>¡Gracias por comprar en Dulce Paste, su orden de compra es: {orderRef}!</h6>
        </div>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleBuy}>
            Finalizar compra
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
