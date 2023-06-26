export const ShortCopySkeletonLoader = ({ lines = 1 }) => (
  <div role="status" className="animate-pulse max-w-lg">
    {lines === 1 ? (
      <div className="h-4 my-2 bg-gray-200 rounded-full w-48" />
    ) : (
      <div className="my-2">
        <div className="h-3 bg-gray-200 rounded-full w-32 mb-2" />
        <div className="h-2.5 bg-gray-200 rounded-full w-48" />
      </div>
    )}
  </div>
);
