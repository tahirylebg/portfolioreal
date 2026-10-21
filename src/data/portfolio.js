export const profile = {
  name: 'Tahiry Ramambazafy',
  role: 'Étudiant en cybersécurité',
  focus: 'Systèmes, réseaux & sécurité web',
  school: 'Ynov · Administrateur systèmes et réseaux (titre RNCP)',
  email: 'tahiry.ramambazafypro@outlook.com',
  phone: '+33614995533',
  linkedin: 'https://www.linkedin.com/in/tahiry-ramambazafy',
  summary:
    "Je m'intéresse à la sécurité des infrastructures, des réseaux et des applications web. J'aime comprendre comment un système fonctionne, repérer ses points faibles et apporter des corrections concrètes.",
  languages: ['Français · natif', 'Anglais · avancé', 'Malgache · courant'],
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
    tone: 'lime',
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
    tone: 'cyan',
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
    tone: 'orange',
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
    tone: 'lime',
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
    tone: 'cyan',
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
    tone: 'orange',
    visual: 'pymagotchi',
  },
];

export const experience = [
  {
    role: 'Stagiaire développeur sécurité web',
    organization: 'Étoile',
    period: '06/2026 — 08/2026',
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

export const education = [
  {
    qualification: 'Bachelor — Cybersécurité',
    institution: 'Ynov Campus',
    period: '2025 — en cours',
    detail: 'Titre RNCP Administrateur systèmes et réseaux',
    logo: '/images/profil/ynovcampus_toulouse.webp',
  },
  {
    qualification: 'Licence — Informatique',
    institution: 'Université Toulouse',
    period: '2021 — 2025',
    detail: '',
    logo: '/images/profil/universite-toulouse-iii-paul-sabatier.jpg',
  },
  {
    qualification: 'PACES / PASS / LAS — Médecine',
    institution: 'Université de Toulouse',
    period: '2019 — 2021',
    detail: '',
    logo: '/images/profil/universite-toulouse-iii-paul-sabatier.jpg',
  },
  {
    qualification: 'Baccalauréat scientifique',
    institution: 'Lycée Paul Sabatier',
    period: '2017 — 2019',
    detail: 'Mention assez bien',
    logo: '/images/profil/lycéepaulsabatier.png',
  },
];

export const certifications = [
  {
    name: 'Cybersecurity Foundations',
    issuer: 'LinkedIn Learning',
    image: '/images/profil/cybersecurity-foundations.jpg',
    date: '2024',
  },
  {
    name: 'Career Essentials in Cybersecurity',
    issuer: 'Microsoft & LinkedIn Learning',
    image: '/images/profil/career-essentials-cybersecurity.png',
    date: '2024',
  },
  {
    name: 'SecNumacadémie — Attestation de suivi',
    issuer: 'ANSSI · FUN MOOC',
    image: '/images/profil/anssi-secnumacademie.jpg',
    date: '2023',
  },
  {
    name: 'Project Management Essentials',
    issuer: 'Howard University · Coursera',
    image: '/images/profil/project-management-essentials.jpg',
    date: '2025',
  },
];

export const currentTraining = {
  name: 'Préparation CCNA',
  provider: 'Candidat libre',
  period: '2026 — en cours',
};

export const skillGroups = [
  {
    name: 'Infrastructure',
    items: ['Linux & Windows Server', 'VMware · Hyper-V · VirtualBox', 'UFW · Nginx', 'HTTPS · OpenSSL', 'Bash'],
  },
  {
    name: 'Sécurité',
    items: ['Sécurité web', 'Tests d’intrusion', 'Audit', 'OSINT', 'Durcissement système'],
  },
  {
    name: 'Outils & code',
    items: ['Postman', 'Valgrind · GDB', 'C', 'Réseaux', 'Sauvegardes automatisées'],
  },
];
