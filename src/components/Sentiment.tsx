'use client';

import { useState, useRef } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsNewspaper } from 'react-icons/bs';
import { BiTrendingUp } from 'react-icons/bi';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

const keyEvents = [
  {
    icon: <BsNewspaper className="text-xl text-white" />,
    bgColor: 'bg-[#0082FF]',
    cardBg: 'bg-[#E8F4FD]',
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.',
  },
  {
    icon: <BiTrendingUp className="text-xl text-white" />,
    bgColor: 'bg-[#0FBA83]',
    cardBg: 'bg-[#EBF9F4]',
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra in a adipisinc metus quis del',
  },
  {
    icon: <BsNewspaper className="text-xl text-white" />,
    bgColor: 'bg-[#0082FF]',
    cardBg: 'bg-[#E8F4FD]',
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.',
  },
];

const estimates = [
  { label: 'Buy', percentage: 76, color: 'bg-[#00B386]' },
  { label: 'Hold', percentage: 8, color: 'bg-[#C7C8CE]' },
  { label: 'Sell', percentage: 16, color: 'bg-[#F7324C]' },
];

export default function Sentiment() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-6 text-2xl font-semibold">Sentiment</h2>

      {/* Key Events */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-[#44475B]">Key Events</h3>
          <AiOutlineInfoCircle className="text-[#7C7E8C]" />
        </div>

        {/* Events Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth"
          >
            {keyEvents.map((event, index) => (
              <div
                key={index}
                className={`${event.cardBg} min-w-[456px] max-w-[456px] flex-shrink-0 rounded-lg p-4`}
              >
                <div className="flex gap-4">
                  <div className={`${event.bgColor} h-fit rounded-full p-2`}>
                    {event.icon}
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-[#0F1629]">
                      {event.title}
                    </h4>
                    <p className="text-sm text-[#3E424A]">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
            >
              <MdKeyboardArrowLeft className="text-2xl" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Analyst Estimates */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-[#44475B]">
            Analyst Estimates
          </h3>
          <AiOutlineInfoCircle className="text-[#7C7E8C]" />
        </div>

        <div className="flex items-center gap-8">
          {/* Percentage Circle */}
          <div className="flex h-[116px] w-[116px] items-center justify-center rounded-full bg-[#EBF9F4]">
            <span className="text-4xl font-semibold text-[#0FBA83]">76%</span>
          </div>

          {/* Bars */}
          <div className="flex-1 space-y-4">
            {estimates.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-8 text-sm text-[#7C7E8C]">{item.label}</span>
                <div className="h-2 flex-1 rounded-sm">
                  <div
                    className={`h-full ${item.color} rounded-sm`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-[#7C7E8C]">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
