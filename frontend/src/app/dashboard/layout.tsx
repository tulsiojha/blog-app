import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <div>hello</div>
      {children}
    </div>
  );
};

export default DashboardLayout;
