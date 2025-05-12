const MapLoading = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#8D99AE] border-t-transparent" />

        <p className="text-lg font-semibold text-gray-700">Loading map...</p>
      </div>
    </div>
  );
};

export default MapLoading;
