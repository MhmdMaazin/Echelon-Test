# Echelon Interview Tasks

| Branch | Task |
|--------|------|
| `task-1` | PHP — filter & sort articles by category |
| `task-2` | Next.js — News headlines (NewsAPI) + USD countries (GraphQL) |

## Task 1 — PHP

```bash
cd task-1-php
php articles.php
```

## Task 2 — Next.js

```bash
cd task-2-nextjs
cp .env.example .env.local   # add your NEWS_API_KEY
npm install
npm run dev                   # http://localhost:3000
```

### Routes
- `/` — Top US headlines (NewsAPI)
- `/countries` — Countries using USD (GraphQL)
