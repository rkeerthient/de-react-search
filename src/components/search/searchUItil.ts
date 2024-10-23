import {
  useSearchActions,
  UniversalLimit,
  SortBy,
} from "@yext/search-headless-react";
import { VerticalConfig } from "../../config/VerticalConfig";

type SearchUtilProps = {
  query?: string | undefined;
  vertical?: string | undefined;
  searchActions: ReturnType<typeof useSearchActions>;
  sortOptions?: SortBy;
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
  sortOptions,
}: SearchUtilProps) => {
  if (query) searchActions.setQuery(query);
  if (vertical && vertical !== "universal") {
    searchActions.setVertical(vertical);
    if (sortOptions) searchActions.setSortBys([sortOptions]);
    searchActions.executeVerticalQuery();
  } else {
    searchActions.setUniversal();
    if (sortOptions) searchActions.setSortBys([sortOptions]);
    searchActions.setUniversalLimit(getUniversalLimit());
    searchActions.executeUniversalQuery();
  }
};
