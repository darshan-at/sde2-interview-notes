# SDE2 Interview Notes

A lightweight, framework-free static website for SDE2 interview preparation. The notes focus on clear explanations, practical system-design mental models, HTML diagrams, and comparison tables.

## Current notes

- **Cache Strategies** — Cache-Aside, Write-Through, Write-Back, Read-Through, Refresh-Ahead and comparisons.
- **Database Indexing** — B+ Trees, data pages, data-page structure, page-to-disk-block mapping, clustered indexing, non-clustered indexing, and interview comparison points.
- **Distributed Concurrency Control** — concurrency need, transactions/ACID, DB locking, isolation levels and anomalies, synchronization, optimistic vs pessimistic concurrency control, optimistic versioning, MVCC, deadlocks and distributed transactions.
- **Active-Passive vs Active-Active Clustering** — failover, state consistency, split brain and trade-offs.
- **Proxy / Reverse Proxy / Load Balancer / Firewall / VPN** — networking building blocks and system-design distinctions.

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
