// "Janela de mármore" do grupo LIQUID: ruído fractal posterizado em 6 tons de
// roxo/rosa num WebGL mínimo (sem three.js), desenhado só quando o scroll muda.
// Substitui o filtro SVG feTurbulence do protótipo (pesado), como pede a spec §8.
// Sem WebGL, o CSS mostra um degradê estático no lugar.
const vertex = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
const fragment = `precision mediump float;
uniform vec2 r;uniform float o;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int k=0;k<4;k++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/r.y;uv.y+=o/r.y;
 float v=fbm(uv*vec2(2.2,3.)+fbm(uv*1.4)*1.6);
 float b=floor(clamp(v,0.,.999)*6.);
 vec3 c=vec3(.05,.04,.06);
 if(b>.5)c=vec3(.14,.06,.27);
 if(b>1.5)c=vec3(.28,.06,.27);
 if(b>2.5)c=vec3(.49,.17,.96);
 if(b>3.5)c=vec3(1.,.31,.66);
 if(b>4.5)c=vec3(.49,.17,.96);
 gl_FragColor=vec4(c,1.);
}`

export function mountMarble(canvas: HTMLCanvasElement | null, still: boolean) {
  if (!canvas) return null
  const gl = canvas.getContext('webgl', { antialias: false, preserveDrawingBuffer: false, powerPreference: 'low-power' })
  if (!gl) return null
  const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); return shader }
  const program = gl.createProgram()!
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'p')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  const resolution = gl.getUniformLocation(program, 'r'), offset = gl.getUniformLocation(program, 'o')
  canvas.dataset.ready = 'true'
  let last = Number.NaN
  function draw(scroll: number) {
    const value = still ? 0 : Math.round(scroll)
    if (value === last) return
    last = value
    gl!.viewport(0, 0, canvas!.width, canvas!.height)
    gl!.uniform2f(resolution, canvas!.width, canvas!.height)
    gl!.uniform1f(offset, value)
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
  }
  draw(0)
  return { draw }
}
