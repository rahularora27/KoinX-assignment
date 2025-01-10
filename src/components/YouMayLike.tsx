'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    data: {
      price_change_percentage_24h: {
        usd: number;
      };
      sparkline: string;
    };
  };
}

const YouMayLike = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/search/trending'
        );
        const data = await response.json();
        setTrendingCoins(data.coins);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
        setIsLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">You May Also Like</h2>
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-4 pb-4">
          {trendingCoins.map((coin) => (
            <Link
              key={coin.item.id}
              href={`/${coin.item.id}`}
              className="w-[300px] rounded-lg bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={coin.item.thumb}
                    alt={coin.item.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium">{coin.item.symbol}</span>
                </div>
                <div
                  className={`text-sm font-medium ${
                    coin.item.data.price_change_percentage_24h.usd >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {coin.item.data.price_change_percentage_24h.usd >= 0
                    ? '+'
                    : ''}
                  {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </div>
              </div>
              <Image
                src={coin.item.data.sparkline}
                alt="Price graph"
                width={250}
                height={60}
                className="w-full"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Repeat the same carousel */}
      <h2 className="mb-4 mt-6 text-xl font-semibold">Trending Coins</h2>
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-4 pb-4">
          {trendingCoins.map((coin) => (
            <Link
              key={coin.item.id}
              href={`/${coin.item.id}`}
              className="w-[300px] rounded-lg bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={coin.item.thumb}
                    alt={coin.item.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium">{coin.item.symbol}</span>
                </div>
                <div
                  className={`text-sm font-medium ${
                    coin.item.data.price_change_percentage_24h.usd >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {coin.item.data.price_change_percentage_24h.usd >= 0
                    ? '+'
                    : ''}
                  {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </div>
              </div>
              <Image
                src={coin.item.data.sparkline}
                alt="Price graph"
                width={250}
                height={60}
                className="w-full"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouMayLike;
