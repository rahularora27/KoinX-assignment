const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY as string;

export const fetchWithApiKey = async (url: string) => {
  const headers: Record<string, string> = {
    'x-cg-demo-api-key': API_KEY,
  };

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};
