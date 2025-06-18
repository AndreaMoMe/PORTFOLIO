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

  // Filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      images.forEach(img => {
        const types = img.dataset.type.split(/[\s,]+/);
        if (filter === 'all' || types.includes(filter)) {
          img.classList.remove('hidden');
        } else {
          img.classList.add('hidden');
        }
      });

      filterButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
      button.classList.add('bg-blue-500', 'text-white');
    });
  });

  // Lightbox con datos
  images.forEach(media => {
    media.addEventListener('click', () => {
      lightboxMedia.innerHTML = ''; // Limpia contenido previo

      if (media.tagName.toLowerCase() === 'img') {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt || '';
        img.classList.add('w-full', 'rounded');
        lightboxMedia.appendChild(img);
      } else if (media.tagName.toLowerCase() === 'video') {
        const video = document.createElement('video');
        video.src = media.querySelector('source')?.src || media.src;
        video.controls = true;
        video.autoplay = true;
        video.classList.add('rounded-xl', 'overflow-hidden', // Corta lo que se sale del borde
        'block', 'max-w-full', 'max-h-[80vh]', 'mx-auto');
        lightboxMedia.appendChild(video);
      }

      lightboxTitle.textContent = media.dataset.title || '';
      lightboxDescription.textContent = media.dataset.description || '';
      lightboxTools.textContent = media.dataset.tools ? `Herramientas: ${media.dataset.tools}` : '';

      lightbox.classList.remove('hidden');
    });
  });


  // Cerrar lightbox al hacer clic fuera del contenido
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
      }
    });
  }

  // Cerrar con botón (la X)
   if (closeButton && lightbox) {
    closeButton.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
  }

  //menu hamburgesa
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    document.querySelectorAll('#nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navLinks.classList.remove('show');
        }
      });
    });
  } else {
    console.warn('No se encontró el botón o los enlaces de navegación');
  }

});

