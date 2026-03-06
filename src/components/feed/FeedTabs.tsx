'use client';
import { useState } from 'react';
import FeedCard from '@/components/cards/FeedCard';
import type { MoodId } from '@/lib/theme';

interface Post {
  id: string;
  authorName: string;
  authorHandle: string;
  city: string;
  timeAgo: string;
  content: string;
  mood: MoodId;
  imageUrl?: string;
  videoUrl?: string;
  safetyBadge?: 'clear' | 'notice' | 'rights';
  likeCount?: number;
  commentCount?: number;
  accolade?: string;
  trophy?: boolean;
  featured?: boolean;
}

const TABS = ['All', 'Text', 'Media'] as const;
type Tab = typeof TABS[number];

export default function FeedTabs({ posts }: { posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const textPosts = posts.filter(p => !p.imageUrl && !p.videoUrl);
  const mediaPosts = posts.filter(p => p.imageUrl || p.videoUrl);

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex items-center gap-1 mb-4 px-1 sticky top-14 z-40 py-3"
        style={{ backgroundColor: 'var(--owf-bg)' }}
      >
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                backgroundColor: active ? 'var(--owf-navy)' : 'transparent',
                color: active ? '#fff' : 'var(--owf-text-secondary)',
                border: active ? 'none' : '1px solid var(--owf-border)',
              }}
            >
              {tab}
              {tab === 'Media' && mediaPosts.length > 0 && (
                <span
                  className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: active ? '#ffffff33' : 'var(--owf-border)',
                    color: active ? '#fff' : 'var(--owf-text-secondary)',
                  }}
                >
                  {mediaPosts.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* All tab */}
      {activeTab === 'All' && (
        <div>
          {/* Media strip at top of All */}
          {mediaPosts.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold mb-2 px-1 tracking-widest"
                style={{ color: 'var(--owf-text-secondary)' }}>
                MEDIA
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                {mediaPosts.map((post) => (
                  <div key={post.id} className="flex-shrink-0 w-72 snap-start">
                    <FeedCard {...post} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text posts — mixed grid */}
          <MixedGrid posts={textPosts} />
        </div>
      )}

      {/* Text tab */}
      {activeTab === 'Text' && <MixedGrid posts={textPosts} />}

      {/* Media tab */}
      {activeTab === 'Media' && (
        <div>
          {mediaPosts.length === 0 ? (
            <div className="text-center py-20" style={{ color: 'var(--owf-text-secondary)' }}>
              <p className="text-4xl mb-3">◎</p>
              <p className="text-sm">No media posts yet</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {mediaPosts.map((post) => (
                <div key={post.id} className="flex-shrink-0 w-80 snap-start">
                  <FeedCard {...post} featured />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MixedGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return (
    <div className="text-center py-20" style={{ color: 'var(--owf-text-secondary)' }}>
      <p className="text-4xl mb-3">◎</p>
      <p className="text-sm">No posts here yet</p>
    </div>
  );

  const rows: JSX.Element[] = [];
  let i = 0;
  let rowIndex = 0;
  const patterns = ['featured', 'two', 'three', 'featured', 'two'] as const;

  while (i < posts.length) {
    const pattern = patterns[rowIndex % patterns.length];

    if (pattern === 'featured' && posts[i]) {
      rows.push(
        <div key={i} className="mb-4">
          <FeedCard {...posts[i]} featured />
        </div>
      );
      i++;
    } else if (pattern === 'two' && posts[i]) {
      rows.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {posts[i] && <FeedCard {...posts[i]} />}
          {posts[i + 1] && <FeedCard {...posts[i + 1]} />}
        </div>
      );
      i += 2;
    } else if (pattern === 'three' && posts[i]) {
      rows.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {posts[i] && <FeedCard {...posts[i]} compact />}
          {posts[i + 1] && <FeedCard {...posts[i + 1]} compact />}
          {posts[i + 2] && <FeedCard {...posts[i + 2]} compact />}
        </div>
      );
      i += 3;
    } else {
      rows.push(
        <div key={i} className="mb-4">
          <FeedCard {...posts[i]} />
        </div>
      );
      i++;
    }
    rowIndex++;
  }

  return <div>{rows}</div>;
}
