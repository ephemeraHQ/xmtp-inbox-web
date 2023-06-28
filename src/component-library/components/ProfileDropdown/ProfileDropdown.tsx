import type React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SettingsCard } from "../SettingsCard/SettingsCard";
import { SettingsIcon } from "../SettingsCard/iconMapping";

interface ProfileDropdownProps {
  /**
   * What address cards are associated with this profile?
   */
  addressCards: Array<React.ReactNode>;
  /**
   * Is the profile toggle open or closed?
   */
  isOpen: boolean;
}

export const ProfileDropdown = ({
  addressCards = [],
  isOpen = false,
}: ProfileDropdownProps) => (
  <Transition.Root show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="overflow-y-auto fixed inset-0 z-10"
      onClose={() => {}}>
      <div className="bg-white w-fit rounded-lg absolute top-12 left-4">
        <div className="rounded-xl border border-gray-100 max-w-sm">
          <div className="p-4">
            <div className="mb-4">
              {addressCards}
              <SettingsCard
                variant="secondary"
                header="Connect existing wallet"
                leftIcon={SettingsIcon.CONNECT_WALLET}
              />
              <SettingsCard
                variant="secondary"
                header="Create new wallet"
                leftIcon={SettingsIcon.CREATE_WALLET}
              />
            </div>
            <div className="mb-4">
              <SettingsCard
                header="User settings"
                leftIcon={SettingsIcon.SETTINGS}
              />
              <SettingsCard
                header="Get QR Code"
                leftIcon={SettingsIcon.QR_CODE}
              />
            </div>
            <SettingsCard
              header="Disconnect wallet"
              leftIcon={SettingsIcon.DISCONNECT}
            />
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
