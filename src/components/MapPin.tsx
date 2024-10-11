import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { Popup, LngLatLike, Map } from "mapbox-gl";
import Location, { Coordinate } from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { GiTacos } from "react-icons/gi";
import { Result } from "@yext/search-headless-react";
import { MapPinIcon } from "@heroicons/react/20/solid";

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
  return ReactDOM.renderToString(html);
};

export interface MapPinProps {
  mapbox: Map;
  result: Result<any>;
  hoveredLocationId: string;
  setHoveredLocationId: (value: string) => void;
}

const MapPin = ({
  mapbox,
  result,
  hoveredLocationId,
  setHoveredLocationId,
}: MapPinProps) => {
  console.log(`enterted`);

  const location = result.rawData;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    if (active && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(mapbox);
      }
    }
  }, [active, mapbox, location]);

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
      <MapPinIcon className="text-orange h-6 w-6" />
    </button>
  );
};

export default MapPin;
