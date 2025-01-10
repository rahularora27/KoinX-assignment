export default function Sentiment() {
  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-4 text-2xl font-semibold">Sentiment</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#44475B]">Key Events</h3>
        {/* Add sentiment cards here */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          <div className="min-w-[456px] rounded-lg bg-blue-50 p-4">
            <div className="flex gap-2">
              <div className="rounded-full bg-blue-100 p-2">
                {/* Add icon */}
              </div>
              <div>
                <h4 className="font-semibold">Lorem ipsum dolor sit amet</h4>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          {/* Add more sentiment cards */}
        </div>
      </div>
    </div>
  );
}
