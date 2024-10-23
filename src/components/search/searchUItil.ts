import { useSearchActions, UniversalLimit } from "@yext/search-headless-react";
import { VerticalConfig } from "../../config/VerticalConfig";

type SearchUtilProps = {
  query?: string | undefined;
  vertical?: string | undefined;
  searchActions: ReturnType<typeof useSearchActions>;
};

const getUniversalLimit = () => {
  return VerticalConfig.filter(
    (item) => item.label !== "All" && item.universalLimit !== undefined
  ).reduce((acc, item) => {
    acc[String(item.key)] = item.universalLimit as number;
    return acc;
  }, {} as UniversalLimit);
};

export const SearchUtils = ({
  vertical = undefined,
  query = undefined,
  searchActions,
}: SearchUtilProps) => {
  if (query) searchActions.setQuery(query);
  if (vertical && vertical !== "universal") {
    searchActions.setVertical(vertical);
    searchActions.executeVerticalQuery();
  } else {
    searchActions.setUniversal();
    searchActions.setUniversalLimit(getUniversalLimit());
    searchActions.executeUniversalQuery();
  }
};
