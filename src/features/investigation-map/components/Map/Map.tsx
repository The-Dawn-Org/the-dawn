import { type FC } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

interface RegionData {
  id: string;
  name: string;
  center: [number, number];
}

const ISRAEL_REGIONS: RegionData[] = [
  {
    id: "western_galilee",
    name: "גליל מערבי",
    center: [32.98, 35.16],
  },
  {
    id: "north",
    name: "צפון",
    center: [32.85, 35.55],
  },
  {
    id: "center",
    name: "מרכז",
    center: [32.05, 34.88],
  },
  {
    id: "south",
    name: "דרום",
    center: [30.8, 34.8],
  },
];

const createLayerLabelIcon = (text: string) =>
  L.divIcon({
    className: "tactical-layer-label-container",
    html: `<p class="tactical-layer-label-text">${text}</p>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

export const Map: FC = () => {
  const defaultCenter: [number, number] = [31.5, 34.85];

  return (
    <div className="tactical-map-wrapper">
      <div className="tactical-map-container">
        <MapContainer
          center={defaultCenter}
          zoom={8}
          zoomControl={true}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            className="tactical-tiles"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png?key=cb1_33l3_1_47d528b2bd2a06effd75bbbf"
            maxZoom={19}
          />
          <LayerGroup>
            {ISRAEL_REGIONS.map((region) => (
              <Marker
                key={region.id}
                position={region.center}
                icon={createLayerLabelIcon(region.name)}
                interactive={false}
              />
            ))}
          </LayerGroup>
        </MapContainer>
      </div>
    </div>
  );
};