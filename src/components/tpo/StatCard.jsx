// src/components/tpo/StatCard.jsx
//
// ASSUMPTION: Card accepts `className` and renders `children` inside a
// rounded/bordered container matching the dark SaaS design system. If your
// Card has a different API (e.g. a `padding` prop), adjust the wrapper below
// — the inner markup will still work unchanged.

import Card from "../common/Card";

/**
 * @param {object} props
 * @param {React.ComponentType} props.icon - lucide-react icon component
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {string} [props.hint] - small helper text under the value
 * @param {"up"|"down"|null} [props.trend]
 * @param {string} [props.trendValue]
 */
export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend = null,
  trendValue,
}) {
  return (
    <Card className="p-5 bg-bg-card border border-border-subtle rounded-2xl hover:border-indigo-500/40 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-muted">{label}</span>
          <span className="text-2xl font-semibold text-text-main tracking-tight">
            {value}
          </span>
          {hint && <span className="text-xs text-text-main0">{hint}</span>}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Icon size={20} strokeWidth={2} />
          </div>
        )}
      </div>

      {trend && trendValue && (
        <div
          className={`mt-3 text-xs font-medium ${
            trend === "up" ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {trend === "up" ? "▲" : "▼"} {trendValue}
        </div>
      )}
    </Card>
  );
}
