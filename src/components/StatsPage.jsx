import StatsTable from "./StatsTable";
import '../App.css';
import StatsChart from "./StatsChart";
import Header from "./Header";
import MoneySavedCounter from "./MoneySavedCounter";
import { useState } from "react";
import TimeSavedCounter from "./TimeSavedCounter";
import FutureMoneySavedCounter from "./FutureMoneySavedCounter";
import FutureTimeSavedCounter from "./FutureTimeSavedCounter";


const StatsPage = () => {
  const [moneySaved, setMoneySaved] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);

  return (
    <div className="custom-scroll h-screen w-screen overflow-y-auto overflow-x-hidden bg-neutral-900">
      <Header />
      <div className="flex w-full flex-row items-left p-4">
        <h1 className="p-5 text-3xl font-bold text-left mb-4 flex items-center">
          <span className="mr-3">📊</span>
          <span>AP Stats Dashboard</span>
        </h1>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 w-full max-w-6xl mx-auto">
          <MoneySavedCounter target={moneySaved} duration={10000}/>
          <TimeSavedCounter target={timeSaved} duration={10000}/>
          <FutureMoneySavedCounter target={moneySaved} duration={10000}/>
          <FutureTimeSavedCounter target={timeSaved} duration={10000}/>
        </div>
      </div>
      <StatsChart setMoneySaved={setMoneySaved} setTimeSaved={setTimeSaved}/>
    </div>
  );
};

export default StatsPage;
