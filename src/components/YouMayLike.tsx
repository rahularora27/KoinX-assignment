'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

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
      price: string;
    };
  };
}

const YouMayLike = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = (element: HTMLDivElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = element;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right', carouselRef: HTMLDivElement) => {
    const scrollAmount = 400;
    const newScrollLeft =
      carouselRef.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);

    carouselRef.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

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

  const CarouselSection = ({ title }: { title: string }) => (
    <>
      <h2 className="mb-4 text-[24px] font-semibold">{title}</h2>
      <div className="relative">
        <div
          onScroll={(e) => checkScroll(e.currentTarget)}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {trendingCoins.map((coin) => (
            <Link
              key={coin.item.id}
              href={`/${coin.item.id}`}
              className="min-w-[252px] rounded-lg border-2 border-gray-200 bg-white p-5 shadow-sm hover:bg-gray-50"
            >
              <div className="mb-2 flex items-center gap-2">
                <Image
                  src={coin.item.thumb}
                  alt={coin.item.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-medium">{coin.item.symbol}</span>
                <div
                  className={`flex items-center ${
                    coin.item.data.price_change_percentage_24h.usd >= 0
                      ? 'text-[#14B079]'
                      : 'text-[#DC5C5C]'
                  }`}
                >
                  {coin.item.data.price_change_percentage_24h.usd >= 0 ? (
                    <IoMdArrowDropup className="text-lg" />
                  ) : (
                    <IoMdArrowDropdown className="text-lg" />
                  )}
                  <span className="text-sm">
                    {Math.abs(
                      coin.item.data.price_change_percentage_24h.usd
                    ).toFixed(2)}
                    %
                  </span>
                </div>
              </div>
              <div className="font-medium">
                ${Number(coin.item.data.price || 0).toLocaleString()}
              </div>
              <Image
                src={coin.item.data.sparkline}
                alt="Price graph"
                width={240}
                height={60}
                className="w-full"
              />
            </Link>
          ))}
        </div>
        {canScrollLeft && (
          <button
            onClick={(e) => {
              const carousel =
                e.currentTarget.parentElement?.querySelector('.no-scrollbar');
              if (carousel) scroll('left', carousel as HTMLDivElement);
            }}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <MdKeyboardArrowLeft className="text-2xl" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={(e) => {
              const carousel =
                e.currentTarget.parentElement?.querySelector('.no-scrollbar');
              if (carousel) scroll('right', carousel as HTMLDivElement);
            }}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <MdKeyboardArrowRight className="text-2xl" />
          </button>
        )}
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <CarouselSection title="You May Also Like" />
      <CarouselSection title="Trending Coins" />
    </div>
  );
};

export default YouMayLike;
