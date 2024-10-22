import { Popup, LngLatLike, Map } from "mapbox-gl";
import Location, { Coordinate } from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { Result } from "@yext/search-headless-react";
import { renderToString } from "react-dom/server";
import { CoordinateClass, Marker, useMapContext } from "@yext/pages-components";

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
    <div className="popover">
      <p className="font-bold">{location.name || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return renderToString(html);
};

export interface MapPinProps {
  type: "verticalResultts" | "universalResults";
  mapbox?: mapboxgl.Map;
  result: Result<any>;
  clickedId: string;
  hoveredId: string;
  setHoveredId: (value: string) => void;
}
let currentPopup: Popup | null = null;

const scrollToCard = (locationId: string) => {
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
  type,
}: MapPinProps) => {
  const location = result.rawData;
  const [active, setActive] = useState(false);
  const { index } = result;
  const map = useMapContext();
  const popupRef = useRef<Popup | null>(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );
  const { id, yextDisplayCoordinate } = location;
  const handleClick = useCallback(
    (id: string) => {
      if (type === "verticalResultts") {
        scrollToCard(location.id);
        setActive(true);
        const mapboxCoordinate = transformToMapboxCoord(
          location.yextDisplayCoordinate
        );
        if (currentPopup) {
          currentPopup.remove();
        }
        if (mapboxCoordinate && mapbox) {
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
    },
    [location, mapbox, map]
  );

  useEffect(() => {
    if (clickedId === id) {
      if (
        !map.getBounds().contains(new CoordinateClass(yextDisplayCoordinate))
      ) {
        map.setCenter(yextDisplayCoordinate, true);
      }
    }
  }, [clickedId, id, yextDisplayCoordinate, map]);

  const updateHoveredLocation = useCallback(() => {
    setHoveredId(location.id);
  }, [location.id]);

  const removeHoveredLocation = useCallback(() => {
    setHoveredId("");
  }, []);

  return (
    <Marker
      onClick={(id) => handleClick(id)}
      coordinate={yextDisplayCoordinate}
      id={id}
      onHover={type === "verticalResultts" ? updateHoveredLocation : undefined}
      onFocus={type === "verticalResultts" ? removeHoveredLocation : undefined}
      zIndex={type === "verticalResultts" && hoveredId === id ? 2 : 0}
    >
      <MapPinPin
        backgroundColor="red"
        height={hoveredId === id ? "h-10" : "h-8"}
        width={hoveredId === id ? "w-10" : "w-8"}
        index={index!}
      />
    </Marker>
  );
};
export default MapPin;

type MapPinPropsN = {
  backgroundColor?: string;
  height: string;
  index: number;
  textColor?: string;
  width: string;
};

const MapPinPin = (props: MapPinPropsN) => {
  const { backgroundColor, height, index, textColor, width } = props;
  return (
    <>
      <svg
        className={`${height} ${width}`}
        fill="none"
        viewBox="0 0 384 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="mapPin"
          d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0z"
          stroke="#000"
          strokeOpacity=".5"
        ></path>
        <text
          className="mapPinText"
          x="50%"
          y="40%"
          fontSize="150px"
          fontWeight="bold"
          textAnchor="middle"
          fill={textColor ? textColor : "#FFFFFF"}
        >
          {index}
        </text>
      </svg>
    </>
  );
};
