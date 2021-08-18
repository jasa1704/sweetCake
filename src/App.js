import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home";
import Products from "./pages/products";
import We from "./pages/we";
import Contact from "./pages/contact";
import ProductDetail from "./pages/productDetail";

export default function App() {
  return (
    <div className="App">
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
          <Route exact path="/we">
            <We />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
