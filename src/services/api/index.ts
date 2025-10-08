import type { Project, AlertItem, ContentItem, Signal } from '@/types/models';

const BASE = '/api';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${BASE}/projects`);
    return json<Project[]>(res);
  },
  async getProjectInsights(id: string | number): Promise<Signal[]> {
    const res = await fetch(`${BASE}/projects/${id}/insights`);
    return json<Signal[]>(res);
  },
  async getAlerts(): Promise<AlertItem[]> {
    const res = await fetch(`${BASE}/alerts`);
    return json<AlertItem[]>(res);
  },
  async resolveAlert(id: string): Promise<{ id: string; status: 'resolved' }>{
    const res = await fetch(`${BASE}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return json(res);
  },
  async getContentLab(): Promise<ContentItem[]> {
    const res = await fetch(`${BASE}/content-lab`);
    return json<ContentItem[]>(res);
  },
  async getExperiments(): Promise<any[]> {
    const res = await fetch(`${BASE}/experiments`);
    return json<any[]>(res);
  },
};


