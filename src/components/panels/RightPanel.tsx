'use client';
import React, { useState, useEffect } from 'react';

const THEMES = [
  { id: 'light',    label: 'Light',    gradient: 'linear-gradient(135deg, #F9FAFB, #FFFFFF)',   vars: { '--owf-bg': '#F9FAFB', '--owf-surface': '#FFFFFF', '--owf-border': '#E5E7EB', '--owf-text-primary': '#111827', '--owf-text-secondary': '#6B7280', '--owf-navy': '#0D1F35' } },
  { id: 'dark',     label: 'Dark',     gradient: 'linear-gradient(135deg, #060E1A, #0D1F35)',   vars: { '--owf-bg': '#060E1A', '--owf-surface': '#0D1F35', '--owf-border': '#1E3A5F', '--owf-text-primary': '#F9FAFB', '--owf-text-secondary': '#9CA3AF', '--owf-navy': '#1E3A5F' } },
  { id: 'midnight', label: 'Midnight', gradient: 'linear-gradient(135deg, #0A0A0F, #13131A)',   vars: { '--owf-bg': '#0A0A0F', '--owf-surface': '#13131A', '--owf-border': '#1F1F2E', '--owf-text-primary': '#E2E8F0', '--owf-text-secondary': '#718096', '--owf-navy': '#1F1F2E' } },
  { id: 'warm',     label: 'Warm',     gradient: 'linear-gradient(135deg, #ffb36b, #ff6f91)',   vars: { '--owf-bg': '#FDFAF6', '--owf-surface': '#FFFBF5', '--owf-border': '#E8DDD0', '--owf-text-primary': '#2D1B0E', '--owf-text-secondary': '#7C6555', '--owf-navy': '#2D1B0E' } },
  { id: 'forest',   label: 'Forest',   gradient: 'linear-gradient(135deg, #2d6a2d, #4a9e4a)',   vars: { '--owf-bg': '#F0F4F0', '--owf-surface': '#E8F0E8', '--owf-border': '#C8D8C8', '--owf-text-primary': '#1A2E1A', '--owf-text-secondary': '#4A6A4A', '--owf-navy': '#1A2E1A' } },
];

const TRENDING = [
  { tag: '+lagos',          count: '12.4k', color: '#D97706' },
  { tag: '+cherryblossoms', count: '8.1k',  color: '#2563EB' },
  { tag: '+ramadan',        count: '89.2k', color: '#7C3AED' },
  { tag: '+community',      count: '4.3k',  color: '#16A34A' },
  { tag: '+nightlife',      count: '6.7k',  color: '#D97706' },
  { tag: '+afrobeats',      count: '11.2k', color: '#059669' },
  { tag: '+startups',       count: '3.8k',  color: '#EA580C' },
];

const SPOTLIGHT = [
  { title: 'Sunrise in Tokyo',       subtitle: 'A new day begins',              image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600' },
  { title: 'Voices of Nairobi',      subtitle: 'Street stories at golden hour', image: 'https://images.unsplash.com/photo-1611348586840-ea9872d33411?w=600' },
];

const WHO_TO_FOLLOW = [
  { name: 'Yaw Darko',    handle: 'yawdarko.feed',    color: '#059669' },
  { name: 'Priya Sharma', handle: 'priyasharma.feed', color: '#EA580C' },
  { name: 'Lena Müller',  handle: 'lenamuller.feed',  color: '#B45309' },
];

const ALL_CITIES = [
  { name: 'Lagos',         timezone: 'Africa/Lagos',                        temp: 88, region: 'Africa'   },
  { name: 'Cairo',         timezone: 'Africa/Cairo',                        temp: 82, region: 'Africa'   },
  { name: 'Nairobi',       timezone: 'Africa/Nairobi',                      temp: 70, region: 'Africa'   },
  { name: 'Accra',         timezone: 'Africa/Accra',                        temp: 85, region: 'Africa'   },
  { name: 'Johannesburg',  timezone: 'Africa/Johannesburg',                 temp: 68, region: 'Africa'   },
  { name: 'Casablanca',    timezone: 'Africa/Casablanca',                   temp: 72, region: 'Africa'   },
  { name: 'Addis Ababa',   timezone: 'Africa/Addis_Ababa',                  temp: 65, region: 'Africa'   },
  { name: 'Dar es Salaam', timezone: 'Africa/Dar_es_Salaam',                temp: 82, region: 'Africa'   },
  { name: 'Tokyo',         timezone: 'Asia/Tokyo',                          temp: 72, region: 'Asia'     },
  { name: 'Mumbai',        timezone: 'Asia/Kolkata',                        temp: 91, region: 'Asia'     },
  { name: 'Shanghai',      timezone: 'Asia/Shanghai',                       temp: 68, region: 'Asia'     },
  { name: 'Beijing',       timezone: 'Asia/Shanghai',                       temp: 62, region: 'Asia'     },
  { name: 'Seoul',         timezone: 'Asia/Seoul',                          temp: 58, region: 'Asia'     },
  { name: 'Singapore',     timezone: 'Asia/Singapore',                      temp: 86, region: 'Asia'     },
  { name: 'Bangkok',       timezone: 'Asia/Bangkok',                        temp: 92, region: 'Asia'     },
  { name: 'Dubai',         timezone: 'Asia/Dubai',                          temp: 95, region: 'Asia'     },
  { name: 'Jakarta',       timezone: 'Asia/Jakarta',                        temp: 88, region: 'Asia'     },
  { name: 'Osaka',         timezone: 'Asia/Tokyo',                          temp: 70, region: 'Asia'     },
  { name: 'Taipei',        timezone: 'Asia/Taipei',                         temp: 75, region: 'Asia'     },
  { name: 'Kuala Lumpur',  timezone: 'Asia/Kuala_Lumpur',                   temp: 88, region: 'Asia'     },
  { name: 'Manila',        timezone: 'Asia/Manila',                         temp: 90, region: 'Asia'     },
  { name: 'Tehran',        timezone: 'Asia/Tehran',                         temp: 74, region: 'Asia'     },
  { name: 'Riyadh',        timezone: 'Asia/Riyadh',                         temp: 98, region: 'Asia'     },
  { name: 'Istanbul',      timezone: 'Europe/Istanbul',                     temp: 65, region: 'Asia'     },
  { name: 'London',        timezone: 'Europe/London',                       temp: 58, region: 'Europe'   },
  { name: 'Paris',         timezone: 'Europe/Paris',                        temp: 60, region: 'Europe'   },
  { name: 'Berlin',        timezone: 'Europe/Berlin',                       temp: 52, region: 'Europe'   },
  { name: 'Madrid',        timezone: 'Europe/Madrid',                       temp: 66, region: 'Europe'   },
  { name: 'Rome',          timezone: 'Europe/Rome',                         temp: 64, region: 'Europe'   },
  { name: 'Amsterdam',     timezone: 'Europe/Amsterdam',                    temp: 55, region: 'Europe'   },
  { name: 'Moscow',        timezone: 'Europe/Moscow',                       temp: 38, region: 'Europe'   },
  { name: 'Stockholm',     timezone: 'Europe/Stockholm',                    temp: 44, region: 'Europe'   },
  { name: 'Zurich',        timezone: 'Europe/Zurich',                       temp: 50, region: 'Europe'   },
  { name: 'Vienna',        timezone: 'Europe/Vienna',                       temp: 54, region: 'Europe'   },
  { name: 'New York',      timezone: 'America/New_York',                    temp: 65, region: 'Americas' },
  { name: 'Los Angeles',   timezone: 'America/Los_Angeles',                 temp: 72, region: 'Americas' },
  { name: 'Chicago',       timezone: 'America/Chicago',                     temp: 58, region: 'Americas' },
  { name: 'São Paulo',     timezone: 'America/Sao_Paulo',                   temp: 75, region: 'Americas' },
  { name: 'Mexico City',   timezone: 'America/Mexico_City',                 temp: 70, region: 'Americas' },
  { name: 'Buenos Aires',  timezone: 'America/Argentina/Buenos_Aires',      temp: 68, region: 'Americas' },
  { name: 'Toronto',       timezone: 'America/Toronto',                     temp: 55, region: 'Americas' },
  { name: 'Miami',         timezone: 'America/New_York',                    temp: 80, region: 'Americas' },
  { name: 'Bogotá',        timezone: 'America/Bogota',                      temp: 64, region: 'Americas' },
  { name: 'Lima',          timezone: 'America/Lima',                        temp: 68, region: 'Americas' },
  { name: 'Santiago',      timezone: 'America/Santiago',                    temp: 62, region: 'Americas' },
  { name: 'Sydney',        timezone: 'Australia/Sydney',                    temp: 74, region: 'Oceania'  },
  { name: 'Melbourne',     timezone: 'Australia/Melbourne',                 temp: 68, region: 'Oceania'  },
  { name: 'Auckland',      timezone: 'Pacific/Auckland',                    temp: 62, region: 'Oceania'  },
];

const HOME_CITY = 'Lagos';
const MAX_PINNED = 3;
const REGIONS = ['All', 'Africa', 'Asia', 'Europe', 'Americas', 'Oceania'];

function getLocalTime(timezone: string) {
  try {
    return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: timezone });
  } catch {
    return '--';
  }
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--owf-surface)', border: '1px solid var(--owf-border)' }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-black tracking-widest mb-3" style={{ color: 'var(--owf-text-secondary)' }}>
      {children}
    </p>
  );
}

export default function RightPanel() {
  const [theme, setTheme] = useState('light');
  const [times, setTimes] = useState<Record<string, string>>({});
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [spotIdx, setSpotIdx] = useState(0);
  const [pinned, setPinned] = useState<string[]>(['Tokyo', 'London', 'New York']);
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

  useEffect(() => {
    const t = localStorage.getItem('owf-theme') || 'light';
    const c = localStorage.getItem('owf-cities');
    setTheme(t);
    applyTheme(t);
    if (c) setPinned(JSON.parse(c));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  function tick() {
    const t: Record<string, string> = {};
    ALL_CITIES.forEach(c => { t[c.name] = getLocalTime(c.timezone); });
    setTimes(t);
  }

  function applyTheme(id: string) {
    const t = THEMES.find(x => x.id === id);
    if (!t) return;
    Object.entries(t.vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }

  function handleTheme(id: string) {
    setTheme(id);
    applyTheme(id);
    localStorage.setItem('owf-theme', id);
  }

  function toggleCity(name: string) {
    if (name === HOME_CITY) return;
    if (pinned.includes(name)) {
      const next = pinned.filter(c => c !== name);
      setPinned(next);
      localStorage.setItem('owf-cities', JSON.stringify(next));
    } else {
      const nonHome = pinned.filter(c => c !== HOME_CITY);
      if (nonHome.length >= MAX_PINNED) return;
      const next = [...pinned, name];
      setPinned(next);
      localStorage.setItem('owf-cities', JSON.stringify(next));
    }
  }

  async function handleAI() {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: 'You are OWF AI — a helpful, concise assistant on OneWorldFeed, a global social platform. Answer in 2-3 sentences max.',
          messages: [{ role: 'user', content: aiInput }],
        }),
      });
      const data = await res.json();
      setAiResponse(data.content?.map((c: any) => c.text || '').join('') || 'No response.');
    } catch {
      setAiResponse('Unable to reach OWF AI right now.');
    }
    setAiLoading(false);
    setAiInput('');
  }

  const displayCities = [
    ALL_CITIES.find(c => c.name === HOME_CITY)!,
    ...pinned.filter(n => n !== HOME_CITY).map(n => ALL_CITIES.find(c => c.name === n)!).filter(Boolean),
  ];

  const filteredCities = ALL_CITIES.filter(c => {
    const byRegion = region === 'All' || c.region === region;
    const bySearch = c.name.toLowerCase().includes(search.toLowerCase());
    return byRegion && bySearch;
  });

  const nonHomePinned = pinned.filter(c => c !== HOME_CITY).length;
  const spot = SPOTLIGHT[spotIdx];

  return (
    <aside className="hidden lg:flex flex-col gap-4 w-72 flex-shrink-0">

      {/* Spotlight */}
      <Card>
        <Label>SPOTLIGHT</Label>
        <div
          className="relative rounded-xl overflow-hidden cursor-pointer"
          style={{ height: '140px' }}
          onClick={() => setSpotIdx((spotIdx + 1) % SPOTLIGHT.length)}
        >
          <img
            src={spot.image} alt={spot.title}
            className="w-full h-full object-cover"
            draggable={false}
            onContextMenu={e => e.preventDefault()}
            style={{ pointerEvents: 'none' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }} />
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white text-sm font-bold">{spot.title}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>{spot.subtitle}</p>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            {SPOTLIGHT.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: i === spotIdx ? '#fff' : 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        </div>
      </Card>

      {/* AI */}
      <Card>
        <Label>OWF AI</Label>
        <p className="text-xs mb-3" style={{ color: 'var(--owf-text-secondary)' }}>Ask anything about the world.</p>
        <div className="flex gap-2 mb-2">
          <input
            type="text" value={aiInput}
            onChange={e => setAiInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAI()}
            placeholder="Ask a question..."
            className="flex-1 text-xs px-3 py-2 rounded-xl focus:outline-none"
            style={{ backgroundColor: 'var(--owf-bg)', border: '1px solid var(--owf-border)', color: 'var(--owf-text-primary)' }}
          />
          <button
            onClick={handleAI} disabled={aiLoading}
            className="text-xs font-bold px-3 py-2 rounded-xl"
            style={{ backgroundColor: 'var(--owf-gold)', color: '#fff', opacity: aiLoading ? 0.6 : 1 }}
          >
            {aiLoading ? '...' : '→'}
          </button>
        </div>
        {aiResponse && (
          <div className="text-xs leading-relaxed p-3 rounded-xl"
            style={{ backgroundColor: 'var(--owf-bg)', color: 'var(--owf-text-primary)', border: '1px solid var(--owf-border)' }}>
            {aiResponse}
          </div>
        )}
      </Card>

      {/* Trending */}
      <Card>
        <Label>TRENDING</Label>
        <div className="space-y-1.5">
          {TRENDING.map((item, i) => (
            <button key={item.tag}
              className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl"
              style={{ backgroundColor: item.color + '0A' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold w-4 text-right" style={{ color: 'var(--owf-text-secondary)' }}>{i + 1}</span>
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.tag}</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--owf-text-secondary)' }}>{item.count}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* World Clocks */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-black tracking-widest" style={{ color: 'var(--owf-text-secondary)' }}>WORLD CLOCKS</p>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ color: 'var(--owf-gold)', backgroundColor: '#D9770618', border: '1px solid #D9770633' }}
          >
            {showPicker ? 'Done' : '+ Cities'}
          </button>
        </div>

        {!showPicker && (
          <div className="space-y-2">
            {displayCities.map((city, i) => (
              <div key={city.name}
                className="flex items-center justify-between py-1.5 px-2 rounded-xl"
                style={{ backgroundColor: i === 0 ? '#D9770610' : 'transparent', border: i === 0 ? '1px solid #D9770622' : 'none' }}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold" style={{ color: 'var(--owf-text-primary)' }}>{city.name}</p>
                    {i === 0 && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--owf-gold)', color: '#fff' }}>HOME</span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--owf-text-secondary)' }}>{times[city.name] || '--'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: 'var(--owf-text-secondary)' }}>{city.temp}°F</span>
                  {i > 0 && (
                    <button onClick={() => toggleCity(city.name)} className="text-xs opacity-40 hover:opacity-100" style={{ color: 'var(--owf-text-secondary)' }}>✕</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showPicker && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: 'var(--owf-text-secondary)' }}>Select up to 3 cities</span>
              <span className="text-xs font-black" style={{ color: nonHomePinned >= MAX_PINNED ? '#EF4444' : 'var(--owf-gold)' }}>
                {nonHomePinned}/{MAX_PINNED}
              </span>
            </div>
            <input
              type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search cities..."
              className="w-full text-xs px-3 py-2 rounded-xl mb-2 focus:outline-none"
              style={{ backgroundColor: 'var(--owf-bg)', border: '1px solid var(--owf-border)', color: 'var(--owf-text-primary)' }}
            />
            <div className="flex gap-1 flex-wrap mb-2">
              {REGIONS.map(r => (
                <button key={r} onClick={() => setRegion(r)}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg"
                  style={{ backgroundColor: region === r ? 'var(--owf-gold)' : 'var(--owf-bg)', color: region === r ? '#fff' : 'var(--owf-text-secondary)', border: '1px solid var(--owf-border)' }}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {filteredCities.map(city => {
                const isPinned = pinned.includes(city.name);
                const isHome = city.name === HOME_CITY;
                const atMax = !isPinned && !isHome && nonHomePinned >= MAX_PINNED;
                return (
                  <button
                    key={city.name}
                    onClick={() => toggleCity(city.name)}
                    disabled={isHome || atMax}
                    className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl"
                    style={{ backgroundColor: isPinned ? '#D9770612' : 'transparent', opacity: atMax ? 0.3 : 1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded flex items-center justify-center text-xs"
                        style={{ backgroundColor: isPinned ? 'var(--owf-gold)' : 'var(--owf-border)', color: isPinned ? '#fff' : 'transparent' }}>
                        ✓
                      </div>
                      <span className="text-xs font-semibold" style={{ color: 'var(--owf-text-primary)' }}>{city.name}</span>
                      {isHome && (
                        <span className="text-[9px] font-black px-1 py-0.5 rounded" style={{ backgroundColor: 'var(--owf-gold)', color: '#fff' }}>HOME</span>
                      )}
                    </div>
                    <span className="text-[10px]" style={{ color: 'var(--owf-text-secondary)' }}>{city.region}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Who to Follow */}
      <Card>
        <Label>WHO TO FOLLOW</Label>
        <div className="space-y-3">
          {WHO_TO_FOLLOW.map(person => (
            <div key={person.handle} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, ' + person.color + ', ' + person.color + 'bb)', boxShadow: '0 0 8px ' + person.color + '44' }}>
                  {person.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--owf-text-primary)' }}>{person.name}</p>
                  <p className="text-xs" style={{ color: 'var(--owf-text-secondary)' }}>{person.handle}</p>
                </div>
              </div>
              <button className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: person.color + '18', color: person.color, border: '1px solid ' + person.color + '33' }}>
                Follow
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Theme */}
      <Card>
        <Label>THEME</Label>
        <div className="flex items-center gap-2 flex-wrap">
          {THEMES.map(t => (
            <button key={t.id} onClick={() => handleTheme(t.id)}
              className="flex flex-col items-center gap-1" title={t.label}>
              <div className="w-10 h-10 rounded-xl border-2"
                style={{ background: t.gradient, borderColor: theme === t.id ? 'var(--owf-gold)' : 'var(--owf-border)', boxShadow: theme === t.id ? '0 0 0 3px #D9770633' : 'none' }} />
              <span className="text-[10px] font-semibold"
                style={{ color: theme === t.id ? 'var(--owf-gold)' : 'var(--owf-text-secondary)' }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </Card>

    </aside>
  );
}
