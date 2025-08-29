// ====== CURVA NORMAL ======
document.addEventListener("DOMContentLoaded", () => {
  const host = document.getElementById("grafica-normal");
  if (!host) return;

  const c = document.createElement("canvas");
  host.innerHTML = ""; host.appendChild(c);
  const ctx = c.getContext("2d");
  
  function resize() {
    const r = host.getBoundingClientRect();
    c.width  = Math.max(360, Math.floor(r.width));
    c.height = Math.max(180, Math.floor(r.height));
    start = null;
  }
  window.addEventListener("resize", resize);

  const X = Array.from({length: 241}, (_, i) => -4 + i*0.0335);
  const Y = X.map(t => Math.exp(-0.5*t*t)/Math.sqrt(2*Math.PI));
  const maxY = Math.max(...Y);

  const pad = 22;
  const mapX = (v,w) => pad + (v+4)/8 * (w - 2*pad);
  const mapY = (v,h) => h - pad - (v/maxY) * (h - 2*pad);

  let start = null;
  const drawMs = 5000;
  const holdMs = 50;
  const total  = drawMs + holdMs;

  const baseMsg = "PROCESANDO DATOS...";
  const typeSpeed = 55;
  function typedText(ts) {
    const chars = Math.min(baseMsg.length, Math.floor(ts/typeSpeed));
    return baseMsg.slice(0, chars);
  }

  function draw(ts) {
    if (start === null) start = ts;
    const w = c.width, h = c.height;

    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0,0,w,h);

    ctx.font = "12px Roboto Mono, monospace";
    ctx.fillStyle = "#628E12";
    ctx.fillText("Normal(0,1)", pad, pad - 6);

    const scanY = (ts/20) % h;
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.fillRect(0, scanY, w, 2);

    let t = (ts - start) % total;
    let prog = Math.min(1, t / drawMs);
    prog = 1 - Math.pow(1 - prog, 3);
    const cut = Math.max(2, Math.floor(prog * X.length));

    ctx.strokeStyle = "#223322";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mapX(-4,w), mapY(0,h));
    ctx.lineTo(mapX( 4,w), mapY(0,h));
    ctx.stroke();

    ctx.strokeStyle = "#7BAD0F";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < cut; i++) {
      const px = mapX(X[i], w), py = mapY(Y[i], h);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    if (cut < X.length) {
      const px = mapX(X[cut-1], w), py = mapY(Y[cut-1], h);
      ctx.fillStyle = "#9ED13A";
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2); ctx.fill();
    }

    const sepY = Math.round(h*0.55);
    ctx.strokeStyle = "#223322";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, sepY);
    ctx.lineTo(w - pad, sepY);
    ctx.stroke();

    const msg = typedText(ts - start);
    const blink = Math.floor(ts/500)%2 === 0 ? "_" : " ";
    ctx.font = "14px Roboto Mono, monospace";
    ctx.fillStyle = "#7BAD0F";
    ctx.fillText(msg + " " + blink, pad, sepY + 20);

    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
});


// ====== PANEL SLIDE PARA CARDS ======
document.addEventListener("DOMContentLoaded", () => {
  const panel = document.querySelector(".panel-slide");
  if (!panel) return;

  document.querySelectorAll(".card-modulo").forEach(card => {
    card.addEventListener("mouseenter", () => {
      panel.classList.add("activo");
      panel.innerHTML = card.querySelector(".contenido").innerHTML;
    });
    card.addEventListener("mouseleave", () => {
      panel.classList.remove("activo");
    });
  });
});

// ====== EFECTO SCROLL EN TÍTULO ======
document.addEventListener("scroll", () => {
  const titulo = document.querySelector(".presentacion h1");
  if (!titulo) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  titulo.style.backgroundPosition = `${scrollPercent * 100}% 0%`;
});

// JS con Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".contenido h1, .presentacion h1");
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animado");
      } else {
        entry.target.classList.remove("animado");
      }
    });
  }, { threshold: 0.5 }); // 50% visible
  
  targets.forEach(el => observer.observe(el));
});

