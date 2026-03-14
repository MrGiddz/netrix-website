"use client";

import type { PropsWithChildren } from "react";
import { SiteContentProvider } from "@/components/site-content-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return <SiteContentProvider>{children}</SiteContentProvider>;
};

export default Providers;
