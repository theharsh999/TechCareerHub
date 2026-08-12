const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/70 p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;