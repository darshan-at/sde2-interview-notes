/* Central topic registry + safe UI helpers for the static site. */
const SDE_TOPICS = [
  { id: 'caching', title: 'Cache Strategies', category: 'Caching', description: 'Cache-Aside, Write-Through, Write-Back, Read-Through and Refresh-Ahead.', href: 'index.html#caching' },
  { id: 'databases', title: 'SQL vs NoSQL', category: 'Databases', description: 'Data models, transactions, scaling, sharding and replication.', href: 'index.html#databases' },
  { id: 'indexing', title: 'Database Indexing', category: 'Databases', description: 'B+ Trees, data pages, disk mapping, clustered and non-clustered indexes.', href: 'database-indexing.html' },
  { id: 'clustering', title: 'Active-Passive vs Active-Active', category: 'Distributed Systems', description: 'Failover, load distribution, state consistency and split-brain concerns.', href: 'index.html#clustering' },
  { id: 'networking', title: 'Networking Building Blocks', category: 'Networking', description: 'Proxy, reverse proxy, load balancer, firewall and VPN concepts.', href: 'index.html#networking' },
  { id: 'concurrency', title: 'Distributed Concurrency Control', category: 'Databases', description: 'Transactions, locking, isolation levels, optimistic and pessimistic control.', href: 'distributed-concurrency-control.html' }
];

function isHomePage() {
  const path = window.location.pathname.split('/').pop();
  return path === '' || path === 'index.html';
}

function renderTopicNavigation() {
  const nav = document.querySelector('.nav nav');
  if (!nav) return;
  nav.innerHTML = '';
  const home = document.createElement('a');
  home.href = 'index.html';
  home.textContent = 'Home';
  nav.appendChild(home);
  SDE_TOPICS.forEach(topic => {
    const link = document.createElement('a');
    link.href = topic.href;
    link.textContent = topic.title
      .replace('Distributed ', '')
      .replace('Active-Passive vs Active-Active', 'Clustering');
    nav.appendChild(link);
  });
}

function renderTopicIndex() {
  if (!isHomePage()) return;
  const main = document.querySelector('main');
  const intro = main?.querySelector('.intro');
  if (!main || !intro || document.querySelector('.topic-index')) return;

  const section = document.createElement('section');
  section.className = 'topic-index section';
  section.id = 'topics';
  section.innerHTML = `
    <div class="section-head">
      <span class="num">TOPICS</span>
      <div>
        <h2>Interview Topics</h2>
        <p>Generated from the central topic registry — new topics appear here automatically.</p>
      </div>
    </div>
    <div class="topic-cards grid two"></div>`;

  const cards = section.querySelector('.topic-cards');
  SDE_TOPICS.forEach((topic, index) => {
    const article = document.createElement('article');
    article.className = 'card topic-card';
    article.innerHTML = `
      <div class="topic-card-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="topic-card-category">${topic.category}</div>
      <h3><a href="${topic.href}">${topic.title}</a></h3>
      <p>${topic.description}</p>
      <a class="topic-card-link" href="${topic.href}">Open notes →</a>`;
    cards.appendChild(article);
  });
  intro.insertAdjacentElement('afterend', section);
}

function setupSearchAndFilters() {
  const cards = [...document.querySelectorAll('.note-card')];
  const filters = [...document.querySelectorAll('.filter')];
  const search = document.querySelector('#search');
  if (!cards.length || !search) return;
  let activeFilter = 'all';
  function applyFilters() {
    const q = search.value.trim().toLowerCase();
    cards.forEach(card => {
      const matchesFilter = activeFilter === 'all' || activeFilter === card.dataset.category;
      const matchesSearch = !q || (card.dataset.search || '').includes(q);
      card.hidden = !(matchesFilter && matchesSearch);
    });
  }
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(b => b.classList.toggle('active', b === button));
    applyFilters();
  }));
  search.addEventListener('input', applyFilters);
  applyFilters();
}

function setupImageModal() {
  const modal = document.querySelector('#modal');
  const modalImage = document.querySelector('#modal-image');
  const modalTitle = document.querySelector('#modal-title');
  if (!modal || !modalImage || !modalTitle) return;
  function openModal(src, title) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = title;
    modalImage.src = src;
    modalImage.alt = title;
    modalImage.style.display = '';
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
  document.querySelectorAll('.note-image-wrap img').forEach(img => {
    img.addEventListener('error', () => { img.style.display = 'none'; });
  });
  modalImage.addEventListener('error', () => { modalImage.style.display = 'none'; });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTopicNavigation();
  renderTopicIndex();
  setupSearchAndFilters();
  setupImageModal();
});
