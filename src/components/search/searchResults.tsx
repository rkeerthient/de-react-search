import { useSearchState } from "@yext/search-headless-react";
import Loader from "../Loader";
import {
  AppliedFilters,
  Facets,
  Pagination,
  ResultsCount,
  VerticalResults,
  Geolocation,
  SpellCheck,
} from "@yext/search-ui-react";
import { VerticalConfig } from "../../config/VerticalConfig";

const SearchResults = () => {
  const _state = useSearchState((state) => state);
  const {
    vertical: { verticalKey, resultsCount = -1 },
    searchStatus: { isLoading },
    query: { mostRecentSearch },
    filters,
  } = _state;

  const facetsCount = filters?.facets?.length ?? 0;

  const currentVerticalConfig = VerticalConfig.find(
    (item) => item.key === verticalKey
  );

  const currCard = currentVerticalConfig?.cardType;
  const currClass = currentVerticalConfig?.pageType || "standard";

  // Simplified class assignment
  const getClasses = () => {
    const classesMap: { [key: string]: string } = {
      "grid-cols-2": "grid grid-cols-2 gap-2",
      "grid-cols-3": "grid grid-cols-3 gap-2",
      "grid-cols-4": "grid grid-cols-4 gap-2",
      standard: "flex flex-col gap-2",
    };
    return classesMap[currClass];
  };

  return (
    <div className="px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {resultsCount > 0 ? (
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
          ) : (
            mostRecentSearch && (
              <div>
                <p>
                  The search
                  <span className="mx-1 font-semibold">{mostRecentSearch}</span>
                  did not match any FAQs.
                </p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
