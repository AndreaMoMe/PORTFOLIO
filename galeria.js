document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const images = document.querySelectorAll('.project-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxTools = document.getElementById('lightbox-tools');
  const closeButton = document.getElementById('close-lightbox');

  // Filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      images.forEach(img => {
        if (filter === 'all' || img.dataset.type === filter) {
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
  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      // Asigna los textos del dataset si existen
      lightboxTitle.textContent = img.dataset.title || '';
      lightboxDescription.textContent = img.dataset.description || '';
      lightboxTools.textContent = img.dataset.tools ? `Herramientas: ${img.dataset.tools}` : '';

      lightbox.classList.remove('hidden');
    });
  });

  // Cerrar lightbox al hacer clic fuera del contenido
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
    }
  });

  // Cerrar con botón (la X)
  closeButton.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
});

