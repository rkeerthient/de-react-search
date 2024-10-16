import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Address, HoursStatus, Image } from "@yext/pages-components";
import { CardProps } from "@yext/search-ui-react";
import Cta from "../cta";
import { format_phone } from "../../utils/reusableFunctions";
import { VerticalConfig } from "../../config/VerticalConfig";
import { useEffect, useRef, useState } from "react";
import { useMapContext } from "../search/searchResults";

const ProfessionalLocation = ({ result }: CardProps<any>) => {
  const [pageType, setPageType] = useState("");
  const { name, distance, id } = result;
  const {
    headshot,
    mainPhone,
    hours,
    landingPageUrl,
    address,
    timezone,
    c_primaryCTA,
    c_secondaryCTA,
  } = result.rawData;

  const { hoveredId, setClickedId, setHoveredId } =
    pageType === "map" ? useMapContext() : {};

  const locationRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setPageType(
      VerticalConfig.find((item) => item.key === "financial-professional")
        ?.pageType || ""
    );
  }, []);
  const handleMouseEnter = () => {
    if (pageType === "map" && setHoveredId && setClickedId) {
      setHoveredId(id!);
      setClickedId("");
    }
  };

  const handleMouseLeave = () => {
    if (pageType === "map" && setHoveredId && setClickedId) {
      setHoveredId("");
      setClickedId("");
    }
  };

  const handleClick = () => {
    if (pageType === "map" && setClickedId) {
      setClickedId(id!);
    }
  };

  return (
    <article
      id={`location-card-${id}`}
      ref={locationRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`border rounded-lg ${pageType === "map" && `flex gap-2`}  ${
        hoveredId === id ? "bg-gray-200" : ""
      }`}
    >
      <header
        className={`relative flex flex-col ${pageType === "map" && `pt-4 !h-1/4 !w-1/4`}`}
      >
        <a
          href={landingPageUrl}
          className={`group aspect-square block   overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 `}
        >
          {headshot && (
            <Image
              image={headshot!}
              className="pointer-events-none object-cover group-hover:opacity-75 "
            />
          )}
        </a>
        <h2 className=" text-lg font-bold px-2 mt-4">
          <a href={landingPageUrl}>{name}</a>
        </h2>
      </header>
      <section
        className={`px-2 space-y-1 ${pageType === "map" && `mt-4 w-3/4`}`}
      >
        <section
          className={`flex justify-start ${pageType === "map" ? `flex-row` : `flex-col gap-2 mt-2`}`}
        >
          {hours ? (
            <HoursStatus
              className="font-medium"
              timezone={timezone}
              hours={hours}
              dayOfWeekTemplate={() => <span className=""></span>}
            />
          ) : (
            <p>Fill in your hours</p>
          )}
          {distance && (
            <span className="standardSubTitle italic mr-4 whitespace-nowrap">
              {(distance! / 1609.344).toFixed(2)} mi
            </span>
          )}
        </section>

        {address && (
          <address className="flex  justify-start font-medium leading-loose items-start  text-secondary not-italic">
            <MapPinIcon className="h-4 w-4 mt-2" />
            <span className="ml-2">
              <Address address={address} />
            </span>
          </address>
        )}
        {mainPhone && (
          <section className="flex justify-start font-medium leading-loose items-center  text-secondary">
            <PhoneIcon className="h-4 w-4" />
            <span className="ml-2">{format_phone(mainPhone)}</span>
          </section>
        )}
        {(c_primaryCTA || c_secondaryCTA) && (
          <footer
            className={`flex gap-2 justify-center pt-4 pb-2 items-center uppercase ${pageType === "map" ? `flex-row` : `flex-col`}`}
          >
            {c_primaryCTA && <Cta cta={c_primaryCTA} ctaType="primaryCta" />}
            {c_secondaryCTA && (
              <Cta cta={c_secondaryCTA} ctaType="secondaryCta" />
            )}
          </footer>
        )}
      </section>
    </article>
  );
};

export default ProfessionalLocation;
