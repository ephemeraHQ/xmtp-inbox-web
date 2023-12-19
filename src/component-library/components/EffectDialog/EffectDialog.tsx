import type { EffectType } from "@xmtp/experimental-content-type-screen-effect";

export const EffectDialog = ({
  handleSendEffect,
}: {
  handleSendEffect: (effect: EffectType) => void;
}) => (
  <dialog
    open
    style={{
      width: 200,
      height: 150,
      border: "1px dotted indigo",
      borderRadius: "16px",
      position: "absolute",
      bottom: "200px",
      marginLeft: "80%",
      display: "flex",
      alignSelf: "flex-end",
    }}>
    <div className="w-full flex flex-col justify-around items-center text-md">
      <b>Send with effect:</b>
      <button type="button" onClick={() => handleSendEffect("SNOW")}>
        **Let it Snow**
      </button>
      <button type="button" onClick={() => handleSendEffect("RAIN")}>
        Make it Rain XMTP!
      </button>
    </div>
  </dialog>
);
