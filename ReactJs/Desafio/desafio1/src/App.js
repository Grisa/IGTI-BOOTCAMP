import React, { useState } from "react";
import "./styles.css";
import Box from "./Box";
import TextField from '@material-ui/core/TextField';

export default function App() {
  const [bruto, setBruto] = useState(0);
  const [taxa, setTaxa] = useState(0);
  const [meses, setMeses] = useState(0);

  const handleChangeBruto = event => {
    setBruto(event.target.value);
  };

  const handleChangeTaxa = event => {
    setTaxa(event.target.value);
  };

  const handleChangeMeses = event => {
    setMeses(+event.target.value);
  };

  //Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const array = Array.from({ length: meses }, (v, i) => i);

  return (
    <div className="App">
      <h1>React Caixas</h1>
      <TextField
        type="text"
        placeholder="Bruto"
        value={bruto}
        onChange={handleChangeBruto}
        className="inputForms"
      />
      <TextField
        type="text"
        placeholder="Taxa"
        value={taxa}
        onChange={handleChangeTaxa}
        className="inputForms"
      />
      <TextField
        type="number"
        placeholder="Quantidade de caixas"
        value={meses}
        onChange={handleChangeMeses}
        min="0"
        max="99"
        step="1"
        className="inputForms"
      />

      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {array.map((item) => (
          <Box key={item} bruto={bruto} taxa={taxa} mes={item + 1}>{item + 1}</Box>
        ))}
      </div>
    </div>
  );
}
