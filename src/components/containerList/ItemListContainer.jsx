import React from "react";
import "./ItemListContainer.scss";
import ItemList from "./cardList/ItemList";

export default function ItemListContainer(props) {
  return (
    <>
       <div className="container-item-list">
            <div className="welcome">
                <h1>{props.greeting}</h1>
            </div>
            <div className="list">
               <ItemList/>
            </div>
       </div>
    </>
  );
}