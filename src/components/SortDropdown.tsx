import {
  SortBy,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { SearchUtils } from "./search/searchUItil";

export type SortDropdownProps = {
  sortOptions: SortTypeProps[];
};

export type SortTypeProps = {
  label: string;
  sortBy: SortBy;
};

const SortDropdown = ({ sortOptions }: SortDropdownProps) => {
  const sortBys = useSearchState((state) => state.vertical.sortBys);
  const searchActions = useSearchActions();
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const query = useSearchState((state) => state.query.input);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const selectedSort = sortOptions.find(
    (s) =>
      s.sortBy?.field === sortBys?.[0]?.field &&
      s.sortBy?.direction === sortBys?.[0]?.direction
  );

  useEffect(() => {
    if (selectedSort) {
      setSelectedItem(selectedSort.label);
    }
  }, [selectedSort]);

  const handleTileClick = (sortBy: SortBy, label: string) => {
    setSelectedItem(label);
    SearchUtils({
      vertical: verticalKey,
      query,
      searchActions,
      sortOptions: sortBy,
    });
  };

  return (
    <div className="relative text-sm ml-auto">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full md:w-56 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <div className="flex flex-col justify-start items-baseline">
            <span className="text-xs md:text-sm font-medium">Sort Options</span>
            <span className="text-xs  mt-1">
              {selectedItem || "Select an option"}
            </span>
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 w-full md:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all ease-out duration-200"
        >
          <div className="py-1">
            {sortOptions
              .filter((s) => s.sortBy !== selectedSort?.sortBy)
              .map((s) => (
                <MenuItem
                  key={s.label}
                  onClick={() => handleTileClick(s.sortBy, s.label)}
                >
                  {({ active }) => (
                    <div
                      className={`md:text-base text-xs flex h-6 md:h-10  w-full md:w-56 items-center px-2 ${
                        active ? "bg-gray-200" : "bg-white"
                      } hover:bg-gray-300 cursor-pointer`}
                    >
                      {s.label}
                    </div>
                  )}
                </MenuItem>
              ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default SortDropdown;