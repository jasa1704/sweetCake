import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/NavBar";
import Products from "./pages/products";
import ProductCategory from "./pages/productCategory";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import { CartContext } from "./context/cartContext";

export default function App() {
  const [products, setProducts] = useState([]);
  const [quantityTemp, setQuantityTemp] = useState([]);

  return (
    <div className="App">
      <CartContext.Provider value={{ products, setProducts, quantityTemp, setQuantityTemp}}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products-detail/:id">
              <ProductDetail />
            </Route>
            <Route exact path="/product-category/:id">
              <ProductCategory />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}
