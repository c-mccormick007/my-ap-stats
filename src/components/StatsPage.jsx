import StatsTable from "./StatsTable";
import StatsChart from "./StatsChart";
import Header from "./Header";
import MoneySavedCounter from "./MoneySavedCounter";
import { useState } from "react";

const StatsPage = () => {
  const [moneySaved, setMoneySaved] = useState(0);


  return (
    <div className="flex min-h-screen flex-col min-w-screen bg-neutral-900">
      <Header />
      <div className="flex min-w-screen flex-row items-left p-4">
        <h1 className="p-5 text-3xl font-bold text-left mb-4 flex items-center">
          <span className="mr-3">📊</span>
          <span>AP Stats Dashboard</span>
        </h1>
      </div>

      <MoneySavedCounter target={moneySaved} duration={7000}/>

      <StatsChart setMoneySaved={setMoneySaved}/>

    </div>
  );
};

export default StatsPage;
