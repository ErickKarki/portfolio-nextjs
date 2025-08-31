'use client';

import { useEffect, useRef, useState } from 'react';

interface WebGLShaderBackgroundProps {
  isActive: boolean;
  intensity?: number;
}

const WebGLShaderBackground = ({ isActive, intensity = 0.3 }: WebGLShaderBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>();
  const [isSupported, setIsSupported] = useState(true);

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = a_position;
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment shader source - aesthetic professional design
  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_intensity;
    varying vec2 v_texCoord;
    
    // Advanced hash functions
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    
    vec2 hash22(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }
    
    // Smooth noise
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                     dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                 mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                     dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
    }
    
    // Aesthetic animated tech grid
    float aestheticTechGrid(vec2 uv) {
      float result = 0.0;
      
      // Primary grid with beautiful spacing
      vec2 grid1 = abs(fract(uv * 8.0) - 0.5);
      float line1 = min(grid1.x, grid1.y);
      float mainGrid = smoothstep(0.02, 0.0, line1);
      
      // Secondary fine grid
      vec2 grid2 = abs(fract(uv * 32.0) - 0.5);
      float line2 = min(grid2.x, grid2.y);
      float fineGrid = smoothstep(0.005, 0.001, line2) * 0.4;
      
      // Animated circuit nodes at intersections
      vec2 gridPos = floor(uv * 8.0);
      float nodeHash = hash(gridPos);
      
      // Only show nodes at select intersections
      if (nodeHash > 0.92) {
        vec2 nodeUV = fract(uv * 8.0);
        float nodeDist = distance(nodeUV, vec2(0.5));
        
        // Pulsing circuit nodes
        float pulse = sin(u_time * 3.0 + nodeHash * 20.0) * 0.5 + 0.5;
        float node = exp(-nodeDist * 25.0) * pulse;
        result += node * 1.2;
        
        // Connection traces
        float trace = exp(-nodeDist * 8.0) * 0.3;
        result += trace;
      }
      
      // Flowing energy along main grid lines
      vec2 flowUV = uv * 8.0;
      float energyFlow = sin(flowUV.x * 2.0 + u_time * 2.0) * sin(flowUV.y * 2.0 + u_time * 1.5);
      energyFlow = smoothstep(0.3, 0.8, energyFlow) * 0.2;
      
      result += mainGrid * 0.6 + fineGrid + energyFlow * mainGrid;
      
      return result;
    }
    
    // Elegant data streams
    float elegantDataStreams(vec2 uv) {
      float pattern = 0.0;
      
      // Vertical data columns with varying speeds
      for (int i = 0; i < 8; i++) {
        float fi = float(i);
        float x = 0.1 + fi * 0.1 + sin(u_time * 0.5 + fi) * 0.02;
        
        // Stream position
        float streamY = uv.y - u_time * (1.2 + fi * 0.3);
        streamY = fract(streamY * 2.0) - 0.5;
        
        // Stream intensity based on position
        float intensity = exp(-abs(streamY) * 8.0);
        
        // Distance from stream line
        float dist = abs(uv.x - x);
        if (dist < 0.005) {
          float streamWidth = smoothstep(0.005, 0.001, dist);
          
          // Data packets
          float packet = sin(streamY * 40.0 + u_time * 5.0) * 0.5 + 0.5;
          packet = smoothstep(0.7, 1.0, packet);
          
          pattern += streamWidth * intensity * (0.4 + packet * 0.6);
        }
      }
      
      return pattern;
    }
    
    // Professional network topology
    float professionalNetwork(vec2 uv) {
      float pattern = 0.0;
      vec2 center = vec2(0.5);
      
      // Create hexagonal node layout
      float radius = 0.3;
      int nodeCount = 6;
      
      for (int i = 0; i < 6; i++) {
        float angle = float(i) * 1.047 + u_time * 0.1; // 60 degrees
        float nodeRadius = radius + sin(u_time * 0.4 + float(i)) * 0.05;
        vec2 nodePos = center + vec2(cos(angle), sin(angle)) * nodeRadius;
        
        float dist = distance(uv, nodePos);
        
        // Main node with glow
        float node = exp(-dist * 40.0);
        float glow = exp(-dist * 15.0) * 0.3;
        
        // Pulsing based on activity
        float pulse = sin(u_time * 2.5 + float(i) * 1.3) * 0.2 + 0.8;
        pattern += (node + glow) * pulse;
        
        // Connection lines to center
        vec2 lineDir = normalize(center - nodePos);
        vec2 toPoint = uv - nodePos;
        float projLength = clamp(dot(toPoint, lineDir), 0.0, distance(nodePos, center));
        vec2 closestPoint = nodePos + lineDir * projLength;
        float lineDist = distance(uv, closestPoint);
        
        // Data flow along connections
        float flow = sin(u_time * 3.0 - projLength * 15.0) * 0.5 + 0.5;
        pattern += smoothstep(0.004, 0.001, lineDist) * 0.3 * flow;
      }
      
      // Central hub
      float hubDist = distance(uv, center);
      float hub = exp(-hubDist * 30.0) * (sin(u_time * 2.0) * 0.3 + 0.7);
      pattern += hub * 1.5;
      
      return pattern;
    }
    
    // Sophisticated scanning system
    float sophisticatedScans(vec2 uv) {
      float result = 0.0;
      
      // Elegant horizontal sweeps
      float hSweep = sin(uv.y * 80.0 + u_time * 3.0);
      hSweep = smoothstep(0.9, 1.0, hSweep) * 0.2;
      
      // Vertical analysis lines
      float vSweep = sin(uv.x * 60.0 + u_time * 2.0);
      vSweep = smoothstep(0.95, 1.0, vSweep) * 0.15;
      
      // Radial scanner from center
      vec2 center = vec2(0.5);
      float angle = atan(uv.y - center.y, uv.x - center.x);
      float sweep = sin(angle * 3.0 - u_time * 1.5);
      float radialScan = smoothstep(0.7, 1.0, sweep) * 0.1;
      
      return hSweep + vSweep + radialScan;
    }
    
    // Enhanced mouse interaction
    float enhancedMouseInteraction(vec2 uv) {
      vec2 mousePos = u_mouse / u_resolution;
      float dist = distance(uv, mousePos);
      
      // Soft glow
      float glow = exp(-dist * 4.0) * 0.8;
      
      // Expanding ripples
      float ripple1 = sin(dist * 25.0 - u_time * 6.0) * exp(-dist * 3.0);
      float ripple2 = sin(dist * 15.0 - u_time * 4.0) * exp(-dist * 2.0);
      
      // Grid disruption effect
      float disruption = exp(-dist * 8.0) * sin(u_time * 10.0) * 0.2;
      
      return glow + abs(ripple1) * 0.4 + abs(ripple2) * 0.3 + disruption;
    }
    
    void main() {
      vec2 uv = v_texCoord;
      
      // Sophisticated gradient background
      vec3 color = vec3(0.005, 0.01, 0.02);
      
      // Add subtle radial gradient
      float radialGrad = 1.0 - distance(uv, vec2(0.5)) * 0.8;
      color *= radialGrad;
      
      // Subtle tech grid - main feature
      float grid = aestheticTechGrid(uv);
      color += vec3(0.05, 0.15, 0.25) * grid * u_intensity;
      
      // Minimal data streams
      float streams = elegantDataStreams(uv);
      color += vec3(0.0, 0.2, 0.3) * streams * u_intensity * 0.3;
      
      // Subtle network (reduced)
      float network = professionalNetwork(uv);
      color += vec3(0.1, 0.2, 0.3) * network * u_intensity * 0.2;
      
      // Very subtle scans
      float scans = sophisticatedScans(uv);
      color += vec3(0.05, 0.1, 0.15) * scans * u_intensity * 0.5;
      
      // Minimal mouse interaction
      float mouse = enhancedMouseInteraction(uv);
      color += vec3(0.08, 0.15, 0.2) * mouse * u_intensity * 0.3;
      
      // Subtle atmospheric noise
      float atmosphere = noise(uv * 30.0 + u_time * 0.05) * 0.05;
      color += vec3(atmosphere * 0.5, atmosphere, atmosphere * 1.5);
      
      // Professional vignette
      float vignette = smoothstep(0.0, 0.7, 1.0 - distance(uv, vec2(0.5)));
      color *= vignette;
      
      // Color temperature adjustment
      color = mix(color, color * vec3(1.1, 1.0, 0.9), 0.1);
      
      gl_FragColor = vec4(color, u_intensity * 0.3);
    }
  `;

  const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  const setupWebGL = () => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    // Try to get WebGL context
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      console.warn('WebGL not supported');
      setIsSupported(false);
      return false;
    }

    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      setIsSupported(false);
      return false;
    }

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      setIsSupported(false);
      return false;
    }

    programRef.current = program;

    // Set up geometry (full-screen quad)
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]);

    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    // Set up attributes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return true;
  };

  const render = (time: number) => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas || !isActive) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use program
    gl.useProgram(program);

    // Set uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const intensityLocation = gl.getUniformLocation(program, 'u_intensity');

    gl.uniform1f(timeLocation, time * 0.001);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(mouseLocation, canvas.width * 0.5, canvas.height * 0.5); // Center for now
    gl.uniform1f(intensityLocation, intensity);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    if (isActive && setupWebGL()) {
      animationRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, intensity]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      const program = programRef.current;

      if (!canvas || !gl || !program || !isActive) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = rect.height - (e.clientY - rect.top); // Flip Y coordinate

      const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
      gl.useProgram(program);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
    };

    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isActive]);

  if (!isActive || !isSupported) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: '100vw',
        height: '100vh',
        opacity: intensity,
      }}
    />
  );
};

export default WebGLShaderBackground;