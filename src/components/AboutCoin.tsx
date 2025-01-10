export default function AboutCoin({ coinId }: { coinId: string }) {
  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-4 text-2xl font-semibold">About {coinId}</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What is {coinId}?</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        {/* Add more sections */}
      </div>
    </div>
  );
}
