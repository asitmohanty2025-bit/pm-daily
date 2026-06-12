insert into public.learning_paths(slug,title,summary,outcome,status,position) values
('product-craft','Product Craft','Discovery, UX, prioritisation, metrics, and product strategy.','Build PRDs, journeys, and experiment plans that show your judgment.','published',1),
('technical-pm','Technical PM','APIs, databases, payments, reliability, and system design.','Create architecture and technical product documents engineers trust.','published',2),
('ai-product-pm','AI Product PM','LLMs, RAG, agents, evaluation, safety, and AI experience design.','Design AI products with clear value, guardrails, and evaluation plans.','published',3),
('portfolio-builder','Portfolio Builder','Company challenges across Zomato, Netflix, Uber, Stripe, and more.','Turn your thinking into interview-ready evidence.','published',4)
on conflict(slug) do nothing;

insert into public.skills(slug,name,description) values
('product-thinking','Product thinking','Frames useful problems and makes coherent product decisions.'),
('experimentation','Experimentation','Designs tests with clear metrics, guardrails, and decision rules.'),
('technical-fluency','Technical fluency','Understands system behavior, constraints, APIs, and reliability.'),
('ai-product','AI product thinking','Designs AI experiences with evaluation and guardrails.'),
('communication','Product communication','Communicates decisions, evidence, and trade-offs clearly.')
on conflict(slug) do nothing;
