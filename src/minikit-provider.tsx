import { MiniKit } from "@worldcoin/minikit-js";
import type { ReactNode } from "react";
import { useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    MiniKit.install();
  }, []);

  console.log("Is MiniKit installed correctly? ", MiniKit.isInstalled());

  return <>{children}</>;
}
