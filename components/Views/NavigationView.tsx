type NavigationViewProps = {
  children?: React.ReactNode;
};

const NavigationView = ({ children }: NavigationViewProps): JSX.Element => {
  return <div className="flex">{children}</div>;
};

export default NavigationView;
