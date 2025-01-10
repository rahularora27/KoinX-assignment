'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiMenu3Line } from 'react-icons/ri';
import { RiCloseLine } from 'react-icons/ri';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/KoinX.svg"
              alt="KoinX Logo"
              width={96}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/crypto-taxes"
              className="text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              Crypto Taxes
            </Link>
            <Link
              href="/free-tools"
              className="text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              Free Tools
            </Link>
            <Link
              href="/resource-center"
              className="text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              Resource Center
            </Link>
            <button className="rounded-lg bg-[#0052FE] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <RiCloseLine className="h-6 w-6" />
              ) : (
                <RiMenu3Line className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-16 border-t border-gray-200 bg-white shadow-lg md:hidden">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                href="/crypto-taxes"
                className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Crypto Taxes
              </Link>
              <Link
                href="/free-tools"
                className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Free Tools
              </Link>
              <Link
                href="/resource-center"
                className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Resource Center
              </Link>
              <div className="px-2">
                <button className="w-full rounded-lg bg-[#0052FE] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
