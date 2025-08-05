document.addEventListener('DOMContentLoaded', () => {  
  const btnCapitulo = document.getElementById('btnCapitulo');
  const preguntaContainer = document.getElementById('preguntaContainer');
  const respuestaContainer = document.getElementById('respuestaContainer');
  const btnSi = document.getElementById('btnSi');
  const btnNo = document.getElementById('btnNo');

  btnCapitulo.addEventListener('click', () => {
    btnCapitulo.style.display = 'none';
    preguntaContainer.style.display = 'block';
  });

  // Función original para mover el botón (sin cambios)
  function moverBotonNo() {
    const contenedor = document.querySelector('.contenedor-romantico');
    const contRect = contenedor.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    
    const maxX = contRect.width - btnRect.width;
    const maxY = contRect.height * 0.7 - btnRect.height;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY * 0.8;
    
    btnNo.style.transition = 'all 0.2s ease-out';
    btnNo.style.position = 'absolute';
    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;
  }

  // Eventos adaptados para móvil (solo cambios necesarios)
  btnNo.addEventListener('mouseenter', moverBotonNo);
  
  // Versión para touch (móvil)
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita el zoom accidental
    moverBotonNo();
    
    // Mueve el botón nuevamente después de un breve retraso (para móvil)
    setTimeout(moverBotonNo, 200);
  });

  // Versión para desktop (original)
  btnNo.addEventListener('mousedown', (e) => {
    e.preventDefault();
    moverBotonNo();
  });

  // Resto del código original (sin cambios)
  btnSi.addEventListener('click', () => {
    preguntaContainer.style.display = 'none';
    respuestaContainer.style.display = 'block';
    lanzarConfeti();

    setTimeout(() => {
      localStorage.setItem('respuestaPropuesta', 'si');
      window.location.href = "index.html";
    }, 5000);
  });

  function lanzarConfeti() {
    const formas = ['❤️', '✨', '🌸', '🌟', '💜'];
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const confeti = document.createElement('div');
        confeti.textContent = formas[Math.floor(Math.random() * formas.length)];
        confeti.style.position = 'fixed';
        confeti.style.left = `${Math.random() * 100}vw`;
        confeti.style.top = '-50px';
        confeti.style.fontSize = `${Math.random() * 20 + 15}px`;
        confeti.style.animation = `caerConfeti ${Math.random() * 3 + 2}s linear forwards`;
        confeti.style.zIndex = '1000';
        confeti.style.color = `hsl(${Math.random() * 60 + 270}, 70%, 70%)`;
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 5000);
      }, i * 30);
    }
  }

  const estiloConfeti = document.createElement('style');
  estiloConfeti.innerHTML = `
    @keyframes caerConfeti {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(estiloConfeti);
});