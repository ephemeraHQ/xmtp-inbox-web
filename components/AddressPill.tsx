import React from "react";
import { classNames } from "../helpers";
import Address, { address } from "./Address";

type addressPillProps = {
  address: address;
  userIsSender: boolean;
};

const AddressPill = ({
  address,
  userIsSender,
}: addressPillProps): JSX.Element => {
  return (
    <Address
      className={classNames(
        "px-2",
        "font-bold",
        userIsSender ? "text-indigo-600" : "text-black",
      )}
      address={address}>
      {userIsSender && " (you)"}
    </Address>
  );
};

export default AddressPill;
