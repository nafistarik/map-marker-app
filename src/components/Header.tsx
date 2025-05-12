import { MapPinIcon } from "lucide-react";

interface HeaderProps {
  showMarkerList: boolean;
  toggleMarkerList: () => void;
}

const Header = ({ showMarkerList, toggleMarkerList }: HeaderProps) => {
  return (
    <div className="absolute left-0 top-0 z-10 w-full bg-black/10 p-4 backdrop-blur-sm ">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Map Marker App</h1>
        </div>
        <button
          onClick={toggleMarkerList}
          className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          {showMarkerList ? "Hide Markers" : "Show Markers"}
        </button>
      </div>
    </div>
  );
};

export default Header;
