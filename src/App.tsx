import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Brain,
  Check,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileSearch,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Search,
  Server,
  Sparkles,
  TrendingUp,
  Trophy,
  X,
  Zap,
} from 'lucide-react';

const profileImage = '/images/WhatsApp_Image_2026-08-11_at_9.23.15_PM.jpeg';
const githubUrl = 'https://github.com/ritigyas';
const linkedinUrl = 'https://www.linkedin.com/in/ritigya-singh-1a7946275/';
const leetcodeUrl = 'https://leetcode.com/u/QkWrFhbrHE/';
const email = 'rsingh7_be23@thapar.edu';

const roles = ['Software Engineer', 'Full-Stack Developer', 'Generative AI Developer', 'Backend Engineer'];

const featuredProjects = [
  {
    number: '01',
    title: 'Financial Multi AI Agent',
    eyebrow: 'Agentic Intelligence · Financial Systems',
    description: 'An agentic AI financial assistant capable of autonomous reasoning, intelligent tool selection, and multi-step task execution through LLM-driven workflows.',
    highlights: ['Agentic AI workflows', 'Tool calling & function execution', 'Live financial data & stock insights', 'Web search & market intelligence'],
    stack: ['Python', 'Phidata', 'YFinance', 'DuckDuckGo', 'Streamlit'],
    accent: 'blue',
    github: 'https://github.com/ritigyas/Financial-Agent',
    visual: 'agent',
  },
  {
    number: '02',
    title: 'Medical Chatbot',
    eyebrow: 'Conversational AI · Production RAG',
    description: 'Production-deployed conversational RAG chatbot using LangChain, HuggingFace Sentence Transformers, and Pinecone vector database for semantic retrieval over a medical knowledge base.',
    highlights: ['History-aware retrieval', 'Pinecone vector database', 'Conversation memory & multi-turn QA', 'Docker & Render deployment'],
    stack: ['Python', 'Flask', 'LangChain', 'Groq Llama 3.1', 'Pinecone', 'Docker'],
    accent: 'green',
    github: 'https://github.com/ritigyas/Medical_Chatbot',
    demo: 'https://medical-chatbot-rs.onrender.com',
    visual: 'chat',
  },
  {
    number: '03',
    title: 'Legal Intelligence Engine',
    eyebrow: 'Document Intelligence · Explainable AI',
    description: 'LLM-powered legal analysis system implementing the IRAC framework with PDF ingestion, semantic search, and vector embedding-based retrieval for legal document question answering.',
    highlights: ['PDF ingestion & chunking', 'Multi-document retrieval', 'Gemini-powered reasoning', 'IRAC-based analysis'],
    stack: ['Python', 'Streamlit', 'LangChain', 'RAG', 'Gemini API'],
    accent: 'orange',
    github: 'https://github.com/ritigyas/LegalAI_DL',
    visual: 'legal',
  },
];

const additionalProjects = [
  {
    title: 'AI Invoice Validation System',
    description: 'Production document AI pipeline automating invoice extraction, validation, and intelligent field matching using Landing.ai Vision API.',
    stack: ['Django', 'Landing.ai', 'REST APIs', 'Python'],
    github: githubUrl,
    icon: FileSearch,
    metric: '90%+ accuracy',
  },
  {
    title: 'Health Risk Classifier',
    description: 'ML model classifying STI/RTI risk on 10,000+ survey records using deep autoencoder feature extraction and cross-validation.',
    stack: ['Python', 'Scikit-Learn', 'Autoencoders', 'HDBSCAN'],
    github: githubUrl,
    icon: TrendingUp,
    metric: '+20% accuracy',
  },
  {
    title: 'Semantic Search Engine',
    description: 'Retrieval system using FAISS and Sentence Transformers for semantic similarity search across large document collections.',
    stack: ['Python', 'FAISS', 'HuggingFace', 'LangChain'],
    github: githubUrl,
    icon: Search,
  },
  {
    title: 'Multi-Agent Research Assistant',
    description: 'Collaborative multi-agent system for autonomous web research, summarization, and structured report generation.',
    stack: ['Python', 'LangChain', 'Multi-Agent', 'LLM APIs'],
    github: githubUrl,
    icon: Brain,
  },
  {
    title: 'PDF Intelligence Pipeline',
    description: 'Document processing pipeline with intelligent chunking, vector embeddings, and ChromaDB for multi-format ingestion.',
    stack: ['Python', 'LangChain', 'ChromaDB', 'Gemini'],
    github: githubUrl,
    icon: Layers,
  },
  {
    title: 'Sentiment Analysis Dashboard',
    description: 'Real-time NLP dashboard for sentiment classification and trend visualization using spaCy and NLTK.',
    stack: ['Python', 'Streamlit', 'spaCy', 'NLTK', 'Pandas'],
    github: githubUrl,
    icon: TrendingUp,
  },
  {
    title: 'Django REST API Service',
    description: 'Scalable backend API service with authentication, rate limiting, and structured data models for web applications.',
    stack: ['Django', 'REST APIs', 'PostgreSQL', 'Docker'],
    github: githubUrl,
    icon: Server,
  },
  {
    title: 'AI News Aggregator',
    description: 'Intelligent news aggregation system using DuckDuckGo search and LLM summarization for personalized content delivery.',
    stack: ['Python', 'DuckDuckGo', 'LLM APIs', 'Streamlit'],
    github: githubUrl,
    icon: Sparkles,
  },
  {
    title: 'Vector DB Query Tool',
    description: 'Unified interface for querying across Pinecone, FAISS, and ChromaDB with embedding comparison and similarity scoring.',
    stack: ['Python', 'Pinecone', 'FAISS', 'ChromaDB'],
    github: githubUrl,
    icon: Database,
  },
];

const skillGroups = [
  { label: 'Languages', icon: Code2, items: ['Python', 'C++', 'JavaScript', 'SQL'] },
  { label: 'AI / ML / LLM', icon: Sparkles, items: ['LangChain', 'Phidata', 'RAG', 'Prompt Engineering', 'LLM APIs', 'Gemini', 'Tool Calling', 'Multi-Agent Systems', 'Scikit-Learn', 'TensorFlow', 'XGBoost', 'Pandas', 'NumPy', 'spaCy', 'NLTK'] },
  { label: 'Backend / Web', icon: Server, items: ['Django', 'Node.js', 'REST APIs', 'HTML', 'CSS', 'Streamlit'] },
  { label: 'Databases / Vector', icon: Database, items: ['Oracle SQL', 'MySQL', 'MongoDB', 'Pinecone', 'ChromaDB', 'FAISS'] },
  { label: 'Developer Tools', icon: Layers, items: ['Git', 'GitHub', 'VS Code', 'Docker', 'CI/CD'] },
];

const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

const tickerTechs = ['Python', 'Django', 'LangChain', 'RAG', 'Pinecone', 'Flask', 'Docker', 'Gemini', 'Phidata', 'TensorFlow', 'REST APIs', 'Vector Databases'];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-stagger, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState('Home');
  useEffect(() => {
    const onScroll = () => {
      const sections = ['home', ...navItems.map((n) => n.toLowerCase())];
      let current = 'Home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 160) {
          current = section === 'home' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1);
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}

function WordRotator({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setExiting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, [words.length]);
  return (
    <span className="word-rotator">
      <span className={`word ${exiting ? 'exiting' : 'active'}`}>{words[index]}</span>
    </span>
  );
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);
  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-num">{count.toFixed(2).replace(/\.?0+$/, '')}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function ProjectVisual({ type, accent }: { type: string; accent: string }) {
  return (
    <div className={`project-visual visual-${accent}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-window">
        <div className="window-bar"><span /><span /><span /><b>{type === 'agent' ? 'market_agent.py' : type === 'chat' ? 'retrieval_context' : 'irac_analysis'}</b></div>
        {type === 'agent' && (
          <div className="agent-map">
            <div className="agent-node root">AI Agent</div>
            <div className="agent-line line-a" />
            <div className="agent-line line-b" />
            <div className="agent-node tool one">YFinance</div>
            <div className="agent-node tool two">Search</div>
            <div className="agent-node tool three">Reason</div>
            <div className="agent-query">What is moving the market today?</div>
          </div>
        )}
        {type === 'chat' && (
          <div className="chat-ui">
            <div className="chat-label">MEDICAL KNOWLEDGE BASE <span>● live</span></div>
            <div className="chat-question">How does semantic retrieval work?</div>
            <div className="chat-answer"><i>AI</i><div><span className="line wide" /><span className="line" /><span className="line short" /></div></div>
            <div className="chat-input">Ask a follow-up question <b>→</b></div>
          </div>
        )}
        {type === 'legal' && (
          <div className="legal-ui">
            <div className="legal-heading">IRAC <small>analysis framework</small></div>
            <div className="legal-row active"><b>01</b><span>Issue</span><em>What is the question?</em><Check size={14} /></div>
            <div className="legal-row"><b>02</b><span>Rule</span><em>Applicable precedent</em></div>
            <div className="legal-row"><b>03</b><span>Application</span><em>Reasoning from evidence</em></div>
            <div className="legal-row"><b>04</b><span>Conclusion</span><em>Explainable answer</em></div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">RS</span>
          <span>Ritigya Singh</span>
        </a>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          <a className={activeSection === 'Home' ? 'active' : ''} href="#home" onClick={closeMenu}>Home</a>
          {navItems.map((item) => (
            <a key={item} className={activeSection === item ? 'active' : ''} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
        </nav>
        <div className="header-links">
          <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="hero section-wrap">
          <div className="hero-bg" />
          <div className="hero-copy reveal-stagger">
            <div className="eyebrow"><span className="eyebrow-dot" /> Available for SDE & AI Engineering roles</div>
            <h1>
              Ritigya Singh.<br />
              <WordRotator words={roles} /><br />
              <span className="accent">building intelligent software.</span>
            </h1>
            <p className="hero-lede">
              Final-year Computer Engineering student crafting <strong>AI-powered software systems</strong>, intelligent applications, and scalable backend solutions.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">View Projects <ArrowUpRight size={16} /></a>
              <a className="button button-outline" href="#contact">Contact Me <ArrowUpRight size={16} /></a>
              <a className="resume-link" href={`mailto:${email}?subject=Resume%20request`}><Download size={15} /> Download Resume</a>
            </div>
            <div className="hero-stats">
              <StatCounter value={9.22} suffix="" label="CGPA" />
              <StatCounter value={2} suffix="" label="Internships" />
              <StatCounter value={12} suffix="+" label="Projects Built" />
              <StatCounter value={90} suffix="%" label="Extraction Accuracy" />
            </div>
          </div>
          <div className="hero-portrait reveal-scale">
            <div className="portrait-frame">
              <img src={profileImage} alt="Professional portrait of Ritigya Singh" />
              <div className="portrait-badge">
                <span>Currently building</span>
                <b>AI-first products</b>
              </div>
            </div>
            <div className="portrait-deco one" />
            <div className="portrait-deco two" />
          </div>
        </section>

        {/* Tech ticker */}
        <div className="tech-ticker">
          <div className="ticker-track">
            {[...tickerTechs, ...tickerTechs].map((tech, i) => (
              <span className="ticker-item" key={i}><span className="ticker-dot" />{tech}</span>
            ))}
          </div>
        </div>

        {/* About */}
        <section id="about" className="section section-wrap">
          <div className="reveal">
            <div className="section-kicker">01 — About</div>
            <div className="about-grid">
              <div>
                <h2>Turning complex problems into <span className="accent">clear, useful software.</span></h2>
              </div>
              <div className="about-copy">
                <p>I'm a final-year <strong>Computer Engineering</strong> student at Thapar Institute of Engineering and Technology with hands-on experience in software engineering, full-stack development, and Generative AI.</p>
                <p>I build with <strong>Python, Django, REST APIs, LangChain, RAG, vector databases, and LLM APIs</strong> — with a focus on backend engineering, intelligent automation, and AI-first products.</p>
                <a className="text-link" href="#experience">More about my experience <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </div>
          <div className="quick-facts reveal">
            <div className="fact-heading">Quick facts</div>
            <div className="fact-list">
              <span className="fact-pill"><GraduationCap size={16} /> B.Tech Computer Engineering</span>
              <span className="fact-pill"><Briefcase size={16} /> Final Year · Thapar University</span>
              <span className="fact-pill"><TrendingUp size={16} /> CGPA <b>9.22 / 10</b></span>
              <span className="fact-pill"><Code2 size={16} /> Software Engineering</span>
              <span className="fact-pill"><Server size={16} /> Backend Development</span>
              <span className="fact-pill"><Sparkles size={16} /> Generative AI</span>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="section experience-section">
          <div className="section-wrap">
            <div className="reveal" style={{ marginBottom: 56 }}>
              <div className="section-kicker">02 — Experience</div>
              <h2>Where I've made <span className="accent">an impact.</span></h2>
              <p className="section-sub">Recent work across production software, applied AI, and research.</p>
            </div>
            <div className="experience-grid reveal-stagger">
              <article className="exp-card">
                <div className="exp-date">Jul 2025 — Feb 2026</div>
                <h3 className="exp-role">Software Engineering Intern</h3>
                <p className="exp-company">Saarathi Finance</p>
                <ul>
                  <li>Engineered a production <strong>AI-powered invoice validation system</strong> using Django and Landing.ai Vision API, automating document extraction, validation, and intelligent field matching through REST APIs for live fintech workflows.</li>
                  <li>Designed PDF and CSV ingestion pipelines with source-of-truth validation, achieving <strong>90%+ extraction accuracy</strong> across real financial documents while significantly reducing manual verification effort.</li>
                </ul>
                <div className="exp-tech"><span>Django</span><span>REST APIs</span><span>Python</span><span>Landing.ai</span><span>Document AI</span></div>
              </article>
              <article className="exp-card">
                <div className="exp-date">Jun 2025 — Aug 2025</div>
                <h3 className="exp-role">ML Research Intern</h3>
                <p className="exp-company">Davise Lab, NIT Delhi</p>
                <ul>
                  <li>Trained an STI/RTI risk classification model on <strong>10,000+ hygiene survey records</strong>, improving prediction accuracy by <strong>20%</strong> through deep autoencoder-based feature extraction and cross-validation.</li>
                  <li>Applied <strong>HDBSCAN and UMAP</strong> for dimensionality reduction and cluster visualization, identifying high-risk population segments for public health analysis.</li>
                </ul>
                <div className="exp-tech"><span>Python</span><span>Machine Learning</span><span>Autoencoders</span><span>HDBSCAN</span><span>UMAP</span></div>
              </article>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section projects-section section-wrap">
          <div className="reveal" style={{ marginBottom: 56 }}>
            <div className="section-kicker">03 — Selected Work</div>
            <h2>Featured <span className="accent">projects.</span></h2>
            <p className="section-sub">Selected projects across Generative AI, RAG, Agentic AI, and intelligent software systems.</p>
          </div>

          {/* Featured projects (large cards with visuals) */}
          <div className="project-list">
            {featuredProjects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <div className="project-content">
                  <div className="project-number">{project.number}</div>
                  <div className="project-eyebrow">{project.eyebrow}</div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="highlight-label">Technical highlights</div>
                  <div className="highlight-grid">
                    {project.highlights.map((h) => <span key={h}><Check size={13} />{h}</span>)}
                  </div>
                  <div className="project-stack">
                    {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                  {project.demo && (
                    <div className="project-links">
                      <a href={project.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14} /></a>
                    </div>
                  )}
                </div>
                <ProjectVisual type={project.visual} accent={project.accent} />
              </article>
            ))}
          </div>

          {/* Additional projects (compact grid) */}
          <div className="more-projects-header reveal" style={{ marginTop: 72 }}>
            <h3 className="more-projects-title">More projects</h3>
            <p className="more-projects-sub">Additional work across backend, AI/ML, and developer tooling.</p>
          </div>
          <div className="more-projects-grid reveal-stagger">
            {additionalProjects.map((project) => {
              const Icon = project.icon;
              return (
                <a className="more-project-card" href={project.github} target="_blank" rel="noreferrer" key={project.title}>
                  <div className="more-project-top">
                    <div className="more-project-icon"><Icon size={20} /></div>
                    {project.metric && <span className="more-project-metric">{project.metric}</span>}
                  </div>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="more-project-stack">
                    {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section skills-section">
          <div className="section-wrap">
            <div className="reveal" style={{ marginBottom: 56 }}>
              <div className="section-kicker">04 — Toolkit</div>
              <h2>Tools I use to <span className="accent">build things.</span></h2>
              <p className="section-sub">A full-stack toolkit spanning backend systems, AI/ML, and developer tooling.</p>
            </div>
            <div className="skills-grid reveal-stagger">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div className="skill-card" key={group.label}>
                    <h3><Icon size={18} /> {group.label}</h3>
                    <div className="skill-pills">
                      {group.items.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="section education-section section-wrap">
          <div className="reveal" style={{ marginBottom: 56 }}>
            <div className="section-kicker">05 — Education</div>
            <h2>The foundation <span className="accent">behind the work.</span></h2>
          </div>
          <div className="education-grid reveal">
            <div></div>
            <div className="education-card">
              <div className="edu-icon"><GraduationCap size={24} /></div>
              <div>
                <div className="edu-date">Aug 2023 — Aug 2027</div>
                <h3>Thapar Institute of Engineering and Technology</h3>
                <p>B.Tech in Computer Engineering</p>
                <div className="cgpa">
                  <span>CGPA</span>
                  <strong>9.22</strong>
                  <small>/ 10</small>
                </div>
                <div className="coursework">
                  <span>Relevant coursework</span>
                  <p>Data Structures & Algorithms · Machine Learning · Deep Learning · DBMS · Operating Systems · Object-Oriented Programming</p>
                </div>
              </div>
            </div>
          </div>
          <div className="credentials reveal-stagger">
            <div className="credential-card">
              <div className="cred-icon"><Award size={20} /></div>
              <b>Generative AI Applications with RAG and LangChain</b>
              <span className="cred-meta">IBM / Coursera · Apr 2026</span>
              <span className="cred-grade">Grade: 88%</span>
              <a className="cred-verify" href="https://coursera.org/share/033a17d7f82027ddfdbfa99c04a4ba09" target="_blank" rel="noreferrer">Verify <ExternalLink size={12} /></a>
            </div>
            <div className="credential-card">
              <div className="cred-icon"><Zap size={20} /></div>
              <b>NVIDIA: Fundamentals of Deep Learning</b>
              <span className="cred-meta">Coursera · Feb 2026</span>
              <span className="cred-grade">Grade: 100%</span>
              <a className="cred-verify" href="https://coursera.org/share/b6bf5db1961c6c1444078a008470f517" target="_blank" rel="noreferrer">Verify <ExternalLink size={12} /></a>
            </div>
            <div className="credential-card">
              <div className="cred-icon"><Trophy size={20} /></div>
              <b>Achievements & Activities</b>
              <ul className="cred-list">
                <li>Merit Scholarship — Thapar Institute</li>
                <li>Research Contributor — Davise Lab, NIT Delhi</li>
                <li>TEDx Thapar — Outreach & Design Team</li>
                <li>ISTE Thapar — Workshop Coordinator</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact-section">
          <div className="contact-bg" />
          <div className="contact-inner">
            <div className="reveal">
              <div className="section-kicker">06 — Contact</div>
              <div className="contact-main">
                <div>
                  <h2>Let's build something <span className="accent">meaningful.</span></h2>
                  <p className="section-sub">I'm always open to discussing software engineering opportunities, AI projects, collaborations, and interesting technical problems.</p>
                </div>
                <div className="contact-actions">
                  <a className="contact-action primary" href={`mailto:${email}`}><Mail size={18} /><span>Email Me</span><ArrowUpRight size={16} /></a>
                  <a className="contact-action" href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={18} /><span>LinkedIn</span><ArrowUpRight size={16} /></a>
                  <a className="contact-action" href={githubUrl} target="_blank" rel="noreferrer"><Github size={18} /><span>GitHub</span><ArrowUpRight size={16} /></a>
                  <a className="contact-action" href={leetcodeUrl} target="_blank" rel="noreferrer"><Code2 size={18} /><span>LeetCode</span><ArrowUpRight size={16} /></a>
                </div>
              </div>
              <div className="contact-details">
                <a href={`mailto:${email}`}><Mail size={15} /> {email}</a>
                <a href="tel:+916299462437"><Phone size={15} /> +91 6299462437</a>
                <a href={githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> github.com/ritigyas</a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> linkedin.com/in/ritigya-singh</a>
                <a href={leetcodeUrl} target="_blank" rel="noreferrer"><Code2 size={15} /> leetcode.com</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">RS</span>
          <span>Ritigya Singh</span>
        </div>
        <p>Software Engineer · Full-Stack Developer · Generative AI</p>
        <div className="footer-links">
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={leetcodeUrl} target="_blank" rel="noreferrer">LeetCode</a>
          <a href={`mailto:${email}`}>Email</a>
        </div>
        <small className="footer-copy">© 2026 Ritigya Singh</small>
      </footer>
    </div>
  );
}

export default App;
