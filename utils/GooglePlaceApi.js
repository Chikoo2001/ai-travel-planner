export const getGooglePhotoRef = async (placename) => {
  try {
    const apiKey = process.env.EXPO_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Google Maps API key is not set in the environment variables."
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      placename
    )}&key=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Error fetching Google Place data:", err);
    return null;
  }
};
