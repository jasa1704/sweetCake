import React, {useState} from "react";
import { Button } from "react-bootstrap";
import "./ItemCount.scss";

export default function ItemCount({ stock, setCountDetail = false}) {
  const [count, setCount] = useState(0);

  function add(count) {
    if(count < stock){
        setCount(count + 1);
        if(setCountDetail){
          setCountDetail(countDetail => countDetail = count + 1);
        }
    }
  }

  function subtract (count) {
    if(count > 0){
        setCount(count - 1);
        if(setCountDetail){
          setCountDetail(countDetail => countDetail = count - 1);
        }
    }
  }

  return (
    <>
      <div className="section-count">
        <Button variant="primary" onClick={() => subtract(count)}>-</Button>
        <span>{count}</span>
        <Button variant="primary" onClick={() => add(count)}>+</Button>
      </div>
    </>
  );
}
