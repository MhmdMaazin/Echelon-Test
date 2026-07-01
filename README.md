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

You should see the filtered Business articles sorted newest first printed in the terminal.

If php is not recognized, download it from https://www.php.net/downloads and add it to your PATH.

## Task 2 — Next.js

```bash
cd task-2-nextjs
cp .env.example .env.local   # add your NEWS_API_KEY
npm install
npm run dev                   # http://localhost:3000
```

Then open your browser:

URL	What you'll see
http://localhost:3000	US top headlines in a 5-column card grid
http://localhost:3000/countries	Table of all countries that use USD
To stop the server press Ctrl + C in the terminal.

### Routes
- `/` — Top US headlines (NewsAPI)
- `/countries` — Countries using USD (GraphQL)
