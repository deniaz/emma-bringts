import { useEffect, useState } from 'react';

export function useGetCurrentPosition() {
  const [location, setLocation] = useState<[number, number]>([null, null]);
  const [zip, setZip] = useState<string>('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
      try {
        const response = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
        const { postcode } = await response.json();
        setZip(postcode);
      } catch (e) {
        console.error(e);
      } finally {
        setLocation([latitude, longitude]);
      }
    });
  }, []);

  return [location, zip] as [[number, number], string];
}
