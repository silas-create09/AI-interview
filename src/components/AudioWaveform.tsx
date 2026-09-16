import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isActive: boolean;
  barCount?: number;
  colorClass?: string;
  height?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  isActive, 
  barCount = 28, 
  colorClass = "bg-cyan-400",
  height = "h-12"
}) => {
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      barsRef.current.forEach((bar, index) => {
        if (!bar) return;
        if (isActive) {
          // Generate a smooth wave algorithm mixed with randomized voice modulation
          const time = Date.now() * 0.005;
          const factor = Math.sin(time + index * 0.3) * 0.4 + Math.random() * 0.6;
          const heightPercent = Math.max(12, Math.min(100, factor * 100));
          bar.style.height = `${heightPercent}%`;
        } else {
          bar.style.height = '15%';
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive]);

  return (
    <div className={`flex items-center justify-center gap-1 ${height} w-full overflow-hidden`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) barsRef.current[i] = el;
          }}
          className={`w-1 rounded-full transition-all duration-75 ${
            isActive ? colorClass : 'bg-slate-700'
          }`}
          style={{ height: '15%' }}
        />
      ))}
    </div>
  );
};
