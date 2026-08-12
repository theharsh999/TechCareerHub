const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-indigo-500 hover:bg-indigo-400 text-white",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100",
    outline:
      "border border-slate-700 hover:border-indigo-500 text-slate-200",
    danger:
      "bg-red-500 hover:bg-red-400 text-white",
  };

  return (
    <button
      className={`px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;