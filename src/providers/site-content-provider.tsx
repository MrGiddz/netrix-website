import {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { defaultSiteContent, siteContentSchema, type SiteContent } from "@/lib/site-content";

type SiteContentContextValue = {
  content: SiteContent;
  isLoading: boolean;
  isError: boolean;
};

const SiteContentContext = createContext<SiteContentContextValue>({
  content: defaultSiteContent,
  isLoading: false,
  isError: false,
});

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function fetchSiteContent() {
  const response = await fetch(`${API_URL}/content`);
  if (!response.ok) {
    throw new Error("Failed to load site content");
  }

  const payload = await response.json();
  const parsed = siteContentSchema.safeParse(payload.content);
  if (!parsed.success) {
    throw new Error("Invalid site content payload");
  }

  return parsed.data;
}

export const SiteContentProvider = ({ children }: PropsWithChildren) => {
  const query = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
    staleTime: 60_000,
    retry: 1,
  });

  return (
    <SiteContentContext.Provider
      value={{
        content: query.data || defaultSiteContent,
        isLoading: query.isLoading,
        isError: query.isError,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
