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
        className={`bg-gradient-to-br from-neutral-800 to-neutral-900 ${border} ${shadow} rounded-2xl p-6 m-3 flex flex-col items-center justify-center h-[140px] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-300`}
      >
        <div className={`text-[1.75rem] md:text-2xl font-bold ${text} font-mono tracking-tight flex items-center justify-center whitespace-nowrap [font-variant-numeric:tabular-nums]`}>
          <span className="relative z-10">{children}</span>
        </div>
        <p className="mt-3 text-center text-xs md:text-[0.6rem] lg:text-[0.5rem] text-neutral-400 uppercase tracking-wide whitespace-nowrap">{label}</p>
      </div>
    );
  };
  
  export default StatCard;
  