"use client";

import DashboardContainer from "@/components/containers/dashboard-container";
import NavigateButton from "@/components/navigate-button";

const DashboardPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-0 lg:p-8 ">
      <NavigateButton label="Home" path="/home" />
      <h1 className="text-4xl font-quantico mt-4">Activity Dashboard</h1>
      <DashboardContainer />
    </div>
  );
};

export default DashboardPage;
