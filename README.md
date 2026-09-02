# SDE2 Interview Notes

A lightweight, framework-free static website for SDE2 interview preparation. The notes focus on clear explanations, practical system-design mental models, HTML diagrams, and comparison tables.

## Current notes

- **Cache Strategies** — Cache-Aside, Write-Through, Write-Back, Read-Through, Refresh-Ahead and comparisons.
- **Database Indexing** — B+ Trees, data pages, data-page structure, page-to-disk-block mapping, clustered indexing, non-clustered indexing, and interview comparison points.
- **Distributed Concurrency Control** — why concurrency is needed, transactions and ACID, DB locking, isolation levels and anomalies, synchronization, pessimistic vs optimistic concurrency control, MVCC, deadlocks and version-based optimistic locking.
- **Active-Passive vs Active-Active Clustering** — failover, state consistency, split brain and trade-offs.
- **Proxy / Reverse Proxy / Load Balancer / Firewall / VPN** — networking building blocks and system-design distinctions.

## Distributed Concurrency Control

The concurrency notes are available as a dedicated static page:

```text
distributed-concurrency-control.html
```

Core mental model:

```text
Many concurrent requests
          ↓
   Shared database state
          ↓
  Concurrency control
     ↙           ↘
Synchronize    Distributed CC
                ↙       ↘
        Pessimistic   Optimistic
          (locks)    (version/check)
```

The page covers:

- Why concurrency is needed and the lost-update problem.
- Transactions and ACID properties.
- Shared and exclusive database locks.
- Read Uncommitted, Read Committed, Repeatable Read and Serializable isolation levels.
- Dirty reads, non-repeatable reads and phantom reads.
- Synchronization versus distributed concurrency control.
- Pessimistic concurrency control: lock first, then work.
- Optimistic concurrency control: work first, validate, then commit or retry.
- MVCC, deadlocks, distributed transactions and a version-column example.

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

The handwritten study image for Distributed Concurrency Control is maintained separately as a visual revision aid; the repository keeps the corresponding topic content in text/HTML so the static site remains reliable on GitHub Pages.

## Run locally

Open `index.html` directly in a browser, or serve the directory with any static HTTP server.

## GitHub Pages

This is intentionally framework-free HTML/CSS/JS, so the repository can be published directly with GitHub Pages from the `main` branch.
