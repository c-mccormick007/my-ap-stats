const StatCard = ({ label, children, color = "blue" }) => {
    const border = `border-${color}-500`;
    const text = `text-${color}-400`;
    const shadow = `shadow-[0_10px_25px_rgba(255,255,255,0.2)]`;
  
    return (
      <div
        className={`bg-gradient-to-br from-neutral-800 to-neutral-900 border ${border} rounded-2xl ${shadow} p-6 w-full max-w-md mx-auto`}
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
  