document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const container = document.querySelector(".carrusel-container");
  const prevBtn = document.querySelector(".anterior");
  const nextBtn = document.querySelector(".siguiente");
  let index = 0;
  let intervalo;

  // --- Mostrar imagen actual ---
  function showSlide(i) {
    const offset = -i * 100;
    container.style.transform = `translateX(${offset}%)`;
  }

  // --- Cambio automático ---
  function autoPlay() {
    intervalo = setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 4000); // Cambia cada 4 segundos
  }

  // --- Botón anterior ---
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
    reiniciarAutoPlay();
  });

  // --- Botón siguiente ---
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
    reiniciarAutoPlay();
  });

  // --- Reinicia el autoPlay si tocan las flechas ---
  function reiniciarAutoPlay() {
    clearInterval(intervalo);
    autoPlay();
  }

  // --- Inicia ---
  autoPlay();
});
