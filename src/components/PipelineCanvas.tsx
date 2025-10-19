import { useEffect, useState } from "react";
import { Database, FileSearch, GitMerge, Shield, AlertCircle, CheckCircle, FileOutput } from "lucide-react";

const PIPELINE_STAGES = [
  { id: "ingest", label: "Ingest", icon: Database, description: "Fetch from sources" },
  { id: "enrich", label: "Enrich", icon: FileSearch, description: "OCR & normalize" },
  { id: "reconcile", label: "Reconcile", icon: GitMerge, description: "Merge data" },
  { id: "score", label: "Score", icon: AlertCircle, description: "Confidence calc" },
  { id: "policy", label: "Policy", icon: Shield, description: "PEP/Sanction" },
  { id: "review", label: "Review", icon: CheckCircle, description: "Human review" },
  { id: "export", label: "Export", icon: FileOutput, description: "JSON/SAR" },
];

type StageState = "idle" | "processing" | "review" | "blocked" | "complete";

interface PipelineCanvasProps {
  activeStage?: string;
  processingStages?: string[];
  reviewStages?: string[];
  blockedStages?: string[];
}

export function PipelineCanvas({
  activeStage = "ingest",
  processingStages = ["ingest", "enrich"],
  reviewStages = ["review"],
  blockedStages = [],
}: PipelineCanvasProps) {
  const [dataTokens, setDataTokens] = useState<number[]>([]);

  // Spawn data tokens periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDataTokens((prev) => [...prev, Date.now()]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Clean up old tokens
  useEffect(() => {
    const cleanup = setInterval(() => {
      setDataTokens((prev) => prev.filter((t) => Date.now() - t < 4000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  const getStageState = (stageId: string): StageState => {
    if (blockedStages.includes(stageId)) return "blocked";
    if (processingStages.includes(stageId)) return "processing";
    if (reviewStages.includes(stageId)) return "review";
    if (PIPELINE_STAGES.findIndex((s) => s.id === stageId) < PIPELINE_STAGES.findIndex((s) => s.id === activeStage)) {
      return "complete";
    }
    return "idle";
  };

  const getStageClasses = (state: StageState) => {
    const base = "relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300";
    switch (state) {
      case "processing":
        return `${base} bg-teal/10 border-2 border-teal shadow-lg animate-pulse-teal`;
      case "review":
        return `${base} bg-lemon/10 border-2 border-lemon shadow-lg animate-pulse-lemon`;
      case "blocked":
        return `${base} bg-danger/10 border-2 border-danger shadow-lg animate-shake`;
      case "complete":
        return `${base} bg-success/5 border border-success/30`;
      default:
        return `${base} bg-ui border border-border`;
    }
  };

  const getIconClasses = (state: StageState) => {
    switch (state) {
      case "processing":
        return "w-8 h-8 text-teal";
      case "review":
        return "w-8 h-8 text-lemon";
      case "blocked":
        return "w-8 h-8 text-danger";
      case "complete":
        return "w-8 h-8 text-success";
      default:
        return "w-8 h-8 text-muted-foreground";
    }
  };

  return (
    <div className="relative w-full p-8 bg-background rounded-2xl border border-border">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">KYC Processing Pipeline</h2>
        <p className="text-sm text-muted-foreground">Real-time operational view of MCP server stages</p>
      </div>

      {/* Pipeline Flow */}
      <div className="relative">
        {/* Connector Line */}
        <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-border z-0" />

        {/* Stages */}
        <div className="relative grid grid-cols-7 gap-4 z-10">
          {PIPELINE_STAGES.map((stage, idx) => {
            const state = getStageState(stage.id);
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="flex flex-col items-center">
                {/* Stage Card */}
                <div className={getStageClasses(state)}>
                  <Icon className={getIconClasses(state)} />
                  <div className="text-center">
                    <div className="text-xs font-semibold text-foreground">{stage.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{stage.description}</div>
                  </div>

                  {/* State Badge */}
                  {state !== "idle" && (
                    <div className="absolute -top-2 -right-2">
                      <div
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          state === "processing"
                            ? "bg-teal text-white"
                            : state === "review"
                            ? "bg-lemon text-foreground"
                            : state === "blocked"
                            ? "bg-danger text-white"
                            : "bg-success text-white"
                        }`}
                      >
                        {state}
                      </div>
                    </div>
                  )}
                </div>

                {/* Connector Dot */}
                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="absolute top-[52px] w-3 h-3 bg-border rounded-full -translate-y-1/2" style={{ left: `${((idx + 1) / 7) * 100}%` }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Animated Data Tokens */}
        <div className="absolute top-[52px] left-0 right-0 h-[2px] overflow-visible pointer-events-none">
          {dataTokens.map((token) => (
            <div
              key={token}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-lemon to-teal rounded-sm shadow-lg animate-flow"
              style={{
                left: "10%",
                animationDelay: `${(token % 1000) / 1000}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal"></div>
          <span className="text-muted-foreground">Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lemon"></div>
          <span className="text-muted-foreground">Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger"></div>
          <span className="text-muted-foreground">Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-muted-foreground">Complete</span>
        </div>
      </div>
    </div>
  );
}
