import { z } from 'zod';

const responseSchema = z.object({
  status: z.string(),
  results: z.array(
    z.object({ geometry: z.object({ location: z.object({ lat: z.number(), lng: z.number() }) }) }),
  ),
});

// Without a key the address is stored without coordinates and the site shows it as text.
export const geocode = async (address: string) => {
  const key = process.env.GOOGLE_GEOCODING_API_KEY;
  if (!key) return { address, lat: null, lng: null };
  const query = new URLSearchParams({ address, region: 'sv', key });
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${query}`);
  const { status, results } = responseSchema.parse(await response.json());
  if (status !== 'OK' && status !== 'ZERO_RESULTS') {
    throw new Error(`Google Geocoding answered ${status}`);
  }
  const location = results[0]?.geometry.location;
  return { address, lat: location?.lat ?? null, lng: location?.lng ?? null };
};
