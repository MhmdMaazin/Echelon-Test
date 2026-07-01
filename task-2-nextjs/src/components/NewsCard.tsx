import Image from "next/image";
import type { Article } from "@/types/news";

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  const { title, author, urlToImage, url, source } = article;

  const displayAuthor = author
    ? author.split(",")[0].trim() // use first author only
    : source.name;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden border-b border-gray-300">
        {urlToImage ? (
          <Image
            src={urlToImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              No image
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-bold leading-snug line-clamp-3 group-hover:underline">
          {title}
        </h2>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
          by {displayAuthor}
        </p>
      </div>
    </a>
  );
}
