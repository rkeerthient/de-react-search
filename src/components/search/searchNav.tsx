import { useEffect, useRef, useState } from "react";
import { UniversalLimit, useSearchActions } from "@yext/search-headless-react";
import { VerticalConfig, VerticalProps } from "../../config/VerticalConfig";
import { BsThreeDotsVertical } from "react-icons/bs";
const getUniversalLimit = () => {
  return VerticalConfig.filter(
    (item) => item.label !== "All" && item.universalLimit !== undefined
  ).reduce((acc, item) => {
    acc[String(item.key)] = item.universalLimit as number;
    return acc;
  }, {} as UniversalLimit);
};

const SearchNav = () => {
  const searchActions = useSearchActions();
  const [activeItem, setActiveItem] = useState<VerticalProps>(
    VerticalConfig[1]
  );
  const prevClickRef = useRef<VerticalProps>({
    label: "All",
    pageType: "universal",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const moreItems = VerticalConfig.filter(
    (item) => item !== activeItem && item.label !== "All"
  );

  const handleClick = (item: VerticalProps) => {
    setActiveItem(item || null);
    prevClickRef.current = activeItem;
    if (item.key) {
      searchActions.setVertical(item.key);
      searchActions.executeVerticalQuery();
    } else {
      searchActions.setUniversal();
      searchActions.setUniversalLimit(getUniversalLimit());
      searchActions.executeUniversalQuery();
    }
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="hidden md:block bg-transparent p-4 pb-2  pt-8 border-b border-[#e5e7eb] uppercase">
        <ul className="flex justify-start w-full items-center">
          {VerticalConfig.map((item, index) => (
            <li
              onClick={() => handleClick(item)}
              key={index}
              className={`group hover:cursor-pointer px-5 uppercase font-semibold `}
            >
              <span
                className={`uppercase
                group-hover:text-gray-300
                ${activeItem === item ? "text-blue-500 border-b-4 border-blue-500 pb-2" : "text-gray-500"}
              `}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="px-4  md:hidden border-b border-[#e5e7eb] font-semibold ">
        <ul className="flex justify-start gap-8 items-center  px-4  ">
          <li className="mr-4">
            <button
              className={`pt-2 uppercase ${activeItem?.label === "All" ? `text-blue-500 border-b-4 border-blue-500` : `text-black border-b-4 border-transparent`}`}
              onClick={() => handleClick(VerticalConfig[0])}
            >
              All
            </button>
          </li>

          {activeItem?.label !== "All" ? (
            <li className={`mr-4 text-blue-500 border-b-4 border-blue-500`}>
              <button className="pt-2 uppercase">{activeItem?.label}</button>
            </li>
          ) : (
            <li>
              <button
                className="pt-2 uppercase text-black border-b-4 border-transparent"
                onClick={() => {
                  const foundItem = VerticalConfig.find(
                    (item) => item!.label === prevClickRef.current.label
                  );
                  if (foundItem) {
                    handleClick(foundItem);
                  }
                }}
              >
                {prevClickRef.current.label}
              </button>
            </li>
          )}

          <li className="relative ml-auto ">
            <button
              className="text-black font-semibold uppercase flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <BsThreeDotsVertical className="h-3 w-3" /> More
            </button>

            {isDropdownOpen && (
              <ul className="absolute bg-white shadow-lg rounded-md mt-2 py-2 w-48 right-0 z-50 ">
                {moreItems
                  .filter((item) => item !== activeItem)
                  .map((item) => (
                    <li
                      key={item.label}
                      className="px-4 py-2 hover:bg-gray-100 "
                    >
                      <button
                        onClick={() => handleClick(item)}
                        className="uppercase"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SearchNav;
