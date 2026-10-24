export const profile = {
  name: 'Tahiry Ramambazafy',
  role: 'Étudiant en cybersécurité',
  focus: 'Systèmes, réseaux & sécurité web',
  school: 'Ynov · Administrateur systèmes, réseaux et bases de données (titre RNCP)',
  rncp: { code: 'RNCP 41996', url: 'https://www.francecompetences.fr/recherche/rncp/41996/' },
  seeking: 'Alternance en cybersécurité',
  location: 'Toulouse',
  email: 'tahiry.ramambazafypro@outlook.com',
  linkedin: 'https://www.linkedin.com/in/tahiry-ramambazafy',
  github: 'https://github.com/tahirylebg',
  summary:
    "Je m'intéresse à la sécurité des infrastructures, des réseaux et des applications web. J'aime comprendre comment un système fonctionne, repérer ses points faibles et apporter des corrections concrètes.",
  lead: "Tout a commencé par l'infrastructure : les systèmes, les réseaux, ce qui fait tourner les services numériques.",
  // Short log entries displayed as cards in the Profil section.
  about: [
    { label: 'Origine', text: "La cybersécurité est la suite logique de l'infrastructure : comprendre les failles, protéger les systèmes, analyser les risques." },
    { label: 'Objectif', text: 'Me former chez Ynov en sécurité web, OSINT et Linux, puis travailler dans la sécurité informatique.' },
    { label: 'Méthode', text: 'La boxe et la course m’ont appris la régularité : observer, vérifier mes hypothèses, avancer étape par étape.' },
    { label: 'Terrain', text: 'Équipier, ouvrier agricole : savoir prendre ma place dans une équipe et tenir dans la durée.' },
  ],
  strengths: ['Sécurité web', 'OSINT', 'Linux', 'Réseaux', 'Durcissement', 'Ansible', 'Debug C'],
  // level: 1 to 5, rendered as a segmented gauge.
  languages: [
    { name: 'Français', level: 5, label: 'Natif' },
    { name: 'Anglais', level: 4, label: 'Avancé' },
    { name: 'Malgache', level: 4, label: 'Courant' },
  ],
};

// Every project shows: name, role, stack (details), result and at least one link (pdf / github).
// kind: web | osint | infra | dev, drives the category badge (one colour per category, see projectKinds).
export const projectKinds = {
  web: 'Sécurité web',
  osint: 'OSINT',
  infra: 'Infrastructure',
  dev: 'Développement',
};

export const projects = [
  {
    id: 'natty',
    pdf: '/natty.pdf',
    github: 'https://github.com/DylanNeural/Natty',
    cover: '/natty-cover.webp',
    name: 'Natty',
    category: 'Application · sécurité web',
    description:
      "Application de nutrition qui analyse les aliments et propose des recommandations personnalisées. Travail sur la sécurisation des échanges, des routes sensibles et des interfaces.",
    details: ['Sécurité back-end', 'Protection des routes', 'Tests API avec Postman'],
    role: 'Sécurisation back-end & API (projet d’équipe)',
    result: 'Routes sensibles protégées, échanges sécurisés et API vérifiée sous Postman.',
    kind: 'web',
    visual: 'natty',
  },
  {
    id: 'osint-nyv',
    pdf: '/osint-nyv.pdf',
    cover: '/osint-nyv-cover.webp',
    name: 'OSINT Ynov',
    category: 'OSINT · sensibilisation',
    description:
      "Étude de la visibilité en ligne à partir de données publiques pour identifier des risques de phishing ou d'usurpation d'identité, puis formuler des recommandations de protection.",
    details: ['Données publiques', 'Google dorks', 'Analyse des risques'],
    role: 'Analyste OSINT',
    result: 'Cartographie des risques de phishing et d’usurpation, avec recommandations de protection.',
    kind: 'osint',
    visual: 'osint',
  },
  {
    id: 'portail-securise',
    pdf: '/portail-cloud.pdf',
    cover: '/portail-cloud-cover.webp',
    name: 'Portail cloud sécurisé',
    category: 'Infrastructure · Linux',
    description:
      "Déploiement d'un portail interne sur Ubuntu Server virtualisé, avec durcissement du pare-feu, accès HTTPS, en-têtes de sécurité et sauvegardes automatisées.",
    details: ['Ubuntu · VMware', 'UFW · Nginx · TLS', 'Bash · healthcheck'],
    role: 'Administration système : déploiement & durcissement',
    result: 'Portail servi en HTTPS, pare-feu restreint et sauvegardes automatisées vérifiées par healthcheck.',
    kind: 'infra',
    visual: 'infra',
  },
  {
    id: 'memoire-c',
    pdf: '/diagnostic-memoire-c.pdf',
    cover: '/diagnostic-memoire-c-cover.webp',
    name: 'Diagnostic mémoire en C',
    category: 'Programmation · debugging',
    description:
      "Analyse d'un programme de simulation de sessions pour localiser et corriger des fuites mémoire à l'aide d'outils de débogage bas niveau.",
    details: ['Valgrind · Memcheck', 'GDB', 'malloc / free'],
    role: 'Debugging bas niveau en C',
    result: 'Fuites mémoire localisées puis corrigées, confirmées par Valgrind.',
    kind: 'dev',
    visual: 'memory',
  },
  {
    id: 'ansible-rebuild',
    pdf: '/ansible-automation-rebuild.pdf',
    cover: '/ansible-automation-rebuild-cover.webp',
    name: 'Automatisation Ansible — Rebuild',
    category: 'Infrastructure · automatisation · IaC',
    description:
      "Automatisation du rebuild d’une machine serveur avec Ansible. Le projet vise un provisionnement plus rapide, fiable et reproductible, avec un objectif de reconstruction en moins de 30 minutes.",
    details: ['Ansible', 'Infrastructure as Code', 'Reproductibilité'],
    role: 'Automatisation & Infrastructure as Code',
    result: 'Rebuild serveur reproductible, avec un objectif de reconstruction en moins de 30 minutes.',
    kind: 'infra',
    visual: 'ansible',
  },
  {
    id: 'pymagotchi',
    pdf: '/pymagotchi.pdf',
    cover: '/pymagotchi-cover.webp',
    github: 'https://github.com/tahirylebg/Python-Tamagotchi',
    name: 'Pymagotchi',
    category: 'Python · jeu vidéo · architecture MVC',
    description:
      "Tamagotchi virtuel développé en Python avec Pygame-CE : créature animée, jauges qui évoluent en temps réel, sauvegarde de partie, évolution du personnage et mini-jeu.",
    details: ['Python · Pygame-CE', 'Architecture MVC', 'Sauvegarde JSON'],
    role: 'Développement Python (conception & code)',
    result: 'Jeu jouable : jauges en temps réel, sauvegarde de partie, évolution et mini-jeu.',
    kind: 'dev',
    visual: 'pymagotchi',
  },
];

export const experience = [
  {
    role: 'Stagiaire développeur sécurité web',
    organization: 'Étoile',
    type: 'Stage',
    // ISO months: the status badge (à venir / en cours / terminé) is computed at build time.
    start: '2026-06',
    end: '2026-08',
    period: 'Juin — août 2026',
    description:
      "Création d'un site web et d'une application mobile, mise en place de règles de sécurité, tests d'intrusion et audit de sécurité.",
  },
  {
    role: 'Équipier polyvalent',
    organization: "McDonald's & Burger King",
    period: '2023 — 2024',
    description:
      "Priorisation des tâches et collaboration en environnement rapide. Gestion du stress, communication, coordination, réactivité et respect des délais.",
  },
  {
    role: 'Ouvrier agricole',
    organization: 'Nora Roudasse',
    period: '07/2022 — 08/2022',
    description:
      "Travail saisonnier en extérieur, respect des plannings et des techniques agricoles, coordination et coopération avec l'équipe dans des conditions changeantes.",
  },
  {
    role: 'Téléconseiller',
    organization: 'Pixpay',
    period: '07/2021 — 09/2021',
    description:
      "Écoute active, communication professionnelle, adaptation des arguments et résilience dans la gestion des refus et la présentation d'idées.",
  },
];

// logo: display-size WebP; logoSize / thumbSize: intrinsic [width, height] to reserve layout space.
export const education = [
  {
    qualification: 'Bachelor — Cybersécurité',
    institution: 'Ynov Campus',
    period: '2025 — en cours',
    detail: 'Titre RNCP Administrateur systèmes, réseaux et bases de données',
    logo: '/images/profil/ynovcampus_toulouse-logo.webp',
    logoSize: [240, 160],
  },
  {
    qualification: 'Licence — Informatique',
    institution: 'Université Toulouse',
    period: '2021 — 2025',
    detail: '',
    logo: '/images/profil/universite-toulouse-iii-paul-sabatier-logo.webp',
    logoSize: [320, 117],
  },
  {
    qualification: 'PACES / PASS / LAS — Médecine',
    institution: 'Université de Toulouse',
    period: '2019 — 2021',
    detail: '',
    logo: '/images/profil/universite-toulouse-iii-paul-sabatier-logo.webp',
    logoSize: [320, 117],
  },
  {
    qualification: 'Baccalauréat scientifique',
    institution: 'Lycée Paul Sabatier',
    period: '2017 — 2019',
    detail: 'Mention assez bien',
    logo: '/images/profil/lycee-paul-sabatier-logo.webp',
    logoSize: [160, 160],
  },
];

// Ordered by relevance: the ANSSI course first, then the vendor / e-learning certificates.
export const certifications = [
  {
    name: 'SecNumacadémie — Attestation de suivi',
    issuer: 'ANSSI · FUN MOOC',
    image: '/images/profil/anssi-secnumacademie.jpg',
    thumb: '/images/profil/anssi-secnumacademie-thumb.webp',
    thumbSize: [491, 347],
    date: '2023',
  },
  {
    name: 'Cybersecurity Foundations',
    issuer: 'LinkedIn Learning',
    image: '/images/profil/cybersecurity-foundations.jpg',
    thumb: '/images/profil/cybersecurity-foundations-thumb.webp',
    thumbSize: [640, 494],
    date: '2024',
  },
  {
    name: 'Career Essentials in Cybersecurity',
    issuer: 'Microsoft & LinkedIn Learning',
    image: '/images/profil/career-essentials-cybersecurity.png',
    thumb: '/images/profil/career-essentials-cybersecurity-thumb.webp',
    thumbSize: [640, 494],
    date: '2024',
  },
  {
    name: 'Project Management Essentials',
    issuer: 'Howard University · Coursera',
    image: '/images/profil/project-management-essentials.jpg',
    thumb: '/images/profil/project-management-essentials-thumb.webp',
    thumbSize: [640, 494],
    date: '2025',
  },
];

export const currentTraining = {
  name: 'Préparation CCNA',
  provider: 'Candidat libre',
  period: '2026 — en cours',
};

// "Ma stack": every tool points to where it was actually used (project, internship or training).
// icons: Simple Icons slugs (brand logos) or custom pictogram names defined in index.astro.
export const stack = [
  {
    id: 'dev',
    code: 'DEV',
    name: 'Développement',
    summary: 'Coder, déboguer et tester : du bas niveau en C jusqu’aux API web.',
    items: [
      { name: 'Python', use: 'Pymagotchi', icons: ['python'] },
      { name: 'Pygame-CE', use: 'Pymagotchi', icons: ['gamepad'] },
      { name: 'Architecture MVC', use: 'Pymagotchi', icons: ['layers'] },
      { name: 'C', use: 'Diagnostic mémoire', icons: ['c'] },
      { name: 'Valgrind · GDB', use: 'Diagnostic mémoire', icons: ['debug'] },
      { name: 'Bash', use: 'Portail cloud', icons: ['gnubash'] },
      { name: 'Postman', use: 'Natty', icons: ['postman'] },
      { name: 'Git · GitHub', use: 'Natty · Pymagotchi', icons: ['git', 'github'] },
      { name: 'Astro · JavaScript', use: 'Ce portfolio', icons: ['astro', 'javascript'] },
    ],
  },
  {
    id: 'infra',
    code: 'NET/SYS',
    name: 'Réseau & système',
    summary: 'Déployer, configurer et automatiser des serveurs fiables.',
    items: [
      { name: 'Linux · Ubuntu Server', use: 'Portail cloud', icons: ['linux', 'ubuntu'] },
      { name: 'Windows Server', use: 'Formation Ynov', icons: ['windows'] },
      { name: 'VMware · Hyper-V · VirtualBox', use: 'Labs virtualisés', icons: ['vm', 'virtualbox'] },
      { name: 'Nginx', use: 'Portail cloud', icons: ['nginx'] },
      { name: 'HTTPS · TLS · OpenSSL', use: 'Portail cloud', icons: ['key'] },
      { name: 'Sauvegardes automatisées', use: 'Portail cloud', icons: ['backup'] },
      { name: 'Ansible · IaC', use: 'Rebuild serveur', icons: ['ansible'] },
      { name: 'Réseaux · routage', use: 'Préparation CCNA', icons: ['cisco'] },
    ],
  },
  {
    id: 'cyber',
    code: 'SEC',
    name: 'Cybersécurité',
    summary: 'Trouver les points faibles, puis les corriger concrètement.',
    items: [
      { name: 'Sécurité web · routes', use: 'Natty', icons: ['shield'] },
      { name: 'Tests d’intrusion', use: 'Stage Étoile', icons: ['target'] },
      { name: 'Audit de sécurité', use: 'Stage Étoile', icons: ['audit'] },
      { name: 'Pare-feu UFW', use: 'Portail cloud', icons: ['firewall'] },
      { name: 'Durcissement · en-têtes', use: 'Portail cloud', icons: ['lock'] },
      { name: 'OSINT · Google dorks', use: 'OSINT Ynov', icons: ['google'] },
      { name: 'Analyse des risques', use: 'OSINT Ynov', icons: ['risk'] },
      { name: 'Bonnes pratiques ANSSI', use: 'SecNumacadémie', icons: ['badge'] },
    ],
  },
];
