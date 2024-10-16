import { Popup, LngLatLike, Map } from "mapbox-gl";
import Location, { Coordinate } from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { Result } from "@yext/search-headless-react";
import { renderToString } from "react-dom/server";
import { FaMapMarker } from "react-icons/fa";

const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: Location) => {
  const address = location.address;
  const html = (
    <div>
      <p className="font-bold">{location.name || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return renderToString(html);
};

export interface MapPinProps {
  mapbox: Map;
  result: Result<any>;
  clickedId: string;
  hoveredId: string;
  setHoveredId: (value: string) => void;
}
let currentPopup: Popup | null = null;
const scrollToLocationCard = (locationId: string) => {
  const locationCard = document.getElementById(`location-card-${locationId}`);
  if (locationCard) {
    locationCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

const MapPin = ({
  mapbox,
  result,
  hoveredId,
  setHoveredId,
  clickedId,
}: MapPinProps) => {
  const location = result.rawData;
  const [active, setActive] = useState(false);
  const { index } = result;

  const popupRef = useRef<Popup | null>(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  const pinSize = hoveredId === location.id ? "h-8 w-8" : "h-6 w-6";
  const textSize = hoveredId === location.id ? "text-xl" : "text-sm";

  const zIndex = hoveredId === location.id ? "z-50" : "z-10";

  useEffect(() => {
    if (active || clickedId === location.id) {
      if (location.yextDisplayCoordinate) {
        scrollToLocationCard(location.id);
        const mapboxCoordinate = transformToMapboxCoord(
          location.yextDisplayCoordinate
        );
        if (mapboxCoordinate) {
          if (currentPopup) {
            currentPopup.remove();
          }

          const newPopup = popupRef
            .current!.setLngLat(mapboxCoordinate)
            .setHTML(getLocationHTML(location))
            .addTo(mapbox);

          currentPopup = newPopup;

          newPopup.on("close", () => {
            setActive(false);
            currentPopup = null;
          });
        }
      }
    }
  }, [active, clickedId, mapbox, location]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  const updateHoveredLocation = useCallback(() => {
    setHoveredId(location.id);
  }, [location.id]);

  const removeHoveredLocation = useCallback(() => {
    setHoveredId("");
  }, []);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={updateHoveredLocation}
      onMouseLeave={removeHoveredLocation}
      aria-label={`Pin for location ${location.name}`}
      className={`relative flex items-center justify-center ${zIndex} ${pinSize}`}
    >
      <FaMapMarker
        className={`text-black text-4xl absolute top-0 left-0 ${pinSize}`}
      />
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold ${textSize}`}
      >
        {index}
      </span>
    </button>
  );
};
export default MapPin;
