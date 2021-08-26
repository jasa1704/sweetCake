import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductCategory from "./pages/productCategory";
import ProductDetail from "./pages/productDetail";
import { CartContext } from "./context/cartContext";

export default function App() {
  const [welcome, setWelcome] = useState(['Bienvenido a Dulce Pastel']);
  return (
    <div className="App">
      <CartContext.Provider value={welcome}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
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
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}
