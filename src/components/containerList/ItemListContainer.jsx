import React from "react";
import "./ItemListContainer.scss";
import ItemList from "../cardList/ItemList";

export default function ItemListContainer(props) {
  return (
    <>
       <div className="container-item-list">
            <div className="list">
               <ItemList titleProduct={props.greeting}/>
            </div>
       </div>
    </>
  );
}