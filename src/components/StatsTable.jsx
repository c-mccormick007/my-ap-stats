import { useState, useEffect } from "react";

const StatsTable = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch("/src/data/stats.json")
        .then((response) => response.json())
        .then((data) => setStats(data))
        .catch((error) => console.error("Error loading stats:", error))
    })

    return (
        <div className="mt-6">
          <h2 className="text-xl font-bold">📑 AP Statistics</h2>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Category</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

export default StatsTable;
