export type Role = 'viewer' | 'analyst' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Organization {
  id: string;
  name: string;
}

export interface Project {
  id: string | number;
  name: string;
  kpi_score: number;
  alerts: number;
}

export interface Signal {
  id: string;
  type: 'traffic' | 'engagement' | 'llm';
  date: string;
  value: number;
}

export interface Event {
  id: string;
  projectId: string | number;
  type: string;
  timestamp: string;
}

export interface ContentItem {
  id: string;
  url: string;
  title: string;
  score: number;
}

export interface AlertItem {
  id: string;
  projectId: string | number;
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  resolved?: boolean;
}




