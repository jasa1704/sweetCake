import React, { useEffect, useState }  from "react";
import "./ItemDetailContainer.scss";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "../count/ItemCount";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";
import { getDataBase } from '../../firebase';
import Loader from '../loader/Loader'

export default function ItemDetailContainer() {

  const history = useHistory();
  const { id } = useParams();
  const {setProducts} = useContext(CartContext);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [countDetail, setCountDetail] = useState(0);

  const getProduct = async () => {
    setLoading(true);
    const db = getDataBase();
    const productsCollection = db.collection("products").doc(id);
    productsCollection.get().then((querySnapshot) => {
      if(!querySnapshot.exists){
        history.push('/error')
      }
      setProduct({id: id, ...querySnapshot.data()});
    }).catch((error) => {
      console.log("Error searching product", error);
    }).finally(() =>{
      setLoading(false);
    })
  };

  useEffect(() => {
    getProduct();
  }, {});

  if (loading) {
    return <Loader/>;
  }

  const handleChange = () => {
    setProducts(prods => 
      existsProduct(prods) ? updateProduct(prods) :
        [{item:product,quantity:countDetail},...prods]
    );
  }

  const existsProduct = (prods) => {
    let exists = false;
    prods.forEach((element) => {
      if (element.item.id === product.id) {
        exists = true;
      }
    });
    return exists;
  };

  const updateProduct = (prods) => {
    prods.forEach((element) => {
      if (element.item.id === product.id) {
        element.quantity = countDetail;
        element.item.price = element.item.price * countDetail;
        element.item.stock = element.item.stock - countDetail;
      }
    });
    return prods;
  };
  
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
          <h3>Precio: ${product.price}</h3>
          <h3>Precio total: ${countDetail === 0 ? product.price : product.price * countDetail}</h3>
          <h4>Pasteles disponibles {product.stock - countDetail}</h4>
          <div className="quantity-size">
            <ItemCount stock={product.stock} setCountDetail={setCountDetail}/>
          </div>
          {countDetail > 0 ? <Button variant="primary" as={Link} to="/cart" onClick={handleChange} >Agregar al carrito</Button>: null}
       </div>
      </div>
    </div>
  );
}