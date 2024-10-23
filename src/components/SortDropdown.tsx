import {
  SortBy,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { SearchUtils } from "./search/searchUItil";

export type SortDropdownProps = {
  sortOptions: SortTypeProps[];
};

export type SortTypeProps = {
  label: string;
  sortBy: SortBy;
};

const SortDropdown = ({ sortOptions }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const sortBys = useSearchState((state) => state.vertical.sortBys);
  const searchActions = useSearchActions();
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const query = useSearchState((state) => state.query.input);

  const selectedSort = sortOptions.find(
    (s) =>
      s.sortBy?.field === sortBys?.[0]?.field &&
      s.sortBy?.direction === sortBys?.[0]?.direction
  );

  const handleTileClick = (sortBy: SortBy) => {
    SearchUtils({
      vertical: verticalKey,
      query: query,
      searchActions,
      sortOptions: sortBy,
    });
    setOpen(false);
  };

  return (
    <div className="relative text-sm">
      <div className="flex h-10 w-48 items-center justify-between border px-2">
        <div className="text-sm">
          <div className="font-semibold">Sort By:</div>
          <div>{selectedSort?.label || "Select"}</div>
        </div>
        <button onClick={() => setOpen(!open)}>
          {open ? <BiChevronUp /> : <BiChevronDown />}
        </button>
      </div>
      {open && (
        <ul className="absolute border z-10">
          {sortOptions
            .filter((s) => s.sortBy !== selectedSort?.sortBy)
            .map((s) => (
              <li onClick={() => handleTileClick(s.sortBy)} key={s.label}>
                <div className="flex h-10 w-48 items-center px-2 bg-white hover:bg-gray-300">
                  {s.label}
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
