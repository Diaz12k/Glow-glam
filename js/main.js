// =====================
// ELEMENTOS
// =====================
const carrito = document.getElementById('carrito');
const btnCarrito = document.querySelector('.cart');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.querySelector('.total');
const btnVaciar = document.querySelector('.btn-vaciar');
const btnCerrarCarrito = document.getElementById('cerrarCarrito');
const overlay = document.getElementById('overlay');

let productosEnCarrito = [];

// =====================
// MOSTRAR / OCULTAR
// =====================
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

// =====================
// AGREGAR PRODUCTOS
// =====================
document.querySelectorAll('.btn-agregar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');

    const nombre = card.querySelector('h4').textContent;
    const precioTexto = card.querySelector('p').textContent;
    const imgSrc = card.querySelector('img').getAttribute('src');

    const precio = parseFloat(precioTexto.replace('$', '').replace(',', '').trim());

    agregarProductoAlCarrito({ nombre, precio, imgSrc });
  });
});

function agregarProductoAlCarrito(producto) {
  const existe = productosEnCarrito.find(p => p.nombre === producto.nombre);

  if (existe) {
    existe.cantidad++;
  } else {
    productosEnCarrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarritoUI();
}

// =====================
// ACTUALIZAR CARRITO
// =====================
function actualizarCarritoUI() {
  listaCarrito.innerHTML = '';

  productosEnCarrito.forEach((producto, index) => {
    const item = document.createElement('div');
    item.classList.add('carrito-item');

    item.innerHTML = `
      <img src="${producto.imgSrc}" alt="producto">
      <div class="info">
        <p>${producto.nombre}</p>
        <span>$${(producto.precio * producto.cantidad).toLocaleString()}</span>
      </div>
      <div class="cantidades">
        <button class="btn-restar">-</button>
        <span>${producto.cantidad}</span>
        <button class="btn-sumar">+</button>
      </div>
      <button class="btn-eliminar">✕</button>
    `;

    // BOTÓN SUMAR
    item.querySelector('.btn-sumar').addEventListener('click', () => {
      producto.cantidad++;
      actualizarCarritoUI();
    });

    // BOTÓN RESTAR
    item.querySelector('.btn-restar').addEventListener('click', () => {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        productosEnCarrito.splice(index, 1);
      }
      actualizarCarritoUI();
    });

    // BOTÓN ELIMINAR
    item.querySelector('.btn-eliminar').addEventListener('click', () => {
      productosEnCarrito.splice(index, 1);
      actualizarCarritoUI();
    });

    listaCarrito.appendChild(item);
  });

  // TOTAL
  const total = productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalCarrito.textContent = `Total: $${total.toLocaleString()}`;
}

// =====================
// VACIAR CARRITO
// =====================
btnVaciar.addEventListener('click', () => {
  productosEnCarrito = [];
  actualizarCarritoUI();
});

