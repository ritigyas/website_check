import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import { content } from '@/content';
import { playChime } from '@/lib/sound';

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative px-5 py-20 sm:py-28">
      {/* Heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-14 max-w-md text-center"
      >
        <h2 className="mb-2 text-2xl font-bold text-pink-500 sm:text-3xl">
          Our timeline ♡
        </h2>
        <p className="text-sm text-gray-400">how we got here</p>
      </motion.div>

      {/* Timeline */}
      <div className="mx-auto max-w-md">
        {/* Vertical line */}
        <div className="absolute left-1/2 ml-[-1px] hidden h-full w-0.5 bg-gradient-to-b from-pink-200 via-pink-300 to-pink-200 sm:block" style={{ minHeight: '100%' }} />

        <div className="space-y-8">
          {content.timeline.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                isEven={isEven}
                inView={inView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isEven,
  inView,
}: {
  item: {
    tag: string;
    date: string;
    title: string;
    description: string;
    image?: string;
  };
  index: number;
  isEven: boolean;
  inView: boolean;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const localInView = useInView(localRef, { once: true, amount: 0.5 });

  if (localInView) {
    playChime();
  }

  return (
    <motion.div
      ref={localRef}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={localInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring' }}
      className={`relative flex ${isEven ? 'justify-start' : 'justify-end'} sm:justify-center`}
    >
      {/* Connecting heart */}
      <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
        <Heart
          size={16}
          className="fill-pink-300 text-pink-300"
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      </div>

      {/* Card */}
      <div
        className={`w-full sm:w-[45%] ${
          isEven ? 'sm:mr-auto sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.03, rotate: isEven ? 1 : -1 }}
          className="relative isolate overflow-hidden rounded-xl border border-pink-100 bg-white p-5 shadow-card"
          style={{ transform: `rotate(${isEven ? -0.5 : 0.5}deg)` }}
        >
          {item.image && (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-white/80 via-pink-50/75 to-white/90" />
            </>
          )}
          {/* Tag */}
          <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-500">
            {item.tag}
          </span>
          {/* Date */}
          <p className="mt-2 text-xs text-gray-400">{item.date}</p>
          {/* Title */}
          <h3 className="mt-1 text-lg font-bold text-pink-500">
            {item.title}
          </h3>
          {/* Description */}
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
