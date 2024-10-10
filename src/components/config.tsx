import { SearchConfig } from "@yext/search-headless-react";

export const searchConfig: SearchConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_API_KEY,
  experienceKey: import.meta.env.YEXT_PUBLIC_EXP_KEY,
  locale: "en",
};
