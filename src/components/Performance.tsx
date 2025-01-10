export default function Performance({ coinId }: { coinId: string }) {
  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-4 text-2xl font-semibold">Performance</h2>
      {/* Add performance metrics here */}
      <div className="space-y-6">
        {/* Today's Low/High */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span>Today's Low</span>
            <span>Today's High</span>
          </div>
          <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
        </div>

        {/* 52W Low/High */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span>52W Low</span>
            <span>52W High</span>
          </div>
          <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
        </div>
      </div>
    </div>
  );
}
