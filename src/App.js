import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';

function App() {
  return (
    <div className="App">
       <NavBar/>
       <ItemListContainer greeting="Bienvenidos a Dulce Pastel"/>
    </div>
  );
}

export default App;
