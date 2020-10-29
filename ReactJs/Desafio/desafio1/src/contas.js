
function calculaTaxa(params) {
    
    var caixa = {bruto: parseFloat(params.bruto), taxaSoma: 0}

    for (let index = 0; index < params.mes; index++) {
        const retornoCaixa = calculaCaixinha(caixa.bruto, params.taxa, params.bruto)
        caixa.bruto = retornoCaixa.valorTotalEntrada;
        caixa.taxaSoma = caixa.taxaSoma + retornoCaixa.valorTotalTaxa;
        caixa.percentual = retornoCaixa.ValorPercentTotal;
    }

    if (caixa.taxaSoma > 0) {
        caixa.sinal = '+';
        caixa.cor = 'green';
    } else {
        caixa.sinal = ''
        caixa.cor = 'red';
    }

    return caixa;
}

function calculaCaixinha (bruto, taxa, valorInicial) {
    let taxaLiquida = bruto*(taxa/100);
    let valorLiquido = bruto + taxaLiquida;
    let percentLiquido = ((valorLiquido / valorInicial) -1 ) *100;

    return {valorTotalEntrada: parseFloat(valorLiquido.toFixed(2)), valorTotalTaxa: parseFloat(taxaLiquida.toFixed(2)), ValorPercentTotal: parseFloat(percentLiquido.toFixed(2))}
}

export {calculaTaxa}
