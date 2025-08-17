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
