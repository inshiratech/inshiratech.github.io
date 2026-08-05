import { BlogPost, CaseStudy, FAQItem, ScenarioImpact } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'what-is-operational-intelligence',
    title: 'What is Operational Intelligence in Manufacturing? The SME Blueprint',
    slug: 'what-is-operational-intelligence',
    metaTitle: 'What is Operational Intelligence in Manufacturing? | Inshira',
    metaDescription: 'Operational Intelligence explained for UK SME manufacturers. How OI differs from traditional BI, the three pillars it rests on, and how to apply it without new sensors or an ERP migration.',
    keywords: ['operational intelligence manufacturing','operational intelligence vs business intelligence','manufacturing analytics SME','industry 4.0 for SMEs','causal analysis manufacturing','decision support manufacturing UK'],
    datePublishedISO: '2026-06-18',
    dateModifiedISO: '2026-08-05',
    image: 'https://www.inshira.co.uk/assets/og-image.jpg',
    areaServed: ['GB','EU'],
    category: 'Educational Guides',
    excerpt: 'Explore how Operational Intelligence (OI) goes beyond traditional Business Intelligence (BI) to deliver continuous, real-time decision support directly to the factory floor without ERP upgrades.',
    publishDate: 'June 18, 2026',
    readingTime: '7 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Founder & Managing Director, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/#/about',
      avatar: '/assets/FLARE 2026 051.JPG'
    },
    content: `
### What is Operational Intelligence (OI) in Manufacturing?

Operational Intelligence (OI) represents the next evolutionary step in manufacturing analytics. While traditional software looks backward to describe *what happened yesterday*, Operational Intelligence continuously monitors and connects existing industrial data systems to explain **why it is happening now**, **what it is costing the business**, and **what specific actions will yield the highest immediate ROI**.

For Manufacturing SMEs (Small and Medium Enterprises), the transition to Industry 4.0 often feels intimidating, expensive, and out of reach. ERP migrations are notoriously disruptive, and installing hundreds of proprietary IoT sensors represents a significant capital expenditure.

**Operational Intelligence bypasses these barriers entirely.** By acting as an overlay intelligence layer, Inshira aggregates fragmented data from your existing PLCs, ERP reports, Excel spreadsheets, and legacy machinery logs to unlock deep visibility without replacing a single piece of hardware.

---

### The Operational Intelligence Framework: How It Works

Operational Intelligence is built on three core pillars:

1. **Contextual Data Orchestration:** Most factories do not suffer from a lack of data; they suffer from fragmented data. Your machine PLCs are recording cycle times, your operators are logging shifts in Excel, and your sales orders reside in the ERP. Inshira unifies these silos into a singular operational record.
2. **Causal Logic Engine (Root Cause Identification):** When a production line halts, traditional systems register "Downtime." Inshira analyzes upstream deviations, material batch codes, operator shifts, and ambient variables to determine that the micro-stoppage was caused by *pre-heating variance in Batch #204 of polypropylene*.
3. **Pre-emptive Simulation (Decision Twin):** Before making operational investments, Inshira's interactive simulation allows managers to run "What If" scenarios—such as reducing changeover times by 12% or adjusting maintenance frequency—and estimate the exact annual payback in £/GBP, energy reduction, and scrap savings.

---

### Comparison: Traditional BI vs. Operational Intelligence

To understand why traditional business intelligence dashboards are insufficient for modern manufacturers, let us look at how they compare across vital operational metrics:

| Metric / Dimension | Traditional BI (PowerBI, Tableau, ERP Reports) | Operational Intelligence (Inshira) |
| :--- | :--- | :--- |
| **Data Scope** | Static, historic, batched daily or weekly. | Continuous, real-time, event-triggered. |
| **Analysis Style** | Retrospective. Tells you "Downtime was 18% last month." | Proactive & Diagnostic. Tells you "Pressure drop in Line B is leading to a major stoppage in 2 hours." |
| **Causal Mapping** | Manual correlation required. Engineers must sift through files. | Automated Root Cause Analysis. Interlinks variables to identify exact origin points. |
| **User Persona** | Analysts, executives, and financial directors. | Operations Directors, Plant Managers, and Shift Leads. |
| **Actionable Guidance**| None. Displays raw charts; leaves interpretation to the user. | Auto-generated Action Items, weekly recommendations, and financial payback projections. |
| **Infrastructure Overhead** | Medium to High. Requires dedicated data warehouse setup. | Zero. Connects securely to existing data repositories. |

---

### Why Manufacturers Lose Money Without Realizing It

The hidden drain on factory profitability is rarely a catastrophic machine explosion. Instead, it is the cumulative effect of **operational micro-losses**:
* **Invisible micro-stoppages:** Short stops lasting 30 to 90 seconds that go completely unrecorded by busy operators but aggregate to hours of lost throughput every single week.
* **The "Design Speed" Fallacy:** Running machines 10% slower than nominal specification because "it reduces jamming." This hides massive structural capacity losses.
* **Scrap-to-Downtime Correlation:** Scrap rates that rise during specific shift handovers or grade changes, costing thousands in raw materials and energy.

By converting raw factory data into clear, quantified continuous improvement targets, Inshira empowers lean engineering teams to target losses with scientific, data-driven precision.
    `
  },
  {
    id: 'why-bi-is-not-enough',
    title: 'Why Traditional BI Dashboards are Insufficient for Factory Floor Performance',
    slug: 'why-bi-is-not-enough',
    metaTitle: 'Why BI Dashboards Fail on the Factory Floor | Inshira',
    metaDescription: 'Traditional BI dashboards report yesterday\u2019s numbers and leave interpretation to you. Here is why that fails manufacturing operations teams, and what decision-support intelligence does differently.',
    keywords: ['business intelligence manufacturing limitations','factory floor dashboards','powerbi manufacturing alternative','dashboard fatigue','manufacturing KPI reporting','real time production monitoring UK'],
    datePublishedISO: '2026-06-22',
    dateModifiedISO: '2026-08-05',
    image: 'https://www.inshira.co.uk/assets/og-image.jpg',
    areaServed: ['GB','EU'],
    category: 'Continuous Improvement',
    excerpt: 'BI dashboards tell you how much money you lost last month. Discover why manufacturers need decision intelligence, real-time root cause analysis, and proactive "what-if" modeling to survive.',
    publishDate: 'June 22, 2026',
    readingTime: '6 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Founder & Managing Director, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/#/about',
      avatar: '/assets/FLARE 2026 051.JPG'
    },
    content: `
### The Dashboard Fatigue Epidemic in B2B Manufacturing

Walk into any manufacturing plant in the UK, and you will likely see a large monitor mounted on the wall displaying a PowerBI dashboard or a colorful chart. Yet, if you ask the production manager what action they are taking based on that chart, they will often shrug.

The truth is, **traditional BI dashboards are passive spectators in an active arena**. They represent a retrospective view that describes historic consequences rather than guiding operational choices.

---

### Three Core Failures of Standard BI on the Factory Floor

#### 1. Correlation is Not Causation
Standard BI dashboards excel at displaying correlations—for example, showing that "Production Line 3 had higher downtime on Tuesdays." What they cannot tell you is *why*. Was it due to a specific raw material supplier, a particular team shift, a delayed changeover, or an electrical frequency fluctuation? Without automated causal mapping, engineers spend hours in manual meetings trying to untangle the "why."

#### 2. The Lack of Economic Quantification
When a machine goes down for 45 minutes, a dashboard records "45 minutes downtime." It does not translate that event into:
* **The direct labor cost** of idle operators (£350)
* **The energy wasted** in maintaining auxiliary heat while non-productive (£120)
* **The delayed delivery penalty** of missing the next shipment (£1,200)

By failing to quantify the business impact in financial terms, standard dashboards prevent operations directors from prioritizing continuous improvement budgets where they matter most.

#### 3. No "What-If" Predictive Modeling
A traditional dashboard cannot answer a simple but vital question: *"If I invest £15,000 to optimize the changeover routine of Line 1, what will be the annual payback period, and how will it affect our overall factory energy profile?"* 

---

### Enter Decision Intelligence: The Inshira Evolution

Operational Intelligence bridges the gap between data display and executive action. Instead of presenting a chart and leaving the analysis to a busy team, Inshira generates a **Weekly Action Hub** containing specific, prioritized recommendations:

* **Recommendation #1:** "Adjust cooling rate of Extruder 2 by 1.8°C during polypropylene transitions. Expected scrap reduction: 4.2% (£1,150/week)."
* **Recommendation #2:** "Reschedule Batch #459 to run immediately after Batch #452 to cut changeover clean time by 18 minutes. Annual savings: £8,400."

This transforms factory analytics from a reactive, administrative report into an active, strategic advisor that speaks the language of both engineers and financial stakeholders.
    `
  },
  {
    id: 'how-to-reduce-manufacturing-downtime',
    title: 'How to Reduce Manufacturing Downtime: A Proactive Root Cause Analysis Framework',
    slug: 'how-to-reduce-manufacturing-downtime',
    metaTitle: 'How to Reduce Manufacturing Downtime | Inshira',
    metaDescription: 'A proactive root cause analysis framework for reducing unplanned downtime in SME manufacturing. Covers micro-stoppages, hidden speed losses and how to quantify each in cost terms.',
    keywords: ['reduce manufacturing downtime','root cause analysis manufacturing','unplanned downtime SME','micro stoppages production','OEE improvement UK','downtime cost calculation'],
    datePublishedISO: '2026-05-30',
    dateModifiedISO: '2026-08-05',
    image: 'https://www.inshira.co.uk/assets/og-image.jpg',
    areaServed: ['GB','EU'],
    category: 'Operational Excellence',
    excerpt: 'A comprehensive step-by-step operational guide for continuous improvement leads on diagnosing micro-stoppages, analyzing PLC logs, and using automated root cause systems.',
    publishDate: 'May 30, 2026',
    readingTime: '8 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Founder & Managing Director, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/#/about',
      avatar: '/assets/FLARE 2026 051.JPG'
    },
    content: `
### Downtime: The Silent Profit Killer in UK Manufacturing

In SME manufacturing, unplanned downtime costs an average of **£12,000 per hour** in lost productivity, wasted materials, and penalty fees. Most organizations accept a certain level of disruption as "the cost of doing business." 

However, Inshira's industrial data shows that **up to 70% of unplanned downtime is entirely preventable** without purchasing new machines or replacing existing lines.

---

### Step 1: Capture the Micro-Stoppages
Standard operator logs rarely record stoppages shorter than five minutes. If a packaging machine jams for 45 seconds, the operator clears it and restarts. But if that jam happens 60 times a day, that represents **45 minutes of complete production loss**—completely invisible on manual sheets.

Operational Intelligence works by continuously listening to PLC state changes. It automatically groups micro-stoppages, flags high-frequency recurring errors, and highlights the specific line speeds that trigger them.

---

### Step 2: Establish Causal Paths
When a stoppage occurs, do not just look at the machine that failed. Analyze the upstream flow:
1. **Material Quality:** Did the resin viscosity vary?
2. **Speed Deviations:** Was the conveyor running faster than nominal?
3. **Ambient Conditions:** Did humidity in the packaging hall increase?

By correlating sensor signals, quality reports, and batch tracking, Inshira maps out the multi-variable causality, showing you that *sensor malfunction A was actually a secondary effect of material thickness B.*

---

### Step 3: Implement the "What-If" Evaluation
Once a continuous improvement manager identifies the root cause, they can model solutions inside Inshira's digital twin simulator:
* **Proposed action:** Automate mechanical alignment calibration during raw material changes.
* **Simulated ROI:** 14% reduction in downtime, with a calculated payback period of 3.4 months.

This evidence-backed approach allows engineering teams to secure executive buy-in with absolute clarity.
    `
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'precision-automotive-components',
    title: 'Precision Automotive Supplier Eliminates Unplanned Downtime',
    client: 'Apex Automotive Components',
    industry: 'Automotive & Precision Machining',
    size: '140 employees, Midlands UK',
    challenge: 'Apex suffered from frequent micro-stoppages across three CNC lines. Standard BI reports indicated "general mechanical faults" but failed to identify the upstream temperature anomalies triggering the tool wear.',
    solution: 'Inshira integrated Apex’s PLC logs and shift scheduling reports. The causal engine mapped tool-tip wear against raw material batches and coolant temperature cycles, identifying a subtle 2°C fluctuation in coolant delivery.',
    results: {
      downtimeReduction: '28% reduction in unplanned downtime',
      wasteReduction: '14% scrap rate reduction',
      annualSavings: '£142,000 in direct operational savings',
      paybackPeriod: '2.8 months'
    },
    quote: {
      text: "We had spent six months reviewing spreadsheets. Inshira identified the exact coolant temperature anomaly in under 48 hours. The ROI was virtually immediate.",
      author: "David Vance",
      role: "Operations Director"
    }
  },
  {
    id: 'packaging-solutions-ltd',
    title: 'Packaging SME Slashes Grade Changeover Waste by 34%',
    client: 'Vanguard Packaging Ltd',
    industry: 'Packaging & Paper Conversion',
    size: '85 employees, Yorkshire UK',
    challenge: 'High-variety production forced Vanguard to perform 4-5 grade changes daily. Changeover times fluctuated wildly between 20 and 75 minutes, resulting in major throughput bottlenecks and extensive material scrap.',
    solution: 'Inshira mapped changeover timelines by integrating operator logs with extruder temperature profiles. It identified optimal temperature cool-down ramp patterns and delivered step-by-step guidance directly to line operators.',
    results: {
      downtimeReduction: '22% increase in line availability',
      wasteReduction: '34% reduction in material scrap',
      annualSavings: '£98,000 saved in raw materials & energy',
      paybackPeriod: '3.1 months'
    },
    quote: {
      text: "Inshira turned our changeover process from a black art into an exact, repeatable science. Our operators now have clear, data-driven targets for every shift.",
      author: "Helen McGregor",
      role: "Continuous Improvement Lead"
    }
  },
  {
    id: 'premium-beverage-bottlers',
    title: 'Food & Beverage Processor Uncovers Hidden Yield Losses',
    client: 'Cotswold Springs Bottling',
    industry: 'Food & Beverage Processing',
    size: '110 employees, Gloucestershire UK',
    challenge: 'Cotswold Springs experienced unexplained yield loss in their high-speed filling lines. Despite having modern machinery, their overall equipment effectiveness (OEE) remained stuck at 71%.',
    solution: 'Inshira’s intelligence layer unified filling PLC counts with scale weight data and ERP order schedules. It uncovered systematic over-filling (product giveaway) occurring at specific line speeds and during specific shift handovers.',
    results: {
      downtimeReduction: '12% decrease in changeover delays',
      wasteReduction: '19% reduction in product giveaway',
      annualSavings: '£115,000 in product yield recovery',
      paybackPeriod: '4.2 months'
    },
    quote: {
      text: "Standard OEE charts just showed us that we were losing yield. Inshira pinpointed the exact speed settings and shift conditions that caused the giveaway.",
      author: "Alistair Burke",
      role: "Plant Manager"
    }
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Is Inshira a standard Business Intelligence (BI) tool like PowerBI?",
    answer: "No. Traditional BI tools like PowerBI are retrospective. They require you to build queries, build charts, and manually interpret what happened in the past. Inshira is an Operational Intelligence system. It automatically unifies your existing data silos, executes root cause analysis, maps causality, and delivers specific, prioritized recommendations alongside financial estimates of their business impact."
  },
  {
    question: "Do we need to buy or install new IoT sensors or hardware?",
    answer: "Absolutely not. Inshira is designed to sit on top of your existing infrastructure. We extract and contextualize data already being recorded by your PLC systems, SCADA systems, machine logs, ERP files, and Excel spreadsheets. We require no infrastructure replacement, no ERP migrations, and no expensive sensor hardware."
  },
  {
    question: "How long does it take to implement and see initial value?",
    answer: "Most of our manufacturing clients are up and running in under two weeks. Because we connect directly to your existing data repositories via secure read-only APIs, there is no physical installation delay. Initial insights and root cause recommendations are typically generated within 48 to 72 hours of data connection."
  },
  {
    question: "Is our factory data secure? We have strict confidentiality rules.",
    answer: "Data security is our highest priority. Inshira uses enterprise-grade read-only pipelines, end-to-end AES-256 encryption, and secure isolated environments for every customer. We never share operational insights across accounts. Our platform is fully GDPR compliant and designed to adhere to ISO 27001 industrial security guidelines."
  },
  {
    question: "Our operations are highly customized. Will Inshira work for our specific process?",
    answer: "Yes. Inshira is built specifically for manufacturing SMEs in sectors like Precision Machining, Food & Beverage, Packaging, and Assembly. Rather than relying on generic AI models, our system maps your factory's specific physics and engineering processes to create a customized 'Decision Twin' of your lines."
  },
  {
    question: "How do our shop-floor operators interact with Inshira?",
    answer: "Inshira features a highly intuitive 'Action Hub' specifically built for operators and shift leads. Instead of complex charts, operators receive straightforward, step-by-step optimization actions during their shifts (such as pre-heating ramps or speed configurations) that save time and reduce frustration."
  }
];

export const SCENARIO_IMPACTS: ScenarioImpact[] = [
  {
    id: 'downtime',
    label: 'Reduce Changeover & Setup Times',
    description: 'Optimize setup sequences, mechanical calibrations, and tooling swaps during material or grade transitions.',
    minVal: 0,
    maxVal: 50,
    currentVal: 15,
    unit: '% Improvement',
    calcSavings: (val) => val * 2800,
    calcDowntime: (val) => val * 0.8,
    calcWaste: (val) => val * 0.3,
    calcCO2: (val) => val * 120
  },
  {
    id: 'scrap',
    label: 'Reduce Material Scrap & Waste',
    description: 'Diagnose temperature, pressure, and alignment parameters to prevent raw material loss during start-up.',
    minVal: 0,
    maxVal: 40,
    currentVal: 10,
    unit: '% Reduction',
    calcSavings: (val) => val * 3400,
    calcDowntime: (val) => val * 0.2,
    calcWaste: (val) => val * 1.0,
    calcCO2: (val) => val * 95
  },
  {
    id: 'speed',
    label: 'Recover Machine Design Speed',
    description: 'Uncover capacity lost by running lines slower than nominal design speeds due to historical operator habits.',
    minVal: 0,
    maxVal: 20,
    currentVal: 5,
    unit: '% Speed Recovery',
    calcSavings: (val) => val * 4500,
    calcDowntime: (val) => val * 0.4,
    calcWaste: (val) => val * 0.1,
    calcCO2: (val) => val * 180
  },
  {
    id: 'energy',
    label: 'Optimize Thermal & Energy Profiles',
    description: 'Tune pre-heating schedules and auxiliary equipment power consumption states during idle stoppages.',
    minVal: 0,
    maxVal: 30,
    currentVal: 8,
    unit: '% Energy Savings',
    calcSavings: (val) => val * 1900,
    calcDowntime: (val) => 0,
    calcWaste: (val) => 0,
    calcCO2: (val) => val * 380
  }
];
