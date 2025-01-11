'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PriceChart from '@/components/Chart/PriceChart';
import TrendingCoins from '@/components/TrendingCoins';
import Performance from '@/components/Performance';
import Sentiment from '@/components/Sentiment';
import AboutCoin from '@/components/AboutCoin';
import Tokenomics from '@/components/Tokenomics';
import Team from '@/components/Team/Team';
import GetStarted from '@/components/GetStarted';
import YouMayLike from '@/components/YouMayLike';

export default function CoinPage() {
  const params = useParams();
  const coinId = params.coinId as string;

  return (
    <div className="min-h-screen bg-[#EFF2F5]">
      <div className="max-w-screen mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-[14px] text-[#0F1629]">
          <Link href="/" className="text-[#5D667B] hover:text-[#0052FE]">
            Cryptocurrencies
          </Link>
          <span className="text-[#5D667B]">{'>>'}</span>
          <span className="capitalize">{coinId}</span>
        </div>

        <div className="flex flex-col gap-5">
          {/* Main Content */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="w-full lg:w-[calc(100%-380px)]">
              <div className="space-y-5">
                <PriceChart coinId={coinId} />
                <Performance coinId={coinId} />
                <Sentiment />
                <AboutCoin coinId={coinId} />
                <Tokenomics />
                <Team />
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden space-y-5 lg:block lg:w-[356px]">
              <GetStarted />
              <TrendingCoins />
            </div>
          </div>

          <div className="-mx-4 bg-white sm:-mx-6 lg:-mx-8">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              <YouMayLike />
            </div>
          </div>

          {/* Sidebar elements for mobile */}
          <div className="space-y-5 lg:hidden">
            <GetStarted />
            <TrendingCoins />
          </div>
        </div>
      </div>
    </div>
  );
}
