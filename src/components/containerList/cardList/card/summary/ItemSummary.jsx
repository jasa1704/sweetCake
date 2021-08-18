import React from "react";
import "./ItemSummary.scss";

export default function ItemSummary({summary}) {
  return (
    <div className="container-summary">
       {summary}
    </div>
  );
}