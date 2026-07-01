import { NextResponse } from "next/server";
import type { NewsApiResponse } from "@/types/news";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "News API key is not configured." },
      { status: 500 }
    );
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;

  const res = await fetch(url, {
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  const data: NewsApiResponse = await res.json();

  if (!res.ok || data.status !== "ok") {
    return NextResponse.json(
      { error: data.message ?? "Failed to fetch news." },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}
