type ConversationViewProps = {
  children?: React.ReactNode;
};

const ConversationView = ({ children }: ConversationViewProps): JSX.Element => {
  return (
    <div className="bg-white flex flex-col flex-1 h-screen">{children}</div>
  );
};

export default ConversationView;
