
export const Card = ({ title, value, variant = "orange", icon: Icon }) => {
  
  
  const themeClasses = {
    orange: {
      border: "border-orange-100 hover:border-orange-300",
      bg: "bg-orange-50/50",
      text: "text-orange-600",
    },
    green: {
      border: "border-green-100 hover:border-green-300",
      bg: "bg-green-50/50",
      text: "text-green-600",
    },
    blue: {
      border: "border-blue-100 hover:border-blue-300",
      bg: "bg-blue-50/50",
      text: "text-blue-600",
    },
    gray: {
      border: "border-gray-100 hover:border-gray-300",
      bg: "bg-gray-50/50",
      text: "text-gray-800",
    },
  };


  const currentTheme = themeClasses[variant] || themeClasses.orange;

  return (
    <div className={`bg-white border ${currentTheme.border} p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex justify-between items-start overflow-hidden relative`}>
      
      <div className="flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider truncate">
          {title}
        </h3>
        
        {/* Value */}
        <p className={`text-3xl font-extrabold mt-3 tracking-tight ${currentTheme.text}`}>
          {value}
        </p>
      </div>

      
      {Icon && (
        <div className={`p-3 rounded-xl ${currentTheme.bg} ${currentTheme.text} transition duration-300`}>
          <Icon size={22} />
        </div>
      )}

    </div>
  );
};