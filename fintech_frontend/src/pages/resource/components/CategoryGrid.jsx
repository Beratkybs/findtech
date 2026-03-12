import { categoryConfig } from "../utils/portfolioConstans.js";

const CategoryGrid = ({ onSelect }) => (
  <div className="grid grid-cols-2 gap-4">
    {Object.entries(categoryConfig).map(([key, cfg]) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        className="text-left bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 cursor-pointer transition-all duration-200"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = cfg.bg;
          e.currentTarget.style.borderColor = cfg.border;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "";
          e.currentTarget.style.borderColor = "";
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 border"
          style={{
            background: cfg.bg,
            color: cfg.color,
            borderColor: cfg.border,
          }}
        >
          {cfg.icon}
        </div>
        <p className="text-white font-bold text-lg mb-1">{cfg.label}</p>
        <p className="text-white/40 text-sm">{cfg.description}</p>
      </button>
    ))}
  </div>
);

export default CategoryGrid;
