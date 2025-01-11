'use client';

import { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoMdArrowDropup } from 'react-icons/io';
import { fetchWithApiKey } from '@/utils/api';

interface MarketData {
  current_price: { usd: number };
  high_24h: { usd: number };
  low_24h: { usd: number };
  market_cap: { usd: number };
  market_cap_rank: number;
  total_volume: { usd: number };
  market_cap_change_percentage_24h: number;
}

export default function Performance({ coinId }: { coinId: string }) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [weekData, setWeekData] = useState<{
    high: number;
    low: number;
    highDate: string;
    lowDate: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketDataResult, weekDataResult] = await Promise.all([
          fetchWithApiKey(
            `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
          ),
          fetchWithApiKey(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365&interval=daily`
          ),
        ]);

        setMarketData(marketDataResult.market_data);

        const prices = weekDataResult.prices;
        let high = -Infinity;
        let low = Infinity;
        let highDate = '';
        let lowDate = '';

        prices.forEach(([timestamp, price]: [number, number]) => {
          if (price > high) {
            high = price;
            highDate = new Date(timestamp).toISOString();
          }
          if (price < low) {
            low = price;
            lowDate = new Date(timestamp).toISOString();
          }
        });

        setWeekData({ high, low, highDate, lowDate });
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId]);

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-6">
        <div className="animate-pulse">
          <div className="mb-8 h-8 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-6">
            <div className="h-20 rounded bg-gray-200"></div>
            <div className="h-20 rounded bg-gray-200"></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 rounded bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6">
        <div className="text-red-500">
          Error: {error}. Please try again later.
        </div>
      </div>
    );
  }

  if (!marketData || !weekData) {
    return (
      <div className="rounded-lg bg-white p-6">
        <div className="text-gray-500">No data available.</div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  const getTimeDifference = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffYears = now.getFullYear() - date.getFullYear();
    return `${date.toLocaleDateString()} (${diffYears} year${
      diffYears !== 1 ? 's' : ''
    } ago)`;
  };

  const highToCurrentChange =
    ((marketData.current_price.usd - weekData.high) / weekData.high) * 100;
  const currentToLowChange =
    ((marketData.current_price.usd - weekData.low) / weekData.low) * 100;

  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-6 text-2xl font-semibold">Performance</h2>
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-[#7C7E8C]">Today&apos;s Low</span>
          <span className="text-[#7C7E8C]">Today&apos;s High</span>
        </div>
        <div className="relative h-2 w-full">
          <div className="absolute left-0 right-0 mx-auto h-full w-[75%] rounded-full bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68]" />
          <div
            className="absolute -top-3 -translate-x-1/2 transform"
            style={{
              left: `${
                ((marketData.current_price.usd - marketData.low_24h.usd) /
                  (marketData.high_24h.usd - marketData.low_24h.usd)) *
                100
              }%`,
            }}
          >
            <div className="absolute left-1/2 top-4 -translate-x-1/2 transform whitespace-nowrap">
              <span className="flex flex-col items-center text-sm text-[#7C7E8C]">
                <IoMdArrowDropup className="text-2xl text-black" />
                {formatCurrency(marketData.current_price.usd)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-between">
          <span>{formatCurrency(marketData.low_24h.usd)}</span>
          <span>{formatCurrency(marketData.high_24h.usd)}</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-[#7C7E8C]">52W Low</span>
          <span className="text-[#7C7E8C]">52W High</span>
        </div>
        <div className="relative h-2 w-full">
          <div className="absolute left-0 right-0 mx-auto h-full w-[75%] rounded-full bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68]" />
          <div
            className="absolute -top-3 -translate-x-1/2 transform"
            style={{
              left: `${
                ((marketData.current_price.usd - weekData.low) /
                  (weekData.high - weekData.low)) *
                100
              }%`,
            }}
          ></div>
        </div>
        <div className="mt-1 flex justify-between">
          <span>{formatCurrency(weekData.low)}</span>
          <span>{formatCurrency(weekData.high)}</span>
        </div>
      </div>

      {/* Fundamentals */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold">Fundamentals</h3>
          <AiOutlineInfoCircle className="h-4 w-4 text-[#7C7E8C]" />
        </div>

        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">Bitcoin Price</span>
            <span className="font-medium">
              {formatCurrency(marketData.current_price.usd)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">24h Low / 24h High</span>
            <span className="font-medium">
              {formatCurrency(marketData.low_24h.usd)} /{' '}
              {formatCurrency(marketData.high_24h.usd)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">Trading Volume</span>
            <span className="font-medium">
              {formatCurrency(marketData.total_volume.usd)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">Market Cap Rank</span>
            <span className="font-medium">#{marketData.market_cap_rank}</span>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">Market Cap</span>
            <span className="font-medium">
              {formatCurrency(marketData.market_cap.usd)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">Market Cap Dominance</span>
            <span className="font-medium">
              {formatPercentage(marketData.market_cap_change_percentage_24h)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">52W High</span>
            <div className="text-right">
              <div className="font-medium">
                {formatCurrency(weekData.high)}{' '}
                <span className="text-red-500">
                  {highToCurrentChange.toFixed(1)}%
                </span>
              </div>
              <div className="text-sm text-[#768396]">
                {getTimeDifference(weekData.highDate)}
              </div>
            </div>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">52W Low</span>
            <div className="text-right">
              <div className="font-medium">
                {formatCurrency(weekData.low)}{' '}
                <span className="text-green-500">
                  +{currentToLowChange.toFixed(1)}%
                </span>
              </div>
              <div className="text-sm text-[#768396]">
                {getTimeDifference(weekData.lowDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
