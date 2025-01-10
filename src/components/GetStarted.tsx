export default function GetStarted() {
  return (
    <div className="rounded-lg bg-[#0052FE] p-5 text-center text-white">
      <h2 className="mb-4 text-xl font-bold">Get Started with KoinX</h2>
      <p className="mb-4">
        With our range of features that you can equip for free, KoinX allows you
        to be more educated and aware of your tax reports.
      </p>
      <img
        src="/get-started.png"
        alt="Get Started"
        className="mx-auto mb-4 w-40"
      />
      <button className="rounded-lg bg-white px-6 py-2 font-semibold text-black">
        Get Started for FREE
      </button>
    </div>
  );
}
