import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarkerData } from '@/types';

interface MarkerListProps {
  markers: MarkerData[];
}

export function MarkerList({ markers }: MarkerListProps) {
  if (markers.length === 0) {
    return (
      <Card className="w-full bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Markers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No markers added yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Markers ({markers.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {markers.map((marker) => (
              <Card key={marker.id} className="p-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{marker.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Lat: {marker.lat.toFixed(6)}, Lng: {marker.lng.toFixed(6)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}