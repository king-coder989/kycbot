# 🧠 KYCbot — The AI-Driven Compliance Copilot

> **“Automate 85% of KYC form filling and risk checks with Agentic AI.”**

KYCbot is an **AI-powered compliance engine** built on a **Modal Context Protocol (MCP)** architecture.  
It integrates directly into a bank’s core or ERP system to **fetch, validate, and classify** customer data,  
auto-fill KYC forms, and generate explainable JSON audit reports — turning hours of manual work into minutes.

---

## ⚙️ What It Does

| Stage | Function | Output |
|-------|-----------|--------|
| **1. Fetch** | Pulls data from UIDAI, PAN, internal bank DBs, OCR docs | Verified raw data |
| **2. Context Merge (MCP)** | Fuses multi-source info, understands context | Unified customer profile |
| **3. Risk Classification** | Checks PEP/FATCA/AML flags, confidence scoring | Risk matrix |
| **4. Auto-Fill & Report** | Completes policy forms, generates JSON + AI summary | Compliance package |
| **5. Human Review** | Officer verifies low-confidence fields (<0.8) and submits | Final KYC approval |

---

## 💥 Impact (Per 1 Million KYCs)

| Metric | Manual | With KYCbot | Gain |
|---------|---------|-------------|------|
| Avg. time per KYC | 30 min | 5 min | **−83%** |
| Total time | 500,000 h | 83,000 h | **420,000 h saved** |
| Cost (@ ₹500/h) | ₹25 Cr | ₹4 Cr | **₹21 Cr (~$2.5 M) saved** |
| Staff equivalent | — | — | **≈208 FTE years freed** |

> **Result:** 6× faster onboarding, 80% cost reduction, instant audit trails.

---

## 🧩 System Architecture
[Data Sources]
│
▼
[ Fetch Layer ]
│→ APIs (UIDAI, PAN)
│→ OCR / document parse
▼
[ MCP Engine ]
│→ Context merge
│→ Risk classification
│→ Confidence scoring
▼
[ Report Layer ]
│→ JSON export
│→ AI compliance summary
▼
[ Review Interface ]
│→ Human approve / edit
▼
[ Audit & Storage ]

🧠 Demo Flow

Upload or fetch mock policy form.

MCP engine fetches contextual data (mock UIDAI/PAN JSON).

Watch pipeline animation as data flows → risk classified → form auto-filled.

Reviewer confirms flagged fields.

Export final report as structured JSON or AI-written summary.

🔒 Security & Compliance

Data never leaves bank’s secure environment in on-prem mode.

Full audit trail logged per field update.

Explainable decisions for regulators.

ISO-ready logging and role-based access.

🏆 Vision

To make compliance autonomous, explainable, and real-time.

KYCbot is built to evolve into the universal compliance layer for banks, NBFCs, and fintechs —
where every onboarding, every audit, and every regulator query happens in seconds.

👥 Team

Project: KYCbot
Track: Fintech — Agentic AI (MumbaiHacks 2025)
Developer Team: Arpit, Pratemsh ,Kalyani, Alishba
Mentor: Prof Dev Mukherjee
