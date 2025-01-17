'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Cryptocurrency Tracker</h1>
      <div className="flex flex-col gap-2">
        <Link
          href="/bitcoin"
          suppressHydrationWarning={true}
          className="text-[#0052FE] hover:underline"
        >
          Bitcoin
        </Link>
        <Link
          href="/ethereum"
          suppressHydrationWarning={true}
          className="text-[#0052FE] hover:underline"
        >
          Ethereum
        </Link>
      </div>
    </div>
  );
}
