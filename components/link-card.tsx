"use client";

import Link from "next/link";
import { ExternalLink, ChevronRight } from "lucide-react";
import { useState } from "react";

interface LinkCardProps {
  name: string;
  url: string;
  description?: string;
}

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

export function LinkCard({ name, url, description }: LinkCardProps) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(url);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-[#00a651]/50 hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        {faviconUrl && !imgError ? (
          <img
            src={faviconUrl || "/placeholder.svg"}
            alt={`${name} icon`}
            className="h-7 w-7 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <ExternalLink className="h-6 w-6 text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800 group-hover:text-[#00a651] transition-colors truncate">
            {name}
          </h3>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#00a651] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
