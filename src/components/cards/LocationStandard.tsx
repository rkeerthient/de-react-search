import { CardComponent, CardProps } from "@yext/search-ui-react";
import { RiDirectionFill } from "react-icons/ri";
import { useMapContext } from "../search/searchResults";
import Location, { Coordinate } from "../../types/locations";
const LocationStandard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const location = result.rawData;

  const getGoogleMapsLink = (coordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };

  const { hoveredLocationId, setClickedLocationId } = useMapContext();

  return (
    <div
      onClick={() => setClickedLocationId(location.id)}
      className={`flex justify-between border-y p-4 ${
        hoveredLocationId === location.id ? "bg-gray-200" : ""
      }`}
    >
      <div className="flex">
        <div>
          <a
            target={"_blank"}
            href={location.slug}
            className="font-semibold text-orange"
            rel="noreferrer"
          >
            {location.neighborhood}
          </a>
          <p className="text-sm">{location.address.line1}</p>
          <p className="text-sm">{`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}</p>
        </div>
      </div>
      <div className="flex items-center">
        {location.yextDisplayCoordinate && (
          <a
            target={"_blank"}
            className="flex flex-col items-center text-sm text-orange"
            href={getGoogleMapsLink(location.yextDisplayCoordinate)}
            rel="noreferrer"
          >
            <RiDirectionFill size={24} />
            <p>Directions</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationStandard;
