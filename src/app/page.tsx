"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResult] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResult(undefined);
      const res = await fetch(
        `https://fastapi.abhishekv3900.workers.dev/api/search?q=${input}`
      );
      const data = (await res.json()) as {
        results: string[];
        duration: number;
      };
      setSearchResult(data);
    };
    fetchData();
  }, [input]);
  return (
    <main className="min-h-screen flex flex-col justify-between grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">Speed Search ⚡</h1>
        <p className="text-zinc-500 text-lg max-w-prose text-center">
          Welcome to Speed Search, a high-performance search app built using the
          latest technology stack: Hono, Next.js, and Cloudflare Workers.
          <br />
          Type a query below and get your results in miliseconds
        </p>
        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="search countries..."
              className="placeholder-text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : null}
              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={setInput}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults?.results.length} results in{" "}
                    {searchResults?.duration.toFixed(0)}
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
      <footer className="mb-5 text-center text-zinc-400 text-sm">
        <p>Built with Hono, Next.js, and Cloudflare Workers.</p>
        <p>© {new Date().getFullYear()} Speed Search. All rights reserved.</p>
      </footer>
    </main>
  );
}
