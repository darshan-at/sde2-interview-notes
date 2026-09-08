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
  { id: 'concurrency', title: 'Distributed Concurrency Control', shortTitle: 'Concurrency', category: 'Databases', description: 'Transactions, locking, isolation levels, optimistic and pessimistic control.', href: 'distributed-concurrency-control.html' },
  { id: 'oauth', title: 'OAuth 2.0', shortTitle: 'OAuth 2.0', category: 'Security', description: 'OAuth roles, grant types, PKCE, API request flow and Sign in with Google.', href: 'oauth-2-0.html' },
  { id: 'jwt', title: 'JWT', shortTitle: 'JWT', category: 'Security', description: 'JWT structure, advantages, challenges, sessions vs tokens, usage and JWK/JWKS.', href: 'jwt.html' },
  { id: 'thundering-herd', title: 'Thundering Herd Problem', shortTitle: 'Thundering Herd', category: 'Distributed Systems', description: 'Why many clients wake or retry together, cache stampedes, overload and mitigation patterns.', href: 'thundering-herd.html' }
];

function renderTopicNavigation() {
  const nav = document.querySelector('.nav nav');
  if (!nav) return;
  nav.innerHTML = '';

  const home = document.createElement('a');
  home.href = 'index.html';
  home.textContent = 'Home';
  nav.appendChild(home);

  const topicsToggle = document.createElement('button');
  topicsToggle.className = 'topics-toggle';
  topicsToggle.type = 'button';
  topicsToggle.setAttribute('aria-expanded', 'false');
  topicsToggle.setAttribute('aria-controls', 'topics-menu');
  topicsToggle.innerHTML = 'Topics <span aria-hidden="true">▾</span>';
  nav.appendChild(topicsToggle);

  const topicsMenu = document.createElement('div');
  topicsMenu.className = 'topics-menu';
  topicsMenu.id = 'topics-menu';

  const grouped = SDE_TOPICS.reduce((groups, topic) => {
    (groups[topic.category] ||= []).push(topic);
    return groups;
  }, {});

  Object.entries(grouped).forEach(([category, topics]) => {
    const group = document.createElement('div');
    group.className = 'topics-group';

    const heading = document.createElement('div');
    heading.className = 'topics-group-title';
    heading.textContent = category;
    group.appendChild(heading);

    topics.forEach(topic => {
      const link = document.createElement('a');
      link.href = topic.href;
      link.textContent = topic.shortTitle;
      group.appendChild(link);
    });

    topicsMenu.appendChild(group);
  });

  nav.appendChild(topicsMenu);

  SDE_TOPICS.forEach(topic => {
    const link = document.createElement('a');
    link.className = 'desktop-topic-link';
    link.href = topic.href;
    link.textContent = topic.shortTitle;
    nav.appendChild(link);
  });

  topicsToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('topics-open');
    topicsToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) {
      nav.classList.remove('topics-open');
      topicsToggle.setAttribute('aria-expanded', 'false');
    }
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
