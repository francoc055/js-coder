function cuotas() {
    let valor;
    let resultado;
    let tresCuotas;
    let seisCuotas;
    let nueveCuotas;
    let doceCuotas;

    valor = document.getElementById("dinero").value;
    valor = parseInt(valor);

    tresCuotas = 3;
    seisCuotas = 6;
    nueveCuotas = 9;
    doceCuotas = 12;

    if(document.getElementById("tres").checked){
        resultado = valor / tresCuotas;
        alert("Las cuotas tienen un valor de : $" + resultado.toFixed(2))
    }else if(document.getElementById("seis").checked){
        resultado = valor / seisCuotas;
        alert("Las cuotas tienen un valor de : $" + resultado.toFixed(2))
    }else if(document.getElementById("nueve").checked){
        resultado = valor / nueveCuotas;
        alert("Las cuotas tienen un valor de : $" + resultado.toFixed(2))
    }else if(document.getElementById("doce").checked){
        resultado = valor / doceCuotas;
        alert("Las cuotas tienen un valor de : $" + resultado.toFixed(2))
    }
}
