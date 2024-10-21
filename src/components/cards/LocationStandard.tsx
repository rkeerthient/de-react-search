import { CardComponent, CardProps } from "@yext/search-ui-react";
import { useMapContext } from "../search/searchResults";
import Location from "../../types/locations";
import { Address, AddressType, HoursStatus } from "@yext/pages-components";
import Cta from "../cta";
import { format_phone, getGoogleMapsLink } from "../../utils/reusableFunctions";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";

const LocationStandard: CardComponent<any> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const {
    id,
    slug,
    name,
    address,
    timezone,
    hours,
    mainPhone,
    yextDisplayCoordinate,
  } = result.rawData;
  const { index, distance } = result;

  const { hoveredId, setClickedId, setHoveredId } = useMapContext();

  const locationRef = useRef<HTMLDivElement | null>(null);

  return (
    <article
      id={`location-card-${id}`}
      ref={locationRef}
      onClick={() => setClickedId(id)}
      className={`flex flex-col justify-between border-y p-4 cards  ${
        hoveredId === id ? "bg-gray-200" : ""
      }`}
      onMouseEnter={() => (setHoveredId(id), setClickedId(""))}
      onMouseLeave={() => (setHoveredId(""), setClickedId(""))}
      aria-labelledby={`location-${id}`}
    >
      <section className="flex flex-col">
        <header className="flex justify-between">
          <a
            id={`location-${id}`}
            target="_blank"
            href={slug}
            className="font-semibold text-orange flex items-center space-x-2 standardTitle"
            rel="noreferrer"
          >
            <span
              className="bg-black text-white text-center w-6 h-6 rounded-full flex items-center justify-center text-sm"
              aria-label={`Location number ${index}`}
            >
              {index}
            </span>
            <h2 className="text-lg">{name}</h2>
          </a>
          {distance && (
            <span className="standardSubTitle italic whitespace-nowrap">
              {(distance! / 1609.344).toFixed(2)} mi
            </span>
          )}
        </header>
      </section>

      {hours && (
        <HoursStatus
          hours={hours}
          timezone={timezone}
          className={"standardSubTitle"}
        />
      )}

      <section className="flex flex-col md:flex-row  justify-between items-center ">
        <address className="not-italic w-full flex gap-2 flex-col mt-4">
          {address && (
            <section className="flex gap-2 items-base">
              <MapPinIcon className="h-4 w-4 mt-2" />
              <span className="ml-2">
                <Address address={address as AddressType} />
              </span>
            </section>
          )}
          <section className="flex gap-2 items-center">
            <PhoneIcon className="h-4 w-4" />
            <a href={`tel:${mainPhone}`} role="button" className="font-medium">
              {format_phone(mainPhone)}
            </a>
          </section>
        </address>

        {(yextDisplayCoordinate || mainPhone) && (
          <footer
            className="flex flex-col items-center md:items-end justify-center gap-2 pt-4 pb-2 uppercase w-full"
            aria-label="Call to Actions"
          >
            {mainPhone && (
              <Cta
                cta={{
                  label: "Call",
                  link: `tel:${mainPhone}`,
                  linkType: "URL",
                }}
                ctaType="primaryCta"
                aria-label="Primary call to action"
              />
            )}
            {yextDisplayCoordinate && (
              <Cta
                cta={{
                  label: "Get Directions",
                  link: getGoogleMapsLink(yextDisplayCoordinate),
                  linkType: "URL",
                }}
                ctaType="secondaryCta"
                aria-label="Secondary call to action"
              />
            )}
          </footer>
        )}
      </section>
    </article>
  );
};

export default LocationStandard;
