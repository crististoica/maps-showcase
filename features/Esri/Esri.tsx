import { useRef, useEffect, useState } from 'react';
import Graphic from '@arcgis/core/Graphic';
import MapView from '@arcgis/core/views/MapView';
import { loadModules } from 'esri-loader';

import { breachAreas } from '@data/breachAreas';

const EsriMap = () => {
  useEffect(() => {
    let mapView: MapView | null = null;

    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/geometry/Polygon',
      'esri/Graphic',
    ]).then(([ArcGISMap, ArcGISMapView, Polygon, ArcGISGraphic]) => {
      const map = new ArcGISMap({
        basemap: 'streets-vector',
      });

      mapView = new ArcGISMapView({
        container: 'map-container',
        map: map,
        zoom: 2,
        maxZoom: 2,
      });

      mapView!.when(() => {
        // the map view is ready
        const graphics = [];

        for (const feature of breachAreas.features) {
          const graphic = new ArcGISGraphic({
            geometry: new Polygon({
              rings: feature.geometry.coordinates,
            }),
            symbol: {
              type: 'simple-fill',
              color: [255, 0, 0, 0.5],
              outline: {
                width: 1,
                color: [255, 255, 255],
              },
            },
          });

          graphics.push(graphic);
        }

        map.addMany(graphics);

        mapView!.watch('zoom', (newValue: number, oldValue: number) => {
          console.log(`Zoom changed from ${oldValue} to ${newValue}`);
        });
      });
    });

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <div id="map-container" className="fixed top-0 left-0 w-full h-full" />
    </div>
  );
};

export default EsriMap;
