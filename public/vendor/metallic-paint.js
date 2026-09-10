(function () {
  'use strict'

  var vertexShader = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 vP;
void main(){vP=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`

  var fragmentShader = `#version 300 es
precision highp float;
in vec2 vP;
out vec4 oC;
uniform sampler2D u_tex;
uniform float u_time,u_ratio,u_imgRatio,u_seed,u_scale,u_refract,u_blur,u_liquid;
uniform float u_bright,u_contrast,u_angle,u_fresnel,u_sharp,u_wave,u_noise,u_chroma;
uniform float u_distort,u_contour;
uniform vec3 u_lightColor,u_darkColor,u_tint;
vec3 sC,sM;
vec3 pW(vec3 v){vec3 i=floor(v),f=fract(v),s=sign(fract(v*.5)-.5),h=fract(sM*i+i.yzx),c=f*(f-1.);return s*c*((h*16.-4.)*c-1.);}
vec3 aF(vec3 b,vec3 c){return pW(b+c.zxy-pW(b.zxy+c.yzx)+pW(b.yzx+c.xyz));}
vec3 lM(vec3 s,vec3 p){return(p+aF(s,p))*.5;}
vec2 fA(){vec2 c=vP-.5;c.x*=u_ratio>u_imgRatio?u_ratio/u_imgRatio:1.;c.y*=u_ratio>u_imgRatio?1.:u_imgRatio/u_ratio;return vec2(c.x+.5,.5-c.y);}
vec2 rot(vec2 p,float r){float c=cos(r),s=sin(r);return vec2(p.x*c+p.y*s,p.y*c-p.x*s);}
float bM(vec2 c,float t){vec2 l=smoothstep(vec2(0.),vec2(t),c),u=smoothstep(vec2(0.),vec2(t),1.-c);return l.x*l.y*u.x*u.y;}
float mG(float hi,float lo,float t,float sh,float cv){sh*=(2.-u_sharp);float ci=smoothstep(.15,.85,cv),r=lo;float e1=.08/u_scale;r=mix(r,hi,smoothstep(0.,sh*1.5,t));r=mix(r,lo,smoothstep(e1-sh,e1+sh,t));float e2=e1+.05/u_scale*(1.-ci*.35);r=mix(r,hi,smoothstep(e2-sh,e2+sh,t));float e3=e2+.025/u_scale*(1.-ci*.45);r=mix(r,lo,smoothstep(e3-sh,e3+sh,t));float e4=e1+.1/u_scale;r=mix(r,hi,smoothstep(e4-sh,e4+sh,t));float rm=1.-e4,gT=clamp((t-e4)/rm,0.,1.);r=mix(r,mix(hi,lo,smoothstep(0.,1.,gT)),smoothstep(e4-sh*.5,e4+sh*.5,t));return r;}
void main(){
  sC=fract(vec3(.7548,.5698,.4154)*(u_seed+17.31))+.5;
  sM=fract(sC.zxy-sC.yzx*1.618);
  vec2 sc=vec2(vP.x*u_ratio,1.-vP.y);
  float angleRad=u_angle*3.14159/180.;
  sc=rot(sc-.5,angleRad)+.5;
  sc=clamp(sc,0.,1.);
  float sl=sc.x-sc.y,an=u_time*.001;
  vec2 iC=fA();
  vec4 texSample=texture(u_tex,iC);
  float dp=texSample.r;
  float shapeMask=texSample.a;
  vec3 hi=u_lightColor*u_bright;
  vec3 lo=u_darkColor*(2.-u_bright);
  lo.b+=smoothstep(.6,1.4,sc.x+sc.y)*.08;
  vec2 fC=sc-.5;
  float rd=length(fC+vec2(0.,sl*.15));
  vec2 ag=rot(fC,(.22-sl*.18)*3.14159);
  float cv=1.-pow(rd*1.65,1.15);
  cv*=pow(sc.y,.35);
  float vs=shapeMask;
  vs*=bM(iC,.01);
  float fr=pow(1.-cv,u_fresnel)*.3;
  vs=min(vs+fr*vs,1.);
  float mT=an*.0625;
  vec3 wO=vec3(-1.05,1.35,1.55);
  vec3 wA=aF(vec3(31.,73.,56.),mT+wO)*.22*u_wave;
  vec3 wB=aF(vec3(24.,64.,42.),mT-wO.yzx)*.22*u_wave;
  vec2 nC=sc*45.*u_noise;
  nC+=aF(sC.zxy,an*.17*sC.yzx-sc.yxy*.35).xy*18.*u_wave;
  vec3 tC=vec3(.00041,.00053,.00076)*mT+wB*nC.x+wA*nC.y;
  tC=lM(sC,tC);
  tC=lM(sC+1.618,tC);
  float tb=sin(tC.x*3.14159)*.5+.5;
  tb=tb*2.-1.;
  float noiseVal=pW(vec3(sc*8.+an,an*.5)).x;
  float edgeFactor=smoothstep(0.,.5,dp)*smoothstep(1.,.5,dp);
  float lD=dp+(1.-dp)*u_liquid*tb;
  lD+=noiseVal*u_distort*.15*edgeFactor;
  float rB=clamp(1.-cv,0.,1.);
  float fl=ag.x+sl;
  fl+=noiseVal*sl*u_distort*edgeFactor;
  fl*=mix(1.,1.-dp*.5,u_contour);
  fl-=dp*u_contour*.8;
  float eI=smoothstep(0.,1.,lD)*smoothstep(1.,0.,lD);
  fl-=tb*sl*1.8*eI;
  float cA=cv*clamp(pow(sc.y,.12),.25,1.);
  fl*=.12+(1.05-lD)*cA;
  fl*=smoothstep(1.,.65,lD);
  float vA1=smoothstep(.08,.18,sc.y)*smoothstep(.38,.18,sc.y);
  float vA2=smoothstep(.08,.18,1.-sc.y)*smoothstep(.38,.18,1.-sc.y);
  fl+=vA1*.16+vA2*.025;
  fl*=.45+pow(sc.y,2.)*.55;
  fl*=u_scale;
  fl-=an;
  float rO=rB+cv*tb*.025;
  float vM1=smoothstep(-.12,.18,sc.y)*smoothstep(.48,.08,sc.y);
  float cM1=smoothstep(.35,.55,cv)*smoothstep(.95,.35,cv);
  rO+=vM1*cM1*4.5;
  rO-=sl;
  float bO=rB*1.25;
  float vM2=smoothstep(-.02,.35,sc.y)*smoothstep(.75,.08,sc.y);
  float cM2=smoothstep(.35,.55,cv)*smoothstep(.75,.35,cv);
  bO+=vM2*cM2*.9;
  bO-=lD*.18;
  rO*=u_refract*u_chroma;
  bO*=u_refract*u_chroma;
  float sf=u_blur;
  float rP=fract(fl+rO);
  float rC=mG(hi.r,lo.r,rP,sf+.018+u_refract*cv*.025,cv);
  float gP=fract(fl);
  float gC=mG(hi.g,lo.g,gP,sf+.008/max(.01,1.-sl),cv);
  float bP=fract(fl-bO);
  float bC=mG(hi.b,lo.b,bP,sf+.008,cv);
  vec3 col=vec3(rC,gC,bC);
  col=(col-.5)*u_contrast+.5;
  col=clamp(col,0.,1.);
  col=mix(col,1.-min(vec3(1.),(1.-col)/max(u_tint,vec3(.001))),length(u_tint-1.)*.5);
  col=clamp(col,0.,1.);
  oC=vec4(col*vs,vs);
}`

  function numberValue(element, name, fallback) {
    var value = Number(element.dataset[name])
    return Number.isFinite(value) ? value : fallback
  }

  function rgb(hex) {
    var match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '')
    return match ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255] : [1, 1, 1]
  }

  function compile(gl, source, type) {
    var shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  function initElement(element) {
    if (element.dataset.metallicInitialized === 'true') return
    element.dataset.metallicInitialized = 'true'
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.dataset.metallicStatus = 'fallback'
      return
    }

    var canvas = element.querySelector('canvas')
    var gl = canvas && canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true })
    if (!canvas || !gl) {
      element.dataset.metallicStatus = 'fallback'
      return
    }

    var vs = compile(gl, vertexShader, gl.VERTEX_SHADER)
    var fs = compile(gl, fragmentShader, gl.FRAGMENT_SHADER)
    var program = vs && fs && gl.createProgram()
    if (!vs || !fs || !program) {
      element.dataset.metallicStatus = 'fallback'
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      element.dataset.metallicStatus = 'fallback'
      return
    }
    gl.useProgram(program)

    var vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    var position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    var uniforms = {}
    var count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
    for (var index = 0; index < count; index += 1) {
      var info = gl.getActiveUniform(program, index)
      if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name)
    }

    var maxResolution = numberValue(element, 'maxResolution', 512)
    var bounds = element.getBoundingClientRect()
    var resolution = Math.max(128, Math.min(maxResolution, Math.round(Math.max(bounds.width, bounds.height) * Math.min(devicePixelRatio || 1, 1.5))))
    canvas.width = resolution
    canvas.height = resolution
    gl.viewport(0, 0, resolution, resolution)

    gl.uniform1f(uniforms.u_seed, numberValue(element, 'seed', 42))
    gl.uniform1f(uniforms.u_scale, numberValue(element, 'scale', 4))
    gl.uniform1f(uniforms.u_refract, numberValue(element, 'refraction', 0.01))
    gl.uniform1f(uniforms.u_blur, numberValue(element, 'blur', 0.015))
    gl.uniform1f(uniforms.u_liquid, numberValue(element, 'liquid', 0.75))
    gl.uniform1f(uniforms.u_bright, numberValue(element, 'brightness', 2))
    gl.uniform1f(uniforms.u_contrast, numberValue(element, 'contrast', 0.5))
    gl.uniform1f(uniforms.u_angle, numberValue(element, 'angle', 0))
    gl.uniform1f(uniforms.u_fresnel, numberValue(element, 'fresnel', 1))
    gl.uniform1f(uniforms.u_sharp, numberValue(element, 'sharpness', 1))
    gl.uniform1f(uniforms.u_wave, numberValue(element, 'wave', 1))
    gl.uniform1f(uniforms.u_noise, numberValue(element, 'noise', 0.5))
    gl.uniform1f(uniforms.u_chroma, numberValue(element, 'chroma', 2))
    gl.uniform1f(uniforms.u_distort, numberValue(element, 'distortion', 1))
    gl.uniform1f(uniforms.u_contour, numberValue(element, 'contour', 0.2))
    var light = rgb(element.dataset.lightColor || '#ffffff')
    var dark = rgb(element.dataset.darkColor || '#000000')
    var tint = rgb(element.dataset.tintColor || '#feb3ff')
    gl.uniform3f(uniforms.u_lightColor, light[0], light[1], light[2])
    gl.uniform3f(uniforms.u_darkColor, dark[0], dark[1], dark[2])
    gl.uniform3f(uniforms.u_tint, tint[0], tint[1], tint[2])
    gl.uniform1f(uniforms.u_ratio, 1)

    var image = new Image()
    image.decoding = 'async'
    image.onload = function () {
      var texture = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.uniform1i(uniforms.u_tex, 0)
      gl.uniform1f(uniforms.u_imgRatio, image.naturalWidth / image.naturalHeight)

      var active = false
      var visible = !document.hidden
      var frameId = 0
      var lastFrame = 0
      var animationTime = 0
      var frameCount = 0
      var previousTime = performance.now()
      var speed = numberValue(element, 'speed', 0.3)
      var mouseAnimation = element.dataset.mouseAnimation === 'true'
      var mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }

      if (mouseAnimation) element.addEventListener('pointermove', function (event) {
        var rect = element.getBoundingClientRect()
        mouse.targetX = (event.clientX - rect.left) / rect.width
        mouse.targetY = (event.clientY - rect.top) / rect.height
      }, { passive: true })

      function draw(time) {
        frameId = 0
        if (!active || !visible) return
        var delta = Math.min(50, time - previousTime)
        previousTime = time
        if (time - lastFrame >= 1000 / 30) {
          lastFrame = time
          if (mouseAnimation) {
            mouse.x += (mouse.targetX - mouse.x) * 0.08
            mouse.y += (mouse.targetY - mouse.y) * 0.08
            animationTime = mouse.x * 3000 + mouse.y * 1500
          } else animationTime += delta * speed
          gl.uniform1f(uniforms.u_time, animationTime)
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
          frameCount += 1
          element.dataset.metallicFrame = String(frameCount)
          element.dataset.metallicStatus = 'ready'
        }
        frameId = requestAnimationFrame(draw)
      }

      function setActive(next) {
        active = next
        element.dataset.metallicActive = next ? 'true' : 'false'
        previousTime = performance.now()
        if (active && visible && !frameId) frameId = requestAnimationFrame(draw)
        if (!active && frameId) {
          cancelAnimationFrame(frameId)
          frameId = 0
        }
      }

      gl.uniform1f(uniforms.u_time, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      element.dataset.metallicStatus = 'ready'

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          setActive(entries.some(function (entry) { return entry.isIntersecting }))
        }, { rootMargin: '15% 0px', threshold: 0.01 }).observe(element)
      } else setActive(true)

      document.addEventListener('visibilitychange', function () {
        visible = !document.hidden
        if (visible && active && !frameId) frameId = requestAnimationFrame(draw)
      })
    }
    image.onerror = function () { element.dataset.metallicStatus = 'fallback' }
    image.src = element.dataset.imageSrc
  }

  function init(root) {
    Array.from((root || document).querySelectorAll('[data-metallic-paint]')).forEach(initElement)
  }

  window.MetallicPaintRuntime = { init: init }
})()
