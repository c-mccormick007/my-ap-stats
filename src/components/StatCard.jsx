const StatCard = ({ label, children, color = "blue" }) => {

    const colorMap = {
        blue: {
          border: "border-blue-500",
          text: "text-blue-400",
          shadow: "shadow-[0_10px_25px_rgba(0,150,255,0.2)]",
        },
        green: {
          border: "border-green-500",
          text: "text-green-400",
          shadow: "shadow-[0_10px_25px_rgba(0,255,100,0.2)]",
        },
        fuchsia: {
          border: "border-fuchsia-500",
          text: "text-fuchsia-400",
          shadow: "shadow-[0_10px_25px_rgba(240,0,240,0.2)]",
        },
    };

    const {border, text, shadow } = colorMap[color] || colorMap.blue;
  
    return (
      <div
        className={`bg-gradient-to-br from-neutral-800 to-neutral-900 border ${border} rounded-2xl ${shadow} p-6 w-full max-w-md m-10`}
      >
        <div className={`text-4xl font-bold ${text} text-center font-mono tracking-widest h-[4rem] flex items-center justify-center`}>
          <span className="opacity-0 absolute pointer-events-none">999d : 23h : 59m</span>
          <span className="relative z-10">{children}</span>
        </div>
        <p className="mt-3 text-center text-sm text-neutral-400 uppercase tracking-wider">{label}</p>
      </div>
    );
  };
  
  export default StatCard;
  