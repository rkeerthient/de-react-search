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
  UniversalResults,
  DirectAnswer,
} from "@yext/search-ui-react";
import { UniversalConfig, VerticalConfig } from "../../config/VerticalConfig";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import MapPin from "../MapPin";
import { concatClassNames } from "../../utils/reusableFunctions";
import { createCtx } from "../../utils/createContext";
import { MapboxMaps, Map } from "@yext/pages-components";
type MapContextType = {
  hoveredId: string;
  setHoveredId: (value: string) => void;
  clickedId: string;
  setClickedId: (value: string) => void;
};

export const [useMapContext, MapContextProvider] = createCtx<MapContextType>(
  "Attempted to call useMapContext outside of MapContextProvider"
);

const SearchResults = () => {
  const [hoveredId, setHoveredId] = useState("");
  const [clickedId, setClickedId] = useState("");
  const _state = useSearchState((state) => state);
  const {
    vertical: { verticalKey, resultsCount = -1 },
    searchStatus: { isLoading },
    query: { mostRecentSearch },
    filters,
    universal,
  } = _state;
  const universalResultsLength =
    universal?.verticals?.[0]?.results?.length || 0;
  const facetsCount = filters?.facets?.length ?? 0;

  const currentVerticalConfig = VerticalConfig.find(
    (item) => item.key === verticalKey
  );

  const cardType = currentVerticalConfig?.cardType;
  const pageType = currentVerticalConfig?.pageType || "standard";

  const getClasses = () => {
    const classesMap: { [key: string]: string } = {
      "grid-cols-2": "grid  grid-cols-1 md:grid-cols-2 gap-2",
      "grid-cols-3": "grid  grid-cols-1 md:grid-cols-3 gap-2",
      "grid-cols-4": "grid grid-cols-1 md:grid-cols-4 gap-2 ",
      standard: "flex flex-col border rounded-md",
    };
    return classesMap[pageType];
  };

  return (
    <div className="px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <MapContextProvider
          value={{
            hoveredId,
            setHoveredId,
            clickedId,
            setClickedId,
          }}
        >
          {pageType === "universal" ? (
            <>
              {universalResultsLength >= 1 ? (
                <>
                  <DirectAnswer></DirectAnswer>
                  <UniversalResults
                    verticalConfigMap={UniversalConfig}
                    customCssClasses={{
                      universalResultsContainer: "centered-container my-12",
                      sectionHeaderIconContainer: "hidden",
                      sectionHeaderLabel: "!pl-0",
                    }}
                  />
                  <nav aria-label="Pagination" className=" text-lg">
                    <Pagination />
                  </nav>
                  <footer aria-label="Geolocation">
                    <Geolocation
                      customCssClasses={{
                        geolocationContainer: "text-lg",
                      }}
                    />
                  </footer>
                </>
              ) : (
                <>No Results</>
              )}
            </>
          ) : (
            <>
              {resultsCount > 0 ? (
                <>
                  {pageType === "map" ? (
                    <section className="w-full flex md:h-[950px]">
                      <article className="w-full md:w-1/3">
                        <SpellCheck />
                        {facetsCount >= 1 && (
                          <aside className="hidden md:block mr-5 w-56 shrink-0">
                            <Facets />
                          </aside>
                        )}
                        <div className="w-full h-auto overflow-scroll">
                          <header className="results-header">
                            <ResultsCount />
                            <AppliedFilters />
                          </header>
                          <VerticalResults
                            CardComponent={cardType}
                            customCssClasses={{
                              verticalResultsContainer: concatClassNames(
                                getClasses(),
                                "overflow-scroll h-[950px]"
                              ),
                            }}
                          />
                        </div>
                        <nav aria-label="Pagination" className="mt-12 text-lg">
                          <Pagination />
                        </nav>
                        <footer aria-label="Geolocation">
                          <Geolocation
                            customCssClasses={{
                              geolocationContainer: "text-lg",
                            }}
                          />
                        </footer>
                      </article>
                      <article className="hidden md:block md:w-2/3">
                        <Map
                          apiKey={import.meta.env.YEXT_PUBLIC_MAP_API_KEY}
                          provider={MapboxMaps}
                          padding={{
                            top: 100,
                            bottom: 200,
                            left: 50,
                            right: 50,
                          }}
                          className="h-full"
                        >
                          {_state?.vertical?.results?.map((data, index) => (
                            <MapPin
                              key={index}
                              clickedId={clickedId}
                              hoveredId={hoveredId}
                              setHoveredId={setHoveredId}
                              result={data}
                            />
                          ))}
                        </Map>
                      </article>
                    </section>
                  ) : (
                    <section className="w-full flex centered-container">
                      <SpellCheck />
                      {facetsCount >= 1 && (
                        <aside className="hidden md:block  mr-5 w-56 shrink-0">
                          <Facets />
                        </aside>
                      )}
                      <div className="w-full">
                        <header className="results-header">
                          <ResultsCount />
                          <AppliedFilters />
                        </header>
                        <VerticalResults
                          CardComponent={cardType}
                          customCssClasses={{
                            verticalResultsContainer:
                              concatClassNames(getClasses()),
                          }}
                        />
                        <nav aria-label="Pagination" className="mt-12 text-lg">
                          <Pagination />
                        </nav>
                        <footer aria-label="Geolocation">
                          <Geolocation
                            customCssClasses={{
                              geolocationContainer: "text-lg",
                            }}
                          />
                        </footer>
                      </div>
                    </section>
                  )}
                </>
              ) : (
                mostRecentSearch && (
                  <div>
                    <p>
                      The search
                      <span className="mx-1 font-semibold">
                        {mostRecentSearch}
                      </span>
                      did not match any FAQs.
                    </p>
                  </div>
                )
              )}
            </>
          )}
        </MapContextProvider>
      )}
    </div>
  );
};

export default SearchResults;
