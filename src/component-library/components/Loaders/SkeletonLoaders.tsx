export const ShortCopySkeletonLoader = ({ lines = 1 }) => (
  <div role="status" className="animate-pulse max-w-lg">
    {lines === 1 ? (
      <div className="h-4 m-1 bg-gray-200 rounded-full w-48" />
    ) : (
      <div className="m-2">
        <div className="h-3 bg-gray-200 rounded-full w-32 mb-2" />
        <div className="h-2.5 bg-gray-200 rounded-full w-48" />
      </div>
    )}
  </div>
);

export const IconLoader = () => (
  <div role="status" className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded-full w-8" />
  </div>
);

export const MessageLoader = ({ incoming = true }) => (
  <div role="status" className="animate-pulse max-w-full p-4">
    {incoming ? (
      <div className="m-2">
        <div className="h-3 bg-gray-200 rounded-full w-32 mb-2" />
        <div className="h-3 bg-gray-200 rounded-full w-80 mb-2" />
        <div className="h-3 bg-gray-200 rounded-full w-40 mb-2" />
        <div className="h-2.5 bg-gray-200 rounded-full w-16" />
      </div>
    ) : (
      <div className="m-2 mr-0 flex flex-col items-end">
        <div className="h-3 bg-gray-200 rounded-full w-32 mb-2" />
        <div className="h-3 bg-gray-200 rounded-full w-80 mb-2" />
        <div className="h-3 bg-gray-200 rounded-full w-40 mb-2" />
        <div className="h-2.5 bg-gray-200 rounded-full w-16" />
      </div>
    )}
  </div>
);
