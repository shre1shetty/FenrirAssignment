export interface VulnerabilitiesSummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export type ScanStatus = "Completed" | "Scheduled" | "Failed" | "In Progress";

export type StepStatus = "completed" | "in_progress" | "pending" | "failed";

export type Severity = "critical" | "high" | "medium" | "low" | "moderate";

export interface ScanStep {
  name: string;
  status: StepStatus;
  completed_at?: string | null;
}

export interface VulnerabilityItem {
  id: string;
  title: string;
  severity: Severity;
  cvss: number;
  status: "open" | "resolved";
  endpoint: string;
  description?: string;
  detected_at: string;
}

export interface ActivityLog {
  time: string;
  message: string;
}

export interface ScanData {
  id: string;
  scan_name: string;
  type: "Greybox" | "Blackbox" | "Whitebox";
  environment: string;
  target: string;

  status: ScanStatus;
  progress: number;

  started_at: string | null;
  ended_at: string | null;
  last_scan: string;

  vulnerabilities_summary: VulnerabilitiesSummary;

  steps: ScanStep[];
  vulnerability_list: VulnerabilityItem[];
  activity_logs: ActivityLog[];
}
