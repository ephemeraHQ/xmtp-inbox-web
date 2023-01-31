import { classNames, shortAddress } from '../helpers';
import { useEnsName } from 'wagmi';

export type address = `0x${string}`;

type AddressProps = {
  address: address;
  className?: string;
};

const Address = ({ address, className }: AddressProps): JSX.Element => {
  const { data: name, isLoading } = useEnsName({ address });

  return (
    <span
      className={classNames(className || '', 'font-mono', isLoading ? 'animate-pulse' : '')}
      title={address}
      data-testid="connected-footer-secondary-text"
    >
      {name || shortAddress(address)}
    </span>
  );
};

export default Address;
