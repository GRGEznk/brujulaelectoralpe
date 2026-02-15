import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function StatCard({ title, value, icon: Icon, color, trend, trendValue, subtitle }) {
    const getBorderColor = () => {
        switch (color) {
            case "red": return "border-red";
            case "blue": return "border-blue";
            case "green": return "border-green-500";
            case "purple": return "border-purple-500";
            default: return "border-gray-300";
        }
    };

    const getTextColor = () => {
        switch (color) {
            case "red": return "text-red";
            case "blue": return "text-blue";
            case "green": return "text-green-600";
            case "purple": return "text-purple-600";
            default: return "text-gray-600";
        }
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${getBorderColor()} transition-all hover:shadow-lg`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-muted text-sm font-medium uppercase tracking-wider">{title}</h3>
                    <p className={`text-3xl font-bold mt-2 ${getTextColor()}`}>{value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${color}-50 opacity-80`}>
                    {Icon && <Icon className={getTextColor()} size={24} />}
                </div>
            </div>

            {(trend || subtitle) && (
                <div className="mt-4 flex items-center text-sm">
                    {trend === "up" && <ArrowUp className="text-green-500 mr-1" size={16} />}
                    {trend === "down" && <ArrowDown className="text-red-500 mr-1" size={16} />}
                    {trend === "neutral" && <Minus className="text-gray-400 mr-1" size={16} />}

                    {trendValue && (
                        <span className={`font-semibold mr-2 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                            {trendValue}
                        </span>
                    )}

                    <span className="text-muted">{subtitle}</span>
                </div>
            )}
        </div>
    );
}
