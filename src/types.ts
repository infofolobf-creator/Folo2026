export type ModuleView = 
  | 'site' 
  | 'diagnostics' 
  | 'calculators' 
  | 'assistant' 
  | 'crm' 
  | 'dashboard' 
  | 'resources'
  | 'coaching'
  | 'lepont';

// Diagnostics
export type DiagnosticCategory = 
  | 'leadership'
  | 'management'
  | 'rh'
  | 'turnover'
  | 'ia'
  | 'performance'
  | 'culture'
  | 'innovation';

export interface Option {
  id: string;
  label: string;
  score: number; // 0 - 10
  feedback: string;
}

export interface Question {
  id: string;
  text: string;
  subtext?: string;
  options: Option[];
}

export interface DiagnosticConfig {
  id: DiagnosticCategory;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  estimatedTimeMinutes: number;
  questions: Question[];
}

export interface DiagnosticResult {
  id: string;
  category: DiagnosticCategory;
  scoreTotal: number; // 0 - 100
  level: 'Critique' | 'Moyen' | 'Avancé' | 'Excellence';
  dimensions: { name: string; score: number }[];
  keyRisks: string[];
  recommendations: string[];
  suggestedPrograms: string[];
  createdAt: string;
}

// Calculateurs
export type CalculatorType = 
  | 'roi_formation'
  | 'cost_turnover'
  | 'cost_bad_management'
  | 'lost_meeting_time'
  | 'ia_gain'
  | 'team_performance'
  | 'coaching_roi';

export interface CalculatorResult {
  title: string;
  primaryValue: string;
  primaryUnit: string;
  secondaryLabel: string;
  secondaryValue: string;
  breakdown: { label: string; value: number; formatted: string }[];
  chartData: { name: string; actuel: number; optimise: number }[];
  insights: string[];
  recommendedAction: string;
}

// CRM & Prospects
export type LeadStatus = 'prospect' | 'diagnostic_done' | 'rdv_scheduled' | 'proposal_sent' | 'won' | 'lost';

export interface LeadScoreBreakdown {
  behaviorScore: number; // 0 - 30 (pages, downloads)
  diagnosticScore: number; // 0 - 40 (diagnostic completed)
  companySizeScore: number; // 0 - 30 (budget, CODIR size)
  totalScore: number; // 0 - 100
}

export interface LeadActivity {
  id: string;
  timestamp: string;
  type: 'visit' | 'diagnostic' | 'calculator' | 'chat' | 'download' | 'rdv';
  description: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  city: string;
  country: string;
  status: LeadStatus;
  score: LeadScoreBreakdown;
  diagnosticsCompleted: string[];
  calculatorOutputs: string[];
  lastActivity: string;
  leadFactorySyncStatus: 'synced' | 'pending' | 'failed';
  leadFactoryId?: string;
  notes: string[];
  createdAt: string;
}

// Chatbot Assistant IA
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; payload?: any }[];
}

// Analytics Dashboard
export interface KPIStats {
  totalVisitors: number;
  totalDiagnosticsCompleted: number;
  totalLeadsQualified: number;
  conversionRate: number;
  appointmentsScheduled: number;
  pipelineValueXOF: number;
}

// Blog & Resources
export interface ResourceArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  author: string;
  publishDate?: string;
  date?: string;
  downloadUrl?: string;
  type: 'article' | 'guide' | 'whitepaper' | 'checklist';
  image?: string;
  tags: string[];
}

export type Resource = ResourceArticle;
