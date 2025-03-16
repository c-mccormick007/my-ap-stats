import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Octokit } from "octokit";

const RAW_BASE_URL = "https://raw.githubusercontent.com/c-mccormick007/ap_stats/master/";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"]; 

const octokit = new Octokit({
    auth: import.meta.env.VITE_GIT_API,
});

const StatsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJsonFiles = async () => {
      try {
        const response = await octokit.request("GET /repos/{owner}/{repo}/contents", {
          owner: "c-mccormick007",
          repo: "ap_stats",
          headers: {
            'X-Github-Api-Version': '2022-11-28'
          }
        });

        if (!Array.isArray(response.data)){
            throw new Error("Expected an array but got something else.")
        }

        const jsonFiles = response.data.filter(file => file.name.endsWith(".json"));

        if (jsonFiles.length === 0){
            throw new Error("No JSON files found in the repo.")
        }

        const jsonDataPromises = jsonFiles.map(async (file) => {
            
            const { data: fileContent } = await octokit.request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                  owner: "c-mccormick007",
                  repo: "ap_stats",
                  path: file.path,
                }
              );
              
              const decodedContent = atob(fileContent.content);
              const jsonData = JSON.parse(decodedContent);

              return jsonData
          });  
        
        console.log(jsonDataPromises)
        
        const allJsonData = await Promise.all(jsonDataPromises)

        printAllJsonData(allJsonData)

      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJsonFiles();
  }, []);

  // change this to append an array of stats to store with setChartData
  function printAllJsonData(allJsonData) {
  
    allJsonData.forEach((jsonObject, index) => {
      console.log(`--- JSON Object #${index + 1} ---`);
      for (const [key, value] of Object.entries(jsonObject)) {
        console.log(`${key}: ${value}`);
      }
      console.log('------------------------------');
    });
  }

  if (loading) return <p>Loading chart data...</p>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">📊 AP Stats Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
