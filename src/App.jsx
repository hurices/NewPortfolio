import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Github, 
  Linkedin, 
  Download, 
  FolderGit2, 
  Layers, 
  Briefcase, 
  GraduationCap,
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Send,
  Code2,
  Shield,
  Smartphone,
  Cpu,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Activity,
  Gamepad2,
  Layout,
  Server,
  Database,
  Sliders,
  MousePointer2,
  FileText
} from 'lucide-react';
import { personalInfo, qualifications, skillsAccordionData, projects } from './data/portfolioData.js';
import UniverseCanvas from './components/UniverseCanvas.jsx';
import InteractiveDemos from './components/InteractiveDemos.jsx';
import RetroArcadeTerminal from './components/RetroArcadeTerminal.jsx';

export default function App() {
  // Navigation par sections
  const [currentTab, setCurrentTab] = useState('accueil'); // 'accueil' | 'apropos' | 'competences' | 'projets' | 'demos' | 'bento' | 'contact'
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedProjectId, setExpandedProjectId] = useState('netcap');
  const [activeDemoId, setActiveDemoId] = useState('netcap');
  const [qualificationTab, setQualificationTab] = useState('education'); // 'education' | 'experience'
  const [openAccordions, setOpenAccordions] = useState(['frontend', 'backend']);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Tâches dans le module SmartTodo
  const [bentoTasks, setBentoTasks] = useState([
    { id: 1, text: 'Pipeline Z-Score NetCap', done: true },
    { id: 2, text: 'API RESTful FastAPI & MongoDB', done: true },
    { id: 3, text: 'Application Android Kotlin (IMmOaR)', done: true },
    { id: 4, text: 'Calculateur CIDR Linux', done: false }
  ]);

  const toggleBentoTask = (id) => {
    setBentoTasks(bentoTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const toggleAccordion = (id) => {
    if (openAccordions.includes(id)) {
      setOpenAccordions(openAccordions.filter(item => item !== id));
    } else {
      setOpenAccordions([...openAccordions, id]);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
  };

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return <Layout size={18} className="text-emerald-400" />;
      case 'Server': return <Server size={18} className="text-cyan-400" />;
      case 'Shield': return <Shield size={18} className="text-indigo-400" />;
      case 'Terminal': return <TerminalIcon size={18} className="text-amber-400" />;
      default: return <Code2 size={18} className="text-emerald-400" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200 font-sans antialiased overflow-x-hidden">
      
      {/* Fond cosmique animé fluide et relaxant pour les yeux */}
      <UniverseCanvas />

      {/* Lueur d'ambiance spatiale douce */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-slate-800/10 blur-[150px] pointer-events-none z-0 rounded-full" />

      {/* CONTENEUR GLOBAL */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* BARRE DE NAVIGATION SUPÉRIEURE */}
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070b14]/85 border-b border-slate-800/80 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
            
            {/* Logo & Identité */}
            <button 
              onClick={() => setCurrentTab('accueil')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700 p-0.5 bg-slate-800 transition-colors group-hover:border-emerald-500/60 shadow-sm">
                  <img 
                    src={personalInfo.avatarUrl} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#070b14]" />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-sm sm:text-base text-slate-100 tracking-tight group-hover:text-emerald-400 transition-colors">
                  Hurices Razanadraibe
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Développeur Full Stack
                </span>
              </div>
            </button>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'apropos', label: 'À propos' },
                { id: 'competences', label: 'Compétences' },
                { id: 'projets', label: 'Projets' },
                { id: 'demos', label: 'Démos en direct' },
                { id: 'bento', label: 'Bento & Arcade' },
                { id: 'contact', label: 'Contact' },
              ].map(item => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'text-white font-medium bg-slate-800 border border-slate-700/80 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Actions rapides & Réseaux */}
            <div className="flex items-center gap-2 shrink-0">
              <a 
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                title="Mon profil LinkedIn"
              >
                <Linkedin size={16} />
              </a>

              <a 
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-emerald-400 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                title="Mon profil GitHub @hurices"
              >
                <Github size={16} />
              </a>

              <a 
                href={personalInfo.cvPath}
                download="CV_Hurices_Razanadraibe.pdf"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Download size={13} />
                <span>Télécharger mon CV</span>
              </a>

              <button
                onClick={() => setCurrentTab('contact')}
                className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send size={12} className="text-emerald-400" />
                <span className="hidden sm:inline">Me contacter</span>
              </button>
            </div>

          </div>

          {/* Navigation Mobile en barre horizontale fluide */}
          <div className="md:hidden flex items-center gap-1 px-3 py-2 border-t border-slate-800/80 bg-[#070b14] overflow-x-auto text-xs scrollbar-none">
            {[
              { id: 'accueil', label: 'Accueil' },
              { id: 'apropos', label: 'À propos' },
              { id: 'competences', label: 'Compétences' },
              { id: 'projets', label: 'Projets' },
              { id: 'demos', label: 'Démos' },
              { id: 'bento', label: 'Bento' },
              { id: 'contact', label: 'Contact' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setCurrentTab(m.id)}
                className={`px-3 py-1 rounded-md shrink-0 cursor-pointer ${
                  currentTab === m.id 
                    ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700' 
                    : 'text-slate-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <AnimatePresence mode="wait">

            {/* ========================================================================= */}
            {/* 1. SECTION ACCUEIL : HERO NATUREL, CHALEUREUX & ÉPURÉ                    */}
            {/* ========================================================================= */}
            {currentTab === 'accueil' && (
              <motion.div
                key="accueil"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="space-y-12 sm:space-y-16"
              >
                {/* HERO PRINCIPAL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 sm:pt-6">
                  
                  {/* Colonne gauche : Présentation humaine */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-emerald-400 shadow-sm">
                      <Sparkles size={14} className="text-emerald-400" />
                      <span>Salut, moi c'est Hurices 👋</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
                    </div>

                    <div className="space-y-3">
                      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
                        Hurices Razanadraibe
                      </h1>
                      
                      <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-xl font-medium text-slate-300">
                        <span className="text-emerald-400 font-semibold font-mono">
                          Développeur Full-Stack
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-cyan-300 font-medium font-mono text-sm sm:text-base">
                          Concepteur Développeur
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400 text-sm sm:text-base font-mono">
                          Web, Mobile & Réseau
                        </span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                      Passionné par la création de projets complets et concrets. Des interfaces réactives en <strong>React</strong> et <strong>Tailwind CSS</strong> jusqu'aux backends fiables en <strong>Node.js</strong> et <strong>Python</strong>, en passant par les applications mobiles natives en <strong>Kotlin</strong> et les architectures réseau comme <strong>NetCap</strong>, j'aime construire des outils rapides, soignés et utiles.
                    </p>

                    {/* Actions directes rapides */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setCurrentTab('contact')}
                        className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-900/30 cursor-pointer"
                      >
                        <Send size={15} />
                        <span>Me contacter</span>
                      </button>

                      <a
                        href={personalInfo.cvPath}
                        download="CV_Hurices_Razanadraibe.pdf"
                        className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Download size={15} />
                        <span>Télécharger mon CV</span>
                      </a>

                      <button
                        onClick={() => setCurrentTab('projets')}
                        className="px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <FolderGit2 size={15} />
                        <span>Voir mes 8 projets</span>
                      </button>
                    </div>

                    {/* Chiffres clés */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
                      {personalInfo.stats.map((s, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                          <span className="text-[11px] font-mono text-slate-400 block">{s.label}</span>
                          <span className="text-base sm:text-lg font-bold text-slate-100 block">{s.value}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Colonne droite : Photo de profil sans badge encombrant sur le visage */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative group w-full max-w-sm">
                      
                      {/* Aura douce en arrière-plan */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-indigo-500/15 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700" />

                      {/* Cadre net de la photo */}
                      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-700/80 shadow-2xl aspect-[3.8/4.6]">
                        <img 
                          src={personalInfo.avatarUrl} 
                          alt="Hurices Razanadraibe"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top filter brightness-[0.98] group-hover:scale-102 transition-transform duration-700"
                        />

                        {/* Dégradé doux inférieur */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

                        {/* Cartouche d'identification au bas de l'image */}
                        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
                          <div className="flex items-center justify-between font-semibold text-slate-100">
                            <span>Hurices Razanadraibe</span>
                            <span className="text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80">
                              Disponible
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            Majunga, Madagascar · {personalInfo.stats[0].value} Dépôts GitHub
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>

                {/* Bouton de découverte */}
                <div className="flex justify-center pt-2">
                  <button 
                    onClick={() => setCurrentTab('apropos')}
                    className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
                  >
                    <span className="font-mono text-[11px] tracking-wider">DÉCOUVRIR MON PARCOURS</span>
                    <ChevronDown size={16} className="animate-bounce text-emerald-400 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>

                {/* Synthèse des domaines */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">DOMAINES CLÉS</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Ce que j'aime construire</h2>
                    </div>
                    <button
                      onClick={() => setCurrentTab('competences')}
                      className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Consulter toutes les compétences</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                        <Layout size={16} />
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Applications Web Modernes</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Conception d'interfaces fluides et ergonomiques avec React, Next.js, Tailwind CSS et intégration d'APIs RESTful performantes.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
                        <Shield size={16} />
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Réseau, Sécurité & Data (NetCap)</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Développement de serveurs proxy TCP, portails captifs et détection d'anomalies de trafic avec calcul statistique Z-score.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
                        <Smartphone size={16} />
                      </div>
                      <h3 className="font-bold text-slate-100 text-sm">Mobile Android Natif & Linux</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Création d'applications mobiles Android natives en Kotlin (IMmOaR) et d'utilitaires pratiques en Python pour Linux (Ip_Calculator).
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 2. SECTION À PROPOS DE MOI                                               */}
            {/* ========================================================================= */}
            {currentTab === 'apropos' && (
              <motion.div
                key="apropos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="space-y-10"
              >
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">À PROPOS DE MOI</span>
                  <h2 className="text-3xl font-extrabold text-slate-100">Qui suis-je ?</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Découvrez mon parcours, ma façon de travailler et ce qui m'anime au quotidien.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Photo épurée */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-xs aspect-[3.8/4.6] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                      <img 
                        src={personalInfo.avatarUrl} 
                        alt="Hurices Razanadraibe"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 text-center text-xs font-mono text-slate-300 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                        {personalInfo.name} · {personalInfo.location}
                      </div>
                    </div>
                  </div>

                  {/* Texte de présentation sincère & authentique */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                        <Code2 size={20} className="mx-auto text-emerald-400" />
                        <div className="font-bold text-slate-100 text-sm">Full Stack</div>
                        <div className="text-[11px] text-slate-400 font-mono">Web, Mobile & Réseau</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                        <FolderGit2 size={20} className="mx-auto text-cyan-400" />
                        <div className="font-bold text-slate-100 text-sm">11+ Projets</div>
                        <div className="text-[11px] text-slate-400 font-mono">Dépôts GitHub</div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                        <Briefcase size={20} className="mx-auto text-indigo-400" />
                        <div className="font-bold text-slate-100 text-sm">100% Pratique</div>
                        <div className="text-[11px] text-slate-400 font-mono">Code Réel & Déployé</div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                      <p>
                        Salut ! Je m'appelle <strong>Hurices Razanadraibe</strong> et je suis développeur Full Stack basé à Majunga, Madagascar. Depuis que j'ai commencé à coder, ma priorité a toujours été de construire des choses réelles qui fonctionnent bien et résolvent de vrais besoins.
                      </p>
                      <p>
                        J'aime concevoir des architectures complètes : du design frontend réactif en <strong>React / Next.js</strong> jusqu'aux backends robustes en <strong>Node.js</strong> et <strong>Python</strong>. À travers des réalisations concrètes comme <strong>NetCap</strong> (serveur proxy et détection d'intrusions par Z-score), <strong>SmartTodo</strong> ou <strong>IMmOaR</strong> (application Android native en Kotlin), j'ai développé une méthode de travail rigoureuse axée sur la lisibilité du code, la sécurité et la performance.
                      </p>
                      <p>
                        Toujours curieux et motivé, j'apprends en continu et je suis prêt à m'investir pleinement sur des projets stimulants en équipe ou en freelance.
                      </p>
                    </div>

                    {/* Actions de téléchargement du CV */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={personalInfo.cvPath}
                        download="CV_Hurices_Razanadraibe.pdf"
                        className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                      >
                        <Download size={15} />
                        <span>Télécharger mon CV</span>
                      </a>

                      <a
                        href={personalInfo.cvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ExternalLink size={15} className="text-cyan-400" />
                        <span>Aperçu du CV (PDF)</span>
                      </a>

                      <button
                        onClick={() => setCurrentTab('competences')}
                        className="px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>Voir mes compétences</span>
                        <ChevronRight size={15} />
                      </button>
                    </div>

                  </div>

                </div>

                {/* CHRONOLOGIE DES EXPÉRIENCES & FORMATIONS */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md space-y-6">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">CHRONOLOGIE</span>
                    <h3 className="text-2xl font-bold text-slate-100">Parcours & Réalisations</h3>
                    <p className="text-xs text-slate-400">Mon cheminement technique et mes expériences concrètes</p>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setQualificationTab('education')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                        qualificationTab === 'education'
                          ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <GraduationCap size={16} />
                      <span>Formation & Cursus</span>
                    </button>

                    <button
                      onClick={() => setQualificationTab('experience')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                        qualificationTab === 'experience'
                          ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Briefcase size={16} />
                      <span>Expérience & Projets R&D</span>
                    </button>
                  </div>

                  <div className="max-w-2xl mx-auto space-y-4 pt-2">
                    {qualificationTab === 'education' ? (
                      qualifications.education.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-slate-100 text-sm sm:text-base">{item.title}</h4>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-400">
                            {item.subtitle} · {item.period}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed pt-1">
                            {item.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      qualifications.experience.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-bold text-slate-100 text-sm sm:text-base">{item.title}</h4>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/80">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-400">
                            {item.subtitle} · {item.period}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed pt-1">
                            {item.description}
                          </p>
                          {item.missions && (
                            <ul className="space-y-1 pt-1.5 border-t border-slate-800/80">
                              {item.missions.map((m, mIdx) => (
                                <li key={mIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* PROJETS ACADÉMIQUES & LANGUES DU CV */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4 border-t border-slate-800/80">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
                      <span className="text-xs font-mono text-emerald-400 block font-semibold">PROJETS ACADÉMIQUES DU CV</span>
                      {qualifications.academicProjects.map((p, pIdx) => (
                        <div key={pIdx} className="space-y-1 text-xs">
                          <div className="font-bold text-slate-200">{p.title}</div>
                          <p className="text-slate-400 text-[11px] leading-relaxed">{p.description}</p>
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {p.tags.map((t, tIdx) => (
                              <span key={tIdx} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                      <span className="text-xs font-mono text-cyan-400 block font-semibold">LANGUES MAÎTRISÉES</span>
                      <div className="space-y-2">
                        {personalInfo.languages.map((l, lIdx) => (
                          <div key={lIdx} className="flex items-center justify-between text-xs">
                            <span className="text-slate-200 font-medium">{l.name}</span>
                            <span className="font-mono text-slate-400 text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              {l.level}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                        Capacité à collaborer et travailler au sein d'équipes locales et internationales.
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 3. SECTION COMPÉTENCES TECHNIQUES                                        */}
            {/* ========================================================================= */}
            {currentTab === 'competences' && (
              <motion.div
                key="competences"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="space-y-10"
              >
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">COMPÉTENCES</span>
                  <h2 className="text-3xl font-extrabold text-slate-100">Ma Boîte à Outils Technique</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Les langages, frameworks et outils que je pratique et maîtrise au quotidien.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {skillsAccordionData.map((category) => {
                    const isOpen = openAccordions.includes(category.id);
                    return (
                      <div 
                        key={category.id} 
                        className="rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md overflow-hidden transition-colors"
                      >
                        <div 
                          onClick={() => toggleAccordion(category.id)}
                          className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                              {getSkillIcon(category.icon)}
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-slate-100">{category.title}</h3>
                              <p className="text-xs text-slate-400">{category.subtitle}</p>
                            </div>
                          </div>

                          <div className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown size={18} />
                          </div>
                        </div>

                        {isOpen && (
                          <div className="px-5 pb-6 pt-2 border-t border-slate-800/60 space-y-4">
                            {category.skills.map((skill, sIdx) => (
                              <div key={sIdx} className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-medium text-slate-200">{skill.name}</span>
                                  <span className="font-mono text-emerald-400 font-semibold">{skill.level}%</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-cyan-500"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center max-w-3xl mx-auto space-y-2">
                  <div className="text-xs font-mono text-emerald-400">CODE PROPRE & BONNES PRATIQUES</div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Chaque technologie est mise en pratique sur des projets réels disponibles sur mon profil GitHub.
                  </p>
                </div>

              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 4. SECTION PROJETS GITHUB DE HURICES                                     */}
            {/* ========================================================================= */}
            {currentTab === 'projets' && (
              <motion.div
                key="projets"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">MES RÉALISATIONS</span>
                    <h2 className="text-3xl font-extrabold text-slate-100">Mes 8 Projets Concrets</h2>
                    <p className="text-xs sm:text-sm text-slate-400">Tous les dépôts sont publics et consultables sur GitHub.</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    {[
                      { id: 'all', label: 'Tous' },
                      { id: 'network', label: 'Sécurité & Réseau' },
                      { id: 'web', label: 'Web Full Stack' },
                      { id: 'mobile', label: 'Mobile' },
                      { id: 'tools', label: 'Outils' },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setActiveCategory(f.id)}
                        className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          activeCategory === f.id ? 'bg-slate-800 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredProjects.map(project => {
                    const isExpanded = expandedProjectId === project.id;
                    return (
                      <div 
                        key={project.id} 
                        className={`rounded-2xl border transition-all ${
                          isExpanded 
                            ? 'bg-slate-900/80 border-slate-700/80 shadow-lg' 
                            : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/60'
                        }`}
                      >
                        <div 
                          onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                          className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                              {project.category === 'network' ? <Shield size={20} className="text-emerald-400" /> : 
                               project.category === 'mobile' ? <Smartphone size={20} className="text-indigo-400" /> : 
                               <Code2 size={20} className="text-cyan-400" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-emerald-400">{project.categoryLabel}</span>
                                {project.featured && (
                                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                                    Projet phare
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-100">{project.title}</h3>
                              <p className="text-xs text-slate-400 hidden sm:block mt-0.5 line-clamp-1">{project.summary}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="hidden md:inline-block text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                              {project.tech.slice(0, 3).join(' · ')}
                            </span>
                            <div className={`p-1.5 rounded-lg text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-emerald-400' : ''}`}>
                              <ChevronDown size={18} />
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm">
                            <p className="text-slate-300 leading-relaxed">{project.description}</p>
                            
                            {project.points && (
                              <div className="space-y-1.5 pt-1">
                                <span className="font-semibold text-slate-200 block text-xs font-mono">DÉTAILS TECHNIQUES & RÉALISATION :</span>
                                <ul className="space-y-1">
                                  {project.points.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-300">
                                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                              <div className="flex flex-wrap gap-1.5">
                                {project.tech.map((t, i) => (
                                  <span key={i} className="px-2.5 py-0.5 rounded bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800">
                                    {t}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center gap-2">
                                {project.hasInteractiveDemo && (
                                  <button
                                    onClick={() => {
                                      setActiveDemoId(project.demoType);
                                      setCurrentTab('demos');
                                    }}
                                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                                  >
                                    <Play size={12} className="fill-white" />
                                    <span>Tester en direct</span>
                                  </button>
                                )}
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Github size={13} />
                                  <span>Voir sur GitHub</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 5. SECTION DÉMOS EN DIRECT                                               */}
            {/* ========================================================================= */}
            {currentTab === 'demos' && (
              <motion.div
                key="demos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="space-y-6"
              >
                <div className="space-y-1 pb-4 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">ESPACE INTERACTIF</span>
                  <h2 className="text-3xl font-extrabold text-slate-100">Démos en direct</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Testez les fonctionnalités et algorithmes directement dans votre navigateur.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'netcap', title: 'NetCap : Z-Score Réseau' },
                    { id: 'todo', title: 'SmartTodo : Gestionnaire réactif' },
                    { id: 'ipcalc', title: 'Ip_Calculator : CIDR Linux' },
                    { id: 'ecommerce', title: 'E-Commerce : Panier réactif' },
                    { id: 'cyber', title: 'CyberGuardian : Monitoring' },
                    { id: 'excel', title: 'LearnExcel : Simulateur matriciel' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDemoId(tab.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                        activeDemoId === tab.id
                          ? 'bg-emerald-600 text-white font-medium shadow-sm'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <Play size={12} className={activeDemoId === tab.id ? 'fill-white' : 'text-slate-500'} />
                      <span>{tab.title}</span>
                    </button>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
                  <InteractiveDemos demoType={activeDemoId} />
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 6. SECTION BENTO & RETRO ARCADE                                           */}
            {/* ========================================================================= */}
            {currentTab === 'bento' && (
              <motion.div
                key="bento"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">VUE D'ENSEMBLE</span>
                    <h2 className="text-2xl font-bold text-slate-100">Tableau de bord & Mini-jeu</h2>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Découvrez mes projets sous un angle interactif
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* BENTO 1 : NetCap Flagship */}
                  <div className="md:col-span-12 lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                          PROJET PHARE // SÉCURITÉ & RÉSEAU
                        </span>
                        <a 
                          href="https://github.com/hurices/NETCAP" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          <Github size={13} /> github.com/hurices/NETCAP
                        </a>
                      </div>

                      <h3 className="text-xl font-bold text-slate-100">
                        NetCap — Portail Captif & Analyse Réseau
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Architecture combinant un serveur proxy TCP interceptant le trafic HTTP, un portail d'authentification Flask, un pipeline d'analyse de données (Pandas/NumPy) calculant des Z-scores pour détecter les anomalies et une API FastAPI de supervision.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                        <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 block">ALGORITHME</span>
                          <span className="text-slate-200 font-bold">Z-Score &gt; 2.5</span>
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 block">BACKEND</span>
                          <span className="text-slate-200 font-bold">FastAPI & Python</span>
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 block">PROXY</span>
                          <span className="text-slate-200 font-bold">TCP Thread-safe</span>
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 block">ANALYSE</span>
                          <span className="text-slate-200 font-bold">Pandas & NumPy</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1.5">
                        {['Python', 'FastAPI', 'Pandas', 'NumPy', 'Flask'].map((tech, idx) => (
                          <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setActiveDemoId('netcap');
                          setCurrentTab('demos');
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Play size={12} className="fill-current" />
                        <span>Tester le simulateur</span>
                      </button>
                    </div>
                  </div>

                  {/* BENTO 2 : Rétro Arcade Terminal */}
                  <div className="md:col-span-12 lg:col-span-5">
                    <RetroArcadeTerminal 
                      onSelectProject={(id) => {
                        setExpandedProjectId(id);
                        setCurrentTab('projets');
                      }}
                      onOpenContact={() => setCurrentTab('contact')}
                    />
                  </div>

                  {/* BENTO 3 : SmartTodo */}
                  <div className="md:col-span-6 lg:col-span-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400">WEB FULL STACK</span>
                        <a href="https://github.com/hurices/smarttodo-app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                          <Github size={14} />
                        </a>
                      </div>
                      <h4 className="text-base font-bold text-slate-100">SmartTodo App</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Gestionnaire de productivité modulaire avec API REST Node.js/Express et interface réactive en React.
                      </p>

                      <div className="space-y-1.5 pt-1">
                        {bentoTasks.map(t => (
                          <div 
                            key={t.id} 
                            onClick={() => toggleBentoTask(t.id)}
                            className="flex items-center gap-2 text-xs font-mono p-1.5 rounded bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700"
                          >
                            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${t.done ? 'bg-emerald-600 text-white' : 'border border-slate-600'}`}>
                              {t.done ? '✓' : ''}
                            </span>
                            <span className={t.done ? 'line-through text-slate-500' : 'text-slate-300'}>
                              {t.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <span className="font-mono text-slate-400">React · Node.js</span>
                      <button 
                        onClick={() => {
                          setActiveDemoId('todo');
                          setCurrentTab('demos');
                        }}
                        className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        Tester <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* BENTO 4 : CyberGuardian */}
                  <div className="md:col-span-6 lg:col-span-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400">SUPERVISION RÉSEAU</span>
                        <a href="https://github.com/hurices/CyberGuardian" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                          <Github size={14} />
                        </a>
                      </div>
                      <h4 className="text-base font-bold text-slate-100">CyberGuardian</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Plateforme de surveillance continue des flux réseau, mesure des latences et alertes d'intégrité d'infrastructure.
                      </p>

                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Nœuds surveillés</span>
                          <span className="text-emerald-400 font-semibold">Opérationnel</span>
                        </div>
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>Latence moyenne</span>
                          <span className="text-slate-200">1.8 ms</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <span className="font-mono text-slate-400">TypeScript · Python</span>
                      <button 
                        onClick={() => {
                          setActiveDemoId('cyber');
                          setCurrentTab('demos');
                        }}
                        className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        Tester <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* BENTO 5 : Android & CLI */}
                  <div className="md:col-span-12 lg:col-span-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400">MOBILE & CLI</span>
                        <div className="flex gap-2">
                          <a href="https://github.com/hurices/IMmOaR" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white" title="IMmOaR">
                            <Smartphone size={14} />
                          </a>
                          <a href="https://github.com/hurices/Ip_Calculator-for-Linux" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white" title="IP Calculator">
                            <TerminalIcon size={14} />
                          </a>
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-slate-100">IMmOaR & Ip_Calculator</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Application mobile Android native en <strong>Kotlin</strong> (immobilier) et utilitaire Linux en Python pour calculer les masques <strong>CIDR</strong>.
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          Kotlin Android
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          Python CLI
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <span className="font-mono text-slate-400">Mobile + Outil</span>
                      <button 
                        onClick={() => {
                          setActiveDemoId('ipcalc');
                          setCurrentTab('demos');
                        }}
                        className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        Tester CIDR <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* 7. SECTION CONTACT                                                       */}
            {/* ========================================================================= */}
            {currentTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className="space-y-10"
              >
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">CONTACT DIRECT</span>
                  <h2 className="text-3xl font-extrabold text-slate-100">Restons en contact</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Vous avez un projet en tête, une opportunité ou envie d'échanger ? N'hésitez pas !
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
                  
                  {/* Coordonnées directes */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wide">Téléphone & WhatsApp</h4>
                        <a href={`tel:${personalInfo.phone}`} className="text-sm font-semibold text-slate-100 hover:text-emerald-400 font-mono transition-colors">
                          {personalInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wide">Email direct</h4>
                          <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-slate-100 hover:text-cyan-400 transition-colors">
                            {personalInfo.email}
                          </a>
                        </div>
                      </div>
                      <button 
                        onClick={handleCopyEmail} 
                        className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                        title="Copier l'email"
                      >
                        {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wide">Localisation</h4>
                        <div className="text-sm font-semibold text-slate-100">
                          {personalInfo.location}
                        </div>
                      </div>
                    </div>

                    <a 
                      href={personalInfo.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-4 group hover:border-slate-700 transition-colors block"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                          <Linkedin size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wide">LinkedIn</h4>
                          <div className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300">
                            hurices-razanadraibe
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-slate-500 group-hover:text-cyan-400" />
                    </a>

                  </div>

                  {/* Formulaire de contact */}
                  <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-md">
                    <h3 className="text-lg font-bold text-slate-100 mb-1">M'envoyer un message</h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Remplissez ces quelques lignes pour me contacter directement.
                    </p>

                    {formSubmitted ? (
                      <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-center space-y-3">
                        <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
                        <h4 className="font-bold text-emerald-300 text-sm">Merci pour votre message !</h4>
                        <p className="text-xs text-slate-300">
                          Je vous répondrai très rapidement par email. Vous pouvez également m'envoyer directement votre message via votre messagerie :
                        </p>
                        <div className="pt-2 flex flex-wrap justify-center gap-2">
                          <a 
                            href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(contactForm.subject || 'Contact Portfolio')}&body=${encodeURIComponent(`Bonjour Hurices,\n\n${contactForm.message}\n\nDe : ${contactForm.name} (${contactForm.email})`)}`}
                            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Mail size={13} />
                            <span>Ouvrir dans ma messagerie</span>
                          </a>
                          <button
                            onClick={() => {
                              setContactForm({ name: '', email: '', subject: '', message: '' });
                              setFormSubmitted(false);
                            }}
                            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                          >
                            Écrire un autre message
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                        <div className="space-y-1">
                          <label className="text-slate-300 font-mono text-[11px]">Nom & Prénom</label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Ex : Jean Dupont"
                            className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-300 font-mono text-[11px]">Email</label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="Ex : jean.dupont@entreprise.com"
                            className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-300 font-mono text-[11px]">Sujet</label>
                          <input
                            type="text"
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            placeholder="Ex : Proposition de mission / projet"
                            className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-300 font-mono text-[11px]">Message</label>
                          <textarea
                            rows={4}
                            required
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            placeholder="Décrivez votre projet ou vos questions..."
                            className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                        >
                          <Send size={14} />
                          <span>Envoyer le message</span>
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* PIED DE PAGE DISCRET */}
        <footer className="mt-auto py-8 border-t border-slate-800/80 bg-[#070b14] text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="font-semibold text-slate-200">{personalInfo.name}</div>
              <div className="text-[11px] text-slate-500 font-mono">
                {personalInfo.title} · Web, Mobile & Réseau
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => setCurrentTab('accueil')} className="hover:text-emerald-400 cursor-pointer">
                Accueil
              </button>
              <button onClick={() => setCurrentTab('apropos')} className="hover:text-emerald-400 cursor-pointer">
                À propos
              </button>
              <button onClick={() => setCurrentTab('projets')} className="hover:text-emerald-400 cursor-pointer">
                Projets
              </button>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                LinkedIn
              </a>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                GitHub
              </a>
            </div>

            <div className="text-[11px] text-slate-500 text-center sm:text-right">
              © {new Date().getFullYear()} {personalInfo.name}. Tous droits réservés.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
