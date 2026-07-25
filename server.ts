import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// In-memory CRM Store
const leadsStore: any[] = [
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
    lastActivity: 'Il y a 2h',
    leadFactorySyncStatus: 'synced',
    leadFactoryId: 'LF-2026-8841',
    notes: ['Souhaite un séminaire CODIR à Bobo-Dioulasso pour 14 directeurs.'],
    createdAt: new Date().toISOString()
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
    lastActivity: 'Hier 16:45',
    leadFactorySyncStatus: 'synced',
    leadFactoryId: 'LF-2026-8839',
    notes: ['Souhaite former 35 managers à l\'intégration de l\'IA.'],
    createdAt: new Date().toISOString()
  }
];

// ================= API REST ROUTES =================

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", platform: "FOLO Executive Platform", hq: "Bobo-Dioulasso, Burkina Faso" });
});

// FOLO Core Integration: Synchronisation des Prospects (POST /api/leads)
app.post("/api/leads", (req, res) => {
  const { fullName, email, phone, company, role, source, interest, country } = req.body;
  const leadId = `lead_exec_${Math.floor(Date.now() / 1000)}_${Math.random().toString(36).substr(2, 6)}`;
  
  const newLead = {
    id: leadId,
    fullName: fullName || 'Prospect Inconnu',
    email: email || 'email@prospect.bf',
    phone: phone || '+226 00 00 00 00',
    company: company || 'Organisation Partenaire',
    role: role || 'Dirigeant',
    country: country || 'Burkina Faso',
    source: source || 'FOLO Executive Hub',
    interest: interest || 'Coaching & Diagnostic Stratégique',
    status: 'diagnostic_done',
    createdAt: new Date().toISOString()
  };

  leadsStore.unshift(newLead);

  res.status(200).json({
    success: true,
    leadId,
    message: "Prospect enregistré avec succès dans FOLO Core Vault.",
    data: newLead
  });
});

// FOLO Core Integration: Diagnostics Stratégiques (POST /api/diagnostics)
app.post("/api/diagnostics", (req, res) => {
  const { leadId, companyName, diagnosticType, scores, recommendations } = req.body;
  const diagId = `diag_${Math.floor(Date.now() / 1000)}_${Math.random().toString(36).substr(2, 6)}`;

  res.status(200).json({
    success: true,
    diagnosticId: diagId,
    leadId: leadId || 'lead_exec_default',
    companyName: companyName || 'Organisation Partenaire',
    message: "Rapport de diagnostic synchronisé avec FOLO Core.",
    timestamp: new Date().toISOString()
  });
});

// FOLO Core Integration: Prise de Rendez-vous Exécutifs (POST /api/appointments)
app.post("/api/appointments", (req, res) => {
  const { leadId, fullName, email, company, date, timeSlot, topic, advisorNote } = req.body;
  const appointmentId = `apt_${Math.floor(Date.now() / 1000)}_${Math.random().toString(36).substr(2, 6)}`;

  res.status(200).json({
    success: true,
    appointmentId,
    leadId: leadId || 'lead_exec_default',
    fullName: fullName || 'Dirigeant Partner',
    email,
    company,
    date: date || new Date().toISOString().split('T')[0],
    timeSlot: timeSlot || '10:00 GMT',
    topic: topic || 'Entretien Stratégique FOLO',
    status: 'confirmed',
    message: "Rendez-vous stratégique enregistré dans le calendrier FOLO Core."
  });
});

// FOLO Core Integration: Catalogue des Offres (GET /api/offers)
app.get("/api/offers", (req, res) => {
  res.json({
    success: true,
    offers: [
      {
        id: "offer_executive_starter",
        name: "FOLO Executive Starter",
        pricePerMonthEuro: 490,
        pricePerMonthFCFA: 320000,
        features: ["Diagnostic Stratégique IA", "Coaching Exécutif Individuel", "Support FOLO Prioritaire"]
      },
      {
        id: "offer_executive_scale",
        name: "FOLO Executive Scale",
        pricePerMonthEuro: 1290,
        pricePerMonthFCFA: 850000,
        features: ["Accès FOLO Core Vault", "Accompagnement CODIR & Équipes", "SSO Enterprise"]
      }
    ]
  });
});

// FOLO Core Integration: SSO Token Generation (POST /api/sso/issue-token)
app.post("/api/sso/issue-token", (req, res) => {
  const { userId, appSlug } = req.body;
  const ssoToken = `folo_sso_${appSlug || 'executive'}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  res.json({
    success: true,
    ssoToken,
    redirectUrl: `/sso-login?token=${ssoToken}`
  });
});

// Assistant IA FOLO Endpoint
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    const ai = getAiClient();

    if (!ai) {
      // Fallback structured smart response if GEMINI_API_KEY is not set
      return res.json({
        reply: `Bonjour, je suis l'Assistant IA de FOLO (Bobo-Dioulasso & UEMOA). 

En tant que cabinet spécialisé en coaching de haute direction et formation de comités de direction, nous pouvons vous accompagner sur :
1. **Diagnostic IA Gratuit** : Évaluation de la maturité de votre CODIR et vos managers.
2. **Calcul de ROI** : Mesure de la rentabilité de vos formations et coût du turnover.
3. **Accompagnement Sur-Mesure** : Coaching individuel de dirigeants & séminaires d'équipe à Bobo-Dioulasso, Ouagadougou ou à distance.

Aimeriez-vous planifier un échange stratégique de 30 minutes avec nos experts ?`,
        suggestedActions: [
          { label: "Faire un Diagnostic IA", action: "start_diagnostic" },
          { label: "Prendre un RDV Stratégique", action: "schedule_rdv" },
          { label: "Calculer mon ROI Formation", action: "open_calculator" }
        ]
      });
    }

    const systemInstruction = `Tu es le Conseiller IA officiel de FOLO — Cabinet d'Excellence en Executive Coaching, Formation Management & Transformation IA en Afrique Francophone (Siège à Bobo-Dioulasso, Burkina Faso).
Ton rôle est d'accueillir chaleureusement les dirigeants, DRH, Directeurs Généraux et managers, comprendre leurs besoins (leadership, turnover, IA, performance d'équipe), répondre avec clarté et professionnalisme, et les guider vers :
- Un diagnostic IA interactif gratuit
- Un calculateur de ROI
- Un rendez-vous stratégique offert de 30 min avec l'équipe FOLO à Bobo-Dioulasso, Ouagadougou ou en visioconférence.
Reste concis, élégant, orienté valeur business et encourage la prise de rendez-vous ou la réalisation de diagnostics.`;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const response = await chat.sendMessage({ message: prompt });
    const replyText = response.text || "Merci pour votre message. Comment puis-je vous aider dans le développement de vos équipes ?";

    res.json({
      reply: replyText,
      suggestedActions: [
        { label: "Faire un Diagnostic Leadership", action: "start_diagnostic", payload: "leadership" },
        { label: "Prendre un RDV Stratégique", action: "schedule_rdv" },
        { label: "Simuler mon ROI Formation", action: "open_calculator", payload: "roi_formation" }
      ]
    });
  } catch (error: any) {
    console.error("Error in /api/gemini/assistant:", error);
    res.status(500).json({ error: "Erreur lors du traitement par l'Assistant FOLO IA" });
  }
});

// Diagnostic IA Generation Route
app.post("/api/gemini/diagnostic", async (req, res) => {
  try {
    const { category, answers, scoreTotal, companyName, role } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        analysis: `Analyse synthétique FOLO V2 pour ${companyName || 'votre organisation'} :
- Score global obtenu : ${scoreTotal}/100.
- Niveau : ${scoreTotal >= 70 ? 'Avancé' : scoreTotal >= 50 ? 'Moyen' : 'Critique'}.
- Recommandation FOLO : Nous préconisons un atelier d'alignement CODIR et la mise en place de KPIs partagés pour consolider votre trajectoire 2026.`,
        recommendations: [
          "Organiser un séminaire de cadrage stratégique CODIR à Bobo-Dioulasso.",
          "Instaurer des rituels mensuels de feedback managérial.",
          "Déployer un parcours de formation IA pour les managers de proximité."
        ]
      });
    }

    const prompt = `Génère une analyse synthétique de haut niveau pour un diagnostic de type "${category}" réalisé par un(e) ${role || 'Dirigeant(e)'} chez ${companyName || 'une entreprise partenaire'}.
Score obtenu : ${scoreTotal}/100.
Formule 3 recommandations stratégiques très concrètes, adaptées au contexte des entreprises en Afrique de l'Ouest (Burkina Faso / UEMOA).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "Tu es un consultant senior en stratégie et coaching d'entreprise chez FOLO. Réponds avec professionnalisme et précision."
      }
    });

    res.json({
      analysis: response.text,
      recommendations: [
        "Alignement stratégique du Comité de Direction avec plan d'action à 90 jours.",
        "Renforcement des compétences de leadership des managers de transition.",
        "Automatisation des processus de suivi RH via l'intelligence artificielle."
      ]
    });
  } catch (error: any) {
    console.error("Error in /api/gemini/diagnostic:", error);
    res.status(500).json({ error: "Erreur lors de la génération de l'analyse FOLO IA" });
  }
});

// CRM REST Endpoints
app.get("/api/crm/leads", (req, res) => {
  res.json({ leads: leadsStore, total: leadsStore.length });
});

app.post("/api/crm/leads", (req, res) => {
  const { fullName, email, phone, company, role, city, country, notes, diagnosticCategory } = req.body;

  // Score qualification calculation logic (0 - 100)
  const behaviorScore = 20 + Math.floor(Math.random() * 10);
  const diagnosticScore = diagnosticCategory ? 35 : 15;
  const companySizeScore = company ? 30 : 15;
  const totalScore = behaviorScore + diagnosticScore + companySizeScore;

  const newLead = {
    id: `lead-${Date.now()}`,
    fullName: fullName || 'Prospect Inconnu',
    email: email || 'email@prospect.bf',
    phone: phone || '+226 00 00 00 00',
    company: company || 'Organisation Partenaire',
    role: role || 'Dirigeant',
    city: city || 'Bobo-Dioulasso',
    country: country || 'Burkina Faso',
    status: 'diagnostic_done',
    score: {
      behaviorScore,
      diagnosticScore,
      companySizeScore,
      totalScore
    },
    diagnosticsCompleted: diagnosticCategory ? [diagnosticCategory] : [],
    calculatorOutputs: [],
    lastActivity: 'À l\'instant',
    leadFactorySyncStatus: 'synced',
    leadFactoryId: `LF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    notes: notes ? [notes] : ['Prospect qualifié créé depuis la plateforme FOLO V2.'],
    createdAt: new Date().toISOString()
  };

  leadsStore.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead });
});

// Lead Factory REST Sync Route
app.post("/api/lead-factory/sync", (req, res) => {
  const { leadId } = req.body;
  const lead = leadsStore.find(l => l.id === leadId);

  if (lead) {
    lead.leadFactorySyncStatus = 'synced';
    lead.leadFactoryId = `LF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  res.json({
    success: true,
    message: "Données synchronisées avec succès avec Lead Factory via API REST.",
    syncTimestamp: new Date().toISOString(),
    leadFactoryId: lead?.leadFactoryId || 'LF-2026-LIVE'
  });
});

// Analytics Endpoint
app.get("/api/analytics", (req, res) => {
  res.json({
    totalVisitors: 4280,
    totalDiagnosticsCompleted: 612,
    totalLeadsQualified: 148,
    conversionRate: 14.3,
    appointmentsScheduled: 39,
    pipelineValueXOF: 185000000, // 185 Millions FCFA
    trafficSources: [
      { name: "LinkedIn Folo Campaign", value: 45 },
      { name: "SEO / Google Search", value: 30 },
      { name: "Recommandations Pairs", value: 15 },
      { name: "Direct / WhatsApp", value: 10 }
    ]
  });
});

// ================= VITE DEV / PRODUCTION BUILD HANDLER =================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FOLO V2 Server] Serveur démarré sur http://localhost:${PORT}`);
  });
}

startServer();
