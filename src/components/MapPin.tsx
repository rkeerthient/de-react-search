import { Popup, LngLatLike, Map } from "mapbox-gl";
import Location, { Coordinate } from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { Result } from "@yext/search-headless-react";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { renderToString } from "react-dom/server";

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
      <p className="font-bold">{location.neighborhood || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return renderToString(html);
};

export interface MapPinProps {
  mapbox: Map;
  result: Result<any>;
  clickedLocationId: string;
  hoveredLocationId: string;
  setHoveredLocationId: (value: string) => void;
}
let currentPopup: Popup | null = null;

const MapPin = ({
  mapbox,
  result,
  hoveredLocationId,
  setHoveredLocationId,
  clickedLocationId,
}: MapPinProps) => {
  const location = result.rawData;
  const [active, setActive] = useState(false);

  const popupRef = useRef<Popup | null>(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  const pinSize = hoveredLocationId === location.id ? "h-8 w-8" : "h-6 w-6";

  useEffect(() => {
    if (
      (active || clickedLocationId === location.id) &&
      location.yextDisplayCoordinate
    ) {
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
  }, [active, clickedLocationId, mapbox, location]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  const updateHoveredLocation = () => {
    setHoveredLocationId(location.id);
  };

  const removeHoveredLocation = () => {
    setHoveredLocationId("");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={updateHoveredLocation}
      onMouseLeave={removeHoveredLocation}
    >
      <MapPinIcon className={`text-orange ${pinSize}`} />
    </button>
  );
};

export default MapPin;
