import FeedCard from '@/components/cards/FeedCard';

export default function Home() {
  return (
    <main className='min-h-screen bg-[#060E1A] p-6 max-w-2xl mx-auto'>
      <h1 className='text-[#D97706] text-2xl font-bold mb-6'>OneWorldFeed</h1>
      <FeedCard
        id='1'
        authorName='Amara Diallo'
        authorHandle='amara.diallo'
        city='Lagos'
        timeAgo='2m ago'
        mood='electric'
        safetyBadge='clear'
        likeCount={24}
        commentCount={7}
        content='The energy in Lagos tonight is something else. The music never stops and neither do we. ✦'
      />
      <FeedCard
        id='2'
        authorName='Mei Tanaka'
        authorHandle='mei.tanaka'
        city='Tokyo'
        timeAgo='8m ago'
        mood='reflective'
        likeCount={41}
        commentCount={12}
        content='Cherry blossom season begins today. Every year I forget how quickly it goes. Sitting in Shinjuku Gyoen watching petals fall.'
      />
      <FeedCard
        id='3'
        authorName='Carlos Mendez'
        authorHandle='carlos.mx'
        city='Mexico City'
        timeAgo='15m ago'
        mood='hopeful'
        safetyBadge='clear'
        likeCount={18}
        commentCount={3}
        content='Three years building this community garden. Today we harvested our first crop. The neighbourhood came out. This is what cities can be.'
      />
    </main>
  );
}
