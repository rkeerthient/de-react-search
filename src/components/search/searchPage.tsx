import { SearchBar } from "@yext/search-ui-react";
import SearchNav from "./searchNav";
import SearchResults from "./searchResults";

const SearchPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <SearchBar />
      <SearchNav />
      <SearchResults />
    </div>
  );
};

export default SearchPage;
