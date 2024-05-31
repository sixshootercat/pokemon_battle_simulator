"use client";

export const CardSkeleton = () => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-yellow-300 p-4 bg-opacity-50">
      <div className="animate-pulse">
        <div className="h-4 bg-orange-400 rounded w-3/4 bg-opacity-50"></div>
        <div className="h-12 bg-orange-500 rounded mt-2 bg-opacity-50"></div>
        <div className="h-4 bg-orange-500 rounded mt-2 w-5/6 bg-opacity-50"></div>
      </div>
    </div>
  );
};
