# Purple Earth — Vercel deploy

Static site, single self-contained `index.html` (all images and scripts inlined).

## Deploy (new project)

Option A — dashboard:
1. vercel.com → Add New → Project → "Deploy without Git" / drag-and-drop this folder.
2. Framework preset: **Other**. No build command, no output directory (leave defaults).
3. Deploy. Attach your domain under Settings → Domains to replace the old project.

Option B — CLI:
```
cd deploy
vercel --prod
```

Notes:
- The Portal login is visual only (any credentials enter the demo dashboard).
- Light/dark toggle persists via localStorage.
- To update the site, re-export from the design project and replace index.html.
