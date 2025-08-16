<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".custom-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.remove("animate__animated", "animate__flip");
      void card.offsetWidth; // truco para reiniciar animación
      card.classList.add("animate__animated", "animate__flip");
    });
  });
});
