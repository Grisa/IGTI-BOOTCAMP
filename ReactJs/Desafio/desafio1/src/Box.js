import React from "react";
import {calculaTaxa} from "./contas.js"
import "./Box.css";

export default function Box({children, ...props }) {
  const dados = calculaTaxa(props);

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "4px",
        width: "fit-content",
        height: "60px",
        padding: "5px",
        margin: "5px"

      }}
    >
      <div className="boxDivCounter">
        {children}
      </div>
      <div className="boxDivValues">
        <div style={{color: dados.cor}} >{dados.bruto.toFixed(2)}</div>
        <div style={{color: dados.cor}} >{dados.sinal} {dados.taxaSoma.toFixed(2)}</div>
        <div>{dados.percentual.toFixed(2)}</div>
      </div>

    </div>
  );
}
