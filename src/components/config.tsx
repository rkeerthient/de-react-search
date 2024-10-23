import { SearchConfig } from "@yext/search-headless-react";
import { locale } from "../config/VerticalConfig";

export const searchConfig: SearchConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_API_KEY,
  experienceKey: import.meta.env.YEXT_PUBLIC_EXP_KEY,
  locale: locale || "en",
};
