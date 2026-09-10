import { useState, useMemo, type FC } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import centroid from "@turf/centroid";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import geoData from "./Areas/CITIES.json";
import type { FeatureCollection, Geometry, Feature } from "geojson";

interface CityProperties {
  CITY_NAME?: string;
  DIST_NAME?: string;
}

const regionData = geoData as FeatureCollection<Geometry, CityProperties>;

const ZoomTracker: FC<{ onZoomChange: (zoom: number) => void }> = ({
  onZoomChange,
}) => {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom());
    },
  });
  return null;
};

const createCustomIcon = (label: string, className: string) => {
  return L.divIcon({
    className: className,
    html: label,
    iconSize: undefined,
  });
};

interface MapProps {
  isFullscreen: Boolean,
}

export const Map: FC<MapProps> = () => {
  const defaultCenter: [number, number] = [31.5, 34.85];
  const [zoomLevel, setZoomLevel] = useState<number>(8);

  const { cityLabels, districtLabels } = useMemo(() => {
    const cities: Array<{ id: string; name: string; pos: [number, number] }> =
      [];
    const districtCentroids: Record<
      string,
      { latSum: number; lngSum: number; count: number }
    > = {};

    regionData.features.forEach(
      (feature: Feature<Geometry, CityProperties>, idx) => {
        const { CITY_NAME, DIST_NAME } = feature.properties || {};

        const center = centroid(feature).geometry.coordinates;
        const latLng: [number, number] = [center[1], center[0]];

        if (CITY_NAME) {
          cities.push({
            id: `${CITY_NAME}-${idx}`,
            name: CITY_NAME,
            pos: latLng,
          });
        }

        if (DIST_NAME) {
          if (!districtCentroids[DIST_NAME]) {
            districtCentroids[DIST_NAME] = { latSum: 0, lngSum: 0, count: 0 };
          }
          districtCentroids[DIST_NAME].latSum += latLng[0];
          districtCentroids[DIST_NAME].lngSum += latLng[1];
          districtCentroids[DIST_NAME].count += 1;
        }
      }
    );

    const districts = Object.keys(districtCentroids).map((distName) => {
      const group = districtCentroids[distName];
      return {
        name: distName,
        pos: [group.latSum / group.count, group.lngSum / group.count] as [
          number,
          number
        ],
      };
    });

    return { cityLabels: cities, districtLabels: districts };
  }, []);

  return (
    <div className="tactical-map-wrapper">
      <div className="tactical-map-container">
        <MapContainer
          center={defaultCenter}
          zoom={8}
          zoomControl={true}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomTracker onZoomChange={setZoomLevel} />

          <TileLayer
            className="tactical-tiles"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png?key=cb1_33l3_1_47d528b2bd2a06effd75bbbf"
            maxZoom={19}
          />

          <GeoJSON
            data={regionData}
            style={{
              stroke: false, 
              fillOpacity: 0,
            }}
          />

         
          {zoomLevel >= 12 &&
            cityLabels.map((city) => (
              <Marker
                key={city.id}
                position={city.pos}
                icon={createCustomIcon(city.name, "city-label")}
                interactive={false}
              />
            ))}

          {zoomLevel >= 4 &&
            zoomLevel < 12 &&
            districtLabels.map((district) => (
              <Marker
                key={district.name}
                position={district.pos}
                icon={createCustomIcon(district.name, "district-label")}
                interactive={false}
              />
            ))}
        </MapContainer>
      </div>
    </div>
  );
};
