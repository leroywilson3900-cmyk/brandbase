# BrandBase Frontend

API calls are made to `NEXT_PUBLIC_API_URL` env var.
During dev, it proxies to `http://localhost:8001`.
In production on Vercel, it uses `https://brandbase-walf.onrender.com`.

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend URL (e.g., https://brandbase-walf.onrender.com)