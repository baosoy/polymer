import { FunctionComponent, PropsWithChildren } from "react";

const Column: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col flex-1 gap-4">{children}</div>;
};

export default Column;
