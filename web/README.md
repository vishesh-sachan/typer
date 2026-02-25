# web

Landing page & download portal for Typer.

## Tech Stack

| Tech | Version |
|------|---------|
| Next.js | 15 (App Router) |
| Tailwind CSS | 4 |
| TypeScript | 5.8 |
| Vercel Analytics | 1.6 |
| Bun | latest |

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
web/src/app/
├── layout.tsx              # Root layout + Analytics + metadata
├── page.tsx                # Landing page (composes sections)
├── globals.css             # Tailwind + CSS variables
└── components/
    ├── hero.tsx            # Hero section + CTAs
    ├── features.tsx        # 6 feature cards
    ├── how-it-works.tsx    # 4-step timeline
    ├── download.tsx        # Platform download buttons (tracked)
    └── footer.tsx          # Links + Star CTA + credits
```

## Analytics

- **Vercel Analytics** — auto-tracks page views, devices, geo, referrers
- **Custom event** — `track("download", { platform, asset })` fires on every download button click

View dashboard at [vercel.com/analytics](https://vercel.com/analytics) after deploying.

## Deploy

Connect this directory (`web/`) as root in Vercel:

1. Import repo on [vercel.com/new](https://vercel.com/new)
2. Set **Root Directory** to `web`
3. Framework preset: Next.js (auto-detected)
4. Deploy

Analytics activates automatically on Vercel — no env vars needed.