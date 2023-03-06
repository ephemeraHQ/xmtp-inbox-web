import { Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon, CogIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { IconButton } from "../IconButton/IconButton";

interface HeaderDropdownProps {
  /**
   * What header text shows for this dropdown?
   */
  header: string;
  /**
   * Is the dropdown open?
   */
  isOpen: boolean;
  /**
   * What options does the user have to change?
   */
  dropdownOptions: Array<string>;
  /**
   * What is currently selected?
   */
  defaultSelected?: string;
  /**
   * What happens on change?
   */
  onChange?: Function;
}

export const HeaderDropdown = ({
  isOpen = false,
  dropdownOptions = ["All messages", "Message requests"],
  defaultSelected = "All messages",
  onChange,
}: HeaderDropdownProps) => {
  const [currentlySelected, setCurrentlySelected] = useState(defaultSelected);
  return (
    <div
      data-modal-target="headerModalId"
      className="p-4 w-full border border-r border-gray-100">
      <div className="flex justify-between items-center">
        <span className="flex">
          <h1 className="font-bold text-lg mr-2">{currentlySelected}</h1>
          <ChevronDownIcon width="24" />
        </span>
        <IconButton label={<PlusIcon color="white" width="16" />} />
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10"
          onClose={() => {}}>
          <div className="bg-white w-fit rounded-lg absolute top-10 left-4">
            <div
              id="headerModalId"
              className="p-4 border border-gray-100 rounded-lg max-w-fit mt-4">
              {dropdownOptions.map((item) => {
                return (
                  <div key={item} className="flex w-full justify-between">
                    <div className="flex">
                      <CogIcon width={24} className="text-gray-300 mr-4" />
                      <button
                        type="button"
                        onClick={() => {
                          onChange?.();
                          //   setCurrentlySelected();
                        }}
                        className={`cursor-pointer my-1 ${
                          item === currentlySelected ? "font-bold my-1" : ""
                        }`}>
                        {item}
                      </button>
                    </div>
                    <div className="flex items-center">
                      {item === currentlySelected && (
                        <CheckCircleIcon
                          fill="limegreen"
                          width="24"
                          className="ml-4"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
