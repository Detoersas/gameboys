"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { LinkCard } from "@/components/link-card";
import { VersionFooter } from "@/components/version-footer";
import { Globe } from "lucide-react";

// Customize your proxy links here
const proxies = [
  {
    name: "QUAZAR",
    url: "https://quasar.ezlearning.qzz.io/",
    description: "Lightning-fast proxy with minimal latency and high reliability",
  },
  {
    name: "BOREDOME V2",
    url: "https://boredomss.a.ssl.fastly.net/",
    description: "Stable web proxy powered by Fastly CDN for consistent access",
  },
  {
    name: "PROXY FINDER",
    url: "https://sites.google.com/beaufortschools.org/geodash-funds/proxy-finder-1",
    description: "Comprehensive directory to discover new working proxies",
  },
];

export default function ProxiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProxies = proxies.filter(
    (proxy) =>
      proxy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proxy.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <PageHeader
          title="Proxies"
          description="Access web proxies for unrestricted browsing"
          icon={Globe}
          count={filteredProxies.length}
        />
        {filteredProxies.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProxies.map((proxy) => (
              <LinkCard
                key={proxy.name}
                name={proxy.name}
                url={proxy.url}
                description={proxy.description}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Globe className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">No proxies found</p>
            <p className="text-sm text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </main>
      <VersionFooter />
    </div>
  );
}
