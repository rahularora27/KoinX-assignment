import Image from 'next/image';

export default function GetStarted() {
  return (
    <div className="rounded-lg bg-[#0052FE] p-10 text-center text-white">
      <img
        src="/Frame.svg"
        alt="Get Started"
        className="mx-auto mb-4 w-40 lg:hidden"
      />
      <h2 className="mb-4 text-xl font-bold">Get Started with KoinX</h2>
      <p className="mb-4">
        With our range of features that you can equip for free, KoinX allows you
        to be more educated and aware of your tax reports.
      </p>
      <Image
        src="/Frame.svg"
        alt="Get Started"
        className="mx-auto mb-4 hidden w-40 lg:block"
        width={40}
        height={40}
      />
      <button className="rounded-lg bg-white px-6 py-2 font-semibold text-black">
        Get Started for FREE
      </button>
    </div>
  );
}
