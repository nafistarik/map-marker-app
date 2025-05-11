import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { MapPinIcon } from 'lucide-react';

import { FloatingActionButton } from '@/components/FloatingActionButton';
import { MapWithMarkers } from '@/components/MapWithMarkers';
import { MarkerFormModal } from '@/components/MarkerFormModal';
import { MarkerList } from '@/components/MarkerList';
import { MarkerData } from '@/types';
import { getMarkers, saveMarkers } from '@/utils/storage';

import './App.css';

function App() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMarkerList, setShowMarkerList] = useState(false);

  // Load markers from localStorage on mount
  useEffect(() => {
    const savedMarkers = getMarkers();
    setMarkers(savedMarkers);
  }, []);

  // Add a new marker
  const handleAddMarker = (marker: MarkerData) => {
    const updatedMarkers = [...markers, marker];
    setMarkers(updatedMarkers);
    saveMarkers(updatedMarkers);
  };

  // Toggle marker list visibility
  const toggleMarkerList = () => {
    setShowMarkerList(!showMarkerList);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main content */}
      <div className="h-full w-full">
        <MapWithMarkers markers={markers} />
      </div>

      {/* App header */}
      <div className="absolute left-0 top-0 z-10 w-full bg-white/80 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Map Marker App</h1>
          </div>
          <button
            onClick={toggleMarkerList}
            className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {showMarkerList ? 'Hide Markers' : 'Show Markers'}
          </button>
        </div>
      </div>

      {/* Marker list panel */}
      {showMarkerList && (
        <div className="absolute right-6 top-20 z-10 w-80">
          <MarkerList markers={markers} />
        </div>
      )}

      {/* Add marker button */}
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      {/* Add marker modal */}
      <MarkerFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddMarker={handleAddMarker}
      />

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;