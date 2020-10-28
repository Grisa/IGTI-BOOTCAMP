import React from "react";
import "./styles.css";
import Bar from "./Bar";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { calculateSalaryFrom, calcPercent } from "./salary.js"
import classNames from 'classnames';

/*
baseINSS: 1000
baseIRPF: 925
discountINSS: 75
discountIRPF: 0
netSalary: 925
*/

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      bar1: 50,
      bar2: 50,
      bar3: 0
    };
  }

  handleSalaryChange = event => {
    const salbruto = +event.target.value;
    const calc = calculateSalaryFrom(salbruto);
    const baseinss = calc.baseINSS;
    const baseirpf = calc.baseIRPF;
    const descinss = calc.discountINSS;
    const descirpf = calc.discountIRPF;
    const salliq = calc.netSalary;

    const bar1 = calcPercent(salbruto, calc.discountIRPF); // irpf
    const bar3 = calcPercent(salbruto, calc.discountINSS); // inss
    const bar2 = 100 - (bar1 + bar3); // liq

    console.log(bar1)
    console.log(bar2)
    console.log(bar3)

    this.setState({ bar1, bar2, bar3 });

    this.setState({ salbruto, baseinss, descinss, baseirpf, descirpf, salliq });
  }

  render() {
    const { bar1, bar2, bar3 } = this.state;
    const { salbruto, baseinss, descinss, baseirpf, descirpf, salliq } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className="BruteSalary App">
          <TextField
            id="standard-basic"
            onBlur={this.handleSalaryChange}
            type="money"
            value={salbruto}
            label="Salario bruto"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </div>

        <div className="App">
          <TextField id="standard-basic" type="money" value={baseinss || 0} label="Base INSS" />
          <TextField
            id="standard-basic"
            type="money"
            value={descinss || 0}
            label="Desconto INSS"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            id="standard-basic"
            type="money"
            value={baseirpf || 0}
            label="Base IRPF"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            id="standard-basic"
            type="money"
            value={descirpf || 0}
            label="DescontoIRPF"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </div>

        <div className="App">
          <TextField
            id="standard-basic"
            value={salliq || 0}
            label="Salario Liquido"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Bar value={bar1 || 0} color="red" />
          <Bar value={bar3 || 0} color="yellow" />
          <Bar value={bar2 || 0} color="green" />
        </div>
      </div>
    );
  }
}
