import React from 'react';
import { classNames } from '../helpers';

type AddressInputProps = {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  onInputChange?: (e: React.SyntheticEvent) => void;
  userIsSender: boolean;
  value: string;
  isValid: boolean;
};

const AddressInput = ({
  id,
  className,
  placeholder,
  onInputChange,
  userIsSender,
  value,
  isValid
}: AddressInputProps): JSX.Element => {
  return (
    <input
      id={id}
      name="recipient"
      className={classNames(
        className || '',
        'absolute top-0 left-0',
        userIsSender ? '!text-b-600' : '',
        isValid ? '!text-md font-bold top-[2px] left-1' : ''
      )}
      placeholder={placeholder}
      onChange={onInputChange}
      value={value}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      data-testid="message-to-input"
    />
  );
};

export default AddressInput;
