import React from 'react';
import { classNames } from '../../../helpers';
import loaderStyles from '../../../styles/Loader.module.css';

interface ButtonLoaderProps {
  /**
   * What color should the loader/spinner be?
   */
  color: string;
  /**
   * How large is this button?
   */
  size?: 'small' | 'large';
}

/**
 * Primary UI component for user interaction
 */
export const ButtonLoader = ({ size, color }: ButtonLoaderProps) => {
  // To-do: Change to proper loader once designs are finished
  return (
    <div className="flex flex-row">
      <div
        className={classNames(
          'rounded-full',
          color === 'primary' ? `border-gray-300` : 'border-gray-500',
          loaderStyles.btnLoader,
          size === 'small' ? loaderStyles.btnLoaderSm : loaderStyles.btnLoaderLg,
          loaderStyles.animateSpin
        )}
      />
    </div>
  );
};
