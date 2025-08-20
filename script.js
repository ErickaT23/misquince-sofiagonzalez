// script.js
// Lógica de invitación basada en el array estático `guests` definido en loads.js

// Al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    iniciarContador();
    cargarDatosInvitado();
    initFadeInObserver();
    document.getElementById('seal')?.addEventListener('click', abrirInvitacion);
  });
  
  // 1. Función para abrir la invitación y reproducir música
  function abrirInvitacion() {
    const envelope   = document.getElementById('envelope');
    const invitacion = document.getElementById('invitacion');
    if (!envelope || !invitacion) return;
  
    envelope.classList.add('open');
    setTimeout(() => {
      envelope.style.display   = 'none';
      invitacion.style.display = 'block';
      document.getElementById('musica')?.play();
    }, 1000);
  }
  
  // 2. Contador regresivo hasta la fecha del evento
  function iniciarContador() {
    const fechaEvento = new Date('Septembre 06, 2025 00:00:00').getTime();
    setInterval(() => {
      const ahora     = Date.now();
      const diff      = fechaEvento - ahora;
      const dias      = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas     = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos   = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos  = Math.floor((diff % (1000 * 60)) / 1000);
  
      document.getElementById('dias').innerText    = dias;
      document.getElementById('horas').innerText   = horas;
      document.getElementById('minutos').innerText = minutos;
      document.getElementById('segundos').innerText= segundos;
    }, 1000);
  }
  
// 3. Cargar datos del invitado actual según ?id= (sin autoabrir)
function cargarDatosInvitado() {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  if (!id) return;

  // `guests` viene de loads.js
  const invitado = window.guests?.find(g => g.id === id);

  const nombreEl = document.getElementById('nombreInvitado');
  const pasesEl  = document.getElementById('cantidadPases');

  if (invitado) {
    const name   = (invitado.name || '').trim();
    const passes = typeof invitado.passes === 'number' ? invitado.passes : null;

    if (name && name.toLowerCase() !== 'sin nombre') {
      const invitText = passes > 1
        ? `¡${name}, están invitados!`
        : `¡${name}, estás invitado!`;
      if (nombreEl) nombreEl.textContent = invitText;
      if (pasesEl && passes !== null) {
        pasesEl.textContent = `${passes} ${passes === 1 ? 'pase' : 'pases'}`;
      }
    } else {
      if (nombreEl) nombreEl.style.display = 'none';
      if (pasesEl)  pasesEl.style.display  = 'none';
    }

    // 👇 IMPORTANTE: ya NO auto‑abrimos
    // abrirInvitacion();  // <-- eliminado
  } else {
    console.warn(`Invitado con id=${id} no encontrado`);
  }
}

  
  // 4. Observer para efecto fade-in al hacer scroll
  function initFadeInObserver() {
    const elems = document.querySelectorAll('.fade-in-element');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    elems.forEach(el => observer.observe(el));
  }
  
  // (Opcionales) Puedes mantener funciones de lightbox, mapas y confirmación si las necesitas:
  
  function changePhoto(element) {
    const modal = document.getElementById('photo-modal');
    const img   = document.getElementById('main-photo-modal');
    if (img) img.src = element.src;
    if (modal) modal.style.display = 'flex';
  }
  function closeModal(event) {
    if (!event || event.target.id === 'photo-modal' || event.target.classList.contains('close')) {
      document.getElementById('photo-modal').style.display = 'none';
    }
  }
  
  function confirmarAsistencia() {
    const params  = new URLSearchParams(window.location.search);
    const guestId = params.get("id");
  
    // Buscar invitado en la lista global
    const invitado = window.guests?.find(g => g.id === guestId);
  
    if (!invitado) {
      alert("Invitado no encontrado.");
      return;
    }
  
    const nombre = invitado.name;
    const pases  = invitado.passes;
  
    let msg = "";
  
    if (pases === 1) {
      msg = `Hola, soy ${nombre} y confirmo mi asistencia a los quince de nuestra querida Sofía con mi pase asignado.`;
    } else {
      msg = `Hola, somos ${nombre} y confirmamos nuestra asistencia a los quince de nuestra querida Sofía con nuestros ${pases} pases asignados.`;
    }
  
    window.open(
      `https://api.whatsapp.com/send?phone=50239908920&text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }
  
  
  function elegirAplicacionOtraDireccion() {
    window.open('https://maps.app.goo.gl/efFY6Je3yS8R8roC8','_blank');
    setTimeout(() => window.open('https://ul.waze.com/ul?place=ChIJowHOhNkniYURxtn6Txcc8E4&ll=14.33154710%2C-91.01401210&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location','_blank'),1000);
  }
  
// === Destellos tipo estrella globales ===
document.addEventListener("DOMContentLoaded", () => {
  const layer = document.getElementById("twinkles");
  if (!layer) return;

  function createTwinkle() {
    const tw = document.createElement("div");
    tw.className = "twinkle";

    // Posición aleatoria dentro del viewport
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Tamaño y tiempos aleatorios
    const size = 8 + Math.random() * 12;  // 8px a 20px
    const dur  = 1.8 + Math.random() * 2.2;
    const delay = Math.random() * 1.2;

    tw.style.left = `${x}px`;
    tw.style.top  = `${y}px`;
    tw.style.width  = `${size}px`;
    tw.style.height = `${size}px`;
    tw.style.animationDuration = `${dur}s`;
    tw.style.animationDelay    = `${delay}s`;

    layer.appendChild(tw);

    // remover al terminar
    setTimeout(() => tw.remove(), (dur + delay) * 1000);
  }

  // Frecuencia de aparición
  const intervalMs = 260;
  setInterval(createTwinkle, intervalMs);

  // Semilla inicial
  for (let i = 0; i < 16; i++) createTwinkle();
});
