import { CheckCircle2, AlertTriangle, Info, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export interface FieldData {
  name: string;
  label: string;
  value: string;
  confidence: number; // 0-1
  sources: string[];
  explanation: string;
  flagged?: boolean;
}

interface ReviewPanelProps {
  sessionId: string;
  customerName: string;
  riskScore: number; // 0-1
  riskTier: "LOW" | "MEDIUM" | "HIGH";
  fields: FieldData[];
  onApprove?: () => void;
  onReject?: () => void;
  onFieldEdit?: (fieldName: string) => void;
}

export function ReviewPanel({
  sessionId,
  customerName,
  riskScore,
  riskTier,
  fields,
  onApprove,
  onReject,
  onFieldEdit,
}: ReviewPanelProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence < 0.5) return "from-danger via-danger to-danger";
    if (confidence < 0.75) return "from-danger via-lemon to-teal";
    return "from-teal via-teal to-teal";
  };

  const getRiskColor = (tier: string) => {
    switch (tier) {
      case "HIGH":
        return "text-danger";
      case "MEDIUM":
        return "text-lemon";
      case "LOW":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence < 0.5) return "Low";
    if (confidence < 0.75) return "Medium";
    return "High";
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-ui/30">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">{customerName}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Session: {sessionId}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{riskScore.toFixed(2)}</div>
            <div className={`text-xs font-bold mt-0.5 ${getRiskColor(riskTier)}`}>{riskTier} RISK</div>
          </div>
        </div>

        {/* Composite Risk Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Composite Risk Score</span>
            <span>{(riskScore * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-ui-dark rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r transition-all duration-500 ${getConfidenceColor(1 - riskScore)}`}
              style={{ width: `${riskScore * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fields List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {fields.map((field) => (
          <div key={field.name} className={`p-4 rounded-lg border ${field.flagged ? "border-lemon bg-lemon/5" : "border-border bg-card"}`}>
            {/* Field Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{field.label}</span>
                  {field.flagged && <AlertTriangle className="w-4 h-4 text-lemon" />}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Sources: {field.sources.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-ui rounded text-[10px] font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onFieldEdit?.(field.name)}
                className="text-xs text-teal hover:text-teal-600 font-medium transition-colors"
              >
                Edit
              </button>
            </div>

            {/* Field Value */}
            <div className="mb-3 p-3 bg-background rounded border border-border">
              <div className="text-sm font-mono text-foreground">{field.value}</div>
            </div>

            {/* Confidence */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-semibold text-foreground">
                  {getConfidenceLabel(field.confidence)} ({(field.confidence * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-ui-dark rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r transition-all duration-500 ${getConfidenceColor(field.confidence)}`}
                  style={{ width: `${field.confidence * 100}%` }}
                />
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-3 flex items-start gap-2 p-3 bg-ui/50 rounded text-xs">
              <Info className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{field.explanation}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-border bg-ui/30 space-y-2">
        <Button onClick={onApprove} className="w-full bg-success hover:bg-success/90 text-white font-semibold">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Complete KYC
        </Button>
        <Button onClick={onReject} variant="outline" className="w-full border-danger text-danger hover:bg-danger/10">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Escalate / Block
        </Button>
        <button className="w-full text-xs text-teal hover:text-teal-600 font-medium py-2 flex items-center justify-center gap-1 transition-colors">
          <ExternalLink className="w-3 h-3" />
          View Audit Trail
        </button>
      </div>
    </div>
  );
}
