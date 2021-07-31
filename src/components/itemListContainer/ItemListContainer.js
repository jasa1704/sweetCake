import React from "react";
import "./ItemListContainer.scss";
import ItemCard from "../itemCard/ItemCard";

export default function ItemListContainer(props) {
  return (
    <>
       <div className="container-item-list">
            <div className="welcome">
                <h1>{props.greeting}</h1>
            </div>
            <div className="list">
               <ItemCard/>
            </div>
       </div>
    </>
  );
}