import { ChangeEvent } from 'react';

import { SideContent, Divider } from '@/components';
import { MAP_STYLES } from 'features/Mapbox/constants';

type TControls = {
  mapStyle: string;
  showBreachAreasLayer: boolean;
  handleShowBreachAreasLayer: (e: ChangeEvent<HTMLInputElement>) => void;
  currentLocation: string;
  handleLocationChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMapStyleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Controls = (props: TControls) => {
  const {
    mapStyle,
    showBreachAreasLayer,
    handleShowBreachAreasLayer,
    currentLocation,
    handleLocationChange,
    handleMapStyleChange
  } = props;

  return (
    <SideContent>
      <>
        <h4 className="text-xl underline">Map Style</h4>
        <div className="flex flex-col ml-5 mt-2 text-lg">
          <label>
            <input
              type="radio"
              name="navigation"
              checked={mapStyle === MAP_STYLES.navigation}
              className="mr-4"
              onChange={handleMapStyleChange}
            />
            Navigation
          </label>
          <label>
            <input
              type="radio"
              name="streets"
              checked={mapStyle === MAP_STYLES.streets}
              className="mr-4"
              onChange={handleMapStyleChange}
            />
            Streets
          </label>
          <label>
            <input
              type="radio"
              name="brown"
              checked={mapStyle === MAP_STYLES.brown}
              className="mr-4"
              onChange={handleMapStyleChange}
            />
            Brown
          </label>
        </div>
        <Divider />
        <h4 className="text-xl underline">Layers</h4>
        <div className="flex flex-col ml-5 mt-2 text-lg">
          <label>
            <input
              type="checkbox"
              checked={showBreachAreasLayer}
              className="mr-4"
              onChange={handleShowBreachAreasLayer}
            />
            Show Areas Layer
          </label>
        </div>
        <Divider />
        <h4 className="text-xl underline">Quick Navigation</h4>
        <div className="flex flex-col ml-5 mt-2 text-lg">
          <label>
            <input
              type="radio"
              name="singapore"
              checked={currentLocation === 'singapore'}
              className="mr-4"
              onChange={handleLocationChange}
            />
            Singapore
          </label>
          <label>
            <input
              type="radio"
              name="blackSea"
              checked={currentLocation === 'blackSea'}
              className="mr-4"
              onChange={handleLocationChange}
            />
            Black Sea
          </label>
          <label>
            <input
              type="radio"
              name="uk"
              checked={currentLocation === 'uk'}
              className="mr-4"
              onChange={handleLocationChange}
            />
            United Kingdom
          </label>
        </div>
      </>
    </SideContent>
  );
};

export default Controls;
