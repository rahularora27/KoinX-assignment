'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Chart from './Chart';
import { fetchWithApiKey } from '@/utils/api';

interface PriceData {
  usd: number;
  inr: number;
  usd_24h_change: number;
}

interface CoinInfo {
  symbol: string;
  image: {
    large: string;
  };
  market_cap_rank: number;
}

const TIME_PERIODS = [
  { label: '7D', value: '7' },
  { label: '1M', value: '30' },
  { label: '3M', value: '90' },
  { label: '6M', value: '180' },
  { label: '1Y', value: '365' },
];

const PriceChart = ({ coinId }: { coinId: string }) => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [coinInfo, setCoinInfo] = useState<CoinInfo | null>(null);
  const [chartData, setChartData] = useState<{ time: number; value: number }[]>(
    []
  );
  const [selectedInterval, setSelectedInterval] = useState('7');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceData, infoData, chartData] = await Promise.all([
          fetchWithApiKey(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr,usd&include_24h_change=true`
          ),
          fetchWithApiKey(
            `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
          ),
          fetchWithApiKey(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedInterval}&interval=${
              selectedInterval === '1'
                ? 'minute'
                : selectedInterval === '24'
                  ? 'hour'
                  : 'daily'
            }`
          ),
        ]);

        const processedChartData = chartData.prices
          .map(([timestamp, price]: [number, number]) => ({
            time: timestamp / 1000,
            value: price,
          }))
          .sort((a: { time: number }, b: { time: number }) => a.time - b.time);

        setPriceData(priceData[coinId]);
        setCoinInfo({
          symbol: infoData.symbol.toUpperCase(),
          image: infoData.image,
          market_cap_rank: infoData.market_cap_rank,
        });
        setChartData(processedChartData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId, selectedInterval]);

  if (isLoading)
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="mb-8 h-8 w-1/4 rounded bg-gray-200"></div>
          <div className="mb-6 h-12 w-1/2 rounded bg-gray-200"></div>
          <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
          <div className="h-[400px] rounded bg-gray-200"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="text-red-500">
          Error: {error}. Please try again later.
        </div>
      </div>
    );

  if (!priceData || !coinInfo)
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="text-gray-500">
          No data available for this cryptocurrency.
        </div>
      </div>
    );

  return (
    <div suppressHydrationWarning className="rounded-lg bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-2">
        <Image
          src={coinInfo.image.large}
          alt={coinId}
          width={32}
          height={32}
          className="rounded-full"
        />
        <h1 className="text-2xl font-semibold capitalize">{coinId}</h1>
        <span className="font-medium text-gray-500">{coinInfo.symbol}</span>
        <span className="rounded-lg bg-[#808A9D] px-3 py-1 text-sm text-white">
          Rank #{coinInfo.market_cap_rank}
        </span>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">
            ${priceData.usd.toLocaleString()}
          </span>
          <div
            className={`flex items-center gap-1 ${
              priceData.usd_24h_change >= 0
                ? 'bg-[#EBF9F4] text-[#14B079]'
                : 'bg-[#FDF0EE] text-[#DC5B46]'
            } rounded px-2 py-1`}
          >
            <span className="text-sm">
              {priceData.usd_24h_change >= 0 ? '▲' : '▼'}
            </span>
            <span className="text-sm font-medium">
              {Math.abs(priceData.usd_24h_change).toFixed(2)}%
            </span>
            <span className="ml-1 text-sm text-[#768396]">(24H)</span>
          </div>
        </div>
        <div className="mt-1 text-lg text-[#0F1629]">
          ₹ {priceData.inr.toLocaleString()}
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-4 border-b border-[#DEE1E6] pb-4">
        <h2 className="mb-4 text-xl font-semibold text-[#0F1629]">
          {coinId} Price Chart (USD)
        </h2>
        <div className="flex gap-4 text-sm">
          {TIME_PERIODS.map((period) => (
            <button
              key={period.label}
              onClick={() => setSelectedInterval(period.value)}
              className={`rounded px-3 py-1 ${
                period.value === selectedInterval
                  ? 'bg-[#E2ECFE] font-medium text-[#0141CF]'
                  : 'text-[#5D667B] hover:bg-gray-100'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full">
        <Chart data={chartData} />
      </div>
    </div>
  );
};

export default PriceChart;
