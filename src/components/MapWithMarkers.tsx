import { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { MarkerData } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// Replace with your actual Google Maps API key
// In a production environment, this should be stored in an environment variable
const API_KEY = 'AIzaSyAZ0Vu_lB4C-TgbvivvGAhOdq_SmA2FxGY';

// Default map center (San Francisco)
const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };
const DEFAULT_ZOOM = 12;

// Default map container styles
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

interface MapWithMarkersProps {
  markers: MarkerData[];
}

export function MapWithMarkers({ markers }: MapWithMarkersProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Function to fit map bounds to show all markers
  const fitBoundsToMarkers = () => {
    if (mapRef.current && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      
      markers.forEach((marker) => {
        bounds.extend({ lat: marker.lat, lng: marker.lng });
      });
      
      mapRef.current.fitBounds(bounds);
      
      // If there's only one marker, set an appropriate zoom level
      if (markers.length === 1) {
        mapRef.current.setZoom(14);
      }
    }
  };

  // Update bounds when markers change
  useEffect(() => {
    if (mapLoaded && markers.length > 0) {
      fitBoundsToMarkers();
    }
  }, [mapLoaded, markers]);

  // Handle map load
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
    if (markers.length > 0) {
      fitBoundsToMarkers();
    }
  };

  // Handle map load error
  const handleLoadError = () => {
    setLoadError('Failed to load Google Maps. Please check your API key and internet connection.');
    toast.error('Failed to load Google Maps');
  };

  // If there's a load error, display an error message
  if (loadError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="mt-2">{loadError}</AlertDescription>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      onError={handleLoadError}
      loadingElement={
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-xl font-medium">Loading map...</p>
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        onLoad={handleMapLoad}
        options={{
          fullscreenControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          zoomControl: true,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-1">
              <h3 className="text-sm font-medium text-gray-900">{selectedMarker.name}</h3>
              <p className="mt-1 text-xs text-gray-600">
                {selectedMarker.lat.toFixed(6)}, {selectedMarker.lng.toFixed(6)}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}