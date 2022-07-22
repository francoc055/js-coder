////// Para pagar el producto en cuotas
/*function cuotas() {
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
}*/

let productos = [];
let total = 0;

function agregar(producto, precio) {
    console.log(producto, precio);
    productos.push(producto);
    total = total + precio;
    document.getElementById("check").innerHTML = `Pagar $${total}`;
}

function pagar() {
    window.alert(productos.join(", \n") + "\nel total es: $" +total)
}

// nuevos articulos
let nuevosArticulos = ["iphone 12", "iphone 13 pro"];

const prox = document.querySelector("#prox");


for(let novedades of nuevosArticulos){
    let articulos = document.createElement("li");
    articulos.innerHTML = novedades;
    prox.appendChild(articulos);
}





