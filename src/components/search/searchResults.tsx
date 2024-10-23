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
  GenerativeDirectAnswer,
} from "@yext/search-ui-react";
import {
  IsGenerativeDirectAnswerEnabled,
  UniversalConfig,
  VerticalConfig,
} from "../../config/VerticalConfig";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import MapPin from "../MapPin";
import { concatClassNames } from "../../utils/reusableFunctions";
import { createCtx } from "../../utils/createContext";
import { MapboxMaps, Map, Coordinate } from "@yext/pages-components";
import { IoClose } from "react-icons/io5";
import { defaultCoordinates } from "../UniversalSection";
import SortDropdown from "../SortDropdown";
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
  const [showFacets, setShowFacets] = useState(false);
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
  const sortOptions = currentVerticalConfig?.sortByOptions;

  const getClasses = () => {
    const classesMap: { [key: string]: string } = {
      "grid-cols-2": "grid  grid-cols-1 md:grid-cols-2 gap-2",
      "grid-cols-3": "grid  grid-cols-1 md:grid-cols-3 gap-2",
      "grid-cols-4": "grid grid-cols-1 md:grid-cols-4 gap-2 ",
      standard: "flex flex-col border rounded-md",
    };
    return classesMap[pageType];
  };

  const renderGenDirectAnswer = () => {
    const isGenALoading = useSearchState(
      (state) => state.generativeDirectAnswer.isLoading
    );
    return (
      <>
        {isGenALoading ? (
          <section
            className="p-6 border border-gray-200 rounded-lg shadow-sm centered-container"
            aria-busy="true"
            aria-label="Loading content"
          >
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div
                  className="h-4 bg-slate-700 rounded w-1/4"
                  aria-hidden="true"
                ></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className="h-2 bg-slate-700 rounded col-span-3"
                      aria-hidden="true"
                    ></div>
                    <div
                      className="h-2 bg-slate-700 rounded col-span-3"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div
                    className="h-2 bg-slate-700 rounded"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="h-2 bg-slate-700 rounded"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="h-2 bg-slate-700 rounded"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <GenerativeDirectAnswer />
        )}
      </>
    );
  };

  return (
    <div className="px-4 ">
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
                <article className="centered-container my-12">
                  <SpellCheck />
                  {IsGenerativeDirectAnswerEnabled ? (
                    renderGenDirectAnswer()
                  ) : (
                    <DirectAnswer
                      customCssClasses={{
                        directAnswerContainer: "mb-8",
                      }}
                    />
                  )}
                  <UniversalResults
                    verticalConfigMap={UniversalConfig}
                    customCssClasses={{
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
                </article>
              ) : (
                <article className="centered-container my-12">
                  No Results
                </article>
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
                        <div className="w-full h-auto overflow-scroll relative">
                          <header className="results-header">
                            <aside className="hidden md:flex justify-between w-full pr-8 items-center">
                              <ResultsCount />
                              {facetsCount >= 1 && (
                                <div
                                  className=" hover:cursor-pointer font-bold text-standardSubTitle !text-gray-700"
                                  onClick={(e) => setShowFacets(!showFacets)}
                                >
                                  Facets & Filters
                                </div>
                              )}
                            </aside>
                            {showFacets && (
                              <div className="hidden md:block absolute inset-0 bg-white h-[95vh] px-4">
                                <IoClose
                                  onClick={(e) => setShowFacets(false)}
                                  className="ml-auto h-8 w-8 mr-4 hover:cursor-pointer hover:border"
                                />
                                <Facets
                                  customCssClasses={{
                                    facetsContainer: "mr-10 !text-lg",
                                  }}
                                  searchOnChange={true}
                                />
                                <div className="flex flex-row gap-4 mb-8 items-center mt-4 text-xl">
                                  <div
                                    className="px-4 py-2 border border-black"
                                    onClick={(e) => setShowFacets(!showFacets)}
                                  >
                                    Apply
                                  </div>
                                  <div
                                    className="hover:cursor-pointer px-4 py-2 text-[#027da5] w-fit hover:underline"
                                    onClick={(e) => setShowFacets(false)}
                                  >
                                    Cancel
                                  </div>
                                </div>
                              </div>
                            )}
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
                          bounds={
                            _state.vertical.results
                              ? _state.vertical.results
                                  .map(
                                    (data) => data.rawData.yextDisplayCoordinate
                                  )
                                  .filter(
                                    (coord): coord is Coordinate => !!coord
                                  )
                              : [defaultCoordinates]
                          }
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
                              setClickedId={setClickedId}
                              result={data}
                              type="verticalResults"
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
                          <article className="flex justify-between w-full items-center">
                            <ResultsCount />
                            <div className="flex justify-start gap-2 mb-4">
                              {sortOptions && sortOptions.length >= 1 && (
                                <SortDropdown sortOptions={sortOptions} />
                              )}
                            </div>
                          </article>

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
                  <article className="centered-container my-12">
                    <p>
                      The search
                      <span className="mx-1 font-semibold">
                        {mostRecentSearch}
                      </span>
                      did not match any FAQs.
                    </p>
                  </article>
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
