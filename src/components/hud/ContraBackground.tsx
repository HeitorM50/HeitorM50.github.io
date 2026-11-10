import type { CSSProperties } from 'react'

// Fundo "contracorrente" (design/BACKGROUND_SPEC.md). Marcação estática gerada no
// build com semente fixa; src/lib/background.ts só move as peças (transform/opacity)
// e troca os grupos por seção. Puramente decorativo: aria-hidden, sem foco, sem clique.

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const tokens = ['0X47', 'CAN', '0X1F', 'SYS', 'HR', '//', '0XA2', 'FW', '047', 'ID', '0X12', 'BUS', 'ECU', 'RX', 'TX']
const glitchColors = ['var(--purple-500)', 'var(--pink-400)', 'var(--white)', 'var(--purple-300)']
const COLUMN_LINES = 80

// Escadaria de pixels em 2 paths (contornos + células preenchidas), em vez de um
// <rect> por célula: mesmo visual com ~50 elementos a menos por escadaria.
function Stair({ seed }: { seed: number }) {
  const random = seeded(seed)
  let outline = '', filled = ''
  for (let row = 0; row < 11; row++) for (let col = 0; col < 11; col++) {
    if (col < row - 1 || col > row + 3) continue
    const cell = `M${col * 12 + 1},${row * 12 + 1}h10v10h-10z`
    outline += cell
    if (random() < 0.18) filled += cell
  }
  return <><path className="bg-cell bg-cell--on" d={filled} /><path className="bg-cell" d={outline} /></>
}

function column(seed: number) {
  const random = seeded(seed)
  const lines = Array.from({ length: COLUMN_LINES }, () => tokens[Math.floor(random() * tokens.length)]).join('\n')
  return `${lines}\n${lines}`
}

function Star({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size, p = s * 0.2
  return <svg x={`${x}%`} y={`${y}%`} overflow="visible"><path data-bg-star d={`M0,${-s} L${p},${-p} L${s},0 L${p},${p} L0,${s} L${-p},${p} L${-s},0 L${-p},${-p} Z`} /></svg>
}

export function ContraBackground({ word }: { word: string }) {
  const random = seeded(47)
  const stars = Array.from({ length: 9 }, () => ({ x: random() * 100, y: random() * 100, size: 8 + random() * 12 }))
  const slices = Array.from({ length: 20 }, (_, index) => ({ top: random() * 100, left: random() * 80, width: 16 + random() * 124, height: 2 + Math.round(random() * 5), color: glitchColors[index % 4], dir: random() < 0.5 ? -1 : 1, k: 0.5 + random() }))
  const drips = Array.from({ length: 14 }, (_, index) => ({ top: 15 + random() * 45, left: 20 + random() * 60, width: 2 + Math.round(random() * 4), color: glitchColors[(index + 1) % 4], k: 0.4 + random() }))
  const pixels = Array.from({ length: 10 }, (_, index) => ({ top: random() * 100, left: random() * 95, size: 4 + Math.round(random() * 6), color: glitchColors[index % 4] }))
  const bars = Array.from({ length: 22 }, () => ({ height: 1 + Math.round(random() * 3), gap: 1 + Math.round(random() * 3) }))
  const repeated = `${word} // `.repeat(10)
  const first = word.split(' ')[0]

  return <div className="bg" aria-hidden="true" data-bg-root>
    <div className="bg__grid" data-bg-el="grid" />

    {/* NEON */}
    <div className="bg__group" data-bg-group="neon">
      <svg className="bg__el bg-desk bg__letter bg__letter--h" data-bg-el="letH" viewBox="0 0 86 104"><g><polygon points="0,10 10,0 22,0 22,100 0,100" /><polygon points="58,0 80,0 80,90 70,100 58,100" /><rect x="26" y="39" width="28" height="22" /></g></svg>
      <svg className="bg__el bg-desk bg__letter bg__letter--r" data-bg-el="letR" viewBox="0 0 76 104"><g><rect width="22" height="100" /><path d="M26,0 H56 L72,16 V44 L56,60 H26 V38 H50 V22 H26 Z" /><polygon points="30,64 54,64 72,90 72,100 56,100" /></g></svg>
      <svg className="bg__el bg__stair" data-bg-el="stairA" style={{ left: '12%', top: '4%' }} width="140" height="140"><Stair seed={11} /></svg>
      <svg className="bg__el bg__stair" data-bg-el="stairB" style={{ right: '18%', top: '62%' }} width="140" height="140"><Stair seed={29} /></svg>
      <div className="bg__el bg-desk bg__column bg__column--left" data-bg-el="colL">{column(5)}</div>
      <div className="bg__el bg-desk bg__column bg__column--right" data-bg-el="colR">{column(9)}</div>
      <svg className="bg__beams" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <g data-bg-el="beamsA"><polygon className="bg__beam bg__beam--purple" points="-700,420 1500,-300 1505,-291 -695,429" /><polygon className="bg__beam bg__beam--purple bg__beam--soft" points="-700,470 1500,-250 1503,-245 -697,475" /></g>
        <g data-bg-el="beamsB"><polygon className="bg__beam bg__beam--pink" points="-400,-220 1600,560 1600,569 -400,-211" /><polygon className="bg__beam bg__beam--pink bg__beam--soft" points="-400,-170 1600,610 1600,614 -400,-166" /></g>
        <g data-bg-el="wire" className="bg__wire"><path d="M80,560 H260 L330,490 H470 L510,450" /><path d="M920,60 H800 L740,120 V230 L700,270" /></g>
      </svg>
    </div>

    {/* MELT */}
    <div className="bg__group" data-bg-group="melt">
      <svg className="bg__el bg__panel" data-bg-el="panelA" style={{ right: '8%', top: '8%' }} width="260" height="260">
        <defs><pattern id="bg-halftone" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.3" className="bg__dot" /></pattern></defs>
        <path className="bg__panel-a" d="M24,0 H200 L220,20 V40 L236,56 V200 L212,224 H40 L24,208 V120 L8,104 V16 Z" />
        <rect x="40" y="60" width="90" height="60" fill="url(#bg-halftone)" />
        <text x="120" y="200" className="bg__panel-number">47</text>
        <g className="bg__connector"><circle cx="8" cy="140" r="6" /><circle cx="236" cy="90" r="6" /><circle cx="236" cy="170" r="6" /></g>
        <text x="40" y="42" className="bg__panel-word">HR.SYS</text>
        <text x="40" y="58" className="bg__panel-word bg__panel-word--ghost">HR.SYS</text>
      </svg>
      <svg className="bg__el bg-desk bg__panel" data-bg-el="panelB" style={{ left: '28%', top: '55%' }} width="220" height="300">
        <path className="bg__panel-b" d="M0,20 L20,0 H180 V30 L200,50 V280 H40 L0,240 Z" />
        <rect x="120" y="150" width="60" height="80" fill="url(#bg-halftone)" />
        <g transform="translate(176,60)" className="bg__panel-bars"><rect width="2" height="60" /><rect x="4" width="1" height="60" /><rect x="7" width="3" height="60" /><rect x="12" width="1" height="60" /></g>
        <text transform="translate(166,140) rotate(90)" className="bg__panel-code">CODE: 0XHR</text>
        <g className="bg__connector"><circle cx="40" cy="268" r="5" /></g>
      </svg>
      <svg className="bg__stars" width="100%" height="100%">{stars.map((star, index) => <Star key={index} {...star} />)}</svg>
    </div>

    {/* LIQUID */}
    <div className="bg__group" data-bg-group="liquid">
      <div className="bg__marble" data-bg-el="marbleWindow"><canvas data-bg-marble width="140" height="200" /></div>
      <div className="bg__el bg__row bg__row--solid" data-bg-el="row0" data-bg-word>{repeated}</div>
      <div className="bg__el bg__row bg__row--purple" data-bg-el="row1" data-bg-word>{repeated}</div>
      <div className="bg__el bg__row bg__row--outline" data-bg-el="row2" data-bg-word>{repeated}</div>
      <div className="bg__el bg__italics" data-bg-el="italics">{[0, 1, 2].map(index => <div key={index} className="bg__italic" data-bg-first>{first}</div>)}</div>
      <div className="bg__triangles" data-bg-el="triangles">{[...'HRSYS'].map((letter, index) => <div key={index} className="bg__triangle"><svg width="18" height="18"><polygon data-bg-triangle points="0,0 18,9 0,18" /></svg><span>{letter}</span></div>)}</div>
      <div className="bg__el bg__barcode" data-bg-el="barcode">{bars.map((bar, index) => <i key={index} style={{ height: bar.height, marginBottom: bar.gap }} />)}</div>
      <div className="bg__el bg-desk bg__vlabel" data-bg-el="vlabel">embedded style</div>
      <div className="bg__el bg-desk bg__advisory" data-bg-el="advisory"><span>SYSTEM ADVISORY</span><strong>EXPLICIT CODE</strong><span>C/C++ INSIDE</span></div>
    </div>

    {/* BORBOLETA: guiado pela velocidade da rolagem */}
    <div className="bg__group bg__group--glitch" data-bg-group="glitch">
      {slices.map((slice, index) => <span key={`s${index}`} className={`bg__el bg__slice${index >= 8 ? ' bg-desk' : ''}`} data-bg-slice data-dir={slice.dir} data-k={slice.k.toFixed(2)} style={{ top: `${slice.top}%`, left: `${slice.left}%`, width: slice.width, height: slice.height, background: slice.color } as CSSProperties} />)}
      {drips.map((drip, index) => <span key={`d${index}`} className="bg__el bg__drip bg-desk" data-bg-drip data-k={drip.k.toFixed(2)} style={{ top: `${drip.top}%`, left: `${drip.left}%`, width: drip.width, background: drip.color }} />)}
      {pixels.map((pixel, index) => <span key={`p${index}`} className="bg__el bg__pixel" data-bg-pixel style={{ top: `${pixel.top}%`, left: `${pixel.left}%`, width: pixel.size, height: pixel.size, background: pixel.color }} />)}
    </div>
  </div>
}
