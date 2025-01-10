'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCaretUp } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';

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
    };
  };
}

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/search/trending'
        );
        const data = await response.json();
        setTrendingCoins(data.coins.slice(0, 3));
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
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Trending Coins (24h)</h2>
      <div className="space-y-4">
        {trendingCoins.map((coin) => (
          <Link
            key={coin.item.id}
            href={`/${coin.item.id}`}
            className="flex items-center justify-between rounded p-2 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <Image
                src={coin.item.thumb}
                alt={coin.item.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-medium">{coin.item.name}</span>
              <span className="text-sm text-gray-500">
                ({coin.item.symbol})
              </span>
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                coin.item.data.price_change_percentage_24h.usd >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {coin.item.data.price_change_percentage_24h.usd >= 0 ? (
                <FaCaretUp />
              ) : (
                <FaCaretDown />
              )}
              {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;
