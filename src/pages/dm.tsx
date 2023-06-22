import { useEffect } from "react";
import { fetchEnsAddress } from "wagmi/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useXmtpStore } from "../store/xmtp";
import { isEnsAddress, isValidRecipientAddressFormat } from "../helpers";

const DmPage = () => {
  const navigate = useNavigate();
  const { address } = useParams();
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationId = useXmtpStore((state) => state.setConversationId);

  useEffect(() => {
    const routeToInbox = async () => {
      let recipient = address;
      if (recipient && isValidRecipientAddressFormat(recipient)) {
        if (isEnsAddress(recipient)) {
          recipient =
            (await fetchEnsAddress({
              name: recipient,
            })) ?? "";
        }
        if (recipient) {
          setConversationId(recipient);
          setRecipientWalletAddress(recipient);
          navigate("/inbox");
        } else {
          navigate("/");
        }
      } else {
        navigate("/inbox");
      }
    };
    routeToInbox();
  }, []);

  return null;
};

export default DmPage;
