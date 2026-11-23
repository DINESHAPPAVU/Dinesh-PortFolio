import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports touch only
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.interactive-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (isTouch) return;
    let animId: number;

    const lerp = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [position, isTouch]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Laser Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isClicking ? '10px' : isHovered ? '8px' : '5px',
          height: isClicking ? '10px' : isHovered ? '8px' : '5px',
          backgroundColor: isHovered ? '#00ff66' : '#00f3ff',
          boxShadow: isHovered
            ? '0 0 10px #00ff66, 0 0 20px #00ff66'
            : '0 0 10px #00f3ff, 0 0 20px #00f3ff',
        }}
      />

      {/* Trailing Cybernetic Reticle */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-cyan/50 transition-all duration-150 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '46px' : '26px',
          height: isHovered ? '46px' : '26px',
          borderColor: isHovered ? '#00ff66' : '#00f3ff',
          backgroundColor: isHovered ? 'rgba(0, 255, 102, 0.08)' : 'rgba(0, 243, 255, 0.04)',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
        }}
      >
        {/* Subtle Crosshairs */}
        <div className="absolute left-1/2 -top-1.5 h-1 w-0.5 -translate-x-1/2 bg-cyber-cyan/60" />
        <div className="absolute left-1/2 -bottom-1.5 h-1 w-0.5 -translate-x-1/2 bg-cyber-cyan/60" />
        <div className="absolute top-1/2 -left-1.5 h-0.5 w-1 -translate-y-1/2 bg-cyber-cyan/60" />
        <div className="absolute top-1/2 -right-1.5 h-0.5 w-1 -translate-y-1/2 bg-cyber-cyan/60" />
      </div>
    </div>
  );
};
