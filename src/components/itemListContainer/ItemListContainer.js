import React from "react";
import "./ItemListContainer.scss";

export default function ItemListContainer(props) {
  return (
    <>
       <div className="container-item-list">
            <div className="welcome">
                <h1>{props.greeting}</h1>
            </div>
       </div>
    </>
  );
}