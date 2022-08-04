////// Para pagar el producto en cuotas (para implementar) //// 
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



// almaceno los productos
let carritoObj = JSON.parse(localStorage.getItem("carritoObj")) ?? [];


const carrito = document.getElementById("carrito");
const template = document.getElementById("template");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter");
const fragment = document.createDocumentFragment();
const finalizar = document.querySelector(".btn-outline-dark");
const iconoCarrito = document.getElementById("iconoCarrito")


document.addEventListener("click", e =>{
    //delegacion de eventos
    if(e.target.matches(".box .btn-outline-primary"))
    {
        agregarAlCarrito(e);
        iconCarrito(e);
    }

    if(e.target.matches(".btn-a"))
    {
        btnAgregar(e);
        iconCarrito(e);
    }

    if(e.target.matches(".btn-q"))
    {
        btnQuitar(e);
    }

    if(e.target.matches(".btn-outline-dark"))
    {
        swal("Compra finalizada!", "Vuelva pronto!", "success");
    }
})

const iconCarrito = (e) => {
    iconoCarrito.style = "animation: mover 1.2s ease alternate;"
}


const agregarAlCarrito = (e) => {
    console.log(e.target.dataset.cel);


    const producto = { 
        titulo:e.target.dataset.cel,
        id: e.target.dataset.cel,
        cantidad: 1,
        precio:parseInt(e.target.dataset.precio)
    }


    // creo variable indice, y utilizo metodo findIndex para filtrar por indice el arrar carritoObj y pregunto si existe.
    const indice = carritoObj.findIndex((item) => item.id === producto.id );

    // si el indice es igual -1 (ya que a la primera vuelta tira false el findIndex y nos devuelve un -1)
    if(indice === -1)
    {
        carritoObj.push(producto); //le empujamos el objeto producto
    }
    else //si es distinto capturamos el elemento indice, y le sumamos uno a la cantidad
    {
        carritoObj[indice].cantidad += 1; 
    }

    mostrarCarrito()
    totalCart()
};

const totalCart = () => {
    document.getElementById("contador").textContent = "";

    const totalCant = carritoObj.reduce(
        (acc, current) => acc + current.cantidad, 0
    )

    document.getElementById("contador").innerHTML +=
    `<p>${totalCant}</p>`

    localStorage.setItem("carrito", JSON.stringify(carritoObj));
}

// funcion para mostrar el carrito en el html
const mostrarCarrito = () => {
    carrito.textContent = ""; //que en el texto el carrito parta vacio, asi no se repite en el for each
    
    carritoObj.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".iphone").textContent = item.titulo;
        clone.querySelector(".cant").textContent = item.cantidad;
        clone.querySelector(".lista-p span").textContent = item.precio * item.cantidad;

        // utilizando el dataset en el js, es lo mismo solo que lo hace mas dinamico y se la pasa btn en el hmtl
        clone.querySelector(".btn-a").dataset.id = item.id;
        clone.querySelector(".btn-q").dataset.id = item.id;
        fragment.appendChild(clone);
    })
    
    carrito.appendChild(fragment);

    mostrarFooter();
}


const mostrarFooter = () => {
    footer.textContent = "";

    const total = carritoObj.reduce(
        (acc, current) => acc + current.precio * current.cantidad, //primer parametro
        0 //segundo parametro(como quiero devolverlo)
    )

    const cloneF = templateFooter.content.cloneNode(true);
    cloneF.querySelector(".footer-title span").textContent = total;

    footer.appendChild(cloneF); //no hace falta fragmentar ya que no hay un ciclo.

    if(total === 0)
    {
        footer.remove(document.querySelector("footer-caja"));
        location.reload()
    } 

};


const btnAgregar = (e) =>{
    carritoObj = carritoObj.map((item) =>{
        if(item.id === e.target.dataset.id)
        {
            item.cantidad++;
        }
        return item
    })
    mostrarCarrito()
}

const btnQuitar = (e) => {
    carritoObj = carritoObj.filter(item => {
        if(item.id === e.target.dataset.id)
        {
            if(item.cantidad > 0)
            {
                item.cantidad--;
                if(item.cantidad === 0)
                {
                    return
                }
            }
        }else
        {
            return item
        }
        return item
    })
    mostrarCarrito()
}







