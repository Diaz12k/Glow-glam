document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const container = document.querySelector(".carrusel-container");
  const prevBtn = document.querySelector(".anterior");
  const nextBtn = document.querySelector(".siguiente");
  let index = 0;

  // --- Mostrar imagen actual ---
  function showSlide(i) {
    const offset = -i * 100;
    container.style.transform = `translateX(${offset}%)`;
  }
  //boton anterior 
  prevBtn.addEventListener("click",()=>{
    index = (index + 1) % slides.length;
    showSlide(index);
  });
  // --- Botón siguiente ---
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });


  // --- Cambio automático ---
  setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 4000); // Cambia cada 4 segundos
  });
