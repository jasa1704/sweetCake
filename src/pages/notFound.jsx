import { Link } from "react-router-dom";
import "../styles/NotFound.scss"

export default function NotFound() {
  return (
    <div className="error">
      <div className="error__container">
        <h2 className="error__container--title">404</h2>
        <p>Página no encontrada</p>
        <Link to="/">Volver</Link>
      </div>
    </div>
  );
}
