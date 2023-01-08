import { useRef, useState, ChangeEvent, useMemo } from 'react';
import Map, { MapRef, Popup, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { breachAreas } from '@data/breachAreas';
import { vessels } from '@data/vessels';
import { Controls, VesselPopupContent } from './components';
import { MAP_STYLES, BREACH_AREA_RISK_COLORS, COORDINATES } from './constants';

type TLocation = 'singapore' | 'blackSea' | 'uk';

const MapboxMap = () => {
  const [selectedBreachArea, setSelectedBreachArea] = useState<any>(null);
  const [showBreachAreasLayer, setShowBreachAreasLayer] = useState(true);
  const [selectVesselLayer, setSelectedVesselLayer] = useState<any>(null);
  const [currentLocation, setCurrentLocation] =
    useState<TLocation>('singapore');
  const [mapStyle, setMapStyle] = useState(MAP_STYLES.brown);
  const mapRef = useRef<MapRef>(null);

  const interactiveLayerIds = useMemo(() => {
    const breachAreasIds = showBreachAreasLayer ? breachAreas.features.map(
      (breachArea) => breachArea.properties.name,
    ) : [];
    const vesselsIds = vessels.features.map((vessel) =>
      vessel.properties.IMO.toString(),
    );
    return [...breachAreasIds, ...vesselsIds];
  }, [showBreachAreasLayer]);

  const handleShowBreachAreasLayer = (e: ChangeEvent<HTMLInputElement>) => {
    setShowBreachAreasLayer(e.target.checked);
    setSelectedBreachArea(null);
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: location } = e.target;
    mapRef.current?.flyTo({
      center: COORDINATES[location as TLocation] as any,
      duration: 2000,
    });
    setCurrentLocation(location as TLocation);
  };

  const onLayerClick = (layer: any) => {
    const { features, lngLat } = layer;
    const breachAreaLayer = features.find((feature: any) => feature.properties.risk);
    const vesselLayer = features.find((feature: any) => feature.properties.IMO);
    if (breachAreaLayer && !vesselLayer) {
      setSelectedBreachArea({
        lngLat,
        ...breachAreaLayer,
      });
      setSelectedVesselLayer(null);
    } else if (vesselLayer) {
      setSelectedVesselLayer({
        lngLat,
        ...vesselLayer,
      });
      setSelectedBreachArea(null);
    } else {
      setSelectedBreachArea(null);
      setSelectedVesselLayer(null);
    }
  };

  const onPopoverClose = () => {
    setSelectedBreachArea(null);
    setSelectedVesselLayer(null);
  };

  const onMapLoad = () => {
    mapRef.current?.loadImage('/vessel.png', (error, image) => {
      if (error) {
        throw error;
      }
      if (mapRef.current?.hasImage('marker-icon')) {
        mapRef.current?.removeImage('marker-icon');
      } else {
        mapRef.current?.addImage('marker-icon', image!);
      }
    });
  };

  const handleMapStyleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: style } = e.target;
    setMapStyle(MAP_STYLES[style as keyof typeof MAP_STYLES]);
    onMapLoad();
  };

  return (
    <div className="w-full h-full">
      <Controls
        currentLocation={currentLocation}
        handleLocationChange={handleLocationChange}
        handleShowBreachAreasLayer={handleShowBreachAreasLayer}
        mapStyle={mapStyle}
        handleMapStyleChange={handleMapStyleChange}
        showBreachAreasLayer={showBreachAreasLayer}
      />
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 5.0395988712160715,
          longitude: 107.23983583013012,
          zoom: 5,
        }}
        reuseMaps
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
        mapStyle={mapStyle}
        interactiveLayerIds={interactiveLayerIds as string[]}
        onClick={onLayerClick}
        onLoad={onMapLoad}
        styleDiffing={false}
      >
        {showBreachAreasLayer &&
          breachAreas.features.map((breachArea) => (
            <Source
              type="geojson"
              data={breachArea as any}
              key={breachArea.properties.name}
            >
              <Layer
                id={breachArea.properties.name}
                type="fill"
                paint={{
                  'fill-color':
                    BREACH_AREA_RISK_COLORS[
                      breachArea.properties
                        .risk as keyof typeof BREACH_AREA_RISK_COLORS
                    ].fill,
                  'fill-opacity': 0.6,
                  'fill-outline-color':
                    BREACH_AREA_RISK_COLORS[
                      breachArea.properties
                        .risk as keyof typeof BREACH_AREA_RISK_COLORS
                    ].outline,
                }}
              />
            </Source>
          ))}
        {vessels.features.map((vessel) => (
          <Source
            type="geojson"
            data={vessel as any}
            key={vessel.properties.IMO}
          >
            <Layer
              id={vessel.properties.IMO.toString()}
              type="symbol"
              layout={{
                'icon-image': 'marker-icon',
                'icon-size': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0,
                  0.01,
                  10,
                  0.1,
                ],
              }}
              paint={{
                'icon-color': '#ff0000',
              }}
            />
          </Source>
        ))}
        {selectedBreachArea && (
          <Popup
            anchor="bottom"
            latitude={selectedBreachArea.lngLat.lat}
            longitude={selectedBreachArea.lngLat.lng}
            onClose={onPopoverClose}
            closeOnMove
            closeOnClick={false}
            className="[&>.mapboxgl-popup-content]:w-96 [&>.mapboxgl-popup-content]:bg-gray-600 text-white text-xl"
          >
            <div>
              <p>{selectedBreachArea.properties.name}</p>
              <p>
                Risk:{' '}
                <span
                  style={{
                    color:
                      BREACH_AREA_RISK_COLORS[
                        selectedBreachArea.properties
                          .risk as keyof typeof BREACH_AREA_RISK_COLORS
                      ].fill,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {selectedBreachArea.properties.risk}
                </span>
              </p>
            </div>
          </Popup>
        )}
        {selectVesselLayer && (
          <Popup
            anchor="bottom"
            latitude={selectVesselLayer.lngLat.lat}
            longitude={selectVesselLayer.lngLat.lng}
            onClose={onPopoverClose}
            closeOnMove
            closeOnClick={false}
            className="[&>.mapboxgl-popup-content]:w-96 [&>.mapboxgl-popup-content]:bg-gray-600 text-white text-xl"
          >
            <VesselPopupContent properties={selectVesselLayer.properties} />
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapboxMap;
