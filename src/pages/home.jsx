import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function Home(){
    const msgWelcome = useContext(CartContext);
    return <>{msgWelcome} </>;
}