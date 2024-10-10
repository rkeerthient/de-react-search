import { useSearchState } from "@yext/search-headless-react";
import Loader from "../Loader";
import {
  AppliedFilters,
  Facets,
  Pagination,
  ResultsCount,
  StandardCard,
  VerticalResults,
  Geolocation,
  SpellCheck,
} from "@yext/search-ui-react";
import { VerticalConfig } from "../../config/VerticalConfig";

const SearchResults = () => {
  const _state = useSearchState((state) => state);
  const currentVertical = _state.vertical.verticalKey;
  const isLoading = _state.searchStatus.isLoading;
  const resultsCount = _state.vertical.resultsCount ?? -1;
  const mostRecentSearch = _state.query.mostRecentSearch;
  const facetsCount = _state.filters?.facets?.length ?? 0;
  const currCard = VerticalConfig.filter(
    (item) => item.key === currentVertical
  )[0].CardType;
  const currClass = VerticalConfig.filter(
    (item) => item.key === currentVertical
  )[0].type;

  const getClasses = () => {
    return currClass === "grid-cols-2"
      ? "grid grid-cols-2 gap-2"
      : currClass === "grid-cols-3"
        ? "grid grid-cols-3 gap-2"
        : currClass === "grid-cols-4"
          ? "grid grid-cols-4 gap-2"
          : "flex flex-col gap-2";
  };

  return (
    <div className="px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {resultsCount > 0 && (
            <section className="w-full flex">
              <SpellCheck />
              {facetsCount >= 1 && (
                <aside className="mr-5 w-56 shrink-0">
                  <Facets />
                </aside>
              )}
              <div className="w-full">
                <header className="results-header">
                  <ResultsCount />
                  <AppliedFilters />
                </header>
                <VerticalResults
                  CardComponent={currCard}
                  customCssClasses={{
                    verticalResultsContainer: getClasses(),
                  }}
                />
                <nav aria-label="Pagination">
                  <Pagination />
                </nav>
                <footer aria-label="Geolocation">
                  <Geolocation />
                </footer>
              </div>
            </section>
          )}
          {mostRecentSearch && resultsCount === 0 && (
            <div>
              <p>
                The search
                <span className="mx-1 font-semibold">{mostRecentSearch}</span>
                did not match any FAQs.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
