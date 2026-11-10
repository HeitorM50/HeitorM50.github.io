# Pose de pinça + orientação + junção por material + export GLB.
# Uso: blender -b --factory-startup --python pose.py -- <scene.gltf> <saida_dir> <json_angulos>
# Pose publicada (public/media/robotic-hand.glb). Ângulo positivo em curl fecha o dedo para a palma.
# {"curl":{"index":[-4,4,3],"middle":[6,6,4],"ring":[75,95,65],"pinky":[70,95,65]},"spread":{"index":-3,"middle":3},
#  "thumb":[["Sphere.008",[0,0,1],-60],["Sphere.008",[1,0,0],-22]],"export":true}
import bpy, sys, json, math, mathutils
args = sys.argv[sys.argv.index('--') + 1:]
src, out, cfg = args[0], args[1], json.loads(args[2])
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)
O = bpy.data.objects
chains = {
  'index':  ['Cylinder.008', 'Cube.026', 'Cylinder.006', 'Cube.027', 'Cylinder.007', 'Cube.028'],
  'middle': ['Cylinder.009', 'Cube.031', 'Cylinder.011', 'Cube.030', 'Cylinder.010', 'Cube.029'],
  'ring':   ['Cylinder.012', 'Cube.034', 'Cylinder.014', 'Cube.033', 'Cylinder.013', 'Cube.032'],
  'pinky':  ['Cylinder.017', 'Cube.035', 'Cylinder.015', 'Cube.036', 'Cylinder.016', 'Cube.037'],
}
def objs(names): return [O[n] for n in names]
def rotate(group, pivot, axis, degrees):
    m = mathutils.Matrix.Translation(pivot) @ mathutils.Matrix.Rotation(math.radians(degrees), 4, axis) @ mathutils.Matrix.Translation(-pivot)
    for o in group: o.matrix_world = m @ o.matrix_world
    bpy.context.view_layer.update()
def center(o): return o.matrix_world.translation.copy()
# dobra: juntas são os cilindros (índices 0, 2, 4); gira tudo dali para a ponta
for finger, joints in cfg['curl'].items():
    chain = objs(chains[finger])
    pivots = [center(chain[i]) for i in (0, 2, 4)]
    for k, angle in enumerate(joints):
        pivot = center(chain[(0, 2, 4)[k]])
        rotate(chain[(0, 2, 4)[k]:], pivot, 'Y', angle)
for finger, angle in cfg.get('spread', {}).items():
    chain = objs(chains[finger]); rotate(chain, center(chain[0]), 'Z', angle)
# polegar: cada passo gira do pivô indicado até a ponta, em torno de um eixo livre
thumb = ['Sphere.008', 'Cube.017', 'Cylinder.004', 'Cube.018', 'Cylinder.005', 'Cube.019']
for start, axis, angle in cfg.get('thumb', []):
    chain = objs(thumb[thumb.index(start):])
    rotate(chain, center(chain[0]), mathutils.Vector(axis).normalized(), angle)
if cfg.get('debug'):
    for n in ['Cube.014_0', 'Cube.032_0', 'Cube.033_0', 'Cube.017_0', 'Cube.018_0', 'Cube.019_0']:
        print('DBG', n, [round(v, 2) for v in sum((O[n].matrix_world @ mathutils.Vector(b) for b in O[n].bound_box), mathutils.Vector()) / 8])
# ponto da pinça: meio entre as pontas do indicador e do médio
def tip(finger):
    node = O[chains[finger][-1]]
    pts = [m.matrix_world @ mathutils.Vector(b) for m in [node] + list(node.children_recursive) if m.type == 'MESH' for b in m.bound_box]
    return min(pts, key=lambda p: p.x)  # ponta = menor x (dedos apontam para -X)
pinch = (tip('index') + tip('middle')) / 2 + mathutils.Vector(cfg.get('pinchOffset', (0, 0, 0)))
pivot = bpy.data.objects.new('CardPivot', None); bpy.context.scene.collection.objects.link(pivot); pivot.location = pinch
# orientação final: dedos para +Z, palma para -Y (a câmera do three, em +Z do glTF = -Y do Blender, vê a palma)
bpy.context.view_layer.update()
rig = bpy.data.objects.new('HandRig', None); bpy.context.scene.collection.objects.link(rig)
for o in list(O):
    if o.type == 'MESH' or o.name == 'CardPivot':
        mw = o.matrix_world.copy(); o.parent = rig; o.matrix_world = mw
rig.rotation_euler = (math.radians(cfg.get('rx', 0)), math.radians(90), math.radians(-90))
bpy.context.view_layer.update()
for o in [o for o in O if o.parent == rig]:
    mw = o.matrix_world.copy(); o.parent = None; o.matrix_world = mw
bpy.context.view_layer.update()
# junta as malhas por material
meshes = [o for o in O if o.type == 'MESH']
bpy.ops.object.select_all(action='DESELECT')
for o in meshes: o.select_set(True)
bpy.context.view_layer.objects.active = meshes[0]
bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
bpy.ops.object.join()
hand = bpy.context.view_layer.objects.active; hand.name = 'RoboticHand'
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.separate(type='MATERIAL'); bpy.ops.object.mode_set(mode='OBJECT')
for o in [o for o in O if o.type == 'MESH']: o.name = 'Hand_' + o.active_material.name.replace('.', '')
cp = O['CardPivot']; mw = cp.matrix_world.copy(); cp.parent = None; cp.matrix_world = mw
for junk in [o for o in O if o.type == 'EMPTY' and o.name not in ('CardPivot',)]: bpy.data.objects.remove(junk)
bpy.context.view_layer.update()
print('CARDPIVOT', [round(v, 4) for v in O['CardPivot'].matrix_world.translation])
pts = [o.matrix_world @ mathutils.Vector(b) for o in O if o.type == 'MESH' for b in o.bound_box]
lo = [min(p[i] for p in pts) for i in range(3)]; hi = [max(p[i] for p in pts) for i in range(3)]
print('BOUNDS', [round(v, 3) for v in lo], [round(v, 3) for v in hi], 'TRIS', sum(len(o.data.polygons) for o in O if o.type == 'MESH'))
# prévia com um card provisório (não exportado)
if cfg.get('preview'):
    scene = bpy.context.scene
    bpy.ops.mesh.primitive_plane_add(size=1); card = bpy.context.object; card.name = 'PreviewCard'
    card.scale = (0.75 * 2.6, 1.05 * 2.6, 1); card.rotation_euler = (math.radians(90), 0, 0)
    card.location = O['CardPivot'].location + mathutils.Vector((0, 0, 1.05 * 2.6 / 2 - 0.25))
    scene.render.engine = 'BLENDER_WORKBENCH'; scene.display.shading.color_type = 'MATERIAL'
    scene.render.resolution_x, scene.render.resolution_y = 700, 900
    c = mathutils.Vector([(lo[i] + hi[i]) / 2 for i in range(3)]); c.z += 1.0
    for name, direction in [('front', (0, -1, 0)), ('threeq', (0.6, -1, 0.15)), ('side', (1, 0, 0))]:
        cam_data = bpy.data.cameras.new(name); cam_data.type = 'ORTHO'; cam_data.ortho_scale = 9.5
        cam = bpy.data.objects.new(name, cam_data); scene.collection.objects.link(cam)
        cam.location = c + mathutils.Vector(direction).normalized() * 20
        cam.rotation_euler = (c - cam.location).to_track_quat('-Z', 'Y').to_euler()
        scene.camera = cam; scene.render.filepath = f'{out}/pose-{name}.png'; bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(card)
if cfg.get('export'):
    # UV automática: o modelo não tem textura; a cerâmica do site usa uma textura em canvas
    for o in [o for o in O if o.type == 'MESH']:
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
        if not o.data.uv_layers:
            bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
            bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.02)
            bpy.ops.object.mode_set(mode='OBJECT')
    bpy.ops.export_scene.gltf(filepath=f'{out}/robotic-hand.glb', export_format='GLB', export_apply=True, export_extras=False, export_cameras=False, export_lights=False)
