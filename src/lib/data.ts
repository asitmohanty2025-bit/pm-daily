export type PathDefinition = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  outcome: string;
  skills: string[];
  artifact: string;
  tone: "coral" | "blue" | "violet" | "amber";
};

export const paths: PathDefinition[] = [
  { slug: "product-craft", title: "Product Craft", eyebrow: "Think clearly", description: "Discovery, UX, prioritisation, metrics, and product strategy.", outcome: "Build PRDs, journeys, and experiment plans that show your judgment.", skills: ["Discovery", "Prioritisation", "Metrics"], artifact: "Experiment-ready product case", tone: "coral" },
  { slug: "technical-pm", title: "Technical PM", eyebrow: "Speak systems", description: "APIs, databases, payments, reliability, and system design.", outcome: "Create architecture and technical product documents engineers trust.", skills: ["APIs", "Systems", "Reliability"], artifact: "End-to-end system design", tone: "blue" },
  { slug: "ai-product-pm", title: "AI Product PM", eyebrow: "Build with intelligence", description: "LLMs, RAG, agents, evaluation, safety, and AI experience design.", outcome: "Design AI products with clear value, guardrails, and evaluation plans.", skills: ["AI UX", "Evaluation", "RAG"], artifact: "AI product specification", tone: "violet" },
  { slug: "portfolio-builder", title: "Portfolio Builder", eyebrow: "Make work visible", description: "Company challenges across Zomato, Netflix, Uber, Stripe, and more.", outcome: "Turn your thinking into interview-ready evidence and public case studies.", skills: ["Storytelling", "Cases", "Communication"], artifact: "Live PM evidence portfolio", tone: "amber" }
];

export const sampleChallenge = {
  title: "Improve login success",
  summary: "Diagnose a failing OTP funnel, choose the best intervention, and build an experiment-ready improvement plan.",
  problems: [
    { type: "Diagnose", title: "Find the real drop-off", prompt: "Review the funnel, identify the largest meaningful loss, and list the evidence you would request next.", stat: "48% complete login" },
    { type: "Decide", title: "Choose the first intervention", prompt: "Compare OTP resend, WhatsApp OTP, better validation, and email login. Choose one and defend the trade-off.", stat: "5 options" },
    { type: "Build", title: "Create the improved experience", prompt: "Map the new flow, define edge cases, instrumentation, success metrics, and rollout guardrails.", stat: "1 artifact" }
  ]
};

export const artifacts = [
  { title: "PRD", subtitle: "Problem, scope, decisions", tone: "coral" },
  { title: "Metric tree", subtitle: "Outcomes to inputs", tone: "blue" },
  { title: "Journey map", subtitle: "Needs, moments, friction", tone: "amber" },
  { title: "System design", subtitle: "Services and trade-offs", tone: "violet" },
  { title: "Experiment plan", subtitle: "Hypothesis to decision", tone: "green" }
];
