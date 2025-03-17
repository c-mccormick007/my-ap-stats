import StatsTable from "./StatsTable";
import '../App.css';
import StatsChart from "./StatsChart";
import Header from "./Header";
import MoneySavedCounter from "./MoneySavedCounter";
import { useState } from "react";
import TimeSavedCounter from "./TimeSavedCounter";
import FutureMoneySavedCounter from "./FutureMoneySavedCounter";
import FutureTimeSavedCounter from "./FutureTimeSavedCounter";
import StatsTimelineGraph from "./StatsTimelineGraph";


const StatsPage = () => {
  const [moneySaved, setMoneySaved] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [days, setDays] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date().toISOString());

  return (
    <div className="custom-scroll h-screen w-screen overflow-y-auto overflow-x-hidden bg-neutral-900">
      <Header />
      <div className="p-5 mb-4 flex flex-wrap justify-between items-center w-full">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="mr-3">📊</span>
          <span>AP Stats Dashboard</span>
        </h1>

        <div className="flex items-center gap-1.5 text-[1.1rem] text-neutral-400 leading-tight">
          <div className="relative flex h-2 w-2 mt-[4px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span>Days Tracked: {days + 13}</span>
        </div>
      </div>
      <div className="flex items-center justify-center w-screen text-neutral-400 text-sm mt-1">
        Last Update: {new Date(lastUpdate).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </div>


      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-4 w-full max-w-6xl mx-auto opacity-0 translate-y-4 animate-fade-in-up">
          <MoneySavedCounter target={moneySaved} duration={3000}/>
          <TimeSavedCounter target={timeSaved} duration={4000}/>
          <FutureMoneySavedCounter target={moneySaved} duration={5000} days={days}/>
          <FutureTimeSavedCounter target={timeSaved} duration={6000} days={days}/>
        </div>
      </div>
      <StatsTimelineGraph setMoneySaved={setMoneySaved} setTimeSaved={setTimeSaved} setDays={setDays} setLastUpdate={setLastUpdate}/>
      <StatsChart setMoneySaved={setMoneySaved} setTimeSaved={setTimeSaved}/>
    </div>
  );
};

export default StatsPage;
