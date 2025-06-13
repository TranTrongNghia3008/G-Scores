const Card = ({ title, icon, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 ${className}`}
    >
      <div className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        {icon && <div>{icon}</div>}
        {title && <h3>{title}</h3>}
        
      </div>
      <div className="text-gray-700 text-sm">{children}</div>
    </div>
  );
};

export default Card;
