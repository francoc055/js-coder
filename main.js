const section = document.querySelector(".flex");
const templateCard = document.getElementById("templateCard").content;
const template = document.getElementById("template").content;
const templateFooter = document.getElementById("templateFooter").content;
const cart = document.getElementById("carrito");
const footer = document.getElementById("footer");
const fragment = document.createDocumentFragment();

let carrito = []

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

document.addEventListener("click", e => {
    agregarAlCarrito(e)

    if(e.target.matches(".btn-a"))
    {
        btnAgregar(e)
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
    }
})

let data;

const fetchData = async () => {
    try {
        const res = await fetch('simuladorApi.json')
        data = await res.json()
        // console.log(data) 
        mostrarCard(data);
        agregarAlCarrito()
    } catch (error) {

    }
}

const mostrarCard = data => {
    data.forEach(item => {
        const clone = templateCard.cloneNode(true);
        clone.getElementById("title").textContent = item.titulo;
        clone.getElementById("price").textContent = item.precio;
        clone.querySelector(".img").setAttribute("src", item.imagenUrl)
        clone.querySelector(".btn").dataset.id = item.id;

        fragment.appendChild(clone);
    });
    section.appendChild(fragment);
}

const agregarAlCarrito = (e) => {
    if(e.target.matches(".btn-outline-primary"))
    {
        setCart(e.target.parentElement)
        mostrarCarrito(e)
    }
    e.stopPropagation()
}

const setCart = objeto =>{
    const producto = {
        id: objeto.querySelector(".btn-outline-primary").dataset.id,
        titulo: objeto.querySelector("#title").textContent,
        precio: objeto.querySelector("#price").textContent,
        cantidad: 1
    }

    const indice = carrito.findIndex(item => item.id === producto.id);
    // console.log(indice);

    // if(indice == -1)
    // {
    //     carrito.push(producto);
    // }
    // else
    // {
    //     carrito[indice].cantidad++;
    // }

    indice == -1 ? carrito.push(producto) : carrito[indice].cantidad++;
    
    console.log(carrito)
    totalCart()
}

const totalCart = () => {
    document.getElementById("contador").textContent = "";

    const totalCant = carrito.reduce(
        (acc, current) => acc + current.cantidad, 0
    )

    document.getElementById("contador").innerHTML +=
    `<p class="tc">${totalCant}</p>`
}

const mostrarCarrito = (e) =>{
    cart.textContent = ""

    carrito.forEach(item => {
        const clone = template.cloneNode(true);
        clone.querySelector(".iphone").textContent = item.titulo;
        clone.querySelector(".cant").textContent = item.cantidad;
        clone.querySelector(".lista-p").textContent = item.precio * item.cantidad;

        clone.querySelector(".btn-a").dataset.id = item.id;
        clone.querySelector(".btn-q").dataset.id = item.id;
        fragment.appendChild(clone)
    })
    cart.appendChild(fragment)

    mostrarFooter()
}

const mostrarFooter = () => {
    footer.textContent = "";
    localStorage.setItem("carrito", JSON.stringify(carrito));


    const total = carrito.reduce(
        (acc, current) => acc + current.precio * current.cantidad, //primer parametro
        0 //segundo parametro(como quiero devolverlo)
    )

    const cloneF = templateFooter.cloneNode(true);
    cloneF.querySelector(".footer-title span").textContent = total;

    footer.appendChild(cloneF); //no hace falta fragmentar ya que no hay un ciclo.

    if(total === 0) // si el total es igual a 0 le agregamos la clase d-none al div padre del footer.
    {
        document.querySelector(".footer-caja").classList.add("d-none");
        return;
    } 
};

const btnAgregar = (e) =>{
    carrito = carrito.map((item) =>{
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
    carrito = carrito.filter(item => {
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

document.addEventListener("DOMContentLoaded", () =>{
    if(localStorage.getItem("carrito"))
    {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        mostrarCarrito();
    }
})











