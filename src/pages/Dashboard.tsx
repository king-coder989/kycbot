import { useState, useEffect } from "react";
import { PipelineCanvas } from "@/components/PipelineCanvas";
import { SessionList, Session } from "@/components/SessionList";
import { ReviewPanel, FieldData } from "@/components/ReviewPanel";
import { MetricsStrip } from "@/components/MetricsStrip";
import { toast } from "sonner";

// Mock data
const MOCK_SESSIONS: Session[] = [
  {
    id: "sess_001",
    customerId: "CUST_2024_001",
    customerName: "Rajesh Kumar",
    status: "processing",
    timestamp: "2m ago",
    completionPercent: 65,
  },
  {
    id: "sess_002",
    customerId: "CUST_2024_002",
    customerName: "Priya Sharma",
    status: "review",
    timestamp: "5m ago",
    completionPercent: 95,
    riskTier: "MEDIUM",
  },
  {
    id: "sess_003",
    customerId: "CUST_2024_003",
    customerName: "Amit Patel",
    status: "blocked",
    timestamp: "8m ago",
    completionPercent: 45,
    riskTier: "HIGH",
  },
  {
    id: "sess_004",
    customerId: "CUST_2024_004",
    customerName: "Sneha Reddy",
    status: "complete",
    timestamp: "12m ago",
    completionPercent: 100,
    riskTier: "LOW",
  },
  {
    id: "sess_005",
    customerId: "CUST_2024_005",
    customerName: "Vikram Singh",
    status: "processing",
    timestamp: "15m ago",
    completionPercent: 35,
  },
];

const MOCK_FIELDS: Record<string, FieldData[]> = {
  sess_002: [
    {
      name: "full_name",
      label: "Full Name",
      value: "Priya Sharma",
      confidence: 0.98,
      sources: ["UIDAI", "PAN"],
      explanation: "Name matched across UIDAI and PAN databases with 98% confidence. Consistent spelling.",
    },
    {
      name: "dob",
      label: "Date of Birth",
      value: "1992-08-15",
      confidence: 0.95,
      sources: ["UIDAI", "PAN", "BANK_DB"],
      explanation: "DOB verified from 3 sources. All sources agree on date.",
    },
    {
      name: "pan",
      label: "PAN Number",
      value: "ABCDE1234F",
      confidence: 1.0,
      sources: ["PAN", "OCR"],
      explanation: "PAN verified directly from NSDL database. Valid and active.",
    },
    {
      name: "address",
      label: "Residential Address",
      value: "123 MG Road, Bangalore, KA 560001",
      confidence: 0.68,
      sources: ["UIDAI", "OCR"],
      explanation: "Address partially matched. UIDAI shows same city/state, but street differs from OCR document.",
      flagged: true,
    },
    {
      name: "occupation",
      label: "Occupation",
      value: "Software Engineer",
      confidence: 0.55,
      sources: ["BANK_DB"],
      explanation: "Occupation data available only from internal records. Low confidence due to single source.",
      flagged: true,
    },
    {
      name: "annual_income",
      label: "Annual Income",
      value: "₹12,00,000",
      confidence: 0.72,
      sources: ["BANK_DB"],
      explanation: "Income estimate based on account transaction history and salary credits.",
    },
  ],
};

const Index = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string>("sess_002");
  const [processingStages, setProcessingStages] = useState<string[]>(["ingest", "enrich"]);

  const selectedSession = MOCK_SESSIONS.find((s) => s.id === selectedSessionId);
  const selectedFields = selectedSessionId ? MOCK_FIELDS[selectedSessionId] : [];

  // Simulate stage progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingStages((prev) => {
        const stages = ["ingest", "enrich", "reconcile", "score", "policy", "review"];
        const currentIndex = stages.indexOf(prev[prev.length - 1]);
        if (currentIndex < stages.length - 1) {
          return [stages[currentIndex + 1]];
        }
        return ["ingest"];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleApprove = () => {
    toast.success("KYC approved successfully", {
      description: `Session ${selectedSessionId} has been finalized and exported.`,
    });
  };

  const handleReject = () => {
    toast.error("Session escalated", {
      description: `Session ${selectedSessionId} has been blocked for manual review.`,
    });
  };

  const handleFieldEdit = (fieldName: string) => {
    toast.info("Edit mode", {
      description: `Editing field: ${fieldName}`,
    });
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Top Bar */}
      <header className="border-b border-border bg-background">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lemon to-teal flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">KYCbot</h1>
              <p className="text-xs text-muted-foreground">MCP Compliance Server v2.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
              <span className="text-xs font-semibold text-success">● Server Online</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Operator</div>
              <div className="text-sm font-semibold text-foreground">Admin User</div>
            </div>
          </div>
        </div>
      </header>

      {/* Metrics Strip */}
      <MetricsStrip />

      {/* Main Content */}
      <div className="p-6">
        {/* Pipeline Canvas */}
        <div className="mb-6 animate-fade-in-up">
          <PipelineCanvas processingStages={processingStages} reviewStages={["review"]} blockedStages={[]} />
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-12 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Session List - Left Rail */}
          <div className="col-span-3">
            <div className="h-[600px] rounded-xl border border-border overflow-hidden shadow-lg">
              <SessionList sessions={MOCK_SESSIONS} selectedSessionId={selectedSessionId} onSessionSelect={setSelectedSessionId} />
            </div>
          </div>

          {/* Review Panel - Main Content */}
          <div className="col-span-9">
            {selectedSession && selectedFields ? (
              <div className="h-[600px] rounded-xl border border-border overflow-hidden shadow-lg">
                <ReviewPanel
                  sessionId={selectedSession.id}
                  customerName={selectedSession.customerName}
                  riskScore={0.42}
                  riskTier={selectedSession.riskTier || "MEDIUM"}
                  fields={selectedFields}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onFieldEdit={handleFieldEdit}
                />
              </div>
            ) : (
              <div className="h-[600px] rounded-xl border border-border flex items-center justify-center bg-ui/30">
                <div className="text-center">
                  <p className="text-lg font-semibold text-muted-foreground">No session selected</p>
                  <p className="text-sm text-muted-foreground mt-1">Select a session from the left to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto px-6 py-4 border-t border-border bg-ui/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div>
            Built with <span className="text-teal">●</span> MCP Protocol
          </div>
          <div>Real-time compliance visualization | Audit-ready exports</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
