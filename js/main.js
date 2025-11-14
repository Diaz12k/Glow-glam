// ===============================
// ABRIR / CERRAR CARRITO
// ===============================
const btnCarrito = document.getElementById("btnCarrito");
const carrito = document.getElementById("carrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const overlay = document.getElementById("overlay");

btnCarrito.addEventListener("click", () => {
    carrito.classList.add("visible");
    overlay.classList.add("activo");
});

cerrarCarrito.addEventListener("click", () => {
    carrito.classList.remove("visible");
    overlay.classList.remove("activo");
});

overlay.addEventListener("click", () => {
    carrito.classList.remove("visible");
    overlay.classList.remove("activo");
});

// ===============================
// LISTA DEL CARRITO
// ===============================
let itemsCarrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.querySelector(".total");
const btnVaciar = document.querySelector(".btn-vaciar");

// ===============================
// CAPTURAR PRODUCTOS DEL HTML
// ===============================
document.querySelectorAll(".btn-agregar").forEach(boton => {
    boton.addEventListener("click", e => {
        const card = e.target.closest(".card");
        
        const nombre = card.querySelector("h4").textContent;
        const precioTexto = card.querySelector("p").textContent.replace("$","").replace(".","").trim();
        const precio = parseInt(precioTexto);
        const imagen = card.querySelector("img").src;

        agregarAlCarrito(nombre, precio, imagen);
    });
});

// ===============================
// AGREGAR PRODUCTO
// ===============================
function agregarAlCarrito(nombre, precio, imagen) {
    const existe = itemsCarrito.find(item => item.nombre === nombre);

    if (existe) {
        existe.cantidad++;
    } else {
        itemsCarrito.push({
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

// ===============================
// ACTUALIZAR CARRITO
// ===============================
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    itemsCarrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("item-carrito");

        li.innerHTML = `
            <img src="${item.imagen}" class="img-carrito">
            
            <div class="detalle">
                <span class="nombre">${item.nombre}</span>
                <span class="precio">$${item.precio.toLocaleString()}</span>
            </div>

            <div class="cantidad">
                <button class="menos">-</button>
                <span>${item.cantidad}</span>
                <button class="mas">+</button>
            </div>

            <button class="btn-eliminar">×</button>
        `;

        // Botón eliminar
        li.querySelector(".btn-eliminar").addEventListener("click", () => {
            itemsCarrito.splice(index, 1);
            actualizarCarrito();
        });

        // Botón +
        li.querySelector(".mas").addEventListener("click", () => {
            item.cantidad++;
            actualizarCarrito();
        });

        // Botón -
        li.querySelector(".menos").addEventListener("click", () => {
            if (item.cantidad > 1) {
                item.cantidad--;
            } else {
                itemsCarrito.splice(index, 1);
            }
            actualizarCarrito();
        });

        listaCarrito.appendChild(li);
    });

    calcularTotal();
}

// ===============================
// TOTAL DEL CARRITO
// ===============================
function calcularTotal() {
    const total = itemsCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalCarrito.textContent = `Total: $${total.toLocaleString()}`;
}

// ===============================
// VACIAR CARRITO
// ===============================
btnVaciar.addEventListener("click", () => {
    itemsCarrito = [];
    actualizarCarrito();
});


