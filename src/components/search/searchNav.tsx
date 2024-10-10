import { useState } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { VerticalConfig, VerticalProps } from "../../config/VerticalConfig";

const SearchNav = () => {
  const searchActions = useSearchActions();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClick = (item: VerticalProps) => {
    setActiveItem(item.key || null);

    if (item.key) {
      searchActions.setVertical(item.key);
      searchActions.executeVerticalQuery();
    } else {
      searchActions.setUniversal();
      searchActions.executeUniversalQuery();
    }
  };

  return (
    <nav className="bg-transparent p-4 pb-2  pt-8 border-b border-[#555555]">
      <ul className="flex justify-start w-full">
        {VerticalConfig.map((item) => (
          <li
            onClick={() => handleClick(item)}
            key={item.key}
            className={`group hover:cursor-pointer px-5 uppercase font-semibold `}
          >
            <span
              className={`
                group-hover:text-gray-300
                ${activeItem === item.key ? "text-blue-500 border-b-4 border-blue-500 pb-2" : "text-gray-500"}
              `}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SearchNav;
