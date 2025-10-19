import { Activity, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

interface MetricsStripProps {
  metrics?: Metric[];
}

const DEFAULT_METRICS: Metric[] = [
  {
    label: "Sessions/sec",
    value: "3.2",
    unit: "sess/s",
    icon: Activity,
    trend: "up",
    trendValue: "+12%",
  },
  {
    label: "Avg Review Time",
    value: "42",
    unit: "sec",
    icon: Clock,
    trend: "down",
    trendValue: "-8%",
  },
  {
    label: "Auto-Complete",
    value: "87",
    unit: "%",
    icon: CheckCircle,
    trend: "up",
    trendValue: "+5%",
  },
  {
    label: "Alerts/Hour",
    value: "2.4",
    unit: "alerts/h",
    icon: AlertTriangle,
    trend: "neutral",
  },
];

export function MetricsStrip({ metrics = DEFAULT_METRICS }: MetricsStripProps) {
  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-danger";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="w-full bg-background border-y border-border">
      <div className="grid grid-cols-4 divide-x divide-border">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="px-6 py-4 hover:bg-ui/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-teal" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{metric.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                    {metric.unit && <span className="text-xs text-muted-foreground">{metric.unit}</span>}
                  </div>
                  {metric.trend && (
                    <div className={`text-xs font-semibold mt-1 ${getTrendColor(metric.trend)}`}>
                      {metric.trendValue || "—"}
                    </div>
                  )}
                </div>
                {/* Mini Sparkline Placeholder */}
                <div className="w-16 h-8 opacity-20">
                  <svg viewBox="0 0 64 32" className="w-full h-full">
                    <polyline
                      points="0,28 8,24 16,20 24,26 32,16 40,22 48,12 56,18 64,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-teal"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
