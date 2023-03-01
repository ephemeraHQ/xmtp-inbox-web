import { classNames, shortAddress } from "../helpers";
import useWalletAddress from "../hooks/useWalletAddress";

export type address = `0x${string}`;

type AddressProps = {
  address: address;
  className?: string;
  children?: React.ReactNode;
};

const Address = ({
  address,
  className,
  children,
}: AddressProps): JSX.Element => {
  const { ensName, isLoading } = useWalletAddress(address);

  return (
    <span
      className={classNames(
        className || "",
        "font-mono",
        isLoading ? "animate-pulse" : "",
      )}
      title={address}
      data-testid="connected-footer-secondary-text">
      {ensName || shortAddress(address)}
      {children}
    </span>
  );
};

export default Address;
