# SDE2 Interview Notes

A lightweight static website for SDE2 interview preparation using handwritten notebook-style study pages.

## Current notes

- **Cache Strategies** — Cache-Aside, Write-Through, Write-Back, Read-Through, Refresh-Ahead and comparisons.
- **Active-Passive vs Active-Active Clustering** — failover, state consistency, split brain and trade-offs.
- **Proxy / Reverse Proxy / Load Balancer / Firewall / VPN** — networking building blocks and system-design distinctions.

## Images

The website expects the source notebook images at:

```text
assets/notes/cache-strategies.png
assets/notes/active-clustering.png
assets/notes/networking-proxy-firewall-vpn.png
```

The source images are the handwritten pages from the SDE2 notes project. The UI has graceful notebook-style fallbacks until those image binaries are added to the repository.

## Run locally

Open `index.html` directly in a browser, or serve the directory with any static HTTP server.

## GitHub Pages

This is intentionally framework-free HTML/CSS/JS, so the repository can be published directly with GitHub Pages from the `main` branch.
