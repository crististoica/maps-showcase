import { useState, ChangeEvent } from 'react';

export const useBreachAreas = () => {
  const [selectedBreachArea, setSelectedBreachArea] = useState<any>(null);
  const [showBreachAreasLayer, setShowBreachAreasLayer] = useState(true);
  const [hoveredBreachAreaName, setHoveredBreachAreaName] = useState('');

  const handleShowBreachAreasLayer = (e: ChangeEvent<HTMLInputElement>) => {
    setShowBreachAreasLayer(e.target.checked);
    setSelectedBreachArea(null);
  };

  const handleSetSelectedBreachArea = (breachArea: any) => {
    setSelectedBreachArea(breachArea);
  };

  const handleSetHoveredBreachAreaName = (name: string) => {
    setHoveredBreachAreaName(name);
  };

  return {
    handleShowBreachAreasLayer,
    showBreachAreasLayer,
    selectedBreachArea,
    handleSetSelectedBreachArea,
    hoveredBreachAreaName,
    handleSetHoveredBreachAreaName
  };
};
