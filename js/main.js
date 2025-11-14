// ====== SELECCIÓN DE ELEMENTOS ======
const carrito = document.getElementById('carrito');
const btnCarrito = document.querySelector('.cart');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = carrito.querySelector('.total');
const btnVaciar = carrito.querySelector('.btn-vaciar');
const btnCerrarCarrito = document.getElementById('cerrarCarrito');
const overlay = document.getElementById('overlay');

let productosEnCarrito = [];


// ====== MOSTRAR / OCULTAR CARRITO ======
btnCarrito.addEventListener('click', () => {
  carrito.classList.toggle('visible');
  overlay.classList.toggle('activo');
});

if (btnCerrarCarrito) {
  btnCerrarCarrito.addEventListener('click', () => {
    carrito.classList.remove('visible');
    overlay.classList.remove('activo');
  });
}

overlay.addEventListener('click', () => {
  carrito.classList.remove('visible');
  overlay.classList.remove('activo');
});


// ====== AGREGAR PRODUCTOS AL CARRITO ======
document.querySelectorAll('.btn-agregar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const nombre = card.querySelector('h4').textContent;
    const precioTexto = card.querySelector('.precio').textContent;
    const img = card.querySelector('img').src;

    const precio = parseFloat(precioTexto.replace('$', '').replace(',', '.').trim());

    agregarProductoAlCarrito({ nombre, precio, img });
  });
});


// ====== AGREGAR O SUMAR PRODUCTO ======
function agregarProductoAlCarrito(producto) {
  const productoExistente = productosEnCarrito.find(p => p.nombre === producto.nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    productosEnCarrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarritoUI();
}


// ====== ACTUALIZAR CARRITO ======
function actualizarCarritoUI() {
  listaCarrito.innerHTML = '';

  productosEnCarrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.classList.add('item-carrito');

    li.innerHTML = `
      <img src="${producto.img}" class="img-carrito">

      <div class="detalle">
        <p class="nombre">${producto.nombre}</p>
        <p class="precio">$${(producto.precio * producto.cantidad).toLocaleString()}</p>

        <div class="cantidad">
          <button class="btn-restar">−</button>
          <span>${producto.cantidad}</span>
          <button class="btn-sumar">+</button>
        </div>
      </div>

      <button class="btn-eliminar">✕</button>
    `;

    // SUMAR
    li.querySelector('.btn-sumar').addEventListener('click', () => {
      producto.cantidad++;
      actualizarCarritoUI();
    });

    // RESTAR
    li.querySelector('.btn-restar').addEventListener('click', () => {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        productosEnCarrito.splice(index, 1);
      }
      actualizarCarritoUI();
    });

    // ELIMINAR
    li.querySelector('.btn-eliminar').addEventListener('click', () => {
      productosEnCarrito.splice(index, 1);
      actualizarCarritoUI();
    });

    listaCarrito.appendChild(li);
  });

  // TOTAL
  const total = productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalCarrito.textContent = `Total: $${total.toLocaleString()}`;
}


// ====== VACIAR CARRITO ======
btnVaciar.addEventListener('click', () => {
  productosEnCarrito = [];
  actualizarCarritoUI();
});
