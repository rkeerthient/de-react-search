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
  MapboxMap,
} from "@yext/search-ui-react";
import { VerticalConfig } from "../../config/VerticalConfig";
import "mapbox-gl/dist/mapbox-gl.css";
import { createCtx } from "../../utils/ createContext";
import { useState } from "react";
import MapPin from "../MapPin";
import { concatClassNames } from "../../utils/reusableFunctions";

type MapContextType = {
  hoveredLocationId: string;
  setHoveredLocationId: (value: string) => void;
  clickedLocationId: string;
  setClickedLocationId: (value: string) => void;
};

export const [useMapContext, MapContextProvider] = createCtx<MapContextType>(
  "Attempted to call useMapContext outside of MapContextProvider"
);

const SearchResults = () => {
  const [hoveredLocationId, setHoveredLocationId] = useState("");
  const [clickedLocationId, setClickedLocationId] = useState("");
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

  const cardType = currentVerticalConfig?.cardType;
  const pageType = currentVerticalConfig?.pageType || "standard";

  const getClasses = () => {
    const classesMap: { [key: string]: string } = {
      "grid-cols-2": "grid  grid-cols-1 md:grid-cols-2 gap-2",
      "grid-cols-3": "grid  grid-cols-1 md:grid-cols-3 gap-2",
      "grid-cols-4": "grid grid-cols-1 md:grid-cols-4 gap-2 ",
      standard: "flex flex-col gap-2",
    };
    return classesMap[pageType];
  };

  return (
    <div className="px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {resultsCount > 0 ? (
            <>
              {pageType === "map" ? (
                <MapContextProvider
                  value={{
                    hoveredLocationId,
                    setHoveredLocationId,
                    clickedLocationId,
                    setClickedLocationId,
                  }}
                >
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
                      <nav aria-label="Pagination mt-16">
                        <Pagination />
                      </nav>
                      <footer aria-label="Geolocation">
                        <Geolocation />
                      </footer>
                    </article>
                    <article className="hidden md:block md:w-2/3">
                      <MapboxMap
                        mapboxAccessToken={
                          import.meta.env.YEXT_PUBLIC_MAP_API_KEY
                        }
                        PinComponent={(props) => (
                          <MapPin
                            {...props}
                            clickedLocationId={clickedLocationId}
                            hoveredLocationId={hoveredLocationId}
                            setHoveredLocationId={setHoveredLocationId}
                          />
                        )}
                      />
                    </article>
                  </section>
                </MapContextProvider>
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
                        verticalResultsContainer: concatClassNames(
                          getClasses(),
                          "overflow-y-auto md:max-h-[950px]"
                        ),
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
            </>
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
