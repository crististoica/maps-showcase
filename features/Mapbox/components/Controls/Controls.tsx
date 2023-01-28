import { ChangeEvent } from 'react';

import { SideContent, Divider } from '@/components';
import { MAP_STYLES, BREACH_AREA_RISK_COLORS } from 'features/Mapbox/constants';

type TBreachAreaProperties = {
  name: string;
  risk: string;
};

type TControls = {
  mapStyle: string;
  showBreachAreasLayer: boolean;
  handleShowBreachAreasLayer: (e: ChangeEvent<HTMLInputElement>) => void;
  currentLocation: string;
  handleLocationChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMapStyleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  breachAreas: TBreachAreaProperties[];
  handleSetHoveredBreachAreaName: (name: string) => void;
};

const Controls = (props: TControls) => {
  const {
    mapStyle,
    showBreachAreasLayer,
    handleShowBreachAreasLayer,
    currentLocation,
    handleLocationChange,
    handleMapStyleChange,
    breachAreas,
    handleSetHoveredBreachAreaName
  } = props;

  const handleBreachAreaHover = (breachArea: TBreachAreaProperties) => {
    handleSetHoveredBreachAreaName(breachArea.name);
  };

  const handleBreachAreaMouseLeave = (breachArea: TBreachAreaProperties) => {
    handleSetHoveredBreachAreaName('');
  };

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
        <Divider />
        <h4 className="text-xl underline">Breach Areas</h4>
        <div>
          {breachAreas.map((breachArea) => (
            <div
              key={breachArea.name}
              className="flex w-full justify-between p-3 border-b-2"
              onMouseEnter={() => handleBreachAreaHover(breachArea)}
              onMouseLeave={() => handleBreachAreaMouseLeave(breachArea)}
            >
              <p>{breachArea.name}</p>
              <p
                style={{
                  color:
                    BREACH_AREA_RISK_COLORS[
                      breachArea.risk as keyof typeof BREACH_AREA_RISK_COLORS
                    ].fill,
                }}
              >
                {breachArea.risk}
              </p>
            </div>
          ))}
        </div>
      </>
    </SideContent>
  );
};

export default Controls;
