'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const FEED_CONTEXT = `Lagos: "The energy in Lagos tonight is something else. The music never stops." +lagos +nightlife
Tokyo: "Cherry blossom season begins today. Every year I forget how quickly it goes." +tokyo +cherryblossoms
Mexico City: "Three years building this community garden. Today we harvested our first crop." +mexicocity +community
Mumbai: "Just presented to 400 people. Hands were shaking but the idea landed." +mumbai +startups
Cairo: "The Nile at sunrise never gets old. Thousands of years of history in one view." +cairo +egypt
Buenos Aires: "Tango in the street at midnight. A stranger asked me to dance and now we are friends." +buenosaires +tango
Osaka: "Found a 100 year old ramen shop hidden in an alley. The owner is 87. Still cooking every day." +osaka +japan
Berlin: "Berlin winter is brutal but the studio is warm. Three months of work about to become something real." +berlin +art
Accra: "Accra is buzzing. New art, new music, new energy. The world needs to pay attention." +accra +ghana +afrobeats
Seoul: "Seoul at night from the rooftop. The city never sleeps and neither do we." +seoul +korea`;

const QUICK_ACTIONS = [
  { label: '🌍 Global mood today',     prompt: 'Based on the feed, what is the emotional mood of the world today? Be poetic and specific in 3 sentences.' },
  { label: '📋 Summarise the feed',    prompt: 'Give me a TL;DR of what people around the world are talking about on OneWorldFeed right now. 3 bullet points, each one sentence.' },
  { label: '✨ Suggest a post idea',   prompt: 'Based on what is trending on OneWorldFeed, suggest one creative post idea I could write. Give me the text I could use, with relevant +tags.' },
  { label: '🌐 What city should I follow?', prompt: 'Based on the current feed activity, which city on OneWorldFeed has the most interesting content right now and why?' },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [moodResult, setMoodResult] = useState('');
  const [summaryResult, setSummaryResult] = useState('');
  const [moodLoading, setMoodLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function callAI(userMessage: string, history: Message[]): Promise<string> {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: `You are OWF AI — the intelligent assistant built into OneWorldFeed, a global social platform where people share real moments from cities around the world. You have access to today's feed context:\n\n${FEED_CONTEXT}\n\nBe warm, concise, and culturally aware. Answer in 3-4 sentences max unless asked for more.`,
        messages: [
          ...history.map(m => ({ role: m.role, content: m.text })),
          { role: 'user', content: userMessage },
        ],
      }),
    });
    const data = await res.json();
    return data.content?.map((c: any) => c.text || '').join('') || 'No response.';
  }

  async function handleSend(text?: string) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const newHistory = [...messages, { role: 'user' as const, text: msg }];
    setMessages(newHistory);
    setLoading(true);
    try {
      const reply = await callAI(msg, messages);
      setMessages([...newHistory, { role: 'assistant', text: reply }]);
    } catch {
      setMessages([...newHistory, { role: 'assistant', text: 'Unable to reach OWF AI right now. Try again shortly.' }]);
    }
    setLoading(false);
  }

  async function handleMoodOfDay() {
    setMoodLoading(true);
    setMoodResult('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [{ role: 'user', content: `Based on these posts from OneWorldFeed today:\n\n${FEED_CONTEXT}\n\nIn 2 sentences, describe the overall emotional mood of the world today. Be poetic and specific. Start with an emoji mood indicator.` }],
        }),
      });
      const data = await res.json();
      setMoodResult(data.content?.map((c: any) => c.text || '').join('') || '');
    } catch { setMoodResult('Unable to read the global mood right now.'); }
    setMoodLoading(false);
  }

  async function handleFeedSummary() {
    setSummaryLoading(true);
    setSummaryResult('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [{ role: 'user', content: `Based on these posts from OneWorldFeed today:\n\n${FEED_CONTEXT}\n\nGive a TL;DR of what people around the world are talking about right now. 3 bullet points max, each one sentence. Use city names. Be direct and vivid.` }],
        }),
      });
      const data = await res.json();
      setSummaryResult(data.content?.map((c: any) => c.text || '').join('') || '');
    } catch { setSummaryResult('Unable to summarise the feed right now.'); }
    setSummaryLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-24">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, var(--owf-gold), #F97316)' }}>
            ✦
          </div>
          <div>
            <h1 className="text-xl font-black" style={{ color: 'var(--owf-text-primary)' }}>OWF AI</h1>
            <p className="text-xs" style={{ color: 'var(--owf-text-secondary)' }}>Your intelligent guide to the world</p>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--owf-surface)', border: '1px solid var(--owf-border)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold" style={{ color: 'var(--owf-text-primary)' }}>🌍 Global Mood</p>
            <button onClick={handleMoodOfDay} disabled={moodLoading}
              className="text-[10px] font-bold px-2 py-1 rounded-lg"
              style={{ backgroundColor: 'var(--owf-gold)', color: '#fff', opacity: moodLoading ? 0.6 : 1 }}>
              {moodLoading ? '...' : moodResult ? '↺' : 'Read'}
            </button>
          </div>
          {moodResult
            ? <p className="text-xs leading-relaxed" style={{ color: 'var(--owf-text-primary)' }}>{moodResult}</p>
            : <p className="text-xs" style={{ color: 'var(--owf-text-secondary)' }}>AI reads the feed and tells you the global mood</p>
          }
        </div>

        <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--owf-surface)', border: '1px solid var(--owf-border)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold" style={{ color: 'var(--owf-text-primary)' }}>📋 Feed Summary</p>
            <button onClick={handleFeedSummary} disabled={summaryLoading}
              className="text-[10px] font-bold px-2 py-1 rounded-lg"
              style={{ backgroundColor: '#2563EB', color: '#fff', opacity: summaryLoading ? 0.6 : 1 }}>
              {summaryLoading ? '...' : summaryResult ? '↺' : 'Read'}
            </button>
          </div>
          {summaryResult
            ? <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--owf-text-primary)' }}>{summaryResult}</p>
            : <p className="text-xs" style={{ color: 'var(--owf-text-secondary)' }}>TL;DR of what the world is talking about right now</p>
          }
        </div>
      </div>

      {/* Quick actions */}
      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest mb-3" style={{ color: 'var(--owf-text-secondary)' }}>QUICK ACTIONS</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(action => (
              <button key={action.label} onClick={() => handleSend(action.prompt)}
                className="text-left p-3 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--owf-surface)', border: '1px solid var(--owf-border)', color: 'var(--owf-text-primary)' }}>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat messages */}
      {messages.length > 0 && (
        <div className="space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mr-2 flex-shrink-0 self-end"
                  style={{ background: 'linear-gradient(135deg, var(--owf-gold), #F97316)' }}>
                  ✦
                </div>
              )}
              <div className="max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed"
                style={{
                  backgroundColor: msg.role === 'user' ? 'var(--owf-gold)' : 'var(--owf-surface)',
                  color: msg.role === 'user' ? '#fff' : 'var(--owf-text-primary)',
                  border: msg.role === 'assistant' ? '1px solid var(--owf-border)' : 'none',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--owf-gold), #F97316)' }}>✦</div>
              <div className="px-4 py-3 rounded-2xl text-xs" style={{ backgroundColor: 'var(--owf-surface)', border: '1px solid var(--owf-border)' }}>
                <span className="animate-pulse" style={{ color: 'var(--owf-text-secondary)' }}>thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input bar — fixed at bottom on mobile */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 lg:relative lg:bottom-auto lg:px-0 lg:pb-0"
        style={{ backgroundColor: 'var(--owf-bg)' }}>
        {messages.length > 0 && (
          <button onClick={() => setMessages([])}
            className="text-xs mb-2 opacity-50 hover:opacity-100"
            style={{ color: 'var(--owf-text-secondary)' }}>
            ↺ New conversation
          </button>
        )}
        <div className="flex gap-2">
          <input
            type="text" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask OWF AI anything..."
            className="flex-1 text-sm px-4 py-3 rounded-2xl focus:outline-none"
            style={{ backgroundColor: 'var(--owf-surface)', border: '1px solid var(--owf-border)', color: 'var(--owf-text-primary)' }}
          />
          <button onClick={() => handleSend()} disabled={loading || !input.trim()}
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all"
            style={{ backgroundColor: 'var(--owf-gold)', color: '#fff', opacity: loading || !input.trim() ? 0.5 : 1 }}>
            →
          </button>
        </div>
      </div>

    </div>
  );
}
