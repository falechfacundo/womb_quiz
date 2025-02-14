export async function getFlodeskSubscribers(page = 1, per_page = 20) {
  const response = await fetch(
    `https://api.flodesk.com/v1/subscribers?page=${page}&per_page=${per_page}`,
    {
      headers: {
        Authorization: `Basic ${btoa(import.meta.env.FLODESK_API_KEY + ":")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Flodesk subscribers");
  }

  return response.json();
}
