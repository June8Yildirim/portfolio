// Core Project Types

export interface ProjectDetail {
  id: string;
  app_identity: AppIdentity;
  core_purpose: CorePurpose;
  key_features: KeyFeature[];
  user_experience: UserExperience;
  technical_architecture?: TechnicalArchitecture;
  target_audience: TargetAudience[];
  security_and_privacy: SecurityAndPrivacy;
  data_sync?: DataSync;
  development_details?: DevelopmentDetails;
  ui_features?: UIFeatures;
  analytics_and_reporting?: AnalyticsAndReporting;
  habit_lifecycle?: HabitLifecycle;
  mood_tracking?: MoodTracking;
  reporting_features?: ReportingFeatures;
  notifications?: Notifications;
  widget_integration?: WidgetIntegration;
  summary: string;
  link?: string;
}

export interface Notifications {
  type: string;
  scheduling: string;
  content: string;
  management: string;
  authorization: string;
}

export interface WidgetIntegration {
  platform: string;
  sizes: string[];
  update_frequency: string;
  data_source: string;
  display_content: string;
  configuration: string;
}

export interface AppIdentity {
  name: string;
  developer: string;
  platforms: string[];
  url: string | null;
  tagline: string;
}

export interface CorePurpose {
  mission: string;
  problem_solved: (string | ProblemWithDetails)[];
  positioning: string;
}

export interface ProblemWithDetails {
  title: string;
  company: string;
  technologies: string[];
  id: string;
  achievements: string[];
  gradient: string;
}

export interface KeyFeature {
  title: string;
  description: string;
  automation_level?: "High" | "Medium" | "Low";
  impact?: string;
  technology?: string;
  status?: string;
  [key: string]: any;
}

export interface UserExperience {
  design_philosophy: string;
  workflow_steps: string[];
  ui_components?: string[];
}

export interface TechnicalArchitecture {
  platform: string;
  minimum_deployment?: string;
  framework: string;
  language: string;
  data_persistence: DataPersistence;
  swiftdata_entities?: SwiftDataEntity[];
  enums?: EnumDefinition[];
  observable_objects?: string[];
  extensions?: string[];
}

export interface DataPersistence {
  primary: string;
  container?: string;
  sync_service?: string;
  local_storage?: string;
  user_preferences?: string;
  secure_storage?: string;
  sample_data_flag?: string;
}

export interface SwiftDataEntity {
  name: string;
  attributes: string[];
  relationships: string[];
  key_methods?: string[];
}

export interface EnumDefinition {
  name: string;
  cases: string[];
  raw_values?: number[];
  properties?: string[];
}

export interface TargetAudience {
  persona: string;
  use_case: string;
}

export interface SecurityAndPrivacy {
  data_encryption?: string;
  data_storage?: string;
  privacy_features?: string[];
  authentication_methods?: string[];
  data_integrity?: string;
}

export interface DataSync {
  method: string;
  scope: string;
  conflict_resolution: string;
  offline_support: string;
  multi_device: string;
}

export interface DevelopmentDetails {
  code_organization: string[];
  design_system: string;
  testing: string;
  version_control: string;
  sample_data: string;
}

export interface UIFeatures {
  theming: string;
  animations: string;
  gestures: string;
  accessibility: string;
  responsive_design: string;
}

export interface AnalyticsAndReporting {
  completion_statistics?: CompletionStatistics;
  mood_analytics?: MoodAnalytics;
  streak_analytics?: StreakAnalytics;
  calendar_views?: CalendarViews;
}

export interface CompletionStatistics {
  metrics: string[];
  time_periods: string[];
  visualizations: string[];
}

export interface MoodAnalytics {
  metrics: string[];
  visualizations: string[];
}

export interface StreakAnalytics {
  metrics: string[];
  visualizations: string[];
}

export interface CalendarViews {
  week_view: string;
  month_view: string;
  year_view: string;
}

export interface HabitLifecycle {
  creation: {
    steps: string[];
  };
  activation: {
    description: string;
  };
  completion: {
    methods: string[];
    effects: string[];
  };
  streak_calculation: {
    algorithm: string;
    steps: string[];
  };
  scheduling_logic: {
    [key: string]: {
      checks: string[];
    };
  };
}

export interface MoodTracking {
  mood_types: {
    positive: string[];
    neutral: string[];
    negative: string[];
  };
  features: string[];
  ui_components: string[];
}

export interface ReportingFeatures {
  stat_cards: string[];
  charts: string[];
  calendar_visualizations: string[];
  period_selector: string;
}

// Additional helper types for more specific use cases

export type AutomationLevel = "High" | "Medium" | "Low";

export type TimePeriod = "Week" | "Month" | "Year";

export interface ProjectMetadata {
  id: string;
  name: string;
  developer: string;
  platform: string;
  summary: string;
}

// Type guard functions
export function isProblemWithDetails(
  problem: string | ProblemWithDetails,
): problem is ProblemWithDetails {
  return typeof problem === "object" && "title" in problem;
}

export function hasDataSync(
  project: ProjectDetail,
): project is ProjectDetail & { data_sync: DataSync } {
  return project.data_sync !== undefined;
}

export function hasMoodTracking(
  project: ProjectDetail,
): project is ProjectDetail & { mood_tracking: MoodTracking } {
  return project.mood_tracking !== undefined;
}
