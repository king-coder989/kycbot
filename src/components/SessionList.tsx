import { Circle } from "lucide-react";

export type SessionStatus = "processing" | "review" | "blocked" | "complete";

export interface Session {
  id: string;
  customerId: string;
  customerName: string;
  status: SessionStatus;
  timestamp: string;
  completionPercent: number;
  riskTier?: "LOW" | "MEDIUM" | "HIGH";
}

interface SessionListProps {
  sessions: Session[];
  selectedSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
}

export function SessionList({ sessions, selectedSessionId, onSessionSelect }: SessionListProps) {
  const getStatusColor = (status: SessionStatus) => {
    switch (status) {
      case "processing":
        return "text-teal";
      case "review":
        return "text-lemon";
      case "blocked":
        return "text-danger";
      case "complete":
        return "text-success";
    }
  };

  const getStatusLabel = (status: SessionStatus) => {
    switch (status) {
      case "processing":
        return "Processing";
      case "review":
        return "Needs Review";
      case "blocked":
        return "Blocked";
      case "complete":
        return "Complete";
    }
  };

  const getRiskBadgeColor = (tier?: string) => {
    switch (tier) {
      case "HIGH":
        return "bg-danger/10 text-danger border-danger/20";
      case "MEDIUM":
        return "bg-lemon/10 text-foreground border-lemon/20";
      case "LOW":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-ui text-muted-foreground border-border";
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">Active Sessions</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{sessions.length} in queue</p>
      </div>

      {/* Session List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSessionSelect(session.id)}
            className={`w-full px-4 py-3 border-b border-border text-left transition-all hover:bg-ui/50 ${
              selectedSessionId === session.id ? "bg-teal/5 border-l-4 border-l-teal" : ""
            }`}
          >
            {/* Header Row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Circle className={`w-2.5 h-2.5 fill-current ${getStatusColor(session.status)}`} />
                <span className="text-sm font-semibold text-foreground">{session.customerName}</span>
              </div>
              {session.riskTier && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadgeColor(session.riskTier)}`}>
                  {session.riskTier}
                </span>
              )}
            </div>

            {/* Customer ID */}
            <div className="text-xs text-muted-foreground mb-2">{session.customerId}</div>

            {/* Status & Progress */}
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-medium ${getStatusColor(session.status)}`}>{getStatusLabel(session.status)}</span>
              <span className="text-xs text-muted-foreground">{session.completionPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-1.5 w-full h-1 bg-ui rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  session.status === "processing"
                    ? "bg-teal"
                    : session.status === "review"
                    ? "bg-lemon"
                    : session.status === "blocked"
                    ? "bg-danger"
                    : "bg-success"
                }`}
                style={{ width: `${session.completionPercent}%` }}
              />
            </div>

            {/* Timestamp */}
            <div className="text-[10px] text-muted-foreground mt-1.5">{session.timestamp}</div>
          </button>
        ))}
      </div>

      {/* Quick Actions Hint */}
      <div className="px-4 py-2 border-t border-border bg-ui/30">
        <div className="text-[10px] text-muted-foreground">
          <span className="font-mono bg-background px-1.5 py-0.5 rounded">v</span> view •{" "}
          <span className="font-mono bg-background px-1.5 py-0.5 rounded">r</span> re-run •{" "}
          <span className="font-mono bg-background px-1.5 py-0.5 rounded">f</span> flag
        </div>
      </div>
    </div>
  );
}
