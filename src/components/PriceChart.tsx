'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

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

declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
  }
}

const TIME_PERIODS = [
  { label: '1H', value: '1' },
  { label: '24H', value: '24' },
  { label: '7D', value: '7' },
  { label: '1M', value: '30' },
  { label: '3M', value: '90' },
  { label: '6M', value: '180' },
  { label: '1Y', value: '365' },
  { label: 'ALL', value: 'max' },
];

const PriceChart = ({ coinId }: { coinId: string }) => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [coinInfo, setCoinInfo] = useState<CoinInfo | null>(null);
  const [selectedInterval, setSelectedInterval] = useState('7D');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add delay between requests to avoid rate limiting
        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr,usd&include_24hr_change=true`
        );

        if (!priceResponse.ok) {
          throw new Error(`Price API error: ${priceResponse.status}`);
        }

        const priceData = await priceResponse.json();

        // Wait for 1 second before making the second request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const infoResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
        );

        if (!infoResponse.ok) {
          throw new Error(`Info API error: ${infoResponse.status}`);
        }

        const infoData = await infoResponse.json();

        setPriceData(priceData[coinId]);
        setCoinInfo({
          symbol: infoData.symbol.toUpperCase(),
          image: infoData.image,
          market_cap_rank: infoData.market_cap_rank,
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId]);

  useEffect(() => {
    if (!isLoading && coinInfo && containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          window.tvWidget = new window.TradingView.widget({
            container_id: 'tradingview_chart',
            symbol: `BINANCE:${coinInfo.symbol}USDT`,
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            hide_top_toolbar: true,
            hide_legend: true,
            hide_side_toolbar: true,
            allow_symbol_change: false,
            save_image: false,
            height: 400,
            width: '100%',
            studies: [],
            disabled_features: [
              'use_localstorage_for_settings',
              'volume_force_overlay',
              'create_volume_indicator_by_default',
              'left_toolbar',
              'control_bar',
              'timeframes_toolbar',
              'main_series_scale_menu',
              'symbol_search_hot_key',
              'symbol_info',
              'header_widget',
              'header_widget_dom_node',
              'header_symbol_search',
              'header_resolutions',
              'header_chart_type',
              'header_settings',
              'header_indicators',
              'header_compare',
              'header_undo_redo',
              'header_screenshot',
              'header_fullscreen_button',
              'legend_context_menu',
              'edit_buttons_in_legend',
              'context_menus',
              'border_around_the_chart',
            ],
            enabled_features: ['hide_left_toolbar_by_default'],
            overrides: {
              'mainSeriesProperties.candleStyle.upColor': '#00C076',
              'mainSeriesProperties.candleStyle.downColor': '#FF6838',
              'mainSeriesProperties.candleStyle.borderUpColor': '#00C076',
              'mainSeriesProperties.candleStyle.borderDownColor': '#FF6838',
              'mainSeriesProperties.candleStyle.wickUpColor': '#00C076',
              'mainSeriesProperties.candleStyle.wickDownColor': '#FF6838',
              'paneProperties.background': '#FFFFFF',
              'paneProperties.vertGridProperties.color': '#F0F0F0',
              'paneProperties.horzGridProperties.color': '#F0F0F0',
              'scalesProperties.textColor': '#999999',
              'scalesProperties.lineColor': '#F0F0F0',
              'mainSeriesProperties.lineStyle.color': '#0052FE',
              'mainSeriesProperties.lineStyle.linewidth': 2,
            },
            loading_screen: { backgroundColor: '#FFFFFF' },
          });
        }
      };
      document.head.appendChild(script);

      return () => {
        if (window.tvWidget) {
          window.tvWidget.remove();
          delete window.tvWidget;
        }
        script.remove();
      };
    }
  }, [isLoading, coinInfo, selectedInterval]);

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

      {/* TradingView Chart */}
      <div
        ref={containerRef}
        id="tradingview_chart"
        className="h-[400px] w-full"
      />
    </div>
  );
};

export default PriceChart;
