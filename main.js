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



const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll(".btn");


const carritoObj = {};

const agregarAlCarrito = (e) => {
    console.log(e.target.dataset.cel);

    const producto = {
        titulo:e.target.dataset.cel,
        cantidad: 1,
    }

    if(carritoObj.hasOwnProperty(producto.titulo))
    {
        producto.cantidad = carritoObj[producto.titulo].cantidad + 1;
    }

    carritoObj [producto.titulo] = producto;

    mostrarCarrito()
};

const mostrarCarrito = () => {

    Object.values(carritoObj).forEach(item => {
        carrito.textContent = ""

        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".iphone").textContent = item.titulo;
        clone.querySelector(".cant").textContent = item.cantidad;

        fragment.appendChild(clone);
    })

    carrito.appendChild(fragment);
}

botones.forEach(btn => {
    btn.addEventListener("click", agregarAlCarrito)
})



