import { useState, useEffect } from "react";
import { fetchAndParseChartData } from "../helpers/fetchChartData";
import Loader from "./Loader";


const StatsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAndParseChartData();
        setChartData(data[0].stats);

        const totalSeconds = data.total_seconds_saved || 0;

        const dollarsSaved = Math.round(((totalSeconds / 60) / 60) * 28.37);

      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">📋 Raw Stat Dump</h2>
      <ul className="space-y-2">
        {chartData.map((item, index) => (
          <li key={index} className="bg-neutral-800 rounded p-3 shadow-sm flex justify-between">
            <span className="font-semibold">{item.name}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsChart;
