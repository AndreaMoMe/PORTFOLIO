document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const images = document.querySelectorAll('.project-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.getElementById('lightbox-media');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxTools = document.getElementById('lightbox-tools');
  const closeButton = document.getElementById('close-lightbox');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  // ===== FILTRO =====
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      images.forEach(img => {
        const types = img.dataset.type.split(/[\s,]+/);
        img.classList.toggle('hidden', !(filter === 'all' || types.includes(filter)));
      });

      filterButtons.forEach(btn => {
        btn.style.backgroundColor = '#f2e8fc';
        btn.style.color = '#2c1a38';
      });

      button.style.backgroundColor = '#2c1a38';
      button.style.color = 'white';
    });
  });

  // ===== LIGHTBOX =====
  images.forEach(media => {
    media.addEventListener('click', () => {
      lightboxMedia.innerHTML = ''; // Limpia contenido previo
      const videoURL = media.dataset.video;

      if (videoURL) {
        // Determinar tipo de video
        if (videoURL.includes('youtube.com') || videoURL.includes('youtu.be')) {
          // Convertir a embed de YouTube
          let videoId = '';
          if (videoURL.includes('youtu.be')) {
            videoId = videoURL.split('/').pop();
          } else {
            const urlParams = new URL(videoURL).searchParams;
            videoId = urlParams.get('v');
          }
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
          iframe.frameBorder = 0;
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;
          iframe.classList.add('rounded-xl', 'overflow-hidden', 'block', 'w-full', 'max-h-[80vh]', 'mx-auto');
          lightboxMedia.appendChild(iframe);
        } else if (videoURL.includes('drive.google.com')) {
          // Convertir enlace de Drive a descarga directa
          const fileId = videoURL.split('/d/')[1]?.split('/')[0];
          if (fileId) {
            const driveLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
            const video = document.createElement('video');
            video.src = driveLink;
            video.controls = true;
            video.autoplay = true;
            video.classList.add('rounded-xl', 'overflow-hidden', 'block', 'max-w-full', 'max-h-[80vh]', 'mx-auto');
            lightboxMedia.appendChild(video);
          } else {
            console.error('No se pudo extraer ID de Drive');
          }
        }
      } else if (media.tagName.toLowerCase() === 'img') {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt || '';
        img.classList.add('w-full', 'rounded');
        lightboxMedia.appendChild(img);
      }

      // Actualizar datos del lightbox
      lightboxTitle.textContent = media.dataset.title || '';
      lightboxDescription.textContent = media.dataset.description || '';
      lightboxTools.textContent = media.dataset.tools ? `Herramientas: ${media.dataset.tools}` : '';

      // Enlace dinámico
      const enlace = media.dataset.link;
      const linkElement = document.getElementById('lightbox-link');
      if (enlace) {
        linkElement.href = enlace;
        linkElement.style.display = 'inline';
        linkElement.textContent = 'Ver Más';
      } else {
        linkElement.style.display = 'none';
      }

      lightbox.classList.remove('hidden');
    });
  });

  // ===== CERRAR LIGHTBOX =====
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.add('hidden');
    });
  }

  if (closeButton && lightbox) {
    closeButton.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
  }

  // ===== MENU HAMBURGUESA =====
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

    document.querySelectorAll('#nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) navLinks.classList.remove('show');
      });
    });
  } else {
    console.warn('No se encontró el botón o los enlaces de navegación');
  }
});