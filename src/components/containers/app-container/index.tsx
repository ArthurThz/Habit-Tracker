import { ReactNode } from "react";

const AppContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-full min-h-screen pt-28 lg:pt-40">{children}</div>;
};

export default AppContainer;
