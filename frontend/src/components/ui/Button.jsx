const Button = ({ children, onClick, className = "", type = "button", variant = "primary" }) => {
  const base = "rounded-lg px-4 py-2 text-sm font-medium focus:outline-none transition-all";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant] || ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
