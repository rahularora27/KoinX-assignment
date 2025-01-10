'use client';

import { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface MarketData {
  current_price: { usd: number };
  high_24h: { usd: number };
  low_24h: { usd: number };
  market_cap: { usd: number };
  market_cap_rank: number;
  total_volume: { usd: number };
  ath: { usd: number };
  ath_date: { usd: string };
  atl: { usd: number };
  atl_date: { usd: string };
  market_cap_change_percentage_24h: number;
}

export default function Performance({ coinId }: { coinId: string }) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
        );
        const data = await response.json();
        setMarketData(data.market_data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, [coinId]);

  if (isLoading) {
    return <div className="rounded-lg bg-white p-6">Loading...</div>;
  }

  if (!marketData) {
    return (
      <div className="rounded-lg bg-white p-6">Failed to load market data</div>
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
    return `${date.toLocaleDateString()} (${diffYears} year${diffYears !== 1 ? 's' : ''} ago)`;
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-6 text-2xl font-semibold">Performance</h2>

      {/* Today's Range */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-[#7C7E8C]">Today's Low</span>
          <span className="text-[#7C7E8C]">Today's High</span>
        </div>
        <div className="relative h-2">
          <div className="absolute h-full w-full rounded-full bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68]" />
          <div
            className="absolute -top-3 -translate-x-1/2 transform"
            style={{
              left: `${((marketData.current_price.usd - marketData.low_24h.usd) / (marketData.high_24h.usd - marketData.low_24h.usd)) * 100}%`,
            }}
          >
            <div className="h-4 w-1 rounded-full bg-black" />
            <div className="absolute left-1/2 top-4 -translate-x-1/2 transform whitespace-nowrap">
              <span className="text-sm">
                {formatCurrency(marketData.current_price.usd)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-sm">
            {formatCurrency(marketData.low_24h.usd)}
          </span>
          <span className="text-sm">
            {formatCurrency(marketData.high_24h.usd)}
          </span>
        </div>
      </div>

      {/* 52W Range */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-[#7C7E8C]">52W Low</span>
          <span className="text-[#7C7E8C]">52W High</span>
        </div>
        <div className="relative h-2">
          <div className="absolute h-full w-full rounded-full bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68]" />
          <div
            className="absolute -top-3 -translate-x-1/2 transform"
            style={{
              left: `${((marketData.current_price.usd - marketData.atl.usd) / (marketData.ath.usd - marketData.atl.usd)) * 100}%`,
            }}
          >
            <div className="h-4 w-1 rounded-full bg-black" />
            <div className="absolute left-1/2 top-4 -translate-x-1/2 transform whitespace-nowrap">
              <span className="text-sm">
                {formatCurrency(marketData.current_price.usd)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-between">
          <span className="text-sm">{formatCurrency(marketData.atl.usd)}</span>
          <span className="text-sm">{formatCurrency(marketData.ath.usd)}</span>
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
            <span className="text-[#768396]">All-Time High</span>
            <div className="text-right">
              <div className="font-medium">
                {formatCurrency(marketData.ath.usd)}{' '}
                <span className="text-red-500">-75.6%</span>
              </div>
              <div className="text-sm text-[#768396]">
                {getTimeDifference(marketData.ath_date.usd)}
              </div>
            </div>
          </div>
          <div className="flex justify-between border-b border-[#DEE1E6] py-3">
            <span className="text-[#768396]">All-Time Low</span>
            <div className="text-right">
              <div className="font-medium">
                {formatCurrency(marketData.atl.usd)}{' '}
                <span className="text-green-500">24729.1%</span>
              </div>
              <div className="text-sm text-[#768396]">
                {getTimeDifference(marketData.atl_date.usd)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
