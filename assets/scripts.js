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

document.addEventListener("DOMContentLoaded", function() {
  const terminal = document.querySelector(".ventana-terminal");
  const texto = "PROCESANDO DATOS...";
  let i = 0;

  function escribir() {
    if (i < texto.length) {
      terminal.innerHTML += texto.charAt(i);
      i++;
      setTimeout(escribir, 100); // velocidad de escritura (100 ms por letra)
    } else {
      // al final deja un cursor parpadeante
      terminal.innerHTML += '<span class="cursor"></span>';
    }
  }

  escribir();
});

document.addEventListener("DOMContentLoaded", function() {
  // Eje X
  let x = [];
  for (let i = -4; i <= 4; i += 0.1) {
    x.push(i);
  }

  // Densidad normal
  function normalPDF(x, mu=0, sigma=1) {
    return (1/(sigma*Math.sqrt(2*Math.PI))) * Math.exp(-0.5 * Math.pow((x-mu)/sigma,2));
  }

  let y = x.map(v => normalPDF(v));

  let trace = {
    x: x,
    y: y,
    mode: "lines",
    line: { color: "#7BAD0F" }
  };

  let layout = {
    paper_bgcolor: "#0d0d0d",
    plot_bgcolor: "#0d0d0d",
    font: { color: "#7BAD0F" },
    xaxis: { color: "#7BAD0F" },
    yaxis: { color: "#7BAD0F" },
    margin: { t: 20, r: 20, l: 40, b: 40 }
  };

  Plotly.newPlot("grafica-normal", [trace], layout);

  // animación: muestra la curva punto a punto
  let frames = [];
  for (let i = 1; i <= x.length; i++) {
    frames.push({
      data: [{x: x.slice(0,i), y: y.slice(0,i)}]
    });
  }

  Plotly.animate("grafica-normal", frames, {
    transition: { duration: 0 },
    frame: { duration: 50, redraw: true }
  });
});

console.log("✅ JS cargado correctamente");


// Prueba visible
console.log("✅ scripts.js cargado");

// Dibujo mínimo (sin depender de nada más)
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("grafica-normal");
  if (!el) return;

  // Curva normal rápida (sin librerías)
  const x = Array.from({length: 161}, (_, i) => -4 + i*0.05);
  const y = x.map(t => Math.exp(-0.5*t*t)/Math.sqrt(2*Math.PI));

  // Dibujo simple en canvas dentro del div
  el.innerHTML = '<canvas id="cnv" width="640" height="280"></canvas>';
  const c = document.getElementById("cnv");
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#0d0d0d"; ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle = "#7BAD0F"; ctx.lineWidth = 2;

  const mapX = v => (v + 4) / 8 * (c.width - 40) + 20;
  const maxY = Math.max(...y), mapY = v => c.height - (v / maxY) * (c.height - 40) - 20;

  ctx.beginPath();
  x.forEach((vx, i) => {
    const px = mapX(vx), py = mapY(y[i]);
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  });
  ctx.stroke();
});

