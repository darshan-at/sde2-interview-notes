# SDE2 Interview Notes

A lightweight, framework-free static website for SDE2 interview preparation. The notes focus on clear explanations, practical system-design mental models, HTML diagrams, and comparison tables.

## Current notes

- **Cache Strategies** — Cache-Aside, Write-Through, Write-Back, Read-Through, Refresh-Ahead and comparisons.
- **Database Indexing** — B+ Trees, data pages, data-page structure, page-to-disk-block mapping, clustered indexing, non-clustered indexing, and interview comparison points.
- **Distributed Concurrency Control** — concurrency need, transactions/ACID, DB locking, isolation levels and anomalies, synchronization, optimistic vs pessimistic concurrency control, optimistic versioning, MVCC, deadlocks and distributed transactions.
- **Active-Passive vs Active-Active Clustering** — failover, state consistency, split brain and trade-offs.
- **Proxy / Reverse Proxy / Load Balancer / Firewall / VPN** — networking building blocks and system-design distinctions.

## Adding a new topic

The site now uses a **single topic registry in `app.js`**. This prevents the homepage navigation and topic list from getting out of sync when new notes are added.

### Standard workflow

1. Create a new topic page, for example `distributed-transactions.html`.
2. Add one object to `SDE_TOPICS` in `app.js`:

```js
{
  id: 'distributed-transactions',
  title: 'Distributed Transactions',
  category: 'Databases',
  description: '2PC, atomic commit, failures and practical interview trade-offs.',
  href: 'distributed-transactions.html'
}
```

3. Commit the page and `app.js` together.
4. The homepage automatically gets a new topic card and navigation entry.

For a topic that lives directly on `index.html`, use an anchor URL such as `index.html#transactions` instead of creating a separate page.

### Important rules

- Use **relative URLs** only so GitHub Pages works correctly under `/sde2-interview-notes/`.
- Reuse `styles.css` for the common visual language.
- Prefer dedicated topic pages for larger topics.
- Keep diagrams as HTML/CSS where practical; do not make the site depend on uploaded image binaries.
- Keep the main branch as the single publishing branch; no branch is required for each topic.

## Site architecture

```text
index.html
   │
   ├── Existing topic sections
   │
   └── app.js
         │
         └── SDE_TOPICS registry
                ├── homepage topic cards
                └── shared navigation

styles.css  → shared site styling

Dedicated topic pages
   ├── database-indexing.html
   └── distributed-concurrency-control.html
```

This means a new topic has **one source of truth for its title, category, description and URL**. The homepage does not need a separate hand-edited navigation entry.

## Distributed Concurrency Control

The concurrency notes are available as a dedicated static page:

```text
distributed-concurrency-control.html
```

The page covers the interview flow:

```text
Why concurrency?
      ↓
Transactions / ACID
      ↓
DB Locking
      ↓
Isolation Levels + anomalies
      ↓
Concurrency control
  ┌───────────────┐
  │ Synchronize   │
  │ Optimistic    │
  │ Pessimistic   │
  └───────────────┘
      ↓
Distributed examples + MVCC + deadlocks
```

Important distributed-control ideas include:

- **Pessimistic:** assume conflicts are likely; acquire locks and block conflicting operations.
- **Optimistic:** assume conflicts are rare; use versions/timestamps/validation and retry when a conflict is detected.
- **Isolation levels:** Read Uncommitted, Read Committed, Repeatable Read and Serializable, with dirty-read, non-repeatable-read and phantom-read behavior.
- **Distributed optimistic locking:** version checks such as `UPDATE ... WHERE id=? AND version=?` prevent stale writers from silently overwriting newer data.

## Database Indexing

The indexing notes are available as a dedicated static page:

```text
database-indexing.html
```

The page explains the storage path conceptually:

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

It also includes a typical data-page layout:

```text
+-------------------+-------------------+----------------------+
| Page Header       | Slot Directory    | Row / Record Data    |
| - Page ID         | - Slot 1          | - Row 1              |
| - Page Type       | - Slot 2          | - Row 2              |
| - Record Count    | - ...             | - ...                |
| - Free Space Ptr  | - Slot N          | - Row N              |
+-------------------+-------------------+----------------------+
```

### Storage terminology note

A database page is a logical storage unit exposed by the database engine. The exact relationship between a database page and an underlying disk/storage block depends on the database and storage stack. Many systems use page sizes designed to align well with block I/O, but the mapping should not be assumed to be universally one-to-one.

## Images

The project intentionally uses **HTML diagrams, figures and tables** for the static site rather than depending on uploaded handwritten image binaries. This avoids broken-image problems on GitHub Pages while keeping the important visual explanations.

## Run locally

Open `index.html` directly in a browser, or serve the directory with any static HTTP server.

## GitHub Pages

This is intentionally framework-free HTML/CSS/JS, so the repository can be published directly with GitHub Pages from the `main` branch.
