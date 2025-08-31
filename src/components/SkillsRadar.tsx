'use client';

import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillsRadar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    { name: 'React.js', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Python', level: 88, category: 'Backend' },
    { name: 'TypeScript', level: 85, category: 'Language' },
    { name: 'AWS', level: 78, category: 'Cloud' },
    { name: 'Docker', level: 82, category: 'DevOps' },
    { name: 'PostgreSQL', level: 80, category: 'Database' },
    { name: 'Java', level: 83, category: 'Language' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'GraphQL', level: 72, category: 'API' },
    { name: 'Redis', level: 70, category: 'Database' },
    { name: 'Kubernetes', level: 65, category: 'DevOps' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 60;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw radar grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      
      // Concentric circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
        
        // Level labels
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        ctx.font = '12px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${i * 20}`, centerX + (maxRadius / 5) * i, centerY - 5);
      }
      
      // Radar lines
      const numLines = skills.length;
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      
      // Draw skill points
      skills.forEach((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
        const progress = Math.min(animationProgress, 1);
        const radius = (skill.level / 100) * maxRadius * progress;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Skill point
        ctx.beginPath();
        ctx.arc(x, y, hoveredSkill === skill.name ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = getSkillColor(skill.category);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Skill label
        const labelRadius = maxRadius + 20;
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;
        
        ctx.fillStyle = hoveredSkill === skill.name ? '#3b82f6' : '#64748b';
        ctx.font = hoveredSkill === skill.name ? 'bold 13px "Inter"' : '12px "Inter"';
        ctx.textAlign = labelX > centerX ? 'left' : 'right';
        ctx.fillText(skill.name, labelX, labelY);
        
        // Skill level
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
        ctx.font = '10px "Inter"';
        ctx.fillText(`${skill.level}%`, labelX, labelY + 12);
      });
      
      // Draw connecting lines between points
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 2;
      
      skills.forEach((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
        const progress = Math.min(animationProgress, 1);
        const radius = (skill.level / 100) * maxRadius * progress;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.closePath();
      ctx.stroke();
      
      // Fill the area
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fill();
    };

    const getSkillColor = (category: string): string => {
      const colors: Record<string, string> = {
        'Frontend': '#3b82f6',
        'Backend': '#10b981',
        'Language': '#8b5cf6',
        'Cloud': '#f59e0b',
        'DevOps': '#ef4444',
        'Database': '#06b6d4',
        'API': '#ec4899'
      };
      return colors[category] || '#64748b';
    };

    animate();
  }, [animationProgress, hoveredSkill]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(prev => Math.min(prev + 0.02, 1));
    }, 50);

    return () => clearTimeout(timer);
  }, [animationProgress]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 60;

    let closestSkill: string | null = null;
    let closestDistance = Infinity;

    skills.forEach((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
      if (distance < 20 && distance < closestDistance) {
        closestDistance = distance;
        closestSkill = skill.name;
      }
    });

    setHoveredSkill(closestSkill);
  };

  return (
    <div className="relative w-full h-96">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredSkill(null)}
      />
      
      {hoveredSkill && (
        <div className="absolute top-4 left-4 bg-gray-900/90 text-white p-3 rounded-lg backdrop-blur-sm">
          <div className="font-semibold">{hoveredSkill}</div>
          <div className="text-sm text-gray-300">
            {skills.find(s => s.name === hoveredSkill)?.level}% proficiency
          </div>
          <div className="text-xs text-gray-400">
            {skills.find(s => s.name === hoveredSkill)?.category}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsRadar;