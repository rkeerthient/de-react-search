import {
  useSearchActions,
  UniversalLimit,
  SortBy,
  SortType,
  Direction,
} from "@yext/search-headless-react";
import { VerticalConfig } from "../../config/VerticalConfig";
import { toTitleCaseWithRules } from "../../utils/reusableFunctions";

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
    acc[String(item.verticalKey)] = item.universalLimit as number;
    return acc;
  }, {} as UniversalLimit);
};

export const SearchUtils = ({
  vertical = undefined,
  query = "",
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

export interface SortTypeProps {
  label: string;
  sortBy: {
    field: string;
    direction: "ASC" | "DESC";
    type: SortType;
  };
}

export const buildSortOptions = (fields: string[]) => {
  const retData = fields.flatMap((item) => {
    item = item.replaceAll(", ", ",");
    const [field, ascendingLabel, descendingLabel] = item.split(",");
    return [
      {
        label: ascendingLabel || `${toTitleCaseWithRules(field)} - Ascending`,
        sortBy: { field, direction: Direction.Ascending, type: SortType.Field },
      },
      {
        label: descendingLabel || `${toTitleCaseWithRules(field)} - Descending`,
        sortBy: {
          field,
          direction: Direction.Descending,
          type: SortType.Field,
        },
      },
    ];
  });
  return retData;
};

export const setQueryParams = (query?: string, vertical?: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  if (vertical) {
    queryParams.set("vertical", vertical);
  } else {
    queryParams.delete("vertical");
  }

  if (query) {
    queryParams.set("query", query);
  } else {
    queryParams.delete("query");
  }
  history.pushState(null, "", "?" + queryParams.toString());
};
