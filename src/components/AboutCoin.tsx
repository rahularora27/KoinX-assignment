'use client';

import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';

interface AboutProps {
  coinId: string;
}

export default function About({ coinId }: AboutProps) {
  const capitalizedCoinId = coinId.charAt(0).toUpperCase() + coinId.slice(1);

  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-6 text-2xl font-semibold">About {capitalizedCoinId}</h2>

      <div className="mb-4 space-y-4 border-b pb-4">
        <h3 className="text-xl font-semibold">What is {capitalizedCoinId}?</h3>
        <div className="leading-7 text-[#3E424A]">
          <p>
            Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
            lobortis tristique pharetra. Diam id et lectus urna et tellus
            aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut
            sed. Quam scelerisque fermentum sapien morbi sodales odio sed
            rhoncus.
          </p>
        </div>
      </div>

      <div className="mb-4 border-b border-[#DEE1E6] pb-4">
        <h3 className="mb-4 text-xl font-semibold">
          Lorem ipsum dolor sit amet
        </h3>
        <div className="space-y-4 leading-7 text-[#3E424A]">
          <p>
            Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
            lobortis tristique pharetra. Diam id et lectus urna et tellus
            aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut
            sed. Quam scelerisque fermentum sapien morbi sodales odio sed
            rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed.
            Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.
          </p>
          <p>
            Diam praesent massa dapibus magna aliquam a dictumst volutpat.
            Egestas vitae pellentesque auctor amet. Nunc sagittis libero
            adipiscing cursus felis pellentesque interdum. Odio cursus phasellus
            velit in senectus enim dui. Turpis tristique placerat interdum sed
            volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris
            faucibus diam mi nunc praesent massa turpis a. Integer dignissim
            augue viverra nulla et quis lobortis phasellus. Integer pellentesque
            enim convallis ultricies at.
          </p>
          <p>
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
            massa vel convallis duis ac. Mi adipiscing semper scelerisque
            porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia
            congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in
            eget. Ullamcorper dui
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Already Holding Crypto?</h3>

        <div className="mb-4 grid grid-cols-1 gap-4 border-b border-[#DEE1E6] pb-4 md:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-br from-[#79F1A4] to-[#0E5CAD] p-4 text-white">
            <div className="flex items-center space-x-6">
              <Image
                src="/profit-calc.svg"
                alt="Tax Calculator"
                width={120}
                height={120}
                className="rounded-lg"
              />
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Calculate your Profits</h4>
                <button className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 font-semibold text-black">
                  Check Now <HiArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-[#FF9865] to-[#EF3031] p-4 text-white">
            <div className="flex items-center space-x-6">
              <Image
                src="/tax-calc.svg"
                alt="Tax Calculator"
                width={120}
                height={120}
                className="rounded-lg"
              />
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">
                  Calculate your tax liability
                </h4>
                <button className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 font-semibold text-black">
                  Check Now <HiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="leading-7 text-[#3E424A]">
          Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
          massa vel convallis duis ac. Mi adipiscing semper scelerisque
          porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia
          congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in
          eget. Ullamcorper dui
        </p>
      </div>
    </div>
  );
}
