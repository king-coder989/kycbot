import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Eye, Lock, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import kycbotLogo from "@/assets/kycbot-logo.jpeg";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Verification",
      description: "Multi-source data reconciliation with real-time confidence scoring"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Process KYC checks in seconds with automated enrichment pipeline"
    },
    {
      icon: Eye,
      title: "Full Explainability",
      description: "Transparent audit trails with source attribution and reasoning"
    },
    {
      icon: Lock,
      title: "Compliance-First",
      description: "Built-in policy engine with configurable risk thresholds"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Insights",
      description: "Live operational metrics and performance dashboards"
    },
    {
      icon: CheckCircle2,
      title: "Smart Review",
      description: "Automated escalation with human-in-the-loop review workflows"
    }
  ];

  const stages = [
    "Ingest", "Enrich", "Reconcile", "Score", "Policy", "Review", "Export"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={kycbotLogo} alt="KYCbot Logo" className="h-10 w-auto" />
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-teal transition-colors">
              Dashboard
            </Link>
            <Button asChild size="sm" className="bg-teal hover:bg-teal-600 text-white">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-teal-soft/10 py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lemon/20 px-4 py-2 text-sm font-medium text-foreground animate-fade-in">
              <Zap className="h-4 w-4 text-lemon" />
              AI-Driven Compliance Engine
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground mb-6 animate-fade-in">
              Real-Time KYC Verification
              <span className="block mt-2 bg-gradient-to-r from-lemon to-teal bg-clip-text text-transparent">
                Built for Scale
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Automate customer onboarding with multi-source verification, AI-powered enrichment, 
              and transparent compliance workflows.
            </p>
            <div className="flex items-center justify-center gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-teal hover:bg-teal-600 text-white">
                <Link to="/dashboard">
                  View Live Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pipeline Visualization */}
        <div className="container mt-16">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-xl border-2 border-teal/20 bg-background/80 backdrop-blur p-8">
              <div className="flex items-center justify-between gap-2 overflow-x-auto">
                {stages.map((stage, idx) => (
                  <div key={stage} className="flex items-center gap-2 animate-fade-in" style={{animationDelay: `${idx * 100}ms`}}>
                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-teal/10 border-2 border-teal flex items-center justify-center animate-pulse-teal">
                          <span className="text-xs font-bold text-teal">{idx + 1}</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-foreground text-center">{stage}</span>
                    </div>
                    {idx < stages.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-teal/40 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-ui/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need for Compliance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on battle-tested architecture with AI at every layer
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 border-border hover:border-teal/50 transition-all hover:shadow-lg animate-fade-in" style={{animationDelay: `${idx * 100}ms`}}>
                <feature.icon className="h-10 w-10 text-teal mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-teal to-teal-600 text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">99.7%</div>
              <div className="text-white/80 text-sm">Accuracy Rate</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
              <div className="text-4xl font-bold mb-2">&lt;2s</div>
              <div className="text-white/80 text-sm">Avg Processing</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-white/80 text-sm">Auto-Complete</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '300ms'}}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your KYC Process?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See the operational dashboard in action and experience real-time compliance monitoring.
            </p>
            <Button asChild size="lg" className="bg-teal hover:bg-teal-600 text-white">
              <Link to="/dashboard">
                Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-ui/30 py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={kycbotLogo} alt="KYCbot Logo" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 KYCbot. AI-Driven Compliance Engine.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
