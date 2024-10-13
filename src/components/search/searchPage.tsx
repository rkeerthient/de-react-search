import { SearchBar } from "@yext/search-ui-react";
import SearchNav from "./searchNav";
import SearchResults from "./searchResults";

const SearchPage = () => {
  return (
    <main className="flex flex-col gap-2">
      <header className="w-full centered-container">
        <SearchBar />
        <SearchNav />
      </header>
      <section aria-label="Search Results">
        <SearchResults />
      </section>
    </main>
  );
};

export default SearchPage;
