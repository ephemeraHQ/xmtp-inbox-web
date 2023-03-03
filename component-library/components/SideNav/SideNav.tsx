import { classNames } from "../../../helpers";

interface SideNav {
  /**
   * Is Side Nav Open?
   */
  isOpen: boolean;
  /**
   * Contents inside side nav
   */
  children: React.ReactNode;
}

const SideNav = ({ isOpen, children }: SideNav) => {
  return (
    <div
      className={classNames(
        "h-[100vh] bg-gray-50",
        isOpen ? "w-[20vw]" : "w-[5vw]",
      )}>
      {children}
    </div>
  );
};

export default SideNav;
