import { useEffect, useState } from "react";
import { fetchAndParseChartData } from "../helpers/fetchChartData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Loader from "./Loader";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-lg shadow-lg text-sm">
        <p className="text-white font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatsTimelineGraph = ({ setMoneySaved, setTimeSaved, setDays, setLastUpdate }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

function getBusinessDays(startDate, endDate) {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

useEffect(() => {
    const loadData = async () => {
        const timeline = await fetchAndParseChartData();

        const latest = timeline[0];
        const totalSeconds = latest.stats.reduce((sum, stat) => sum + stat.seconds_saved, 0);
        const dollarsSaved = Math.round((totalSeconds / 3600) * 28.37);

        const start = new Date(timeline[timeline.length - 1].date);
        const end = new Date(latest.date);

        const businessDays = getBusinessDays(start, end);

        console.log("Business days:", businessDays);  

        setDays(businessDays);
        setLastUpdate(new Date(latest.date).toISOString());

        setMoneySaved(dollarsSaved);
        setTimeSaved(totalSeconds); 

        
        const manualEntryDate = new Date("2025-02-06T12:00:01Z");
        const alreadyExists = timeline.some(entry => new Date(entry.date).toDateString() === manualEntryDate.toDateString());

      if (!alreadyExists) {
        timeline.push({
          date: manualEntryDate.toISOString(),
          stats: [
            { name: "timeSaved", seconds_saved: 0 },
            { name: "moneySaved", seconds_saved: 0 }
          ]
        });

       timeline.sort((a, b) => new Date(b.date) - new Date(a.date));
      }


        const chartData = timeline.map((entry) => {
        const totalSeconds = entry.stats.reduce((sum, stat) => sum + stat.seconds_saved, 0);
        const dollars = Math.round((totalSeconds / 3600) * 27.4);

            return {
                date: new Date(entry.date).toLocaleDateString(),
                timeSaved: totalSeconds / 3600,
                moneySaved: dollars,
            };
        }).reverse();

        setData(chartData);
        setLoading(false);
    };

    loadData();
    }, [setMoneySaved, setTimeSaved, setDays, setLastUpdate]);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" tick={{dy:10}}/>
          <YAxis yAxisId="left" stroke="#3b82f6" />
          <YAxis yAxisId="right" orientation="right" stroke="#00ff9f" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="timeSaved" stroke="#3b82f6" dot={false} strokeWidth={2} name="Time Saved (hrs)" />
          <Line yAxisId="right" type="monotone" dataKey="moneySaved" stroke="#00ff9f" dot={false} strokeWidth={2} name="Money Saved ($)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsTimelineGraph;
