/**
 * Données officielles du portfolio de Hurices Razanadraibe
 * Synchronisées avec son CV professionnel :
 * Razanadraibe Tsihoarana Mampionintsoa Hurices
 * Développeur Full-Stack & Concepteur Développeur
 */

export const personalInfo = {
  name: "Hurices Razanadraibe",
  fullName: "Razanadraibe Tsihoarana Mampionintsoa Hurices",
  preferredName: "Hurices",
  username: "hurices",
  title: "Développeur Full-Stack",
  secondaryTitle: "Concepteur Développeur",
  subtitle: "Web, Mobile & Réseau",
  tagline: "Développeur Full-Stack & Concepteur Développeur passionné par la conception d'applications web réactives, de solutions SaaS et d'outils réseau.",
  bio: "Salut ! Je suis Hurices Razanadraibe, Développeur Full-Stack et Concepteur Développeur basé à Majunga. Fort de mes expériences chez Gasikara Digital (développement d'applications SaaS) et à la Chocolaterie ROBERT (déploiement ERP Odoo & administration), je conçois des solutions logicielles complètes : interfaces réactives (React, TypeScript), backends robustes (Node.js, Python, PHP) et architectures réseau sécurisées (NetCap). J'accorde une réelle importance à la performance, au code propre et au travail d'équipe.",
  location: "Lot 33 plle113 Mabibokely, Majunga",
  email: "huricesrazanandraibe@gmail.com",
  phone: "+261 33 35 436 81",
  githubUrl: "https://github.com/hurices",
  linkedinUrl: "https://www.linkedin.com/in/hurices-razanadraibe-3b1b67433",
  avatarUrl: "/assets/hurices_profile.jpg",
  cvPath: "/CV_Dev.pdf",
  status: "Disponible pour opportunités & missions",
  stats: [
    { label: "Dépôts GitHub", value: "11+", detail: "Dépôts publics & projets réels" },
    { label: "Technologies", value: "15+", detail: "Web, Réseau, Mobile & Outils" },
    { label: "Code & Pratique", value: "100%", detail: "Projets testés et opérationnels" },
    { label: "Spécialité", value: "Full-Stack", detail: "React, Node, Python, Odoo" }
  ],
  languages: [
    { name: "Français", level: "Langue courante", stars: 5 },
    { name: "Anglais", level: "Niveau courant", stars: 4 },
    { name: "Malgache", level: "Langue maternelle", stars: 5 }
  ]
};

export const qualifications = {
  education: [
    {
      title: "Licence Informatique",
      subtitle: "Institut de Formation Technique (IFT)",
      period: "2023 - En cours",
      description: "Approfondissement en architectures logicielles, génie logiciel, algorithmique avancée, réseaux et gestion de bases de données relationnelles / NoSQL.",
      badge: "Formation"
    },
    {
      title: "Diplôme de Technicien Supérieur (DTS)",
      subtitle: "Institut de Formation Technique (IFT)",
      period: "2024",
      description: "Conception logicielle, modélisation de systèmes d'information, programmation structurée et développement d'applications d'entreprise.",
      badge: "Diplômé"
    },
    {
      title: "Diplôme de Baccalauréat",
      subtitle: "Enseignement Général",
      period: "2023",
      description: "Formation scientifique et logique mathématique ayant préparé au cursus supérieur en sciences informatiques.",
      badge: "Obtenu"
    }
  ],
  experience: [
    {
      title: "Développeur Logiciel",
      subtitle: "Gasikara Digital",
      period: "2024",
      description: "Développement et maintenance d'applications SaaS innovantes. Collaboration active au sein d'équipes multidisciplinaires et optimisation des performances du site.",
      badge: "Professionnel",
      missions: [
        "Développement et maintenance d'applications SaaS",
        "Collaboration active au sein d'équipes multidisciplinaires",
        "Optimisation des performances techniques et de l'expérience utilisateur"
      ]
    },
    {
      title: "Stagiaire Informatique & ERP",
      subtitle: "Chocolaterie ROBERT",
      period: "2023",
      description: "Participation à l'intégration et au paramétrage des modules d'Odoo (Gestion des stocks, Ventes ou Production) pour centraliser et automatiser les flux d'activité de la chocolaterie. Administration du système informatique et maintenance des données.",
      badge: "Stage",
      missions: [
        "Déploiement ERP (Odoo) : paramétrage des modules Stocks, Ventes et Production",
        "Automatisation et centralisation des flux opérationnels de l'entreprise",
        "Maintenance et gestion des données informatiques internes"
      ]
    }
  ],
  academicProjects: [
    {
      title: "Architecture d'applications temps réel",
      description: "Développement complet d'une plateforme de discussion locale hautement réactive en utilisant TypeScript / PHP, intégrant la gestion des requêtes asynchrones et la mise en cache des données.",
      tags: ["TypeScript", "PHP", "Temps Réel", "Cache"]
    },
    {
      title: "Développement d'outils de surveillance réseau (NetCap)",
      description: "Conception et implémentation de scripts et d'outils d'analyse de trafic (Python / TypeScript) pour la détection d'anomalies (Z-Score) et la sécurisation des infrastructures.",
      tags: ["Python", "FastAPI", "Pandas", "Proxy TCP", "Sécurité"]
    }
  ]
};

export const skillsAccordionData = [
  {
    id: "frontend",
    title: "Développement Frontend",
    subtitle: "Interfaces soignées, réactives & rapides",
    icon: "Layout",
    skills: [
      { name: "React & Next.js", level: 92 },
      { name: "TypeScript & JavaScript Moderne", level: 94 },
      { name: "Tailwind CSS & Animations", level: 90 },
      { name: "HTML5 / CSS3 / Responsive Design", level: 95 }
    ]
  },
  {
    id: "backend",
    title: "Développement Backend & ERP",
    subtitle: "Serveurs fiables, APIs & intégration Odoo",
    icon: "Server",
    skills: [
      { name: "Node.js & Express", level: 90 },
      { name: "Python (FastAPI, Flask)", level: 88 },
      { name: "PHP & Sessions sécurisées", level: 85 },
      { name: "ERP Odoo (Stocks, Ventes, Production)", level: 82 }
    ]
  },
  {
    id: "network",
    title: "Réseau, Sécurité & Systèmes",
    subtitle: "Analyse de trafic, proxy & systèmes Linux",
    icon: "Shield",
    skills: [
      { name: "Analyse statistique Z-Score (Pandas, NumPy)", level: 88 },
      { name: "Proxy TCP / HTTP & Interception réseau", level: 90 },
      { name: "Administration Linux & Scripts Bash", level: 85 },
      { name: "Sécurité & Audit d'infrastructures", level: 84 }
    ]
  },
  {
    id: "tools",
    title: "Mobile, BDD & Outils Dev",
    subtitle: "Android natif, bases de données & Git",
    icon: "Terminal",
    skills: [
      { name: "Kotlin (Android Native MVVM)", level: 80 },
      { name: "Git, GitHub & Versioning", level: 92 },
      { name: "Bases de données (SQL & MongoDB)", level: 85 },
      { name: "Docker & Déploiement SaaS", level: 78 }
    ]
  }
];

export const projects = [
  {
    id: "netcap",
    title: "NetCap — Portail Captif & Analyse Réseau",
    category: "network",
    categoryLabel: "Sécurité & Réseau",
    summary: "Système complet de portail captif et d'analyse de trafic avec détection d'anomalies en temps réel via Z-score.",
    description: "NetCap est un projet que j'ai développé pour sécuriser et analyser les flux sur un réseau local. Il combine un proxy TCP thread-safe qui intercepte le trafic HTTP, un portail d'authentification Flask, un pipeline d'analyse statistique avec Pandas calculant des Z-scores pour repérer les anomalies et une API FastAPI accompagnée d'un dashboard de supervision en direct.",
    tech: ["Python", "FastAPI", "Pandas", "NumPy", "Flask", "Proxy TCP"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/NETCAP",
    hasInteractiveDemo: true,
    demoType: "netcap",
    featured: true,
    role: "Architecte & Développeur principal (Proxy, Pipeline Z-score, Dashboard)",
    points: [
      "Algorithme de détection d'anomalies réseau basé sur le Z-Score (seuil > 2.5)",
      "Serveur proxy TCP thread-safe gérant les redirections et les sessions",
      "API RESTful avec FastAPI pour exposer les métriques et logs de sécurité",
      "Interface de surveillance en temps réel de la bande passante et des connexions"
    ]
  },
  {
    id: "cyberguardian",
    title: "CyberGuardian — Supervision & Sécurité",
    category: "network",
    categoryLabel: "Sécurité & Réseau",
    summary: "Outil de télémétrie réseau, cartographie de flux et surveillance d'intégrité.",
    description: "Une solution de surveillance réseau conçue pour cartographier les nœuds actifs, mesurer les latences en temps réel, détecter les signatures de paquets inhabituelles et déclencher des alertes immédiates.",
    tech: ["TypeScript", "Python", "FastAPI", "Audit Réseau", "Monitoring"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/CyberGuardian",
    hasInteractiveDemo: true,
    demoType: "cyber",
    featured: true,
    points: [
      "Cartographie des nœuds réseau et contrôle continu de la bande passante",
      "Analyse de paquets et détection de comportements anormaux",
      "Panneau unifié d'alertes avec hiérarchisation des priorités"
    ]
  },
  {
    id: "smarttodo",
    title: "SmartTodo App — Gestionnaire de Tâches",
    category: "web",
    categoryLabel: "Web Full Stack",
    summary: "Application de productivité collaborative avec API REST Express et frontend réactif React.",
    description: "Une application complète pensée pour l'organisation quotidienne. Elle intègre un backend modulaire avec Node.js/Express et une interface fluide en React avec filtres instantanés, gestion des priorités et suivi d'avancement.",
    tech: ["React", "Node.js", "Express", "REST API", "JavaScript"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/smarttodo-app",
    hasInteractiveDemo: true,
    demoType: "todo",
    featured: true,
    points: [
      "Architecture propre découplée frontend / backend",
      "Tri et filtrage instantanés par statut et niveau d'urgence",
      "Calcul des métriques de complétion en direct",
      "Interface réactive pensée pour une utilisation simple et rapide"
    ]
  },
  {
    id: "learnexcel",
    title: "LearnExcel — Guide & Simulateur Pratique",
    category: "web",
    categoryLabel: "Web Full Stack",
    summary: "Plateforme interactive pour tester et maîtriser les formules avancées et la manipulation de données.",
    description: "Un simulateur interactif développé en React pour s'entraîner aux formules complexes (RECHERCHEV, INDEX/EQUIV, SOMME.SI) avec évaluation en direct des expressions sur des tableaux dynamiques.",
    tech: ["React", "JavaScript", "Calcul Matriciel", "Simulation"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/LearnExcel-",
    hasInteractiveDemo: true,
    demoType: "excel",
    featured: false,
    points: [
      "Moteur d'évaluation et de calcul de formules en direct",
      "Exercices interactifs par paliers progressifs",
      "Explications concrètes pour progresser en manipulation de données"
    ]
  },
  {
    id: "immoar",
    title: "IMmOaR — Immobilier Mobile Android",
    category: "mobile",
    categoryLabel: "Application Mobile",
    summary: "Application Android native en Kotlin pour la consultation et la gestion de biens immobiliers.",
    description: "Une application mobile Android conçue avec Kotlin selon les bonnes pratiques de l'architecture MVVM. Elle propose un catalogue interactif, des filtres rapides par ville et type de bien, ainsi que des fiches de présentation complètes.",
    tech: ["Kotlin", "Android SDK", "Architecture MVVM", "UI Mobile"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/IMmOaR",
    hasInteractiveDemo: false,
    featured: false,
    points: [
      "Développement 100% natif Kotlin pour Android",
      "Navigation fluide et ergonomie adaptée aux smartphones",
      "Fiches de propriétés détaillées avec spécifications et contacts"
    ]
  },
  {
    id: "ipcalculator",
    title: "Ip_Calculator-for-Linux — Utilitaire Réseau",
    category: "tools",
    categoryLabel: "Outils & Systèmes",
    summary: "Calculateur de sous-réseaux IP et préfixes CIDR en ligne de commande pour Linux.",
    description: "Un script Python ultra rapide conçu pour les administrateurs et passionnés de réseau : calcul instantané des masques de sous-réseau, des adresses de broadcast, des plages d'adresses utilisables et conversions binaire/décimal.",
    tech: ["Python", "Linux CLI", "Réseau IPv4", "CIDR"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/Ip_Calculator-for-Linux",
    hasInteractiveDemo: true,
    demoType: "ipcalc",
    featured: false,
    points: [
      "Calcul des adresses réseau, broadcast et plages d'hôtes",
      "Conversion binaire et notation CIDR immédiate",
      "Zéro dépendance externe, s'exécute directement dans le terminal"
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce Shop — Boutique & Panier",
    category: "web",
    categoryLabel: "Web Full Stack",
    summary: "Boutique en ligne avec gestion de catalogue, panier dynamique et simulation d'achat.",
    description: "Projet de commerce en ligne avec affichage d'articles, ajout au panier en temps réel, calcul automatique des montants et gestion fluide de commande.",
    tech: ["JavaScript", "HTML5", "CSS3", "DOM API"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/E-commerce",
    hasInteractiveDemo: true,
    demoType: "ecommerce",
    featured: false,
    points: [
      "Mise à jour instantanée du panier et du total",
      "Filtres par catégories et tri par prix",
      "Interface soignée et entièrement responsive"
    ]
  },
  {
    id: "livechat",
    title: "LiveChat — Messagerie Instantanée",
    category: "web",
    categoryLabel: "Web Full Stack",
    summary: "Système de chat en direct multi-utilisateurs avec gestion de salons et sessions.",
    description: "Application de messagerie instantanée permettant l'échange sécurisé de messages en temps réel entre utilisateurs connectés.",
    tech: ["PHP", "JavaScript", "Sessions", "Temps Réel"],
    image: "/assets/hurices_profile.jpg",
    githubUrl: "https://github.com/hurices/LiveChat",
    hasInteractiveDemo: false,
    featured: false,
    points: [
      "Communication et échange de messages en temps réel",
      "Contrôle d'accès et authentification par session",
      "Architecture légère et facile à déployer"
    ]
  }
];
