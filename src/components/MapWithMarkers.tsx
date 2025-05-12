import { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { toast } from "sonner";
import { MarkerData } from "@/types";
import MapLoadError from "./MapLoadError";
import MapLoading from "./MapLoading";

const API_KEY = "AIzaSyAZ0Vu_lB4C-TgbvivvGAhOdq_SmA2FxGY";

const DEFAULT_CENTER = { lat: 23.8103, lng: 90.4125 };
const DEFAULT_ZOOM = 18;

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

interface MapWithMarkersProps {
  markers: MarkerData[];
}

export function MapWithMarkers({ markers }: MapWithMarkersProps) {

  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const fitBoundsToMarkers = useCallback(() => {
    if (mapRef.current && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      markers.forEach((marker) => {
        bounds.extend({ lat: marker.lat, lng: marker.lng });
      });

      mapRef.current.fitBounds(bounds);

      if (markers.length === 1) {
        mapRef.current.setZoom(14);
      }
    }
  }, [markers]);

  useEffect(() => {
    if (mapLoaded && markers.length > 0) {
      fitBoundsToMarkers();
    }
  }, [mapLoaded, markers, fitBoundsToMarkers]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
    if (markers.length > 0) {
      fitBoundsToMarkers();
    }
  };

  const handleLoadError = () => {
    setLoadError(
      "Failed to load Google Maps. Please check your API key and internet connection."
    );
    toast.error("Failed to load Google Maps");
  };

  if (loadError) {
    return (
      <MapLoadError message = {loadError} />
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      onError={handleLoadError}
      loadingElement={
        <MapLoading/>
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
            label={marker.name}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-1">
              <h3 className="text-sm font-medium text-gray-900">
                {selectedMarker.name}
              </h3>
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
