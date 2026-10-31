/* ═══════════════════════════════════════════════════════════
   Content for index.html and record.html.
   Edit here; both pages update.

   own:false  → decided by an external body (amber marker)
   own:true   → authored or built by Adinath (grey marker)
   home:true  → also surfaced on the home page's condensed lists
   ═══════════════════════════════════════════════════════════ */

var RECORD = [
  { kind:"Award", group:"Recognition & service", own:false, home:true, year:"2026",
    title:"IBAC 2026 — Outstanding Graduate Research Award, First Place",
    dek:"Fredonia International Business Analytics Conference · SUNY Fredonia, 7–8 May 2026",
    body:"First Place, Outstanding Graduate Research Award at the Fredonia International Business Analytics Conference (IBAC) 2026. Proceedings publication forthcoming.",
    ev:"A juried award, decided by a panel of subject-matter experts rather than applied for.",
    image:"files/ibac.webp", w:900, h:1200, caption:"The award plaque, IBAC 2026, SUNY Fredonia.",
    link:"https://drive.google.com/drive/folders/12zsYLJjvqKBHzSU3s-4uI_JDGND9WBUn", linkLabel:"Award photographs" },

  { kind:"Under review", group:"Research", own:true, home:true, year:"2026",
    title:"ISAFM (Wiley) — governed multi-agent architecture",
    dek:"Intelligent Systems in Accounting, Finance &amp; Management · submitted, under review",
    body:"A governed multi-agent architecture for AI-assisted interpretation of FP&A reporting, submitted to Wiley’s <i>Intelligent Systems in Accounting, Finance &amp; Management</i> and currently under review.",
    ev:"Submitted to a peer-reviewed journal and under review. Listed as work in progress, not as a publication.",
    note:"No decision yet and no public link. This entry moves to the amber marker once the journal issues one." },

  { kind:"Research", group:"Research", own:true, home:true, year:"Jan 2026",
    title:"SSRN — cloud-native FP&A analytics framework",
    dek:"Working paper",
    body:"“A Cloud-Native FP&A Analytics Framework Bridging Data Engineering and Financial Analysis while Preserving Excel at Scale.” The framework paper: it argues the case for moving the fragile parts of FP&A upstream while leaving analysts the interface they already use.",
    ev:"Open scholarship establishing the research line the later work builds on.",
    link:"https://ssrn.com/abstract=6091647", linkLabel:"Read on SSRN" },

  { kind:"Research", group:"Research", own:true, home:true, year:"2026",
    title:"Zenodo — FP&A data-pipeline preprint",
    dek:"Open-access preprint",
    body:"The specification companion to the SSRN paper: where that one argues the framework, this one documents the pipeline stage by stage — ingestion → cloud database → light ETL → semantic model → dashboard.",
    ev:"Citable open-access record of the reference architecture.",
    link:"https://zenodo.org/records/20263655", linkLabel:"View on Zenodo" },

  { kind:"Article", group:"Research", own:true, home:true, year:"2026",
    title:"FP&A Trends — AI in FP&A: automation vs. judgment",
    dek:"Feature article · carried in Digest Issue 170",
    body:"Where AI belongs in the FP&A workflow, and where human judgment has to stay. Selected for the FP&A Trends Digest and distributed to a practitioner list of more than 17,000, then featured again in the FP&A Trends Club on LinkedIn.",
    ev:"Written by me; the editorial selection and the distribution were the publication’s decision.",
    image:"files/fpa.webp", w:1000, h:781, caption:"Confirmation of selection for the FP&A Trends Digest, Issue 170.",
    link:"https://fpa-trends.com/article/ai-fpa-line-between-automation-and-judgement", linkLabel:"Read the article",
    link2:"https://fpa-trends.com/author/adinath-kadam", link2Label:"Author profile" },

  { kind:"Article", group:"Research", own:true, home:true, year:"Oct 2026",
    title:"FP&A Trends — can the CFO control the AI prototype?",
    dek:"&ldquo;Your FP&A AI Prototype Works. But Can the CFO Control It?&rdquo; &middot; 29 October 2026",
    body:"Five controls &mdash; source, calculation, context, generation and approval &mdash; that make an AI-assisted reporting prototype auditable: KPIs computed in SQL and Python, the language model restricted to explaining figures it was handed, and a named person signing off before anything leaves. The rule it argues from is the one the insurance agent above is built on: the model explains, it does not calculate.",
    ev:"Written by me; the decision to publish it was the publication&rsquo;s.",
    link:"https://fpa-trends.com/article/your-fpa-ai-prototype-works-can-cfo-control-it", linkLabel:"Read the article" },

  { kind:"System", group:"Systems", own:true, year:"2026",
    title:"Insurance FP&A agent — live prototype",
    dek:"Python · cloud database · Streamlit",
    body:"A working prototype that ingests insurance-finance data and returns variance analysis, KPI commentary, premium forecasting and drafted management-reporting narrative. Calculations are deterministic; the language layer only narrates figures it is handed.",
    ev:"Hosted and running — the AI-assisted reporting argument in executable form.",
    link:"https://insurance-premium-fpaa-agent-zqbtzjmr6bpyvj6muapykw.streamlit.app/", linkLabel:"Open the live app",
    note:"Runs on synthetic, non-confidential data only." },

  { kind:"System", group:"Systems", own:true, year:"2024–26",
    title:"Cloud-native FP&A reporting pipeline",
    dek:"Source files → Python → cloud database → Power Query → semantic model → dashboard",
    body:"A governed, repeatable reporting pipeline: automated ingestion into a cloud database, light ETL in Power Query, a maintained semantic model, and dashboards analysts can use without re-deriving the numbers.",
    ev:"The reference architecture documented in the SSRN paper and the Zenodo preprint.",
    note:"Described in sanitized form only; no client or employer data, and no confidential figures, appear on this site." },

  { kind:"Speaking", group:"Speaking & teaching", own:false, home:true, year:"2026",
    title:"AFP FP&A Forum 2026 — selected speaker",
    dek:"“Excel Isn’t the Problem — Your FP&A Data Pipeline Is”",
    body:"Selected to present on Excel, Power Query, finance data pipelines and scalable reporting architecture.",
    ev:"Selected by the Association for Financial Professionals from an open call.",
    image:"files/afp.webp", w:900, h:1200, caption:"Speaker selection, AFP FP&A Forum 2026.",
    link:"https://drive.google.com/drive/folders/1lTNyP19MRoPikA94becvHR-ivaPW4IGZ", linkLabel:"Selection evidence" },

  { kind:"Teaching", group:"Speaking & teaching", own:false, home:true, year:"2026",
    title:"Stevens Institute of Technology — invited guest lectures",
    dek:"School of Business · two invited lectures to graduate business students",
    body:"Two invited guest lectures at the Stevens Institute of Technology School of Business, on finance data pipelines and the reporting architecture underneath FP&A.",
    ev:"Invited teaching — the institution issued the invitation.",
    image:"files/stevens.webp", w:980, h:735, caption:"Guest lecture, Stevens Institute of Technology School of Business.",
    link:"https://drive.google.com/drive/folders/1THLzWSrTC9BmW457-XXu6_vd0Pm8rAN6", linkLabel:"Lecture evidence" },

  { kind:"Review", group:"Recognition & service", own:false, home:true, year:"2025–26",
    title:"Peer review — OrangeAVA and GBEJ",
    dek:"Technical book reviewer, OrangeAVA · peer reviewer, Global Business &amp; Economics Journal (GBEJ)",
    body:"Technical book reviewer for the publisher OrangeAVA, assessing manuscripts on data and analytics before publication, and peer reviewer for the Global Business &amp; Economics Journal — reading submitted papers and recommending accept, revise or reject.",
    ev:"External organizations relying on my assessment of other people’s work." }
];

var PRESS = [
  { outlet:"Zawya", meta:"LSEG · June 2026", home:true,
    head:"Rising cost drag prompts construction sector to re-evaluate SaaS models",
    desc:"Quoted throughout as a US-based FP&A systems architect — on SaaS cost drag, cloud-native FP&A migration, and AI-assisted financial decision-making.",
    flag:"Reported by Dennis Daniel and edited by Anoop Menon for Zawya, part of LSEG. How it came about: the feature was pitched to Zawya by the editor of The Built Economy, following the interview below.",
    image:"files/zawya.webp", w:1000, h:637, caption:"The Zawya feature as published, June 2026.",
    link:"https://www.zawya.com/en/projects/construction/rising-cost-drag-prompts-construction-sector-to-re-evaluate-saas-models-oxjpcafi",
    linkLabel:"Read the feature" },

  { outlet:"Tech Times", meta:"By Carl Williams · 4 August 2026", home:true,
    head:"Why finance AI fails: Adinath Kadam on data infrastructure",
    desc:"A profile of the argument that finance AI fails on data infrastructure rather than on models — governed sources, traceability, and human oversight.",
    link:"https://www.techtimes.com/articles/322989/20260804/why-finance-ai-fails-adinath-kadam-data-infrastructure.htm",
    linkLabel:"Read the article" },

  { outlet:"The Built Economy", meta:"Video interview · Editor in Chief", home:true,
    head:"Cloud-native FP&A: replacing SaaS with open-source AWS architecture",
    desc:"An invited expert interview with Dennis Daniel, Editor in Chief, structured across six sections on migrating FP&A off packaged SaaS and onto cloud-native architecture.",
    youtube:"IwOGnADobnI", caption:"The Built Economy interview, recorded April 2026.",
    link:"https://www.youtube.com/watch?v=IwOGnADobnI&t=2286s",
    linkLabel:"Watch on YouTube" },

  { outlet:"HackerNoon", meta:"Profile",
    head:"Cloud-native finance transformation with Adinath Kadam",
    desc:"A profile of the cloud-native FP&A work and the reasoning behind keeping Excel as the analyst-facing layer.",
    link:"https://hackernoon.com/cloud-native-finance-transformation-with-adinath-kadam",
    linkLabel:"Read the profile" },

  { outlet:"FP&A Trends", meta:"Digest Issue 170 · LinkedIn feature",
    head:"Selected for the FP&A Trends Digest and the FP&A Trends Club",
    desc:"Editorial selection distributed to more than 17,000 finance practitioners, followed by a feature post from FP&A Trends on LinkedIn.",
    flag:"The underlying article is my own writing; the selection and distribution were the publication’s decision.",
    link:"https://www.linkedin.com/posts/larysamelnychuk_fpatrends-fpatrendsdigest-aiinfinance-share-7484921969675550720-ZzNs/",
    linkLabel:"See the feature" }
];
