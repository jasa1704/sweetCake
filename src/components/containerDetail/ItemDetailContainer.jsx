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
  const {products, setProducts, quantityTemp, setQuantityTemp} = useContext(CartContext);

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
  },[]);

  if (loading) {
    return <Loader/>;
  }

  const addItem = () => {
    
    setProducts(prods => {
      if(existsProduct(prods))
      {
        return updateProduct(prods)
      }else{
        setQuantityTemp([{id:id,quantityTemp:countDetail}]);
        return [{item:product,quantity:countDetail},...prods];
      }
    }
    );
  }

  const existsProduct = (prods) => {
    let exit = false;
    prods.forEach((element) => {
      if (element.item.id === product.id) {
        exit = true;
      }
    });
    return exit;
  };

  const updateQuantityTemp = (id) => {
    quantityTemp.forEach(item=>{
      if(item.id === id){
        setQuantityTemp([{id:id,quantityTemp:countDetail+item.quantityTemp}]);
      }
    })
  }

  const updateProduct = (prods) => {
    prods.forEach((element) => {
      if (element.item.id === product.id) {
        element.quantity += countDetail;
        updateQuantityTemp(product.id);
      }
    });
    return prods;
  };

  const calulatePrice = () => {
    let price = product.price;
    products.forEach(prod=>{
      if(prod.item.id === id){
        price = product.price * prod.quantity;
      }
    })
    return price;
  }

  const validateStock = () => {
    let onStock = product.stock;
    products.forEach(prod=>{
      if(prod.item.id === id){
        onStock = product.stock - prod.quantity;
      }
    })
    return onStock;
  }
  
  return (
    <div>
      <div className="title-detail">
          <h1>Detalle del producto</h1>
      </div>
      <div className="container-list-detail">
       <div className="img-detail">
         <img src={product.img} alt={product.id}></img>
       </div>
       <div className="detail">
          <h1 key={product.id}>{product.title}</h1>
          <p>{product.summary}</p>
          <h3>Precio: ${product.price}</h3>
          <h3>Precio total: ${calulatePrice()}</h3>
          <h4>Pasteles disponibles: {validateStock()}</h4>
          <div className="quantity-size">
            <ItemCount stock={product.stock} setCountDetail={setCountDetail}/>
          </div>
          {countDetail > 0 ? <Button variant="primary" as={Link} to="/cart" onClick={addItem} >Agregar al carrito</Button>: null}
       </div>
      </div>
    </div>
  );
}