document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const images = document.querySelectorAll('.project-img');
  
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
  
    images.forEach(img => {
      img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
      });
    });
  });
  