import { useState, useEffect } from "react";
import { fetchAndParseChartData } from "../helpers/fetchChartData";

const StatsChart = ({ setMoneySaved, setTimeSaved }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAndParseChartData();
        setChartData(data);

        const totalSeconds = data.total_seconds_saved || 0;

        const dollarsSaved = Math.round(((totalSeconds / 60) / 60) * 27.40);

        setMoneySaved(dollarsSaved);
        setTimeSaved(totalSeconds); 
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setMoneySaved, setTimeSaved]);

  if (loading) return <p>Loading chart data...</p>;

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
