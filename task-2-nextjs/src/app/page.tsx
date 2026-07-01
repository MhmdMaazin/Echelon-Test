import NewsCard from "@/components/NewsCard";
import type { Article, NewsApiResponse } from "@/types/news";

async function fetchTopHeadlines(): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) throw new Error("NEWS_API_KEY environment variable is not set.");

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`,
    { next: { revalidate: 300 } }
  );

  const data: NewsApiResponse = await res.json();

  if (!res.ok || data.status !== "ok") {
    throw new Error(data.message ?? "Failed to fetch top headlines.");
  }

  return data.articles;
}

export default async function HomePage() {
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    articles = await fetchTopHeadlines();
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred.";
  }

  return (
    <section>
      {/* Section header — matches Figma layout */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-900 pb-2">
        <h1 className="text-2xl font-bold tracking-tight">Top Headlines</h1>
        <a
          href="https://newsapi.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          More
        </a>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Empty state */}
      {!error && articles.length === 0 && (
        <p className="text-sm text-gray-500">No articles found.</p>
      )}

      {/* 5-column card grid — vertical dividers between cards */}
      {!error && articles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8">
          {articles.map((article) => (
            <div
              key={article.url}
              className="border-r border-gray-300 last:border-r-0 pr-4 pl-4 first:pl-0"
            >
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
