// To-do: pull from package once exported
enum EffectType {
  SNOW = "SNOW",
  RAIN = "RAIN",
}

export const EffectDialog = ({
  handleSendEffect,
}: {
  handleSendEffect: (effect: string) => void;
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
      <button type="button" onClick={() => handleSendEffect(EffectType.SNOW)}>
        **Let it Snow**
      </button>
      <button type="button" onClick={() => handleSendEffect(EffectType.RAIN)}>
        Make it Rain XMTP!
      </button>
    </div>
  </dialog>
);
