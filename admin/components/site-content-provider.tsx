"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  defaultSiteContent,
  siteContentSchema,
  type SiteContent,
} from "@/lib/site-content";

type SiteContentContextValue = {
  content: SiteContent;
  isLoading: boolean;
  isSaving: boolean;
  error: string;
  saveContent: (content: SiteContent) => Promise<void>;
  seedContent: () => Promise<void>;
  refresh: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

async function requestContent(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Request failed");
  }

  const parsed = siteContentSchema.safeParse(payload.content);
  if (!parsed.success) {
    throw new Error("Invalid site content payload");
  }

  return parsed.data;
}

export const SiteContentProvider = ({ children }: PropsWithChildren) => {
  const [content, setContent] = useState(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    setError("");
    setIsLoading(true);
    try {
      const nextContent = await requestContent("/api/content");
      setContent(nextContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content");
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async (nextContent: SiteContent) => {
    setError("");
    setIsSaving(true);
    try {
      const saved = await requestContent("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: nextContent }),
      });
      setContent(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save content");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const seedContent = async () => {
    setError("");
    setIsSaving(true);
    try {
      const seeded = await requestContent("/api/content/seed", {
        method: "POST",
      });
      setContent(seeded);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset content");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({
      content,
      isLoading,
      isSaving,
      error,
      saveContent,
      seedContent,
      refresh,
    }),
    [content, isLoading, isSaving, error],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
};
