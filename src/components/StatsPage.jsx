import StatsTable from "./StatsTable";
import StatsChart from "./StatsChart";

const StatsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">📊 AP Stats Dashboard</h1>
      <StatsChart />
      <StatsTable />
    </div>
  );
};

export default StatsPage;
