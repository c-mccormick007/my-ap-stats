import StatsTable from "./StatsTable";
import StatsChart from "./StatsChart";
import Header from "./Header";

const StatsPage = () => {
  return (
    <div className="flex min-h-screen flex-col min-w-screen bg-neutral-900">
      <Header />
      <div className="flex min-w-screen flex-row items-left p-4">
        <h1 className="p-5 text-3xl font-bold text-left mb-4 flex items-center">
          <span className="mr-3">📊</span>
          <span>AP Stats Dashboard</span>
        </h1>
      </div>
    </div>
  );
};

export default StatsPage;
