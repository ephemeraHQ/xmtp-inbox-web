import ReactGA from "react-ga4";
import { fetchEnsName } from "@wagmi/core";
import { address } from "../pages/inbox";
import { getGoogleTagId, isAppEnvAlpha } from "./env";

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
  "0x841B4B11C51bE2E9A33746B9afE0bA83d188Da93",
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
  "0xdb1a0153fEa52Ace553486667C3838112082c792",
  "0xa61cCb568f38dE40FD0d00944922d05eb791A5DB",
  "0x37f3de8118EA5F5263B954283E24F90ed9116A45",
  "0x6e78a3f4D522c810dc272aBe945b1B9FbD624c4F",
  "0x89080D9E9d19c8616d4aCD211dD39347B17F4067",
  "0x1F935A71f5539fa0eEaa71136Aef39Ab7c64520f",
  "0x9BD70E50aB475d590dc0D829bDE38B7E107735fd",
  "0xcd97717BAC35057FF99Bd81193f2a244c0CbA1eA",
  "0x009d5F0A4C42f5FAccb05aDc8a426042BBFB000f",
  "0x66942eC8b0A6d0cff51AEA9C7fd00494556E705F",
  "0xB1B9FbB174377BD64De7ACE1508eEd43e23f9301",
  "0x2b0D29fFA81fa6Bf35D31db7C3bc11a5913B45ef",
  "0xE2C80299E86BE75E419FC348637757686680bA00",
];

export const emitMsgSentEvent = async (
  senderAddress: address,
  recieverAddress: address,
) => {
  if (
    XMTP_TEAM_WALLETS.includes(senderAddress) &&
    XMTP_TEAM_WALLETS.includes(recieverAddress) &&
    isAppEnvAlpha()
  ) {
    try {
      ReactGA.initialize(getGoogleTagId());
      const ensNameSender = await fetchEnsName({
        address: senderAddress,
      });
      ReactGA.event({
        category: "User",
        action: `${ensNameSender ?? senderAddress}`,
        label: "Message sent",
      });
    } catch (e) {
      console.error(e);
    }
  }
};
