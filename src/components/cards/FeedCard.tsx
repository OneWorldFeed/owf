'use client';
import { useState, useEffect } from 'react';
import { getMood, getMoodIntensity } from '@/lib/theme';
import type { MoodId } from '@/lib/theme';

export interface FeedCardProps {
  id: string;
  authorName: string;
  authorHandle: string;
  city: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  mood: MoodId;
  safetyBadge?: 'clear' | 'notice' | 'rights';
  likeCount?: number;
  commentCount?: number;
}

export default function FeedCard({
  authorName,
  authorHandle,
  city,
  timeAgo,
  content,
  imageUrl,
  mood,
  safetyBadge,
  likeCount = 0,
  commentCount = 0,
}: FeedCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const moodData = getMood(mood);
  const intensity = mounted ? getMoodIntensity(mood) : 0.7;
  const moodColor = moodData?.color ?? '#D97706';
  const moodRgb = moodData?.glowRgb ?? '217,119,6';
  const moodLabel = moodData?.label ?? mood;

  return (
    <article
      className="relative rounded-2xl overflow-hidden mb-4 group cursor-pointer"
      style={{
        background: mounted
          ? `linear-gradient(135deg, #0D1F35 0%, #060E1A 100%)`
          : '#0D1F35',
        boxShadow: mounted
          ? `0 0 0 1px ${moodColor}33, 0 4px 24px rgba(${moodRgb}, ${intensity * 0.25})`
          : '0 0 0 1px #1E3A5F',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Bold mood bar — top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${moodColor}, ${moodColor}00)`,
          opacity: intensity,
        }}
      />

      <div className="p-5">

        {/* Row 1 — Author + mood pulse */}
        <div className="flex items-center gap-3 mb-4">

          {/* Avatar with mood glow */}
          <div
            className="relative flex-shrink-0"
            style={{
              filter: mounted ? `drop-shadow(0 0 8px ${moodColor}88)` : 'none',
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white"
              style={{ background: `linear-gradient(135deg, ${moodColor}44, ${moodColor}22)`, border: `1.5px solid ${moodColor}66` }}
            >
              {authorName.charAt(0).toUpperCase()}
            </div>
            {/* Mood pulse dot */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#060E1A]"
              style={{ background: moodColor }}
            />
          </div>

          {/* Name + handle + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-white text-sm">{authorName}</span>
              <span
                className="text-xs font-medium"
                style={{ color: moodColor }}
              >
                {moodLabel}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[#4B5563] text-xs">{authorHandle}</span>
              <span className="text-[#2D3748] text-xs">·</span>
              <span className="text-[#4B5563] text-xs">{city}</span>
              <span className="text-[#2D3748] text-xs">·</span>
              <span className="text-[#4B5563] text-xs">{timeAgo}</span>
            </div>
          </div>

          {/* Safety badge */}
          {safetyBadge === 'clear' && (
            <span className="text-xs bg-[#14532D]/60 text-[#86EFAC] px-2.5 py-1 rounded-full border border-[#166534]/40 flex-shrink-0">
              ✦ Clear
            </span>
          )}
          {safetyBadge === 'notice' && (
            <span className="text-xs bg-[#92400E]/60 text-[#FCD34D] px-2.5 py-1 rounded-full border border-[#B45309]/40 flex-shrink-0">
              ⚠ Notice
            </span>
          )}
        </div>

        {/* Row 2 — Content (hero) */}
        <p
          className="text-[#E5E7EB] leading-relaxed mb-4"
          style={{ fontSize: '0.975rem', letterSpacing: '0.01em' }}
        >
          {content.split(' ').map((word, i) =>
            word.startsWith('+') ? (
              <span key={i} style={{ color: moodColor }} className="font-medium hover:underline cursor-pointer">
                {word}{' '}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </p>

        {/* Row 3 — Image */}
        {imageUrl && (
          <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-[#1E3A5F]">
            <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Row 4 — Engagement */}
        <div className="flex items-center gap-6 pt-1">
          <button
            className="flex items-center gap-2 text-xs text-[#4B5563] hover:text-white transition-colors group/btn"
          >
            <span className="text-base group-hover/btn:scale-110 transition-transform">♡</span>
            <span>{likeCount}</span>
          </button>
          <button
            className="flex items-center gap-2 text-xs text-[#4B5563] hover:text-white transition-colors group/btn"
          >
            <span className="text-base group-hover/btn:scale-110 transition-transform">◇</span>
            <span>{commentCount}</span>
          </button>
          <button
            className="flex items-center gap-2 text-xs text-[#4B5563] transition-colors ml-auto group/btn"
            style={{ '--hover-color': moodColor } as React.CSSProperties}
          >
            <span className="text-base group-hover/btn:scale-110 transition-transform">↗</span>
            <span>Share</span>
          </button>
        </div>

      </div>

      {/* Bottom mood glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${moodColor}44, transparent)`,
        }}
      />
    </article>
  );
}
