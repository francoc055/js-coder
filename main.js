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



// const carrito = document.getElementById("carrito");
// const template = document.getElementById("template");
// const fragment = document.createDocumentFragment();
// const botones = document.querySelectorAll(".btn");



// // almaceno los productos
// const carritoObj = {};

// const agregarAlCarrito = (e) => {
//     console.log(e.target.dataset.cel);

//     // 2do --> construyo un objeto con la informacion del 'e.target.dataset.cel'
//     const producto = { 
//         titulo:e.target.dataset.cel, // con el e.target traemos la informacion del boton que se presiono.
//         cantidad: 1,
//     }
//     // si el carritoObj tiene la propiedad 'producto.titulo'
//     if(carritoObj.hasOwnProperty(producto.titulo))
//     {
//         producto.cantidad = carritoObj[producto.titulo].cantidad + 1; // le sumamos uno a cantidad
//     } 

//     // 3ero --> empujo las propiedades del objeto 'producto' hacia el objeto 'carritoObj'
//     carritoObj [producto.titulo] = producto;

//     mostrarCarrito()
// };

// // 4to --> creamos una funcion para mostrar el carrito en el html
// const mostrarCarrito = () => {

//     // 'carritoObj' lo convierto en array para poder recorrerlo con el for each, cada 'item' representa cada uno de los elementos que ya empujamos en el 3er paso. 
//     Object.values(carritoObj).forEach(item => {
//         carrito.textContent = ""; //que en el texto el carrito parta vacio, asi no se repite en el for each

//         const clone = template.content.firstElementChild.cloneNode(true);
//         clone.querySelector(".iphone").textContent = item.titulo;
//         clone.querySelector(".cant").textContent = item.cantidad;

//         fragment.appendChild(clone);
//     })

//     carrito.appendChild(fragment);
// }

// // 1ero --> recorro los botones, hago click y ejecuto la funcion 'agregarAlCarrito'
// botones.forEach(btn => {
//     btn.addEventListener("click", agregarAlCarrito)
// })

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
    // console.log(e.target.matches(".box .btn-outline-primary"))
    //delegacion de eventos
    if(e.target.matches(".box .btn-outline-primary"))
    {
        agregarAlCarrito(e);
        iconCarrito(e);
        document.getElementById("contador").innerHTML = carritoObj.length;
        localStorage.setItem("carrito", JSON.stringify(carritoObj));
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

    // 2do --> construyo un objeto con la informacion del 'e.target.dataset.cel'
    const producto = { 
        titulo:e.target.dataset.cel, // con el e.target traemos la informacion del boton que se presiono.
        id: e.target.dataset.cel,
        cantidad: 1,
        precio:parseInt(e.target.dataset.precio)
    }

    // console.log(producto)

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
        // carritoObj[indice].precio = carritoObj[indice].cantidad * producto.precio;
    }

    mostrarCarrito()

};


// 4to --> creamos una funcion para mostrar el carrito en el html
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

        // document.getElementById("contador").innerHTML = carritoObj.length;
        // localStorage.setItem("carrito", JSON.stringify(carritoObj));
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

// 1ero --> recorro los botones, hago click y ejecuto la funcion 'agregarAlCarrito'
// botones.forEach(btn => {
//     btn.addEventListener("click", agregarAlCarrito)
// })






