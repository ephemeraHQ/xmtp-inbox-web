import { classNames, shortAddress } from "../helpers";
import { useEnsName } from "wagmi";
import useValidWalletAddress from "../hooks/useWalletAddress";
import useWalletAddress from "../hooks/useWalletAddress";

export type address = `0x${string}`;

type AddressProps = {
  address: address;
  className?: string;
};

const Address = ({ address, className }: AddressProps): JSX.Element => {
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
    </span>
  );
};

export default Address;
