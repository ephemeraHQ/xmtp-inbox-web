import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
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
   * Is the modal open?
   */
  isOpen: boolean;
}

export const ExpandedWalletCard = ({
  avatar,
  currentAddress,
  addresses,
  collectibles,
  isOpen,
}: ExpandedWalletCardProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-y-auto fixed inset-0 z-10"
        onClose={() => {}}>
        <div className="bg-white w-fit rounded-lg absolute top-10 right-4">
          <div className="max-w-xs flex flex-col justify-center items-center p-4 rounded-lg border border-gray-100">
            {avatar}
            <span className="font-bold py-4">{currentAddress}</span>
            <div className="flex w-full overflow-auto border-b border-gray-100 pb-4 mb-4">
              {addresses?.map((address) => (
                <Tag key={address} text={address} />
              ))}
            </div>
            <hr />
            <span className="font-bold text-sm text-gray-400 w-full flex justify-start mb-4">
              Collectibles
            </span>

            <div className="flex w-full justify-between overflow-auto mb-4">
              {collectibles}
            </div>
            <SettingsCard
              header="Mute conversation"
              onToggle={() => {}}
              leftIcon={SettingsIcon.MUTE}
            />
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
