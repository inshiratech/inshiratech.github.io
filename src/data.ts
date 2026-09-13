import { BlogPost, CaseStudy, FAQItem, ScenarioImpact } from './types';
import { HARRIS_ID, HARRIS_SAME_AS, HARRIS_LINKEDIN } from './identity';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'plc-erp-integration-architecture',
    title: 'Legacy PLC and ERP Integration Architecture for UK Manufacturers',
    slug: 'plc-erp-integration-architecture',
    metaTitle: 'Legacy PLC and ERP Integration Architecture | Inshira',
    metaDescription: 'A read-only architecture for connecting legacy PLCs to ERP in UK brownfield factories: asset inventory, connectors, OT/IT boundary, data quality and pilot.',
    keywords: ['PLC ERP integration','legacy PLC integration','OT IT boundary manufacturing','OPC UA brownfield factory','ISA-95 integration architecture','read-only PLC data extraction','NCSC OT connectivity guidance','manufacturing operational intelligence'],
    datePublishedISO: '2026-09-13',
    dateModifiedISO: '2026-09-13',
    image: 'https://www.inshira.co.uk/assets/og-image.png',
    areaServed: ['GB'],
    category: 'Educational Guides',
    excerpt: 'PLC ERP integration can connect ageing controllers with orders, materials, batches, shifts and production records without replacing working equipment. This guide sets out the safest architecture: non-invasive connectors, a controlled OT/IT boundary, normalised operational records and read-only analytics.',
    publishDate: 'September 13, 2026',
    readingTime: '12 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Managing Director & Founder, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/about/',
      id: HARRIS_ID,
      sameAs: HARRIS_SAME_AS,
      profileUrl: HARRIS_LINKEDIN,
      profileLabel: 'LinkedIn',
      avatar: '/assets/FLARE 2026 051.JPG'
    },
    content: `
PLC ERP integration can connect ageing controllers with orders, materials, batches, shifts and production records without replacing working equipment. The safest architecture uses non-invasive connectors, a controlled operational technology and information technology boundary, normalised operational records, and read-only analytics.

A successful connection is only the start. The integration has to help an engineer identify a production loss, assess its causes, and take a governed action **without giving analytics software control of the machine**.

---

### Audience, Outcome and Prerequisites

This guide is for technical directors, controls engineers, IT and OT leaders, and manufacturing managers responsible for complex brownfield factories.

The intended outcome is a read-only data path from PLC and ERP sources to explainable operational decisions. Raw machine signals remain separate from the contextual records that connect an event to the correct job, batch, material, shift and process settings.

Before starting, secure these prerequisites:

* A named operational problem and a decision owner
* Access to PLC, SCADA, historian, ERP, database, spreadsheet and machine documentation
* OT, IT, production, quality, cybersecurity and data-protection involvement
* Approved change control, maintenance windows, backups and rollback procedures
* A measurable baseline for the chosen production loss

The [Made Smarter Technology Adoption Pilot Report](https://www.madesmarter.uk/resources/publication-made-smarter-technology-adoption-pilot-report/) recommends starting with data and systems integration before adopting more advanced technologies. That report comes from a 2020 regional pilot, so treat its findings as useful guidance rather than a current UK-wide performance benchmark.

---

### The Target Architecture

A sound PLC ERP integration architecture separates control data, manufacturing context and business records before joining them for analysis. The ISA-95 enterprise-control integration model gives a useful structure:

| Level | What lives there |
| --- | --- |
| **Level 2** | PLC signals, machine states, counters, alarms, process control |
| **Level 3** | Contextual manufacturing records: jobs, events, batches, materials, shifts, quantities |
| **Level 4** | ERP orders, schedules, material records and other business objects |

The Level 3 context layer is the one most often skipped, and it is essential. A PLC counter might record a 47-second stop perfectly accurately, but that stop has almost no value until the integration associates it with the correct order, material, shift and machine state.

---

### 1. Build a Safe Compatibility Inventory

Start legacy PLC integration by recording the systems and communications that exist in the factory *today*, not the ones on the original drawings.

List every PLC, SCADA system, historian, ERP platform, database, spreadsheet and legacy machine log required for the pilot. For each asset, record its vendor, model, firmware or software version, owner, location, protocols, ports, dependencies, retention period, time source and available read permissions.

The National Cyber Security Centre's [secure connectivity guidance for operational technology](https://www.ncsc.gov.uk/files/ncsc-secure-connectivity-for-operational-technology.pdf) calls for an asset inventory that includes supported communication protocols, and warns that brownfield systems may no longer match their original designs.

Begin discovery with project files, controller configurations, OEM documents, maintenance knowledge and native OT tools. Test any technical discovery method away from production first.

**Expected result:** a verified list of tags, data types, timestamps, protocols, update rates and dependencies.

**Warning:** active scanning can degrade, freeze or crash sensitive legacy controllers. Stop any discovery method that has not been tested and approved for the specific estate.

---

### 2. Select the Least Invasive Connector Route

Select each connector against the actual PLC firmware, ERP release, data type and transaction behaviour rather than a generic compatibility claim.

Prefer an existing historian, an approved native driver, a database replica, an ERP API, an OPC wrapper or a read-only proxy. The route must meet the required sampling frequency without affecting machine control.

Several tools can contribute, but they do different jobs:

* **PTC Kepware Server** is connectivity middleware. PTC lists more than 150 pre-built drivers and conversion of proprietary protocols into open standards such as OPC UA and MQTT ([PTC](https://www.ptc.com/en/products/kepware/kepware-server)).
* **Ignition Reporting** combines PLC, SQL, ERP, SCADA and manufacturing execution system data in reports and industrial applications.
* **The OPC Foundation COM UA Wrapper** can expose an existing OPC DA server to OPC UA clients.
* **Inshira's Operational Intelligence Platform** is an analysis overlay for existing factory data, rather than a published universal PLC driver catalogue.

These are vendor or standards-based capabilities. None of them is proof that a product supports *your* exact controller, tag structure, polling limits or ERP workflow.

**Expected result:** a tested extraction route for each required source.

**Warning:** OPC DA depends on Microsoft COM security and does not define modern identity controls by itself. Design authentication and access controls around any wrapper.

---

### 3. Broker Data Across a Controlled OT and IT Boundary

Keep industrial control protocols inside isolated OT segments and broker approved data through a demilitarised zone.

Record every necessary connection, protocol, TCP or UDP port, business justification, approval and review date. NCSC guidance on OT connectivity records supports using exactly that information to create precise network zones, conduits and firewall rules.

For OT-to-IT transfer, the NCSC describes patterns such as OPC UA over TLS, MQTT over TLS, HTTPS, or a replicated historian sitting in the DMZ. Analytics should query the brokered or replicated data rather than reaching directly into controller networks.

For OPC UA, test certificate trust, encryption, signing, application identity, user authorisation and read or write permissions. The OPC UA security model is explicit that secure transport does not decide which operations an authenticated user may perform.

**Expected result:** analytics can consume approved production data without access to PLC command functions.

**Warning:** do not extend Modbus, OPC DA, EtherNet/IP or any other legacy control protocol into an IT network merely because a client can read it.

---

### 4. Normalise Machine and ERP Data Into Operational Records

Normalise PLC and ERP data around manufacturing *meaning*, not around whichever field names the source systems happen to use.

Define common records for machines, events, jobs, orders, batches, materials, shifts, setpoints, quantities, units and timestamps. Assign an owner to every identifier and transformation rule.

The [Government Data Quality Framework](https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework) provides six useful tests: completeness, uniqueness, consistency, timeliness, validity and accuracy. Set thresholds according to the decision being made. Live stoppage diagnosis needs very different timeliness from monthly margin analysis.

A useful engineering insight here is to **measure context confidence separately from signal quality**. A PLC event may have an accurate value and an accurate timestamp and still be joined to the wrong ERP order. Treat the machine reading and the contextual association as two distinct quality checks.

The Eclipse Sparkplug specification can standardise MQTT topics, payloads and connection state. It does not define what a plant-specific tag means, and it will not resolve mismatched ERP identifiers.

**Expected result:** each relevant machine event has a traceable relationship to the correct production context.

---

### 5. Apply Governance to Operator and Shift Data

Apply privacy controls whenever operator, shift, ERP or performance records identify or relate to people.

Map the processing purpose, access roles, retention period and destination of the data. Use shift-level context where individual identity is unnecessary.

Information Commissioner's Office guidance requires organisations to limit personal information to what is necessary for the stated purpose. Relevant controls include minimisation, deletion, encryption, pseudonymisation and role-based access.

Record every connector, tag map, firewall change, transformation and approval through change control and version control.

**Expected result:** production context remains available without copying personal information more widely than the operational purpose requires.

---

### 6. Convert Visibility Into Operational Intelligence

Manufacturing operational intelligence should explain *why* performance changed and support a named operational decision.

Suppose a CNC cell records repeated short stops during one order. A useful analysis connects those events with the batch, material, shift, setpoints and order transitions. The engineer can then assess contributing factors and decide whether to change a setting, inspect material or investigate the process.

Inshira describes its platform as a software overlay using existing PLC counters, logs, databases and spreadsheets. Its first-party capabilities include finding short PLC-recorded stoppages, tracking material waste, causal mapping and what-if modelling, and the platform does not push code back to active PLCs.

Those claims do not replace compatibility discovery. Inshira does not publish a universal matrix covering PLC vendors, firmware versions, ERP releases, protocols or minimum data history.

NCSC guidance is that monitoring, analytics and business systems should observe and analyse rather than command OT assets. Route each recommendation to an authorised engineer or operator through existing control procedures.

**Expected result:** explainable findings lead to reviewed actions, while existing control systems retain command authority.

---

### 7. Pilot the Architecture and Prove Isolation

Pilot one machine, one cell or one production loss before extending the architecture across the factory.

Set acceptance criteria for connectivity, data quality, cybersecurity, causal usefulness and operator response. Compare the resulting action with the original baseline.

Then disconnect the analytics route. Confirm that critical OT functions continue safely, and restore the approved connection using the documented procedure. The NCSC isolation principle recommends testing isolation plans regularly and linking them to business continuity arrangements.

Approve scaling only when the pilot demonstrates:

1. Traceable PLC and ERP records within defined quality thresholds
2. Read-only access, allowlisted traffic, logging and alerting
3. Safe disconnection and controlled restoration
4. Engineer-reviewed findings tied to a measurable intervention

---

### Troubleshooting Common Integration Failures

Correct these at the source or the boundary, rather than hiding them in reporting logic.

| Symptom | First actions |
| --- | --- |
| The controller slows or drops communications | Isolate the connector, stop unapproved polling, return to an OEM-tested extraction method |
| PLC events match the wrong ERP orders | Check clock synchronisation, time zones, order transitions, batch identifiers and mapping versions |
| Authenticated users can see excessive data | Review service accounts, application roles, tag permissions, personal-data access and retention |
| Dashboards produce no action | Narrow the pilot to one named loss, one decision owner, one response deadline and one post-action measure |

---

### Where to Start

Scope one read-only pilot around a known production loss. Use the inventory, the security boundary, the data-quality rules and the isolation test to assess whether the Inshira Operational Intelligence Platform fits your actual PLC and ERP estate before considering any wider deployment.
`
  },
  {
    id: 'waste-to-energy-circular-manufacturing',
    title: 'Waste to Energy in Manufacturing: Where It Fits in a Circular Strategy',
    slug: 'waste-to-energy-circular-manufacturing',
    metaTitle: 'Waste to Energy in Manufacturing | Circular Strategy',
    metaDescription: 'How SME manufacturers should place waste-to-energy inside a circular strategy. Covers the statutory waste hierarchy, 2026 Landfill Tax, UK ETS from 2028, and the recovery routes worth evaluating.',
    keywords: ['waste to energy manufacturing','circular manufacturing UK','anaerobic digestion manufacturing waste','refuse derived fuel SME','waste hierarchy compliance','landfill tax 2026','UK ETS energy from waste','material yield loss recovery'],
    datePublishedISO: '2026-08-05',
    dateModifiedISO: '2026-08-05',
    image: 'https://www.inshira.co.uk/assets/og-image.png',
    areaServed: ['GB','EU'],
    category: 'Circular Economy',
    excerpt: 'Energy recovery is the fourth rung of the statutory waste hierarchy, not the first. This guide sets out where waste-to-energy genuinely belongs for SME manufacturers, what the 2026 Landfill Tax and 2028 UK ETS changes mean for the numbers, and how to identify the waste worth preventing before you burn it.',
    publishDate: 'August 5, 2026',
    readingTime: '9 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Managing Director & Founder, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/about/',
      id: HARRIS_ID,
      sameAs: HARRIS_SAME_AS,
      profileUrl: HARRIS_LINKEDIN,
      profileLabel: 'LinkedIn',
      avatar: '/assets/FLARE 2026 051.JPG'
    },
    coAuthors: [
      {
        name: 'Van Nguyen',
        role: 'Market Development Lead (Vietnam), Inshira Technologies',
        credentials: 'MSc, BSc',
        url: 'https://www.inshira.co.uk/about/',
        avatar: '/assets/van.jpeg'
      }
    ],
    content: `
### Circularity Is a Sequence, Not a Slogan

"Circular" has become a difficult word in manufacturing. It appears in sustainability reports, on supplier questionnaires, and increasingly in customer tender documents, but it is rarely accompanied by an operational definition. For a plant manager being asked to demonstrate circular credentials, the practical question is narrower and much more useful: **of the material leaving this factory as waste, how much should never have become waste, and what is the best available destination for the rest?**

That question already has a legal answer in the form of the waste hierarchy. Introduced in the EU Waste Framework Directive and carried into domestic law through the Waste (England and Wales) Regulations 2011, it sets a priority order that businesses have a duty to apply:

1. **Prevention** — do not generate the waste in the first place.
2. **Preparing for re-use** — clean, repair or recondition so the item is used again.
3. **Recycling** — reprocess the material into new material or products.
4. **Other recovery** — including energy recovery, where recycling is not practicable.
5. **Disposal** — landfill or incineration without recovery, as a last resort.

Waste-to-energy sits at position four. Not first, not second, and crucially, not a substitute for the three rungs above it.

---

### Why Energy Recovery Sits Where It Does

The logic is straightforward once stated plainly. When you recover energy from a tonne of production scrap, you capture a fraction of the embodied energy that went into making it. You do not recover the raw material cost, the machine hours, the labour, the consumables, or the energy already spent processing it up to the point of failure.

A polymer offcut burned for energy returns a portion of its calorific value. The same offcut prevented returns its full purchase price, the processing energy, the machine capacity it occupied, and the downstream handling cost. The gap between those two outcomes is usually an order of magnitude.

This is why the framing matters. *Waste-to-energy is a good answer to the wrong question if the waste was avoidable.* It is a genuinely valuable route for residues that are unavoidable, contaminated beyond economic recycling, or for which no viable reprocessing market exists. It is a poor route for yield loss you have simply not measured yet.

---

### The Economics Have Moved

Two policy changes have altered the arithmetic for UK manufacturers, and both point in the same direction.

**Landfill Tax.** From 1 April 2026 the standard rate is £130.75 per tonne, with the lower rate for qualifying inert material at £8.65 per tonne. Scotland and Wales have aligned their rates. For a manufacturer sending mixed production waste to landfill, the disposal line is now dominated by tax rather than gate fee or haulage.

**Carbon pricing on energy from waste.** Energy-from-waste and waste incineration facilities are scheduled to enter the UK Emissions Trading Scheme from 1 January 2028, preceded by a two-year monitoring, reporting and verification period beginning in 2026. Operators will need to surrender allowances covering the fossil-derived share of their emissions — principally the plastics content of residual waste. The scope follows Small Waste Incineration Plant thresholds.

The second point deserves attention from anyone treating waste-to-energy as a settled long-term answer. Gate fees at energy-recovery facilities are unlikely to be immune from a carbon cost applied to the fossil fraction of what they burn. The more plastic in your residual stream, the more exposed that route becomes.

---

### Recovery Routes Worth Evaluating

Different waste streams suit different recovery routes. The table below covers the options most commonly available to SME manufacturers.

| Route | Best suited to | Practical notes |
| :--- | :--- | :--- |
| **Anaerobic digestion** | Food and beverage residues, organic sludges, washwater solids | Produces biogas and digestate. Segregation at source is the main constraint. |
| **Refuse-derived fuel (RDF/SRF)** | Mixed non-recyclable residual waste | Diverts from landfill. Exposure to future carbon cost on the fossil fraction. |
| **Biomass combustion** | Untreated wood, pallets, timber offcuts, paper residues | Well-established. Treated or coated timber usually falls outside scope. |
| **Solvent recovery and reuse** | Coating, cleaning and printing operations | Recovery for reuse ranks above energy recovery in the hierarchy. |
| **Process heat recovery** | Ovens, dryers, curing lines, compressors | Not waste-to-energy strictly, but frequently the highest-return option on site. |

The last row is the one most often overlooked. Recovering waste *heat* from an existing thermal process requires no waste contract, no gate fee, and no external counterparty, and it reduces purchased energy directly.

---

### Prevention First: Finding the Waste Worth Not Making

The reason prevention sits at the top of the hierarchy and yet receives the least attention is not ideological. It is that prevention requires knowing precisely where material is being lost, and most SME manufacturers do not have that visibility.

Aggregate scrap figures are almost always available. Stage-level figures rarely are. A plant may know it is running at 94% material yield without being able to say which stage, which shift, which grade change or which batch condition accounts for the missing 6%. Without that resolution, prevention becomes guesswork, and energy recovery becomes the path of least resistance.

Useful questions to answer before committing capital to any recovery route:

* **Which production stage generates each waste stream?** Not the department. The stage.
* **What proportion is structural versus variable?** Structural loss is inherent to the process design. Variable loss changes with setup, operator, material batch or ambient conditions, and is usually addressable without capital.
* **What does each stream actually cost?** Raw material at purchase price, plus processing energy consumed before the loss occurred, plus machine time, plus handling and disposal.
* **What is the contamination profile?** This determines which recovery routes are open to you and at what gate fee.

Answering these turns a waste problem into a ranked list of interventions with financial values attached.

---

### Building the Business Case

A defensible evaluation runs roughly as follows.

1. **Baseline by stage, not by site.** Establish where each stream originates and in what quantity. Existing data — ERP consumption records, weighbridge tickets, batch reports, machine logs — is usually sufficient to start.
2. **Separate avoidable from unavoidable.** Apply prevention effort to the avoidable fraction first. It has the shorter payback and no ongoing contract.
3. **Route the genuine residue.** Match the unavoidable remainder to the recovery option that fits its composition, volume and contamination profile.
4. **Stress-test against policy.** Model the route against rising landfill tax and, for energy recovery, a carbon cost on the fossil fraction from 2028.
5. **Measure continuously.** Waste profiles drift as product mix, suppliers and volumes change. A one-off audit dates quickly.

---

### Where Inshira Fits

Inshira works on the first two steps. The platform maps material and energy flows at stage level using data manufacturers already hold, quantifies losses in cost, material and energy terms, and identifies which losses are variable and therefore addressable.

The approach draws on peer-reviewed research into circular manufacturing, including the SHIF Framework published in the *Journal of Cleaner Production*, which examines how circular principles can be embedded in product and process development rather than applied after the fact.

The conclusion we keep returning to is unglamorous but consistent: **the cheapest tonne of waste to manage is the one never produced, and the second cheapest is the one you understood well enough to route correctly.** Energy recovery has a legitimate and useful place in that sequence. It simply is not the beginning of it.
`
  },
  {
    id: 'what-is-operational-intelligence',
    title: 'What is Operational Intelligence in Manufacturing? The SME Blueprint',
    slug: 'what-is-operational-intelligence',
    metaTitle: 'What is Operational Intelligence in Manufacturing? | Inshira',
    metaDescription: 'Operational Intelligence explained for UK SME manufacturers. How OI differs from traditional BI, the three pillars it rests on, and how to apply it without new sensors or an ERP migration.',
    keywords: ['operational intelligence manufacturing','operational intelligence vs business intelligence','manufacturing analytics SME','industry 4.0 for SMEs','causal analysis manufacturing','decision support manufacturing UK'],
    datePublishedISO: '2026-06-18',
    dateModifiedISO: '2026-08-05',
    image: 'https://www.inshira.co.uk/assets/og-image.png',
    areaServed: ['GB','EU'],
    category: 'Educational Guides',
    excerpt: 'Explore how Operational Intelligence (OI) goes beyond traditional Business Intelligence (BI) to deliver continuous, real-time decision support directly to the factory floor without ERP upgrades.',
    publishDate: 'June 18, 2026',
    readingTime: '7 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Managing Director & Founder, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/about/',
      id: HARRIS_ID,
      sameAs: HARRIS_SAME_AS,
      profileUrl: HARRIS_LINKEDIN,
      profileLabel: 'LinkedIn',
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
    image: 'https://www.inshira.co.uk/assets/og-image.png',
    areaServed: ['GB','EU'],
    category: 'Continuous Improvement',
    excerpt: 'BI dashboards tell you how much money you lost last month. Discover why manufacturers need decision intelligence, real-time root cause analysis, and proactive "what-if" modeling to survive.',
    publishDate: 'June 22, 2026',
    readingTime: '6 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Managing Director & Founder, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/about/',
      id: HARRIS_ID,
      sameAs: HARRIS_SAME_AS,
      profileUrl: HARRIS_LINKEDIN,
      profileLabel: 'LinkedIn',
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
When a machine goes down for 45 minutes, a dashboard records "45 minutes downtime." It does not translate that event into the cost lines that actually matter. Taking a worked example, a single 45-minute stoppage decomposes into at least three separate costs:
* **The direct labour cost** of idle operators
* **The energy wasted** maintaining auxiliary heat while non-productive
* **The delayed delivery penalty** of missing the next shipment

The specific values differ for every plant, which is the point. Until those three lines are populated with *your* numbers, downtime remains a duration rather than a decision.

By failing to quantify the business impact in financial terms, standard dashboards prevent operations directors from prioritizing continuous improvement budgets where they matter most.

#### 3. No "What-If" Predictive Modeling
A traditional dashboard cannot answer a simple but vital question: *"If I invest £15,000 to optimize the changeover routine of Line 1, what will be the annual payback period, and how will it affect our overall factory energy profile?"* 

---

### Enter Decision Intelligence: The Inshira Evolution

Operational Intelligence bridges the gap between data display and executive action. Instead of presenting a chart and leaving the analysis to a busy team, Inshira generates a **Weekly Action Hub** containing specific, prioritized recommendations:

* **Format of a recommendation:** "Adjust cooling rate of Extruder 2 during polypropylene transitions." Paired with the expected scrap reduction and its value per week, derived from that plant's own material and energy costs.
* **Format of a sequencing recommendation:** "Reschedule Batch #459 to run immediately after Batch #452." Paired with the changeover minutes saved and the annual value of those minutes at that line's throughput.

Note the shape of these: an action a shift lead can take, and a number derived from that plant's data rather than an industry average.

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
    image: 'https://www.inshira.co.uk/assets/og-image.png',
    areaServed: ['GB','EU'],
    category: 'Operational Excellence',
    excerpt: 'A comprehensive step-by-step operational guide for continuous improvement leads on diagnosing micro-stoppages, analyzing PLC logs, and using automated root cause systems.',
    publishDate: 'May 30, 2026',
    readingTime: '8 min read',
    author: {
      name: 'Dr. Mohammad Harris',
      role: 'Managing Director & Founder, Inshira Technologies',
      credentials: 'PhD, MRes, BEng (Hons), FHEA, MIET',
      url: 'https://www.inshira.co.uk/about/',
      id: HARRIS_ID,
      sameAs: HARRIS_SAME_AS,
      profileUrl: HARRIS_LINKEDIN,
      profileLabel: 'LinkedIn',
      avatar: '/assets/FLARE 2026 051.JPG'
    },
    content: `
### Downtime: The Silent Profit Killer in UK Manufacturing

Siemens and Senseye's [True Cost of Downtime](https://assets.new.siemens.com/siemens/assets/api/uuid:3d606495-dbe0-43e4-80b1-d04e27ada920/dics-b10153-00-7600truecostofdowntime2022-144.pdf) research puts unplanned downtime at roughly **11% of annual turnover** across the world's 500 largest companies, and found that **two thirds of plants surveyed experience unplanned downtime at least monthly**. Hourly costs vary enormously by sector — from around $36,000/hour in FMCG to $2.3m/hour in automotive.

Those are large-enterprise figures, and that is precisely the problem. **An SME cannot borrow someone else's downtime number.** Your cost per hour depends on your margin, your labour profile, your energy draw and your contractual penalties. The first useful step is not benchmarking against a published average — it is deriving your own figure from your own data.

What the engineering evidence does support is that a substantial share of unplanned downtime is *addressable without capital expenditure*, because so much of it originates in recurring, under-recorded micro-stoppages rather than in genuine equipment failure.

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
* **What the simulator returns:** the modelled downtime reduction and payback period for that specific change, computed from the line's own cycle times and cost base.

This evidence-backed approach allows engineering teams to secure executive buy-in with absolute clarity.

---

### Sources

* Siemens & Senseye, [The True Cost of Downtime](https://assets.new.siemens.com/siemens/assets/api/uuid:3d606495-dbe0-43e4-80b1-d04e27ada920/dics-b10153-00-7600truecostofdowntime2022-144.pdf) — downtime as a share of turnover, and sector hourly cost ranges.
    `
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'precision-automotive-components',
    title: 'Micro-Stoppages Hiding Behind "General Mechanical Fault"',
    client: '',
    industry: 'Automotive & Precision Machining',
    size: 'Typical profile: 100-200 employees, multi-spindle CNC',
    challenge: 'Frequent micro-stoppages across CNC lines that standard BI reporting logs as "general mechanical faults". The stoppages are recorded, but the upstream thermal variance driving accelerated tool wear never appears in the report, so the same fault recurs indefinitely.',
    solution: 'We ingest PLC logs alongside shift scheduling data and map tool-tip wear against raw material batches and coolant temperature cycles. Sustained deviations of as little as 2°C in coolant delivery become visible as a distinct causal signature rather than noise.',
    results: {
      downtimeReduction: 'Unplanned downtime and micro-stoppages',
      wasteReduction: 'Tool wear and scrap from out-of-tolerance parts',
      annualSavings: 'PLC logs, shift schedules, material batch records',
      paybackPeriod: 'Coolant temperature drift vs tool-tip wear'
    }
  },
  {
    id: 'packaging-solutions-ltd',
    title: 'Changeover Variance That Averages Out and Disappears',
    client: '',
    industry: 'Packaging & Paper Conversion',
    size: 'Typical profile: 50-150 employees, high-variety converting',
    challenge: 'Four to five grade changes daily with changeover times swinging between 20 and 75 minutes. Because reporting shows the average, the variance itself never becomes visible — yet the variance, not the mean, is what creates the throughput bottleneck and the material scrap.',
    solution: 'We combine operator logs with extruder temperature profiles to identify which cool-down ramp patterns produce the fastest changeovers, then convert that pattern into repeatable step-by-step guidance for the line.',
    results: {
      downtimeReduction: 'Line availability lost to changeover',
      wasteReduction: 'Startup scrap during grade transitions',
      annualSavings: 'Operator logs, extruder temperature profiles',
      paybackPeriod: 'Cool-down ramp pattern vs changeover duration'
    }
  },
  {
    id: 'premium-beverage-bottlers',
    title: 'Product Giveaway Invisible to Aggregate OEE',
    client: '',
    industry: 'Food & Beverage Processing',
    size: 'Typical profile: 80-150 employees, high-speed filling',
    challenge: 'Yield loss on modern filling lines with OEE stuck in the low seventies. Aggregate OEE confirms the loss is real but cannot say where it originates, so the assumption defaults to machinery when the cause is usually operational.',
    solution: 'We unify filling PLC counts with scale weight data and ERP order schedules, isolating systematic over-filling to specific line speeds and shift handover windows rather than to the equipment itself.',
    results: {
      downtimeReduction: 'Changeover delay and line stoppage',
      wasteReduction: 'Product giveaway from systematic over-fill',
      annualSavings: 'Filling PLC counts, scale weights, ERP schedules',
      paybackPeriod: 'Line speed and shift handover vs fill weight'
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
    answer: "Connection is designed to take days rather than months. Because we connect to your existing data repositories via secure read-only APIs, there is no physical installation, no hardware lead time and no ERP migration. Once a connection is live, the causal engine begins producing root cause output from the historical data already in those repositories, so you are not waiting on new data to accumulate before seeing anything."
  },
  {
    question: "Is our factory data secure? We have strict confidentiality rules.",
    answer: "Inshira connects read-only. We cannot write to your PLCs, controllers or line logic. Connections are encrypted in transit and at rest, each customer sits in an isolated environment, and we never share operational insights across accounts. We process data in line with UK GDPR and the Data Protection Act 2018. To be clear about what we are not: we do not hold ISO 27001 certification, and we will say so here if that changes."
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
