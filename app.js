/*
 * Single source of truth for site topics.
 * To add a topic: create its HTML page, then add one object here.
 */
const SDE_TOPICS = [
  { id: 'caching', title: 'Cache Strategies', shortTitle: 'Caching', category: 'Caching', description: 'Cache-Aside, Write-Through, Write-Back, Read-Through and Refresh-Ahead.', href: 'cache-strategies.html' },
  { id: 'databases', title: 'SQL vs NoSQL', shortTitle: 'SQL vs NoSQL', category: 'Databases', description: 'Data models, transactions, schema, scaling, sharding and replication.', href: 'sql-vs-nosql.html' },
  { id: 'indexing', title: 'Database Indexing', shortTitle: 'Indexing', category: 'Databases', description: 'B+ Trees, data pages, disk mapping, clustered and non-clustered indexes.', href: 'database-indexing.html' },
  { id: 'clustering', title: 'Active-Passive vs Active-Active', shortTitle: 'Clustering', category: 'Distributed Systems', description: 'Failover, load distribution, state consistency and split-brain concerns.', href: 'clustering.html' },
  { id: 'networking', title: 'Networking Building Blocks', shortTitle: 'Networking', category: 'Networking', description: 'Proxy, reverse proxy, load balancer, firewall and VPN concepts.', href: 'networking.html' },
  { id: 'concurrency', title: 'Distributed Concurrency Control', shortTitle: 'Concurrency', category: 'Databases', description: 'Transactions, locking, isolation levels, optimistic and pessimistic control.', href: 'distributed-concurrency-control.html' }
];

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
    link.textContent = topic.shortTitle;
    nav.appendChild(link);
  });
}

function renderTopicIndex() {
  const container = document.querySelector('#topic-list');
  if (!container) return;
  container.innerHTML = '';
  SDE_TOPICS.forEach((topic, index) => {
    const article = document.createElement('article');
    article.className = 'card topic-card';
    article.innerHTML = `
      <div class="topic-card-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="topic-card-category">${topic.category}</div>
      <h3><a href="${topic.href}">${topic.title}</a></h3>
      <p>${topic.description}</p>
      <a class="topic-card-link" href="${topic.href}">Open notes →</a>`;
    container.appendChild(article);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTopicNavigation();
  renderTopicIndex();
});
