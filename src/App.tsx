import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';

import { FloatingActionButton } from '@/components/FloatingActionButton';
import { MapWithMarkers } from '@/components/MapWithMarkers';
import { MarkerFormModal } from '@/components/MarkerFormModal';
import { MarkerList } from '@/components/MarkerList';
import { MarkerData } from '@/types';
import { getMarkers, saveMarkers } from '@/utils/storage';

import './App.css';
import Header from './components/Header';

function App() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMarkerList, setShowMarkerList] = useState(false);

  useEffect(() => {
    const savedMarkers = getMarkers();
    setMarkers(savedMarkers);
  }, []);

  const handleAddMarker = (marker: MarkerData) => {
    const updatedMarkers = [...markers, marker];
    setMarkers(updatedMarkers);
    saveMarkers(updatedMarkers);
  };

  const toggleMarkerList = () => {
    setShowMarkerList(!showMarkerList);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">

      <div className="h-full w-full">
        <MapWithMarkers markers={markers} />
      </div>

      <Header showMarkerList={showMarkerList} toggleMarkerList={toggleMarkerList} />

      {showMarkerList && (
        <div className="absolute right-6 top-20 z-10 w-80">
          <MarkerList markers={markers} />
        </div>
      )}

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <MarkerFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddMarker={handleAddMarker}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;