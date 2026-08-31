const cards = [...document.querySelectorAll('.note-card')];
const filters = [...document.querySelectorAll('.filter')];
const search = document.querySelector('#search');

let activeFilter = 'all';

function applyFilters() {
  const q = search.value.trim().toLowerCase();
  cards.forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = !q || card.dataset.search.includes(q);
    card.hidden = !(matchesFilter && matchesSearch);
  });
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(b => b.classList.toggle('active', b === button));
    applyFilters();
  });
});
search.addEventListener('input', applyFilters);

const modal = document.querySelector('#modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');

function openModal(src, title) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = title;
  modalImage.src = src;
  modalImage.alt = title;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImage.removeAttribute('src');
  document.body.style.overflow = '';
}

document.querySelectorAll('.open-note').forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.src, button.dataset.title));
});
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// When a source image is absent, the card remains useful through its notebook-style fallback.
document.querySelectorAll('.note-image-wrap img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
  });
});
modalImage.addEventListener('error', () => {
  modalImage.style.display = 'none';
});

// Keep the homepage navigation connected to the dedicated database-indexing page.
const nav = document.querySelector('.nav nav');
if (nav && !nav.querySelector('a[href="database-indexing.html"]')) {
  const link = document.createElement('a');
  link.href = 'database-indexing.html';
  link.textContent = 'Indexing';
  nav.appendChild(link);
}

applyFilters();
