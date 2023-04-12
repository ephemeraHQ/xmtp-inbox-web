import ReactGA from "react-ga4";
import { fetchEnsName } from "@wagmi/core";
import { address } from "../pages/inbox";
import { isAppEnvAlpha } from "./env";

/* The functions below are called only when
specific XMTP Labs team wallets use
the internal domain alpha.xmtp.chat. This
tracking is temporary and meant to help
surface insights about team usage to
help build a better app. */

// List of XMTP Labs team wallets
export const XMTP_TEAM_WALLETS = [
  "0x5aC09Ca0865B5492a82460acb43ce658Ea6163D2",
  "0x5e90705bd6e522B47E41397b1afEED5D615FA00e",
  "0x51E3077B88630DF01A2A53D57D6626E44065ac71",
  "0x70D8c48069366aa876c8FBEa70dA7e303D8a6296",
  "0x4a5ade11f01451843a0545347BFdD100657Ce687",
  "0xF8cd371Ae43e1A6a9bafBB4FD48707607D24aE43",
  "0x4D964F42A00EBCd27679071e5908D41632f85301",
  "0x83c653Ca3ff9C4cd65de8e4E9dF5DA23354c6505",
  "0xf220F05B4830095be149085041735F197ee3D5Aa",
  "0xd09EE7c8986949179a2ff1ABBDd7D3bBea0786DB",
  "0xa64af7F78DE39A238Ecd4ffF7D6D410DBACe2dF0",
  "0x6A03c07F9cB413ce77f398B00C2053BD794Eca1a",
  "0x4b70d04124c2996De29e0caa050A49822Faec6Cc",
  "0x33FA52E6a9DBFca57ed277491DBD8Ba5A0B248f4",
  "0x62EEd858af7590fbCaE803d208c53ddBb0D1309c",
  "0xf0EA7663233F99D0c12370671abBb6Cca980a490",
];

export const emitPageVisitEvent = async (address: address) => {
  if (XMTP_TEAM_WALLETS.includes(address) && isAppEnvAlpha()) {
    ReactGA.initialize("G-ME1W9N9QJ5");
    const ensName = await fetchEnsName({
      address,
    });
    ReactGA.send({
      hitType: "pageview",
      page: "/inbox",
      title: ensName ?? address,
    });
  }
};

export const emitMsgSentEvent = async (
  senderAddress: address,
  recieverAddress: address,
) => {
  if (XMTP_TEAM_WALLETS.includes(senderAddress) && isAppEnvAlpha()) {
    const ensNameSender = await fetchEnsName({
      address: senderAddress,
    });
    const ensNameReciever = await fetchEnsName({
      address: recieverAddress,
    });
    ReactGA.event({
      category: "Msg sent event",
      action: `${ensNameSender ?? senderAddress}-${
        ensNameReciever ?? recieverAddress
      }`,
    });
  }
};
