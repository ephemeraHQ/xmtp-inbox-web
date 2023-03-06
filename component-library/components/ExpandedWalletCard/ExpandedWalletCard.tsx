import React from "react";
import { SettingsIcon } from "../SettingsCard/iconMapping";
import { SettingsCard } from "../SettingsCard/SettingsCard";
import { Tag } from "../Tags/Tag";

interface ExpandedWalletCardProps {
  /**
   * What avatar is associated with this card?
   */
  avatar: React.ReactNode;
  /**
   * What current address is associated with this card?
   */
  currentAddress: string;
  /**
   * What addresses are associated with this card?
   */
  addresses?: Array<string>;
  /**
   * What collectibles are associated with this card?
   */
  collectibles?: Array<React.ReactNode>;
  /**
   * Is this card open?
   */
  isOpen?: boolean;
}

export const ExpandedWalletCard = ({
  avatar,
  currentAddress,
  addresses,
  collectibles,
}: ExpandedWalletCardProps) => {
  return (
    <div className="max-w-xs flex flex-col justify-center items-center p-4 m-4 rounded-lg border border-gray-100">
      {avatar}
      <span className="font-bold py-4">{currentAddress}</span>
      <div className="flex w-full overflow-scroll border-b border-gray-100 pb-4 mb-4">
        {addresses?.map((address) => (
          <Tag key={address} text={address} />
        ))}
      </div>
      <span className="font-bold text-sm text-gray-400 w-full flex justify-start mb-4">
        Collectibles
      </span>

      <div className="flex w-full justify-between overflow-scroll mb-4">
        {collectibles}
      </div>
      <SettingsCard
        header="Mute conversation"
        onToggle={() => {}}
        leftIcon={SettingsIcon.MUTE}
      />
    </div>
  );
};
