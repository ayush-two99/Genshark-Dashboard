'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/services/api';
import { Search, Filter, Save, Wand2, CheckCircle2, Eye } from 'lucide-react';

type ContentItem = {
  id: string;
  title: string;
  url: string;
  score?: number;
  body?: string;
};

function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function ContentLabPage() {
  const { data, loading, error } = useFetch<ContentItem[]>(api.getContentLab);
  const [query, setQuery] = useState('');
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [analyzedScore, setAnalyzedScore] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const items = data ?? [];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items
      .filter(i => (i.title?.toLowerCase().includes(q) || i.url?.toLowerCase().includes(q)))
      .filter(i => (i.score ?? 0) >= minScore);
  }, [items, query, minScore]);

  const selected = useMemo(() => items.find(i => i.id === selectedId) || null, [items, selectedId]);

  useEffect(() => {
    if (selected) {
      setEditedTitle(selected.title || '');
      setEditedUrl(selected.url || '');
      setEditedBody(
        selected.body ||
          `Intro paragraph about ${selected.title}.\n\n` +
          'Key highlights:\n' +
          '- Benefit 1\n' +
          '- Benefit 2\n\n' +
          'Conclusion with a clear CTA.'
      );
      setAnalyzedScore(selected.score ?? null);
      setSaved(false);
    }
  }, [selectedId]);

  const handleAnalyze = () => {
    const headline = editedTitle.trim();
    const lenScore = Math.max(0, 100 - Math.abs(60 - headline.length));
    const hasKeywords = /(best|guide|review|compare|ultimate|2025)/i.test(headline) ? 15 : 0;
    const bodyLen = editedBody.trim().split(/\s+/).length;
    const bodyScore = Math.min(40, Math.round(bodyLen / 15));
    const total = Math.max(0, Math.min(100, Math.round(lenScore * 0.4 + hasKeywords + bodyScore)));
    setAnalyzedScore(total);
  };

  const handleSave = () => {
    setSaved(true);
    if (selected) {
      selected.title = editedTitle;
      selected.url = editedUrl;
      selected.body = editedBody;
      if (analyzedScore != null) selected.score = analyzedScore;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Lab</h1>
          <p className="text-gray-600 mt-1">Audit, edit, and optimize content for AI visibility</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or URL..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>All scores</option>
              <option value={60}>Score ≥ 60</option>
              <option value={80}>Score ≥ 80</option>
              <option value={90}>Score ≥ 90</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="max-h-[28rem] overflow-y-auto">
            {loading && <div className="p-4 text-sm text-gray-500">Loading content…</div>}
            {error && <div className="p-4 text-sm text-red-600">Failed to load content</div>}
            {!loading && filtered.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No content found</div>
            )}
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-4 border-b hover:bg-gray-50 ${selectedId === item.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="mr-3">
                    <div className="font-medium text-gray-900 line-clamp-1">{item.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{item.url}</div>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    (item.score ?? 0) >= 90 ? 'bg-emerald-100 text-emerald-700' :
                    (item.score ?? 0) >= 80 ? 'bg-blue-100 text-blue-700' :
                    (item.score ?? 0) >= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    Score {(item.score ?? 0)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {!selected && (
            <div className="rounded-lg border border-dashed p-10 text-center text-gray-500">
              Select a content item from the list to start editing
            </div>
          )}

          {selected && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600">Title</label>
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="mt-1 text-xs text-gray-500">{editedTitle.length} chars • target ~60</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">URL</label>
                    <input
                      value={editedUrl}
                      onChange={(e) => setEditedUrl(e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="mt-1 text-xs text-gray-500">Should reflect primary keyword</div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-medium text-gray-600">Body</label>
                  <textarea
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    rows={10}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="mt-1 text-xs text-gray-500">~{estimateReadTime(editedBody)} min read</div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button onClick={handleSave} className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" /> Save
                  </button>
                  <button onClick={handleAnalyze} className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Wand2 className="w-4 h-4 mr-2" /> Analyze
                  </button>
                  {saved && (
                    <span className="inline-flex items-center text-emerald-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Saved
                    </span>
                  )}
                  {analyzedScore != null && (
                    <span className={`ml-auto inline-flex items-center text-sm font-medium px-2 py-1 rounded-full ${
                      analyzedScore >= 90 ? 'bg-emerald-100 text-emerald-700' :
                      analyzedScore >= 80 ? 'bg-blue-100 text-blue-700' :
                      analyzedScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      Score {analyzedScore}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Preview</span>
                  </div>
                  <a href={editedUrl || '#'} target="_blank" className="text-sm text-blue-600 hover:underline">
                    {editedUrl || 'Set URL'}
                  </a>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{editedTitle || 'Untitled'}</h2>
                <div className="prose mt-2 max-w-none text-gray-800 whitespace-pre-wrap">{editedBody}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


