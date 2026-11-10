// Mão robótica 3D do hero (three.js): modelo "Robotic Hand" de SeanNicolas
// (CC BY 4.0, original em images/robotic-hand/), posado em pinça no Blender e
// exportado para public/media/robotic-hand.glb.
// Materiais PBR com ambiente (RoomEnvironment) nas cores chapadas do DESIGN_SPEC. O card fica pinçado entre as pontas do indicador e do médio e gira
// no eixo vertical que passa pela pinça. Carregado sob demanda por scroll-scenes.ts
// só no desktop; celular, reduced-motion e GPU por software ficam com o 2D.
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Mesmos valores de src/app/tokens.css (o WebGL não lê variáveis CSS).
const color = {
  white: '#F4F2FA', gray: '#B9B5BF', meta: '#8C8893', void950: '#0B0A0F', void900: '#141219', void800: '#1E1B25', void700: '#2B2833',
  purple900: '#241046', purple500: '#7C2CF5', purple400: '#A773FF', purple300: '#C4A1FF', yellow: '#F7E733', pink400: '#FF4FA8'
}

// setAngle: ângulo do card; zoom (0–1): quanto a câmera já se aproximou do card.
export type Hand = { setAngle: (degrees: number, zoom?: number) => void; dispose: () => void }

// GPU por software (SwiftShader, llvmpipe) trava a thread: fica no 2D, salvo ?hand3d.
function gpuIsCapable(force: boolean) {
  const probe = document.createElement('canvas')
  const gl = probe.getContext('webgl2') ?? probe.getContext('webgl')
  if (!gl) return false
  const info = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
  gl.getExtension('WEBGL_lose_context')?.loseContext()
  return force || !/swiftshader|llvmpipe|software/i.test(renderer)
}

type Materials = Record<'ceramic' | 'steel' | 'graphite' | 'core' | 'rubber' | 'accent' | 'signal', THREE.Material>

function chamferPath(context: CanvasRenderingContext2D, width: number, height: number, cut: number) {
  context.beginPath()
  context.moveTo(0, 0)
  context.lineTo(width - cut, 0)
  context.lineTo(width, cut)
  context.lineTo(width, height)
  context.lineTo(cut, height)
  context.lineTo(0, height - cut)
  context.closePath()
}

function barcode(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fill: string) {
  const pattern = [1, 2, 3, 1, 1, 3, 1, 2, 2, 1, 3, 1]
  context.fillStyle = fill
  let cursor = x
  for (let index = 0; cursor < x + width; index++) {
    const bar = pattern[index % pattern.length] * 2
    if (index % 2 === 0) context.fillRect(cursor, y, bar, height)
    cursor += bar + 2
  }
}

type CardCopy = { idLabel: string; name: string; role: string; backLabel: string; status: string; contacts: [string, string][]; org: string }

function cardCopy(rig: HTMLElement): CardCopy {
  const text = (selector: string, fallback: string) => rig.querySelector(selector)?.textContent?.trim() || fallback
  return {
    idLabel: 'HR_47',
    name: text('.id-card__bottom strong', 'HEITOR RICARDO'),
    role: text('.id-card__bottom span', 'ENG. SOFTWARE · UnB'),
    backLabel: text('.id-card__face--back .id-card__top span', 'CONTATO'),
    status: text('.id-card__status', 'ABERTO A ESTÁGIO').replace(/^●\s*/, ''),
    contacts: Array.from(rig.querySelectorAll('.id-card__contacts > div')).map(row => [row.querySelector('dt')?.textContent ?? '', row.querySelector('dd')?.textContent ?? ''] as [string, string]),
    org: text('.id-card__org', 'HEITORM50.GITHUB.IO')
  }
}

const W = 800, H = 1120, CUT = 64, PAD = 48

function frontTexture(copy: CardCopy, photo: HTMLImageElement, duotone = true) {
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H
  const context = canvas.getContext('2d')!
  chamferPath(context, W, H, CUT); context.save(); context.clip()
  context.fillStyle = color.void900; context.fillRect(0, 0, W, H)
  context.font = '400 30px "JetBrains Mono"'; context.textBaseline = 'middle'
  context.fillStyle = color.meta; context.fillText('ID', PAD, 76)
  context.fillStyle = color.white; context.fillText(copy.idLabel, PAD + 60, 76)
  barcode(context, W - PAD - 200, 56, 200, 40, color.meta)
  // foto em duotone (sombras --purple-900, luzes --white) ou na cor natural
  const size = W - PAD * 2, top = 124
  context.drawImage(photo, PAD, top, size, size)
  if (duotone) {
  const pixels = context.getImageData(PAD, top, size, size)
  const data = pixels.data
  for (let index = 0; index < data.length; index += 4) {
    const light = (0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2]) / 255
    data[index] = 36 + (244 - 36) * light; data[index + 1] = 16 + (242 - 16) * light; data[index + 2] = 70 + (250 - 70) * light
  }
  context.putImageData(pixels, PAD, top)
  }
  context.fillStyle = color.white; context.font = '800 52px Tektur'; context.textBaseline = 'alphabetic'
  context.fillText(copy.name, PAD, top + size + 92)
  context.fillStyle = color.purple300; context.font = '400 28px "JetBrains Mono"'
  context.fillText(copy.role.toUpperCase(), PAD, top + size + 140)
  context.restore()
  chamferPath(context, W, H, CUT); context.strokeStyle = color.white; context.lineWidth = 6; context.stroke()
  return canvas
}

// Verso do card: os contatos do Heitor (os mesmos do HTML, que é a fonte do texto).
function backTexture(copy: CardCopy) {
  const canvas = document.createElement('canvas'); canvas.width = W; canvas.height = H
  const context = canvas.getContext('2d')!
  chamferPath(context, W, H, CUT); context.save(); context.clip()
  context.fillStyle = color.purple900; context.fillRect(0, 0, W, H)
  context.textBaseline = 'middle'; context.font = '400 30px "JetBrains Mono"'
  context.fillStyle = color.meta; context.fillText(copy.backLabel, PAD, 76)
  context.fillStyle = color.white; context.fillText(copy.idLabel, PAD + 200, 76)
  barcode(context, W - PAD - 200, 56, 200, 40, color.meta)
  // status em rosa, como o "● ONLINE" do spec
  context.fillStyle = color.pink400; context.font = '500 30px "JetBrains Mono"'
  context.fillText(`● ${copy.status}`, PAD, 176)
  context.fillStyle = color.void700; context.fillRect(PAD, 224, W - PAD * 2, 2)
  copy.contacts.forEach(([label, value], position) => {
    const y = 290 + position * 128
    context.fillStyle = color.purple300; context.font = '400 24px "JetBrains Mono"'; context.fillText(label, PAD, y)
    context.fillStyle = color.white; context.font = '500 34px "JetBrains Mono"'
    let line = value
    while (context.measureText(line).width > W - PAD * 2 && line.length > 4) line = line.slice(0, -2)
    context.fillText(line === value ? value : `${line}…`, PAD, y + 46)
  })
  // mira (glifo g-mira)
  context.strokeStyle = color.purple400; context.lineWidth = 5
  context.beginPath(); context.arc(W - 120, H - 150, 46, 0, Math.PI * 2); context.stroke()
  context.beginPath(); context.moveTo(W - 120, H - 226); context.lineTo(W - 120, H - 196); context.moveTo(W - 120, H - 104); context.lineTo(W - 120, H - 74)
  context.moveTo(W - 196, H - 150); context.lineTo(W - 166, H - 150); context.moveTo(W - 74, H - 150); context.lineTo(W - 44, H - 150); context.stroke()
  context.fillStyle = color.white; context.font = '800 40px Tektur'; context.textBaseline = 'alphabetic'
  context.fillText(copy.org, PAD, H - 80)
  context.restore()
  chamferPath(context, W, H, CUT); context.strokeStyle = color.white; context.lineWidth = 6; context.stroke()
  return canvas
}

// Texturas geradas em canvas (nada baixado): cerâmica com micro-ruído, manchas,
// emendas de painel com parafusos e marcações técnicas; mapa de relevo das emendas;
// fibra de carbono no miolo; aço escovado. Semente fixa: o resultado é sempre igual.
function surfaceTextures(renderer: THREE.WebGLRenderer) {
  let seed = 47
  const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  const anisotropy = renderer.capabilities.getMaxAnisotropy()
  const canvas = (size: number) => { const c = document.createElement('canvas'); c.width = c.height = size; return [c, c.getContext('2d')!] as const }
  const asTexture = (source: HTMLCanvasElement, repeat: number, srgb: boolean) => {
    const texture = new THREE.CanvasTexture(source)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(repeat, repeat)
    texture.anisotropy = anisotropy
    if (srgb) texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }

  // cerâmica: cor + relevo compartilham as emendas (a cada 256px) e os parafusos
  const size = 512
  const [colorCanvas, paint] = canvas(size)
  const [bumpCanvas, bump] = canvas(size)
  paint.fillStyle = '#ECEAF2'; paint.fillRect(0, 0, size, size)
  bump.fillStyle = '#808080'; bump.fillRect(0, 0, size, size)
  for (let index = 0; index < 9000; index++) {
    const x = random() * size, y = random() * size, tone = random()
    paint.fillStyle = `rgba(${tone > 0.5 ? '255,255,255' : '60,52,78'},${0.035 + random() * 0.05})`; paint.fillRect(x, y, 1.5, 1.5)
    bump.fillStyle = `rgba(${tone > 0.5 ? '255,255,255' : '0,0,0'},0.08)`; bump.fillRect(x, y, 1.5, 1.5)
  }
  for (let index = 0; index < 14; index++) {
    const x = random() * size, y = random() * size, radius = 30 + random() * 90
    const smudge = paint.createRadialGradient(x, y, 0, x, y, radius)
    smudge.addColorStop(0, 'rgba(90,80,110,0.07)'); smudge.addColorStop(1, 'rgba(90,80,110,0)')
    paint.fillStyle = smudge; paint.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }
  for (let index = 0; index < 40; index++) {
    const x = random() * size, y = random() * size, length = 8 + random() * 30, angle = random() * Math.PI
    paint.strokeStyle = 'rgba(70,64,84,0.10)'; paint.lineWidth = 0.6
    paint.beginPath(); paint.moveTo(x, y); paint.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length); paint.stroke()
  }
  for (const position of [0, 256]) {
    for (const [context, groove, light] of [[paint, '#9C98A6', 'rgba(255,255,255,0.7)'], [bump, '#101010', '#d0d0d0']] as const) {
      context.fillStyle = groove; context.fillRect(position, 0, 3, size); context.fillRect(0, position, size, 3)
      context.fillStyle = light; context.fillRect(position + 3, 0, 1, size); context.fillRect(0, position + 3, size, 1)
    }
  }
  for (const x of [24, 232, 280, 488]) for (const y of [24, 232, 280, 488]) {
    paint.fillStyle = '#8C8893'; paint.beginPath(); paint.arc(x, y, 5, 0, Math.PI * 2); paint.fill()
    paint.strokeStyle = '#5A5664'; paint.lineWidth = 1.2; paint.beginPath(); paint.moveTo(x - 3, y); paint.lineTo(x + 3, y); paint.stroke()
    bump.fillStyle = '#e0e0e0'; bump.beginPath(); bump.arc(x, y, 5, 0, Math.PI * 2); bump.fill()
  }
  paint.font = '500 15px "JetBrains Mono", monospace'; paint.fillStyle = 'rgba(43,40,51,0.62)'
  const labels = [['HR-47', 40, 60], ['0X1F // CAN-H', 300, 60], ['FW 2.6', 40, 310], ['ECU 04', 300, 310], ['NO STEP', 140, 200], ['UNB-FCTE', 360, 450]] as const
  for (const [text, x, y] of labels) paint.fillText(text, x, y)
  paint.fillStyle = '#7C2CF5'; paint.fillRect(40, 70, 26, 4); paint.fillRect(300, 320, 26, 4)
  // faixa de alerta pequena (amarelo é escasso: uma só)
  paint.save(); paint.beginPath(); paint.rect(380, 150, 96, 14); paint.clip()
  for (let x = 370; x < 480; x += 14) { paint.fillStyle = '#F7E733'; paint.beginPath(); paint.moveTo(x, 164); paint.lineTo(x + 7, 164); paint.lineTo(x + 21, 150); paint.lineTo(x + 14, 150); paint.fill() }
  paint.restore()

  // fibra de carbono: trama 2×2 com reflexo diagonal
  const [carbonCanvas, carbon] = canvas(64)
  carbon.fillStyle = '#18161E'; carbon.fillRect(0, 0, 64, 64)
  for (let x = 0; x < 64; x += 16) for (let y = 0; y < 64; y += 16) {
    const horizontal = ((x + y) / 16) % 2 === 0
    const weave = carbon.createLinearGradient(x, y, horizontal ? x + 16 : x, horizontal ? y : y + 16)
    weave.addColorStop(0, '#1E1B25'); weave.addColorStop(0.5, '#34303F'); weave.addColorStop(1, '#1E1B25')
    carbon.fillStyle = weave; carbon.fillRect(x + 1, y + 1, 14, 14)
  }

  // aço escovado: riscos finos na horizontal (rugosidade)
  const [brushCanvas, brush] = canvas(256)
  brush.fillStyle = '#7a7a7a'; brush.fillRect(0, 0, 256, 256)
  for (let index = 0; index < 900; index++) {
    const y = random() * 256, shade = Math.floor(90 + random() * 90)
    brush.fillStyle = `rgba(${shade},${shade},${shade},0.35)`; brush.fillRect(0, y, 256, 0.6 + random())
  }

  return {
    ceramic: asTexture(colorCanvas, 1.6, true), ceramicBump: asTexture(bumpCanvas, 1.6, false),
    carbon: asTexture(carbonCanvas, 9, true), brushed: asTexture(brushCanvas, 2, false)
  }
}

export async function mountHand(rig: HTMLElement, options: { force?: boolean } = {}): Promise<Hand | null> {
  if (!gpuIsCapable(Boolean(options.force))) return null
  const host = rig.querySelector<HTMLElement>('[data-hand3d]')
  const source = rig.querySelector<HTMLImageElement>('.id-card__photo')
  if (!host || !source) return null

  const photo = new Image()
  photo.src = source.currentSrc || source.src
  await Promise.all([photo.decode(), document.fonts.load('800 52px Tektur'), document.fonts.load('400 30px "JetBrains Mono"')])

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NeutralToneMapping
  renderer.toneMappingExposure = 0.85
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50)
  // Enquadramento: de longe (mão inteira) até perto (o card preenche o quadro).
  const shot = {
    far: { position: new THREE.Vector3(0.3, 0.75, 7.6), target: new THREE.Vector3(0, 0.62, 0) },
    near: { position: new THREE.Vector3(0.12, 1.36, 4.4), target: new THREE.Vector3(-0.14, 1.32, 0) }
  }
  const target = new THREE.Vector3()
  function frameCamera(amount: number) {
    const t = amount * amount * (3 - 2 * amount)
    // a mira sobe para o centro do card antes da câmera chegar perto: o topo nunca corta
    const aim = 1 - (1 - amount) * (1 - amount)
    camera.position.lerpVectors(shot.far.position, shot.near.position, t)
    target.lerpVectors(shot.far.target, shot.near.target, aim)
    camera.lookAt(target)
  }
  frameCamera(0)
  // ambiente de estúdio pré-filtrado (reflexos suaves no grafite e na cerâmica)
  const pmrem = new THREE.PMREMGenerator(renderer)
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = environment
  scene.environmentIntensity = 0.3
  pmrem.dispose()
  // luz principal com sombra suave: as peças se sombreiam umas às outras
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  const key = new THREE.DirectionalLight(color.white, 2.4); key.position.set(5, 3.5, 2.2)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  Object.assign(key.shadow.camera, { left: -2, right: 2, top: 2.6, bottom: -2.8, near: 1, far: 14 })
  key.shadow.bias = -0.0004
  key.shadow.normalBias = 0.015
  scene.add(key)
  const fill = new THREE.DirectionalLight(color.white, 0.22); fill.position.set(-3, -1, 4); scene.add(fill)
  const rim = new THREE.DirectionalLight(color.purple400, 1.8); rim.position.set(-4, 2, -4); scene.add(rim)
  const back = new THREE.DirectionalLight(color.white, 0.7); back.position.set(3, 1, -4); scene.add(back)

  const standard = (hex: string, roughness: number, metalness = 0) => new THREE.MeshStandardMaterial({ color: hex, roughness, metalness })
  const surfaces = surfaceTextures(renderer)
  const materials: Materials = {
    // cerâmica com verniz + textura (ruído, manchas, emendas em relevo, marcações)
    ceramic: new THREE.MeshPhysicalMaterial({ color: 0xffffff, map: surfaces.ceramic, bumpMap: surfaces.ceramicBump, bumpScale: 1.6, roughness: 0.42, clearcoat: 0.55, clearcoatRoughness: 0.25 }),
    steel: new THREE.MeshStandardMaterial({ color: color.gray, metalness: 0.95, roughness: 0.3, roughnessMap: surfaces.brushed }),
    graphite: standard(color.void700, 0.36, 0.75),
    core: new THREE.MeshStandardMaterial({ color: 0xffffff, map: surfaces.carbon, metalness: 0.35, roughness: 0.45 }),
    rubber: standard(color.void900, 0.85), accent: standard(color.purple500, 0.35, 0.2),
    signal: new THREE.MeshBasicMaterial({ color: color.yellow })
  }
  // mão: "Robotic Hand" de SeanNicolas (CC BY 4.0), posada no Blender por
  // scripts/blender/robotic-hand-pose.py. Os materiais do modelo viram os da paleta.
  const gltf = await new GLTFLoader().loadAsync('/media/robotic-hand.glb')
  const model = gltf.scene
  const byMaterial: Record<string, THREE.Material> = {
    Hand_Material012: materials.ceramic, Hand_Material000: materials.graphite, Hand_Material009: materials.core,
    Hand_Material010: materials.steel, Hand_Material011: materials.steel, Hand_Material013: materials.accent
  }
  model.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return
    const key = object.name in byMaterial ? object.name : object.parent?.name ?? ''
    object.material = byMaterial[key] ?? materials.ceramic
    object.castShadow = true
    object.receiveShadow = true
  })
  // escala para a altura da cena e encaixa a pinça (nó CardPivot) no ponto onde o card gira
  const pinchPoint = new THREE.Vector3(-0.175, 0.71, 0)
  const bounds = new THREE.Box3().setFromObject(model)
  model.scale.setScalar(2.75 / (bounds.max.y - bounds.min.y))
  model.updateMatrixWorld(true)
  const pinch = model.getObjectByName('CardPivot')?.getWorldPosition(new THREE.Vector3()) ?? new THREE.Vector3()
  model.position.add(pinchPoint.clone().sub(pinch))
  const hand = new THREE.Group()
  hand.add(model)
  const tilt = -0.5
  hand.rotation.set(0.1, tilt, 0)
  scene.add(hand)

  // card: frente e verso em canvas, bordas brancas; pivô na pinça (centro da borda de baixo)
  const copy = cardCopy(rig)
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy()
  const texture = (canvas: HTMLCanvasElement) => {
    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = maxAnisotropy
    return map
  }
  const faceMaterial = (canvas: HTMLCanvasElement) => new THREE.MeshBasicMaterial({ map: texture(canvas), transparent: true, alphaTest: 0.5, toneMapped: false })
  const front = faceMaterial(frontTexture(copy, photo))
  // a foto começa roxa e volta na cor natural depois do giro: o mapa troca com o verso virado
  const duotoneMap = front.map!
  const naturalMap = texture(frontTexture(copy, photo, false))
  const backFace = faceMaterial(backTexture(copy))
  const edge = new THREE.MeshBasicMaterial({ color: color.white, toneMapped: false })
  const cardWidth = 1.0, cardHeight = cardWidth * 7 / 5
  const card = new THREE.Mesh(new THREE.BoxGeometry(cardWidth, cardHeight, 0.014), [edge, edge, edge, edge, front, backFace])
  card.castShadow = true
  const pivot = new THREE.Group()
  pivot.position.copy(pinchPoint)
  // a borda de baixo do card entra entre as pontas do indicador e do médio
  card.position.y = cardHeight / 2 - 0.12
  pivot.add(card)
  hand.add(pivot)

  let angle = 0, zoom = 0, frame = 0, visible = true, disposed = false
  const started = performance.now()

  function pose(time: number) {
    const wanted = angle >= 180 ? naturalMap : duotoneMap
    if (front.map !== wanted) { front.map = wanted; front.needsUpdate = true }
    frameCamera(zoom)
    const turn = angle / 360
    const wave = Math.sin(turn * Math.PI * 2)
    pivot.rotation.y = THREE.MathUtils.degToRad(angle) - tilt
    hand.rotation.z = wave * 0.04
    hand.position.y = Math.sin(time * 1.1) * 0.025
    // face de lado escurece um pouco, para ler o volume do giro
    const light = 0.72 + 0.28 * Math.abs(Math.cos(THREE.MathUtils.degToRad(angle)))
    front.color.setScalar(light); backFace.color.setScalar(light)
  }

  function render() {
    frame = 0
    if (disposed || !visible) return
    pose((performance.now() - started) / 1000)
    renderer.render(scene, camera)
    frame = requestAnimationFrame(render)
  }

  function resize() {
    const width = Math.max(1, host!.clientWidth), height = Math.max(1, host!.clientHeight)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  // loop de ambiente pausa fora da tela (DESIGN_SPEC §8, contenção)
  const visibility = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting) && !document.hidden
    if (visible && !frame) frame = requestAnimationFrame(render)
  })
  visibility.observe(host)
  resize()
  await renderer.compileAsync(scene, camera)
  pose(0)
  renderer.render(scene, camera)
  rig.dataset.hand = '3d'
  host.dataset.calls = String(renderer.info.render.calls)
  frame = requestAnimationFrame(render)

  return {
    setAngle(degrees, amount = 0) { angle = degrees; zoom = Math.min(1, Math.max(0, amount)) },
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibility.disconnect()
      delete rig.dataset.hand
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.InstancedMesh) {
          object.geometry.dispose()
          for (const material of [object.material].flat()) { const textured = material as THREE.MeshStandardMaterial; textured.map?.dispose(); textured.bumpMap?.dispose(); textured.roughnessMap?.dispose(); material.dispose() }
        }
      })
      environment.dispose()
      naturalMap.dispose()
      duotoneMap.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }
}
