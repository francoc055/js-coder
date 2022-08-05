// almaceno los productos
let carritoObj = [];

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
        if(swal("Compra finalizada!", "Vuelva pronto!", "success"))
        {
            localStorage.clear();
            setTimeout(() => {
                location.reload()
            }, 2000);
        }
        // terminar();
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
    `<p class="tc">${totalCant}</p>`
}

// funcion para mostrar el carrito en el html
const mostrarCarrito = () => {
    carrito.textContent = ""; //que en el texto el carrito parta vacio, asi no se repite en el for each
    // localStorage.setItem("carritoObj", JSON.stringify(carritoObj));
    
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
    localStorage.setItem("carritoObj", JSON.stringify(carritoObj));


    const total = carritoObj.reduce(
        (acc, current) => acc + current.precio * current.cantidad, //primer parametro
        0 //segundo parametro(como quiero devolverlo)
    )

    const cloneF = templateFooter.content.cloneNode(true);
    cloneF.querySelector(".footer-title span").textContent = total;

    footer.appendChild(cloneF); //no hace falta fragmentar ya que no hay un ciclo.

    if(total === 0) // si el total es igual a 0 le agregamos la clase d-none al div padre del footer.
    {
        document.querySelector(".footer-caja").classList.add("d-none");
        // localStorage.clear();
        return;
    } 

};


const btnAgregar = (e) =>{
    carritoObj = carritoObj.map((item) =>{
        if(item.id === e.target.dataset.id)
        {
            item.cantidad++;
            totalCart();
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
                totalCart();
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


document.addEventListener("DOMContentLoaded", e =>{
    if(localStorage.getItem("carritoObj"))
    {
        carritoObj =  JSON.parse(localStorage.getItem("carritoObj"));
        mostrarCarrito();
    }
})

// const terminar = () => {
//     swal("Compra finalizada!", "Vuelva pronto!", "success");
//     if(swal("Compra finalizada!", "Vuelva pronto!", "success"))
//     {
//         // document.querySelector(".footer-caja").classList.add("d-none");
//         // document.querySelector(".li").classList.add("d-none");
//         // document.querySelector(".lista-aq").classList.add("d-none");
//         // document.querySelector(".tc").classList.add("d-none");
//         localStorage.clear();
//     }
// }






