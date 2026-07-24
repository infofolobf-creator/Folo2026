import { DiagnosticConfig, ResourceArticle, Lead } from '../types';

export const DIAGNOSTICS_DATA: DiagnosticConfig[] = [
  {
    id: 'leadership',
    title: 'Diagnostic Executive Leadership & CODIR',
    subtitle: 'Évaluez l\'alignement stratégique et la posture de commandement de vos dirigeants.',
    description: 'Mesurez l\'agilité décisionnelle, la vision prospective et l\'inspiration managériale de votre comité de direction.',
    iconName: 'Crown',
    badge: 'Direction Générale',
    estimatedTimeMinutes: 4,
    questions: [
      {
        id: 'q1',
        text: 'Comment votre comité de direction aborde-t-il les incertitudes économiques et les crises ?',
        subtext: 'Résilience organisationnelle et vision prospective',
        options: [
          { id: 'a', label: 'Reaction sous urgence sans vision anticipée claire', score: 2, feedback: 'Risque fort d\'épuisement des équipes par manque de cap.' },
          { id: 'b', label: 'Gestion prudente basée sur des schémas classiques', score: 5, feedback: 'Stabilité correcte mais manque d\'agilité face aux ruptures.' },
          { id: 'c', label: 'Pilotage agile avec scénarios d\'anticipation formalisés', score: 8, feedback: 'Excellente capacité de rebond et posture proactive.' },
          { id: 'd', label: 'Leadership inspirant transformant les crises en opportunités', score: 10, feedback: 'Niveau d\'excellence stratégique élevé.' }
        ]
      },
      {
        id: 'q2',
        text: 'Quel est le niveau de confiance et de délégation envers vos N-1 ?',
        subtext: 'Autonomie et responsabilisation des managers',
        options: [
          { id: 'a', label: 'Micro-management fréquent et validation systématique au sommet', score: 3, feedback: 'Goulot d\'étranglement au niveau du CODIR.' },
          { id: 'b', label: 'Délégation partielle limitée aux tâches opérationnelles', score: 5, feedback: 'Développement modéré de l\'autonomie.' },
          { id: 'c', label: 'Délégation orientée résultats avec autonomie réelle', score: 8, feedback: 'Incitations claires et responsabilisation.' },
          { id: 'd', label: 'Empowerment total avec culture du droit à l\'erreur maîtrisé', score: 10, feedback: 'Culture d\'initiative exemplaire.' }
        ]
      },
      {
        id: 'q3',
        text: 'Quelle est la clarté de la vision stratégique 2026-2030 auprès des équipes ?',
        subtext: 'Alignement et adhésion des collaborateurs',
        options: [
          { id: 'a', label: 'Vision peu formalisée ou réservée à la direction générale', score: 2, feedback: 'Perte de sens et déconnexion du terrain.' },
          { id: 'b', label: 'Vision communiquée annuellement mais peu déclinée sur le terrain', score: 5, feedback: 'Adhésion passive.' },
          { id: 'c', label: 'Vision déclinée en objectifs d\'équipe et régulièrement évaluée', score: 8, feedback: 'Alignement opérationnel solide.' },
          { id: 'd', label: 'Vision co-construite, incarnée au quotidien par chaque leader', score: 10, feedback: 'Engagement et synergie maximale.' }
        ]
      }
    ]
  },
  {
    id: 'management',
    title: 'Diagnostic Efficacité & Pratiques Managériales',
    subtitle: 'Analysez l\'efficacité de vos managers de proximité et directeurs métiers.',
    description: 'Évaluez l\'animation d\'équipe, la régulation des conflits et la fixation des objectifs KPI.',
    iconName: 'Users',
    badge: 'Management',
    estimatedTimeMinutes: 3,
    questions: [
      {
        id: 'mq1',
        text: 'À quelle fréquence vos managers réalisent-ils des entretiens de feedback constructifs ?',
        subtext: 'Pratiques d\'accompagnement individuel',
        options: [
          { id: 'ma', label: 'Uniquement lors de l\'évaluation annuelle obligatoire', score: 2, feedback: 'Insuffisant pour guider la performance continue.' },
          { id: 'mb', label: 'Régulièrement mais de manière informelle et non cadrée', score: 5, feedback: 'Utile mais manque de traçabilité et de structure.' },
          { id: 'mc', label: 'Points mensuels ou bimensuels structurés avec objectifs', score: 8, feedback: 'Très bon rythme d\'alignement.' },
          { id: 'md', label: 'Culture du feedback continu à 360° ancrée quotidiennement', score: 10, feedback: 'Niveau mondial de maturité managériale.' }
        ]
      },
      {
        id: 'mq2',
        text: 'Comment sont gérés les désaccords et conflits au sein des services ?',
        subtext: 'Régulation et climat d\'équipe',
        options: [
          { id: 'ma', label: 'Évitement ou arbitrage autoritaire descendant', score: 3, feedback: 'Création de tensions latentes.' },
          { id: 'mb', label: 'Résolution au cas par cas selon la sensibilité du manager', score: 5, feedback: 'Résultats hétérogènes.' },
          { id: 'mc', label: 'Ateliers de régulation et recherche de consensus gagnant-gagnant', score: 8, feedback: 'Climat de sécurité psychologique.' },
          { id: 'md', label: 'Désaccords perçus comme levier d\'innovation et d\'amélioration', score: 10, feedback: 'Intelligence relationnelle élevée.' }
        ]
      }
    ]
  },
  {
    id: 'rh',
    title: 'Diagnostic Capital Humain & Stratégie RH',
    subtitle: 'Évaluez l\'attractivité, le développement des compétences et la fidélisation.',
    description: 'Un audit complet pour aligner la politique RH avec la croissance de votre entreprise.',
    iconName: 'Target',
    badge: 'Direction RH',
    estimatedTimeMinutes: 4,
    questions: [
      {
        id: 'rhq1',
        text: 'Votre politique de Gestion Prévisionnelle des Emplois et Compétences (GPEC) est-elle formalisée ?',
        subtext: 'Anticipation des métiers de demain',
        options: [
          { id: 'rha', label: 'Inexistante : nous recrutons uniquement au coup par coup', score: 2, feedback: 'Fort risque de pénurie de compétences critiques.' },
          { id: 'rhb', label: 'Partielle : cartographie basique sans plan de formation prospectif', score: 5, feedback: 'Visibilité limitée à court terme.' },
          { id: 'rhc', label: 'Structurée : plans de succession et parcours métiers formalisés', score: 8, feedback: 'Anticipation solide des talents.' },
          { id: 'rhd', label: 'Innovante : accompagnement personnalisé et mobilité prédictive', score: 10, feedback: 'Gestion stratégique exemplaire.' }
        ]
      }
    ]
  },
  {
    id: 'turnover',
    title: 'Diagnostic Rétention des Talents & Turnover',
    subtitle: 'Mesurez le risque de départ des cadres clés et le climat d\'engagement.',
    description: 'Identifiez les facteurs d\'attrition et préservez la mémoire organisationnelle.',
    iconName: 'UserMinus',
    badge: 'Rétention',
    estimatedTimeMinutes: 3,
    questions: [
      {
        id: 'tq1',
        text: 'Quel est votre taux de rotation (turnover) chez les cadres et hauts potentiels ?',
        subtext: 'Stabilité des équipes stratégiques',
        options: [
          { id: 'ta', label: 'Supérieur à 15% par an avec perte de talents clés', score: 2, feedback: 'Critique : fuite de compétences lourde de conséquences financières.' },
          { id: 'tb', label: 'Entre 8% et 15% : stable mais sous vigilance', score: 5, feedback: 'Nécessite une analyse affinée des causes de départ.' },
          { id: 'tc', label: 'Moins de 8% : très faible fuite de talents', score: 8, feedback: 'Excellente attractivité interne.' },
          { id: 'td', label: 'Moins de 5% avec réseau d\'alumni engagé', score: 10, feedback: 'Marque employeur et fidélisation optimales.' }
        ]
      }
    ]
  },
  {
    id: 'ia',
    title: 'Diagnostic Maturité IA & Transformation Digitale',
    subtitle: 'Évaluez l\'adoption des outils d\'intelligence artificielle par vos managers.',
    description: 'Passez de la curiosité technologique à l\'automatisation concrète des processus métier.',
    iconName: 'Bot',
    badge: 'Innovation IA',
    estimatedTimeMinutes: 4,
    questions: [
      {
        id: 'iaq1',
        text: 'Comment vos équipes utilisent-elles l\'IA générative dans leur quotidien ?',
        subtext: 'Adoption et cas d\'usage métier',
        options: [
          { id: 'iaa', label: 'Aucun usage ou utilisation informelle individuelle non encadrée', score: 2, feedback: 'Opportunité manquée et risques de confidentialité.' },
          { id: 'iab', label: 'Premières expérimentations isolées sur la rédaction et la recherche', score: 5, feedback: 'Intérêt naissant à structurer.' },
          { id: 'iac', label: 'Formations réalisées et cas d\'usage métiers intégrés (CRM, rapports)', score: 8, feedback: 'Gains de productivité mesurables.' },
          { id: 'iad', label: 'Agents IA sur mesure interconnectés aux bases de données internes', score: 10, feedback: 'Avantage concurrentiel déterminant.' }
        ]
      }
    ]
  },
  {
    id: 'performance',
    title: 'Diagnostic Performance Collective & Alignement',
    subtitle: 'Mesurez la vitesse d\'exécution et la synergie inter-services.',
    description: 'Éliminez les silos organisationnels pour maximiser la création de valeur.',
    iconName: 'TrendingUp',
    badge: 'Performance',
    estimatedTimeMinutes: 3,
    questions: [
      {
        id: 'pq1',
        text: 'Quel est le degré de collaboration transversale entre les directions (Finance, RH, Ventes, Opérations) ?',
        subtext: 'Silos organisationnels et fluidité',
        options: [
          { id: 'pa', label: 'Silos marqués : objectifs divergents et rivalités internes', score: 2, feedback: 'Ralentissement majeur des projets.' },
          { id: 'pb', label: 'Collaboration ponctuelle lors des réunions trimestrielles', score: 5, feedback: 'Périmètre limité.' },
          { id: 'pc', label: 'Projets transversaux fréquents avec indicateurs partagés', score: 8, feedback: 'Fluidité et synergie efficaces.' },
          { id: 'pd', label: 'Organisation en écosystème agile centré sur l\'expérience client', score: 10, feedback: 'Performance collective maximale.' }
        ]
      }
    ]
  },
  {
    id: 'culture',
    title: 'Diagnostic Culture d\'Entreprise & Valeurs',
    subtitle: 'Vérifiez l\'incarnation des valeurs et l\'engagement des collaborateurs.',
    description: 'Assurez la cohérence entre la promesse managériale et le vécu terrain.',
    iconName: 'Sparkles',
    badge: 'Culture',
    estimatedTimeMinutes: 3,
    questions: [
      {
        id: 'cq1',
        text: 'Les valeurs de votre entreprise sont-elles traduites en comportements évalués au quotidien ?',
        subtext: 'Incarner la culture d\'entreprise',
        options: [
          { id: 'ca', label: 'Valeurs affichées sur le site web mais ignorées sur le terrain', score: 2, feedback: 'Risque de dissonance culturelle.' },
          { id: 'cb', label: 'Connues des employés mais sans impact direct sur le management', score: 5, feedback: 'Adhésion de principe.' },
          { id: 'cc', label: 'Intégrées dans les grilles d\'évaluation et les entretiens', score: 8, feedback: 'Alignement comportemental réel.' },
          { id: 'cd', label: 'Socle fondateur régissant chaque recrutement et décision stratégique', score: 10, feedback: 'Culture forte et différenciante.' }
        ]
      }
    ]
  },
  {
    id: 'innovation',
    title: 'Diagnostic Agilité & Conduite du Changement',
    subtitle: 'Évaluez la vitesse d\'adaptation de votre structure aux évolutions du marché.',
    description: 'Transformez la résistance au changement en dynamique d\'innovation continue.',
    iconName: 'Zap',
    badge: 'Agilité',
    estimatedTimeMinutes: 3,
    questions: [
      {
        id: 'inq1',
        text: 'Quelle est la réaction dominante des équipes lors de l\'annonce d\'un nouveau projet d\'organisation ?',
        subtext: 'Conduite du changement',
        options: [
          { id: 'ina', label: 'Réticence forte, scepticisme et rumeurs internes', score: 2, feedback: 'Manque d\'accompagnement du changement.' },
          { id: 'inb', label: 'Acceptation résignée sans réel enthousiasme', score: 5, feedback: 'Risque de mise en œuvre lente.' },
          { id: 'inc', label: 'Soutien des managers et participation active aux ateliers', score: 8, feedback: 'Dynamique positive.' },
          { id: 'ind', label: 'Co-construction rapide avec célébration des premiers succès', score: 10, feedback: 'Culture du changement maîtrisée.' }
        ]
      }
    ]
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'Moussa Sawadogo',
    email: 'moussa.sawadogo@coris-bank.bf',
    phone: '+226 70 21 45 89',
    company: 'Coris Bank International',
    role: 'Directeur des Ressources Humaines',
    city: 'Bobo-Dioulasso',
    country: 'Burkina Faso',
    status: 'rdv_scheduled',
    score: {
      behaviorScore: 25,
      diagnosticScore: 35,
      companySizeScore: 30,
      totalScore: 90
    },
    diagnosticsCompleted: ['leadership', 'turnover'],
    calculatorOutputs: ['Coût Turnover: 42 500 000 FCFA/an'],
    lastActivity: 'Il y a 2 heures',
    leadFactorySyncStatus: 'synced',
    leadFactoryId: 'LF-2026-8841',
    notes: [
      'Souhaite un séminaire CODIR pour 14 directeurs régionaux à Bobo-Dioulasso.',
      'Diagnostic Turnover révèle une inquiétude sur le départ des jeunes cadres IT.'
    ],
    createdAt: '2026-07-22'
  },
  {
    id: 'lead-2',
    fullName: 'Aminata Ouédraogo',
    email: 'a.ouedraogo@sn-citec.bf',
    phone: '+226 04 12 33 90',
    company: 'SN CITEC Bobo',
    role: 'Directrice Générale',
    city: 'Bobo-Dioulasso',
    country: 'Burkina Faso',
    status: 'diagnostic_done',
    score: {
      behaviorScore: 20,
      diagnosticScore: 38,
      companySizeScore: 28,
      totalScore: 86
    },
    diagnosticsCompleted: ['management', 'ia'],
    calculatorOutputs: ['ROI Formation: 340%'],
    lastActivity: 'Hier à 16:45',
    leadFactorySyncStatus: 'synced',
    leadFactoryId: 'LF-2026-8839',
    notes: ['Souhaite former 35 managers à l\'intégration de l\'IA dans le pilotage industriel.'],
    createdAt: '2026-07-23'
  },
  {
    id: 'lead-3',
    fullName: 'Jean-Philippe Bado',
    email: 'jp.bado@telecel.bf',
    phone: '+226 78 00 11 22',
    company: 'Telecel Faso',
    role: 'Directeur Opérationnel',
    city: 'Ouagadougou',
    country: 'Burkina Faso',
    status: 'proposal_sent',
    score: {
      behaviorScore: 28,
      diagnosticScore: 32,
      companySizeScore: 30,
      totalScore: 90
    },
    diagnosticsCompleted: ['performance', 'culture'],
    calculatorOutputs: ['Temps Perdu Réunions: 18 200 000 FCFA/an'],
    lastActivity: 'Aujourd\'hui à 09:15',
    leadFactorySyncStatus: 'synced',
    leadFactoryId: 'LF-2026-8812',
    notes: ['Devis Folo Executive Coaching soumis pour validation CODIR.'],
    createdAt: '2026-07-20'
  }
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'art-1',
    title: 'Comment structurer la gouvernance d\'un CODIR en Afrique de l\'Ouest',
    category: 'leadership',
    summary: 'Guide pratique pour passer d\'un comité de contrôle à une instance d\'impulsion stratégique agile.',
    readTime: '6 min',
    author: 'Folo Cabinet Conseils',
    date: '18 Juillet 2026',
    publishDate: '18/07/2026',
    type: 'guide',
    tags: ['CODIR', 'Gouvernance', 'Bobo-Dioulasso'],
    downloadUrl: '#',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'art-2',
    title: 'L\'Intelligence Artificielle au service des managers africains : 5 cas d\'usage concrets',
    category: 'ia',
    summary: 'Analyse d\'impact sur la rédaction de synthèses, la gestion de projet et l\'automatisation CRM.',
    readTime: '8 min',
    author: 'Folo AI Lab',
    date: '12 Juillet 2026',
    publishDate: '12/07/2026',
    type: 'whitepaper',
    tags: ['IA', 'Productivité', 'Gemini'],
    downloadUrl: '#',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'art-3',
    title: 'Le coût réel du mauvais management dans les entreprises de la zone UEMOA',
    category: 'rh',
    summary: 'Étude chiffrée sur la baisse de productivité, l\'absentéisme et la perte de motivation des équipes.',
    readTime: '5 min',
    author: 'Folo Research',
    date: '02 Juillet 2026',
    publishDate: '02/07/2026',
    type: 'checklist',
    tags: ['Rétention', 'Turnover', 'DRH'],
    downloadUrl: '#',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
  }
];

export const MOCK_RESOURCES = RESOURCE_ARTICLES;
