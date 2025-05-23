import { MarkerData } from '@/types';

const STORAGE_KEY = 'map-markers';

export const getMarkers = (): MarkerData[] => {
  try {
    const markers = localStorage.getItem(STORAGE_KEY);
    return markers ? JSON.parse(markers) : [];
  } catch (error) {
    console.error('Error retrieving markers from localStorage:', error);
    return [];
  }
}

export const saveMarkers = (markers: MarkerData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(markers));
  } catch (error) {
    console.error('Error saving markers to localStorage:', error);
  }
}