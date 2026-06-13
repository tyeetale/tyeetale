import { useRef, useEffect } from 'react';

export default function ShaderToy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;
        
        float d = length(p);
        float a = atan(p.y, p.x);
        
        float r = sin(d * 8.0 - time * 1.5 + a * 3.0) * 0.5 + 0.5;
        float g = sin(d * 6.0 - time * 1.2 + a * 2.0 + 2.094) * 0.5 + 0.5;
        float b = sin(d * 10.0 - time * 1.8 + a * 4.0 + 4.188) * 0.5 + 0.5;
        
        float fade = smoothstep(1.5, 0.0, d);
        
        gl_FragColor = vec4(r * fade * 0.6, g * fade * 0.4, b * fade * 0.8, 1.0);
      }
    `);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, 'time');
    const resolutionUniform = gl.getUniformLocation(program, 'resolution');

    let animId: number;
    const startTime = Date.now();

    function render() {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeUniform, (Date.now() - startTime) / 1000);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div>
      <h3 className="text-xs text-[#555] uppercase tracking-widest mb-2">Fragment Shader</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-[200px] rounded-lg"
      />
      <p className="text-xs text-[#555] mt-2">WebGL fragment shader. Procedural generative art.</p>
    </div>
  );
}
