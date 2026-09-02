# SDE2 Interview Notes

A lightweight, framework-free static website for SDE2 interview preparation. The notes focus on clear explanations, practical system-design mental models, HTML diagrams, and comparison tables.

## Current notes

- **Cache Strategies** — Cache-Aside, Write-Through, Write-Back, Read-Through, Refresh-Ahead and comparisons.
- **SQL vs NoSQL** — data models, schema, transactions, scaling, sharding and replication.
- **Database Indexing** — B+ Trees, data pages, data-page structure, page-to-disk-block mapping, clustered indexing and non-clustered indexing.
- **Distributed Concurrency Control** — transactions/ACID, locking, isolation levels, optimistic vs pessimistic control, versioning, MVCC, deadlocks and distributed transactions.
- **Active-Passive vs Active-Active Clustering** — failover, state consistency, split brain and trade-offs.
- **Networking Building Blocks** — proxy, reverse proxy, load balancer, firewall and VPN concepts.

## Site structure

The site follows one simple rule:

> **One topic = one HTML page.**

`index.html` is only the landing page / topic index. It does not contain the full notes for individual topics.

```text
index.html
   │
   ├── cache-strategies.html
   ├── sql-vs-nosql.html
   ├── database-indexing.html
   ├── distributed-concurrency-control.html
   ├── clustering.html
   └── networking.html

app.js      → single topic registry + shared navigation
styles.css  → shared site styling
```

## Adding a new topic

New topics should be added through **one predictable workflow**:

1. Create a new HTML page, for example `distributed-transactions.html`.
2. Add one object to `SDE_TOPICS` in `app.js`:

```js
{
  id: 'distributed-transactions',
  title: 'Distributed Transactions',
  shortTitle: 'Transactions',
  category: 'Databases',
  description: '2PC, atomic commit, failures and practical interview trade-offs.',
  href: 'distributed-transactions.html'
}
```

3. Reuse `styles.css` and the same basic page structure.
4. Include `<script src="app.js"></script>` on the new page.
5. Commit the new page and registry change together.

That's it. The homepage topic cards and every page's navigation are generated from the same registry, so there is no second navigation list to keep in sync.

### Important rules

- Use **relative URLs** so GitHub Pages works correctly under `/sde2-interview-notes/`.
- Do not add topics directly to `index.html`.
- Do not manually edit navigation on individual pages.
- Keep the main branch as the single publishing branch; no topic-specific branches are required.
- Reuse the shared CSS and keep the design simple and consistent.
- Prefer HTML/CSS diagrams, figures and tables instead of making the site depend on uploaded image binaries.

## Topic pages

### Database Indexing

`database-indexing.html` explains:

```text
B+ Tree
   ↓
Leaf entry / row locator
   ↓
Data Page
   ↓
Buffer Pool / Memory
   ↓
Disk block when the page is not cached
   ↓
Actual rows
```

It also includes the typical data-page layout:

```text
+-------------------+-------------------+----------------------+
| Page Header       | Slot Directory    | Row / Record Data    |
| - Page ID         | - Slot 1          | - Row 1              |
| - Page Type       | - Slot 2          | - Row 2              |
| - Record Count    | - ...             | - ...                |
| - Free Space Ptr  | - Slot N          | - Row N              |
+-------------------+-------------------+----------------------+
```

### Distributed Concurrency Control

`distributed-concurrency-control.html` covers:

```text
Concurrency problem
      ↓
Transactions / ACID
      ↓
DB locking
      ↓
Isolation levels + anomalies
      ↓
Pessimistic vs Optimistic
      ↓
Version checks / MVCC / deadlocks
```

## Images

The project intentionally uses **HTML diagrams, figures and tables** for the static site rather than depending on uploaded handwritten image binaries. This avoids broken-image problems on GitHub Pages while keeping the important visual explanations. Any visual concept added to the notes should also have a text/HTML representation in the repository.

## Run locally

Open `index.html` directly in a browser, or serve the directory with any static HTTP server.

## GitHub Pages

This is intentionally framework-free HTML/CSS/JS, so the repository can be published directly with GitHub Pages from the `main` branch.
