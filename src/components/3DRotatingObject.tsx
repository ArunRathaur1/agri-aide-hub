
import { useEffect, useRef } from 'react';

interface RotatingObjectProps {
  size?: number;
  color?: string;
  speed?: number;
  className?: string;
  mouseSensitivity?: number;
}

const RotatingObject = ({ 
  size = 200, 
  color = 'rgba(75, 192, 75, 0.6)', 
  speed = 0.2,
  className = '',
  mouseSensitivity = 0.1
}: RotatingObjectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const rotationXRef = useRef<number>(0);
  const rotationYRef = useRef<number>(0);
  const autoRotationRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = size;
    canvas.height = size;
    
    // Points for an octahedron
    const points = [
      { x: 0, y: -50, z: 0 },    // Top
      { x: 50, y: 0, z: 50 },    // Front-Right
      { x: -50, y: 0, z: 50 },   // Front-Left
      { x: -50, y: 0, z: -50 },  // Back-Left
      { x: 50, y: 0, z: -50 },   // Back-Right
      { x: 0, y: 50, z: 0 }      // Bottom
    ];
    
    // Edges between points
    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],  // Top to sides
      [5, 1], [5, 2], [5, 3], [5, 4],  // Bottom to sides
      [1, 2], [2, 3], [3, 4], [4, 1]   // Side to side
    ];
    
    const project = (point: { x: number, y: number, z: number }, rotX: number, rotY: number) => {
      // Apply rotations
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      
      // Rotate around X-axis
      const y1 = point.y * cosX - point.z * sinX;
      const z1 = point.y * sinX + point.z * cosX;
      
      // Rotate around Y-axis
      const x2 = point.x * cosY + z1 * sinY;
      const z2 = -point.x * sinY + z1 * cosY;
      
      // Project onto 2D plane
      const scale = 400 / (400 + z2);
      const x = x2 * scale + canvas.width / 2;
      const y = y1 * scale + canvas.height / 2;
      
      return { x, y, scale };
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update auto rotation
      autoRotationRef.current += speed * 0.01;
      
      // Combined rotation
      const rotX = rotationXRef.current;
      const rotY = rotationYRef.current + autoRotationRef.current;
      
      // Project all points
      const projectedPoints = points.map(point => project(point, rotX, rotY));
      
      // Draw edges
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      edges.forEach(([i, j]) => {
        ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
        ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
      });
      
      ctx.stroke();
      
      // Draw points
      ctx.fillStyle = color;
      projectedPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4 * point.scale, 0, Math.PI * 2);
        ctx.fill();
      });
      
      frameRef.current = requestAnimationFrame(draw);
    };
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      rotationXRef.current = (e.clientY - centerY) * mouseSensitivity * 0.01;
      rotationYRef.current = (e.clientX - centerX) * mouseSensitivity * 0.01;
    };
    
    const handleMouseLeave = () => {
      // Gradually reset rotation
      const resetRotation = () => {
        rotationXRef.current *= 0.9;
        rotationYRef.current *= 0.9;
        
        if (Math.abs(rotationXRef.current) > 0.01 || Math.abs(rotationYRef.current) > 0.01) {
          requestAnimationFrame(resetRotation);
        } else {
          rotationXRef.current = 0;
          rotationYRef.current = 0;
        }
      };
      
      resetRotation();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    draw();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [size, color, speed, mouseSensitivity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`rotating-object ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default RotatingObject;
