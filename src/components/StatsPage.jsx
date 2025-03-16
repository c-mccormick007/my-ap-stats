import StatsTable from "./StatsTable";
import StatsChart from "./StatsChart";
import Header from "./Header";
import MoneySavedCounter from "./MoneySavedCounter";
import { useState } from "react";
import TimeSavedCounter from "./TimeSavedCounter";
import FutureMoneySavedCounter from "./FutureMoneySavedCounter";

const StatsPage = () => {
  const [moneySaved, setMoneySaved] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);


  return (
    <div className="flex min-h-screen flex-col min-w-screen bg-neutral-900">
      <Header />
      <div className="flex min-w-screen flex-row items-left p-4">
        <h1 className="p-5 text-3xl font-bold text-left mb-4 flex items-center">
          <span className="mr-3">📊</span>
          <span>AP Stats Dashboard</span>
        </h1>
      </div>
      <div className="flex flex-row justify-evenly p-4">
        <MoneySavedCounter target={moneySaved} duration={5000}/>
        <TimeSavedCounter target={timeSaved} duration={5000}/>
        <FutureMoneySavedCounter target={moneySaved} duration={5000}/>
      </div>

      <StatsChart setMoneySaved={setMoneySaved} setTimeSaved={setTimeSaved}/>

    </div>
  );
};

export default StatsPage;
