import React from 'react';

interface ButtonLoaderProps {
  /**
   * What color should the loader/spinner be?
   */
  color: string;
}

/**
 * Primary UI component for user interaction
 */
export const ButtonLoader = ({ color }: ButtonLoaderProps) => {
  // To-do: Change to proper loader once designs are finished
  return (
    <div
      role="status"
      className={`flex justify-center align-center birder border-dotted border-2 border-${color}-600 min-h-5`}
    >
      <div className="min-h-2 bg-yellow-600"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
