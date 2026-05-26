import { useState, useEffect, useRef } from "react";

export default function CounterCard({ end, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(start);
        }, 20);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div
      ref={ref}
      className="text-center rounded-2xl border border-amber-500/30 bg-white/5 backdrop-blur-sm p-8"
    >
      <div className="font-bebas text-5xl text-amber-500 leading-none">
        {count}{suffix}
      </div>
      <div className="text-slate-400 mt-2 text-xs font-bold uppercase tracking-widest font-rajdhani">
        {label}
      </div>
    </div>
  );
}
