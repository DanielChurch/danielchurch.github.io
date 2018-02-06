if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'SeniorProjectKotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'SeniorProjectKotlin'.");
}
var SeniorProjectKotlin = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var listOf = Kotlin.kotlin.collections.listOf_mh5how$;
  var throwUPAE = Kotlin.throwUPAE;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Pair = Kotlin.kotlin.Pair;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var math = Kotlin.kotlin.math;
  var IllegalStateException = Kotlin.kotlin.IllegalStateException;
  var equals = Kotlin.equals;
  var toString = Kotlin.toString;
  var numberToDouble = Kotlin.numberToDouble;
  Camera.prototype = Object.create(Entity.prototype);
  Camera.prototype.constructor = Camera;
  RenderingObject.prototype = Object.create(Entity.prototype);
  RenderingObject.prototype.constructor = RenderingObject;
  Cube.prototype = Object.create(RenderingObject.prototype);
  Cube.prototype.constructor = Cube;
  Particle.prototype = Object.create(Entity.prototype);
  Particle.prototype.constructor = Particle;
  StandardShader.prototype = Object.create(Shader.prototype);
  StandardShader.prototype.constructor = StandardShader;
  function Main() {
    var engine = new Engine();
    engine.onKeyDown = Main_init$lambda;
  }
  function Main_init$lambda(event) {
    println(event);
    return Unit;
  }
  Main.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Main',
    interfaces: []
  };
  function main$lambda(it) {
    return new Main();
  }
  function main(args) {
    window.onload = main$lambda;
  }
  function Camera() {
    Entity.call(this);
    this.zNear = 0.001;
    this.zFar = 1000.0;
    this.fov = 60.0;
    this.aspectRatio = 16.0 / 9.0;
  }
  Camera.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Camera',
    interfaces: [Entity]
  };
  function Cube() {
    RenderingObject.call(this, [-1.0, -1.0, -1.0, 0.0, 0.0, -1.0, 1.0, -1.0, -1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0, -1.0, -1.0, 1.0, -1.0, 0.0, 0.0, -1.0, -1.0, -1.0, -1.0, 0.0, 0.0, -1.0, -1.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 1.0, -1.0, -1.0, 1.0, 0.0, 0.0, 1.0, -1.0, -1.0, -1.0, -1.0, 0.0, 0.0, -1.0, 1.0, -1.0, -1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0, -1.0, -1.0, 1.0, -1.0, 0.0, 0.0, -1.0, -1.0, -1.0, -1.0, 0.0, 0.0, 1.0, -1.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, -1.0, 1.0, 1.0, 0.0, 0.0, 1.0, -1.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, -1.0, 0.0, 1.0, 0.0, 1.0, 1.0, -1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, -1.0, 1.0, 1.0, 0.0, 1.0, 0.0, -1.0, 1.0, -1.0, 0.0, 1.0, 0.0, -1.0, -1.0, -1.0, 0.0, -1.0, 0.0, 1.0, -1.0, -1.0, 0.0, -1.0, 0.0, 1.0, -1.0, 1.0, 0.0, -1.0, 0.0, 1.0, -1.0, 1.0, 0.0, -1.0, 0.0, -1.0, -1.0, 1.0, 0.0, -1.0, 0.0, -1.0, -1.0, -1.0, 0.0, -1.0, 0.0], listOf(0));
  }
  Cube.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Cube',
    interfaces: [RenderingObject]
  };
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function Engine() {
    Engine$Companion_getInstance();
    this.scene = new Scene();
    this.onKeyPressed = Engine$onKeyPressed$lambda;
    this.onKeyReleased = Engine$onKeyReleased$lambda;
    this.onKeyDown = Engine$onKeyDown$lambda;
    this.onMouseMove = Engine$onMouseMove$lambda;
    this.onMousePress = Engine$onMousePress$lambda;
    this.onMouseRelease = Engine$onMouseRelease$lambda;
    this.onMouseDown = Engine$onMouseDown$lambda;
    this.shaderProgram = null;
    this.data = new Engine$ShaderData();
    this.start = (new Date()).getTime();
    this.canvas = null;
    this.objects = ArrayList_init();
    this.vertexShader = '\n        precision mediump float;\n\n        attribute vec3 a_position;\n        attribute vec3 a_normal;\n\n        uniform mat4 projectionMatrix;\n        uniform mat4 vMat;\n        uniform float time;\n\n        varying vec3 color;\n        varying vec4 pos;\n        varying vec4 normal;\n\n        void main(void) {\n            normal = vMat * vec4(a_normal, 1.0);\n\n            color = a_position;\n            pos = vMat * vec4(a_position.xyz, 1.0);\n            gl_Position = projectionMatrix * pos;\n        }\n    ';
    this.fragmentShader = '\n        precision highp float;\n\n        uniform vec3 lightPos;\n\n        varying vec3 color;\n\n        varying vec4 pos;\n        varying vec4 normal;\n\n        void main(void) {\n            float lightPower = 1.0;\n            float distance = length(pos.xyz - lightPos);\n            gl_FragColor = vec4(abs(color) * clamp(dot(normalize(normal.xyz), normalize(pos.xyz - lightPos)) * lightPower, 0.0, 1.0), 1.0);\n        }\n    ';
    var tmp$ = this.initGL_vux9f0$(1280, 720);
    var gl_canvas = tmp$.component1()
    , gl_context = tmp$.component2();
    Engine$Companion_getInstance().gl = gl_context;
    this.canvas = gl_canvas;
    gl_canvas.onkeydown = Engine_init$lambda;
    gl_context.clearColor(0.0, 0.0, 0.0, 1.0);
    var pos = {v: ArrayList_init()};
    var tmp$_0;
    tmp$_0 = until(0, 3).iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1;
      var e = Kotlin.isType(tmp$_1 = document.createElement('input'), HTMLInputElement) ? tmp$_1 : throwCCE();
      pos.v.add_11rb$(e);
      Dom$Companion_getInstance().body_3si9j8$([e]);
      e.value = '0';
      e.type = 'range';
      e.min = '-1000';
      e.max = '1000';
      e.className = 'slider';
      e.id = 'slider' + element;
    }
    var setter = Engine_init$lambda_0(this, gl_canvas, pos);
    var vainfo = [new VertextAttributeInfo('a_position', 3), new VertextAttributeInfo('a_normal', 3)];
    this.shaderProgram = new ShaderProgram(Engine$Companion_getInstance().gl, WebGLRenderingContext.TRIANGLES, this.vertexShader, this.fragmentShader, vainfo, setter);
    var near = 0.01;
    var far = 45.0;
    var r = 1.0;
    var l = -1.0;
    var t = 1.0;
    var b = -1.0;
    var projectionMatrix = [2 * near / (r - l), 0.0, 0.0, 0.0, 0.0, 2.0 * near / (t - b), 0.0, 0.0, (r + l) / (r - l), (t + b) / (t - b), (near + far) / (near - far), -1.0, 0.0, 0.0, 2 * near * far / (near - far), 0.0];
    var pMatrix = Mat4_init();
    pMatrix.perspective_1ugm5o$(math.PI / 3, 16.0 / 9, 0.1, 60.0);
    this.shaderProgram.setUniformMatrix4fv_pphpxd$('projectionMatrix', pMatrix.array);
    this.shaderProgram.setUniform3f_rqqv31$('lightPos', -5.0, 0.0, -5.0);
    Engine$Companion_getInstance().gl.viewport(0, 0, gl_canvas.width, gl_canvas.height);
    this.objects.add_11rb$(new Cube());
    this.render_14dthe$(0.0);
  }
  function Engine$Companion() {
    Engine$Companion_instance = this;
    this.gl_tmn89f$_0 = this.gl_tmn89f$_0;
  }
  Object.defineProperty(Engine$Companion.prototype, 'gl', {
    get: function () {
      if (this.gl_tmn89f$_0 == null)
        return throwUPAE('gl');
      return this.gl_tmn89f$_0;
    },
    set: function (gl) {
      this.gl_tmn89f$_0 = gl;
    }
  });
  Engine$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Engine$Companion_instance = null;
  function Engine$Companion_getInstance() {
    if (Engine$Companion_instance === null) {
      new Engine$Companion();
    }
    return Engine$Companion_instance;
  }
  function Engine$ShaderData() {
    this.time = 0.0;
  }
  Engine$ShaderData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ShaderData',
    interfaces: []
  };
  Engine.prototype.initGL_vux9f0$ = function (width, height) {
    var tmp$, tmp$_0;
    var gl_canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    ensureNotNull(document.body).append(gl_canvas);
    var gl_context = Kotlin.isType(tmp$_0 = gl_canvas.getContext('webgl'), WebGLRenderingContext) ? tmp$_0 : throwCCE();
    gl_canvas.width = width;
    gl_canvas.height = height;
    gl_context.viewport(0, 0, gl_canvas.width, gl_canvas.height);
    return new Pair(gl_canvas, gl_context);
  };
  Engine.prototype.run = function () {
    this.handleInput();
  };
  Engine.prototype.handleInput = function () {
  };
  Engine.prototype.update = function () {
  };
  function Engine$render$lambda(this$Engine) {
    return function (it) {
      this$Engine.render_14dthe$(0.0);
      return Unit;
    };
  }
  var Math_0 = Math;
  Engine.prototype.render_14dthe$ = function (delta) {
    Engine$Companion_getInstance().gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);
    Engine$Companion_getInstance().gl.clearDepth(1.0);
    Engine$Companion_getInstance().gl.enable(WebGLRenderingContext.DEPTH_TEST);
    this.shaderProgram.begin_v6ru81$(this.objects.get_za3lpa$(0).attribBuffer, this.data);
    var vMat = Mat4_init();
    var x = (this.start - (new Date()).getTime()) / 1000.0;
    var x_0 = Math_0.sin(x);
    vMat.translate_bmxtnp$(Vec3_init(0, 0, -2 + -5 * Math_0.abs(x_0)));
    var x_1 = (this.start - (new Date()).getTime()) / 1000.0;
    vMat.rotateY_3p81yu$(Math_0.sin(x_1));
    var x_2 = (this.start - (new Date()).getTime()) / 100.0;
    vMat.rotateX_3p81yu$(Math_0.sin(x_2));
    var x_3 = (this.start - (new Date()).getTime()) / 1000.0;
    var x_4 = Math_0.sin(x_3);
    var scaleAmt = 2.0 * Math_0.abs(x_4);
    vMat.scale_bmxtnp$(Vec3_init(scaleAmt, scaleAmt, scaleAmt));
    this.shaderProgram.setUniformMatrix4fv_pphpxd$('vMat', vMat.array);
    this.objects.get_za3lpa$(0).render_sveujr$(Engine$Companion_getInstance().gl, this.shaderProgram.drawType);
    this.shaderProgram.end();
    Engine$Companion_getInstance().gl.disable(WebGLRenderingContext.DEPTH_TEST);
    window.requestAnimationFrame(Engine$render$lambda(this));
  };
  function Engine$onKeyPressed$lambda(it) {
    return Unit;
  }
  function Engine$onKeyReleased$lambda(it) {
    return Unit;
  }
  function Engine$onKeyDown$lambda(it) {
    return Unit;
  }
  function Engine$onMouseMove$lambda(it) {
    return Unit;
  }
  function Engine$onMousePress$lambda(it) {
    return Unit;
  }
  function Engine$onMouseRelease$lambda(it) {
    return Unit;
  }
  function Engine$onMouseDown$lambda(it) {
    return Unit;
  }
  function Engine_init$lambda(event) {
    println(event);
    return Unit;
  }
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  function Engine_init$lambda_0(this$Engine, closure$gl_canvas, closure$pos) {
    return function (program, data) {
      program.setUniform1f_9sobi5$('time', (this$Engine.start - (new Date()).getTime()) / 1000.0);
      program.setUniform2f_9xt0da$('resolution', closure$gl_canvas.width, closure$gl_canvas.height);
      program.setUniform3f_rqqv31$('lightPos', toDouble(ensureNotNull(closure$pos.v.get_za3lpa$(0).value)) / 100, toDouble(ensureNotNull(closure$pos.v.get_za3lpa$(1).value)) / 100, toDouble(ensureNotNull(closure$pos.v.get_za3lpa$(2).value)) / 100);
      return Unit;
    };
  }
  Engine.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Engine',
    interfaces: []
  };
  function Entity() {
    this.position = Vector3$Companion_getInstance().zero;
    this.scale = Vector3$Companion_getInstance().zero;
    this.velocity = Vector3$Companion_getInstance().zero;
    this.acceleration = Vector3$Companion_getInstance().zero;
    this.rotation = Quaternion$Companion_getInstance().zero;
  }
  Entity.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Entity',
    interfaces: []
  };
  function Material() {
    this.tint = new Vector4();
    this.textureId = 0;
    this.normalMapId = 0;
  }
  Material.prototype.bind = function () {
  };
  Material.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Material',
    interfaces: []
  };
  function ModelLoader() {
  }
  ModelLoader.prototype.loadFBX_61zpoe$ = function (path) {
    return new Cube();
  };
  ModelLoader.prototype.loadOBJ_61zpoe$ = function (path) {
    return new Cube();
  };
  ModelLoader.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ModelLoader',
    interfaces: []
  };
  function Modes() {
    Modes$Companion_getInstance();
  }
  function Modes$Companion() {
    Modes$Companion_instance = this;
  }
  Object.defineProperty(Modes$Companion.prototype, 'isDebug', {
    get: function () {
      return true;
    }
  });
  Modes$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Modes$Companion_instance = null;
  function Modes$Companion_getInstance() {
    if (Modes$Companion_instance === null) {
      new Modes$Companion();
    }
    return Modes$Companion_instance;
  }
  Modes.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Modes',
    interfaces: []
  };
  function Particle() {
    Entity.call(this);
    this.lifetime = 0;
    this.currentLife = 0;
  }
  Particle.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Particle',
    interfaces: [Entity]
  };
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  function ParticleSystem() {
    this.particles = emptyList();
  }
  ParticleSystem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ParticleSystem',
    interfaces: []
  };
  function PostProcessingProfile() {
    this.shaders = emptyList();
  }
  PostProcessingProfile.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PostProcessingProfile',
    interfaces: []
  };
  function PostProcessingShader() {
  }
  PostProcessingShader.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PostProcessingShader',
    interfaces: []
  };
  function RenderingObject(vertices, indices) {
    Entity.call(this);
    this.vertices = vertices;
    this.indices = indices;
    this.vert = new Float32Array(this.vertices.length);
    var tmp$;
    tmp$ = Engine$Companion_getInstance().gl.createBuffer();
    if (tmp$ == null) {
      throw new IllegalStateException('Unable to create webgl buffer!');
    }
    this.attribBuffer = tmp$;
    this.vert.set(this.vertices, 0);
  }
  RenderingObject.prototype.render_sveujr$ = function (gl, drawType) {
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.attribBuffer);
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.vert, WebGLRenderingContext.STATIC_DRAW);
    gl.drawArrays(drawType, 0, this.vertices.length / 6 | 0);
  };
  RenderingObject.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RenderingObject',
    interfaces: [Entity]
  };
  function Scene() {
    this.models = emptyList();
  }
  Scene.prototype.update = function () {
  };
  Scene.prototype.render_14dthe$ = function (delta) {
  };
  Scene.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Scene',
    interfaces: []
  };
  var emptyMap = Kotlin.kotlin.collections.emptyMap_q3lmfv$;
  function Shader(vertSource, fragSource) {
    this.uniformLocations = emptyMap();
  }
  Shader.prototype.load = function () {
    return false;
  };
  Shader.prototype.bind = function () {
  };
  Shader.prototype.uniformf_9sobi5$ = function (location, value) {
  };
  Shader.prototype.uniform2f_f0f6nr$ = function (location, value) {
  };
  Shader.prototype.uniform3f_f0f6ns$ = function (location, value) {
  };
  Shader.prototype.uniformMat4_f0f6ns$ = function (location, value) {
  };
  Shader.prototype.uniformTex_f0f6ns$ = function (location, value) {
  };
  Shader.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Shader',
    interfaces: []
  };
  function VertextAttributeInfo(locationName, numElements) {
    this.locationName = locationName;
    this.numElements = numElements;
    this.location = 0;
    this.offset = 0;
  }
  VertextAttributeInfo.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VertextAttributeInfo',
    interfaces: []
  };
  function ShaderProgram(webgl, drawType, vertexShaderSource, fragmentShaderSource, vainfo, setter) {
    this.webgl = webgl;
    this.drawType = drawType;
    this.vainfo = vainfo;
    this.setter = setter;
    this.shaderProgram = null;
    this.vertex = null;
    this.fragment = null;
    this.verticesBlockSize = 0;
    this.drawLength = 0;
    var tmp$, tmp$_0;
    this.vertex = this.compileShader_0(vertexShaderSource, WebGLRenderingContext.VERTEX_SHADER);
    this.fragment = this.compileShader_0(fragmentShaderSource, WebGLRenderingContext.FRAGMENT_SHADER);
    tmp$ = this.webgl.createProgram();
    if (tmp$ == null) {
      throw new IllegalStateException('Unable to request shader program from webgl context!');
    }
    this.shaderProgram = tmp$;
    this.webgl.attachShader(this.shaderProgram, this.vertex);
    this.webgl.attachShader(this.shaderProgram, this.fragment);
    this.webgl.linkProgram(this.shaderProgram);
    if (equals(this.webgl.getProgramParameter(this.shaderProgram, WebGLRenderingContext.LINK_STATUS), false)) {
      println(this.webgl.getProgramInfoLog(this.shaderProgram));
      throw new IllegalStateException('Unable to compile shader program!');
    }
    this.webgl.useProgram(this.shaderProgram);
    this.verticesBlockSize = 0;
    tmp$_0 = Kotlin.arrayIterator(this.vainfo);
    while (tmp$_0.hasNext()) {
      var info = tmp$_0.next();
      info.location = this.webgl.getAttribLocation(this.shaderProgram, info.locationName);
      info.offset = this.verticesBlockSize;
      this.verticesBlockSize = this.verticesBlockSize + info.numElements | 0;
      println('attrib: ' + info.locationName + ', info.location: ' + info.location + ', info.offset: ' + info.offset);
    }
    if (this.drawType === WebGLRenderingContext.TRIANGLES)
      this.drawLength = this.verticesBlockSize * 3 | 0;
    else {
      this.drawLength = this.verticesBlockSize;
    }
    println('verticesBlockSize ' + this.verticesBlockSize);
    println('engine.ShaderProgram constructor done');
  }
  ShaderProgram.prototype.compileShader_0 = function (source, type) {
    var tmp$;
    var result;
    tmp$ = this.webgl.createShader(type);
    if (tmp$ == null) {
      throw new IllegalStateException('Unable to request shader from webgl context!');
    }
    result = tmp$;
    this.webgl.shaderSource(result, source);
    this.webgl.compileShader(result);
    if (equals(this.webgl.getShaderParameter(result, WebGLRenderingContext.COMPILE_STATUS), false)) {
      throw new IllegalStateException('Unable to compile shader!' + '\n' + source + '\n' + '\n' + toString(this.webgl.getShaderInfoLog(result)));
    }
    return result;
  };
  ShaderProgram.prototype.begin_v6ru81$ = function (attribBuffer, userdata) {
    var tmp$;
    this.webgl.useProgram(this.shaderProgram);
    this.webgl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, attribBuffer);
    tmp$ = Kotlin.arrayIterator(this.vainfo);
    while (tmp$.hasNext()) {
      var info = tmp$.next();
      this.webgl.enableVertexAttribArray(info.location);
      this.webgl.vertexAttribPointer(info.location, info.numElements, WebGLRenderingContext.FLOAT, false, this.verticesBlockSize * 4 | 0, info.offset * 4 | 0);
    }
    this.setter(this, userdata);
  };
  ShaderProgram.prototype.end = function () {
    var tmp$;
    tmp$ = Kotlin.arrayIterator(this.vainfo);
    while (tmp$.hasNext()) {
      var info = tmp$.next();
      this.webgl.disableVertexAttribArray(info.location);
    }
    this.webgl.useProgram(null);
  };
  ShaderProgram.prototype.getAttribLocation_61zpoe$ = function (location) {
    return this.webgl.getAttribLocation(this.shaderProgram, location);
  };
  ShaderProgram.prototype.getUniformLocation_61zpoe$ = function (location) {
    return this.webgl.getUniformLocation(this.shaderProgram, location);
  };
  ShaderProgram.prototype.setUniform1f_9sobi5$ = function (location, value) {
    this.webgl.uniform1f(this.getUniformLocation_61zpoe$(location), value);
  };
  ShaderProgram.prototype.setUniform2f_9xt0da$ = function (location, v1, v2) {
    this.webgl.uniform2f(this.getUniformLocation_61zpoe$(location), v1, v2);
  };
  ShaderProgram.prototype.setUniform3f_rqqv31$ = function (location, v1, v2, v3) {
    this.webgl.uniform3f(this.getUniformLocation_61zpoe$(location), v1, v2, v3);
  };
  ShaderProgram.prototype.setUniform4f_kjn4ou$ = function (location, v1, v2, v3, v4) {
    this.webgl.uniform4f(this.getUniformLocation_61zpoe$(location), v1, v2, v3, v4);
  };
  ShaderProgram.prototype.setUniform1i_bm4lxs$ = function (location, value) {
    this.webgl.uniform1i(this.getUniformLocation_61zpoe$(location), value);
  };
  ShaderProgram.prototype.setUniformMatrix4fv_pphpxd$ = function (location, value) {
    this.webgl.uniformMatrix4fv(this.getUniformLocation_61zpoe$(location), false, value);
  };
  ShaderProgram.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ShaderProgram',
    interfaces: []
  };
  function StandardShader() {
    Shader.call(this, '', '');
  }
  StandardShader.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StandardShader',
    interfaces: [Shader]
  };
  function Mat4(array) {
    this.array = array;
  }
  Mat4.prototype.clone = function () {
    return new Mat4(this.array);
  };
  Mat4.prototype.identity = function () {
    mat4.identity(this.array);
  };
  Mat4.prototype.transpose = function () {
    mat4.transpose(this.array, this.array);
  };
  Mat4.prototype.invert = function () {
    mat4.invert(this.array, this.array);
  };
  Mat4.prototype.adjoint = function () {
    mat4.adjoint(this.array, this.array);
  };
  Mat4.prototype.determinant = function () {
    return mat4.determinant(this.array);
  };
  Mat4.prototype.translate_bmxtnp$ = function (v) {
    mat4.translate(this.array, this.array, v.array);
  };
  Mat4.prototype.rotateX_3p81yu$ = function (rad) {
    mat4.rotateX(this.array, this.array, numberToDouble(rad));
  };
  Mat4.prototype.rotateY_3p81yu$ = function (rad) {
    mat4.rotateY(this.array, this.array, numberToDouble(rad));
  };
  Mat4.prototype.rotateZ_3p81yu$ = function (rad) {
    mat4.rotateZ(this.array, this.array, numberToDouble(rad));
  };
  Mat4.prototype.scale_bmxtnp$ = function (v) {
    mat4.scale(this.array, this.array, v.array);
  };
  Mat4.prototype.perspective_1ugm5o$ = function (fovy, aspect, near, far) {
    mat4.perspective(this.array, numberToDouble(fovy), numberToDouble(aspect), numberToDouble(near), numberToDouble(far));
  };
  Mat4.prototype.multiply_bms07u$ = function (other) {
    var ret = Mat4_init();
    mat4.multiply(ret.array, this.array, other.array);
    return ret;
  };
  Mat4.prototype.times_bms07u$ = function (other) {
    return this.multiply_bms07u$(other);
  };
  Mat4.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Mat4',
    interfaces: []
  };
  function Mat4_init($this) {
    $this = $this || Object.create(Mat4.prototype);
    Mat4.call($this, new Float32Array(mat4.create()));
    return $this;
  }
  function Mat4_init_0(a, $this) {
    $this = $this || Object.create(Mat4.prototype);
    Mat4.call($this, new Float32Array(a));
    return $this;
  }
  function Quaternion() {
    Quaternion$Companion_getInstance();
  }
  function Quaternion$Companion() {
    Quaternion$Companion_instance = this;
    this.zero = new Quaternion();
  }
  Quaternion$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Quaternion$Companion_instance = null;
  function Quaternion$Companion_getInstance() {
    if (Quaternion$Companion_instance === null) {
      new Quaternion$Companion();
    }
    return Quaternion$Companion_instance;
  }
  Quaternion.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Quaternion',
    interfaces: []
  };
  function Vec3(array) {
    this.array = array;
  }
  Vec3.prototype.cross_bmxtnp$ = function (other) {
    var ret = Vec3_init_0();
    vec3.cross(ret.array, this.array, other.array);
    return ret;
  };
  Vec3.prototype.normalize = function () {
    vec3.normalize(this.array, this.array);
  };
  Vec3.prototype.plus_bmxtnp$ = function (other) {
    return this.add_bmxtnp$(other);
  };
  Vec3.prototype.add_bmxtnp$ = function (other) {
    var ret = Vec3_init_0();
    vec3.add(ret.array, this.array, other.array);
    return ret;
  };
  Vec3.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vec3',
    interfaces: []
  };
  function Vec3_init(x, y, z, $this) {
    $this = $this || Object.create(Vec3.prototype);
    Vec3.call($this, vec3.fromValues(numberToDouble(x), numberToDouble(y), numberToDouble(z)));
    return $this;
  }
  function Vec3_init_0($this) {
    $this = $this || Object.create(Vec3.prototype);
    Vec3.call($this, vec3.create());
    return $this;
  }
  function Vector2() {
    this.x = 0;
    this.y = 0;
  }
  Vector2.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector2',
    interfaces: []
  };
  function Vector3(x, y, z) {
    Vector3$Companion_getInstance();
    this.x = x;
    this.y = y;
    this.z = z;
  }
  function Vector3$Companion() {
    Vector3$Companion_instance = this;
    this.zero = new Vector3(0.0, 0.0, 0.0);
  }
  Vector3$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector3$Companion_instance = null;
  function Vector3$Companion_getInstance() {
    if (Vector3$Companion_instance === null) {
      new Vector3$Companion();
    }
    return Vector3$Companion_instance;
  }
  Vector3.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector3',
    interfaces: []
  };
  function Vector4() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
  }
  Vector4.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector4',
    interfaces: []
  };
  function Dom() {
    Dom$Companion_getInstance();
  }
  function Dom$Companion() {
    Dom$Companion_instance = this;
  }
  Dom$Companion.prototype.body_3si9j8$ = function (children) {
    var tmp$;
    return this.appendChildren_cdjk0p$(Kotlin.isType(tmp$ = document.body, Element) ? tmp$ : throwCCE(), children);
  };
  Dom$Companion.prototype.div_3si9j8$ = function (children) {
    return this.appendChildren_cdjk0p$(document.createElement('div'), children);
  };
  Dom$Companion.prototype.canvas_3si9j8$ = function (children) {
    return this.appendChildren_cdjk0p$(document.createElement('canvas'), children);
  };
  Dom$Companion.prototype.a_3si9j8$ = function (children) {
    return this.appendChildren_cdjk0p$(document.createElement('a'), children);
  };
  Dom$Companion.prototype.p_3si9j8$ = function (children) {
    return this.appendChildren_cdjk0p$(document.createElement('p'), children);
  };
  Dom$Companion.prototype.appendChildren_cdjk0p$ = function (e, children) {
    var tmp$;
    for (tmp$ = 0; tmp$ !== children.length; ++tmp$) {
      var element = children[tmp$];
      e.append(element);
    }
    return e;
  };
  Dom$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Dom$Companion_instance = null;
  function Dom$Companion_getInstance() {
    if (Dom$Companion_instance === null) {
      new Dom$Companion();
    }
    return Dom$Companion_instance;
  }
  Dom.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Dom',
    interfaces: []
  };
  _.Main = Main;
  _.main_kand9s$ = main;
  var package$engine = _.engine || (_.engine = {});
  package$engine.Camera = Camera;
  package$engine.Cube = Cube;
  Object.defineProperty(Engine, 'Companion', {
    get: Engine$Companion_getInstance
  });
  Engine.ShaderData = Engine$ShaderData;
  package$engine.Engine = Engine;
  package$engine.Entity = Entity;
  package$engine.Material = Material;
  package$engine.ModelLoader = ModelLoader;
  Object.defineProperty(Modes, 'Companion', {
    get: Modes$Companion_getInstance
  });
  package$engine.Modes = Modes;
  package$engine.Particle = Particle;
  package$engine.ParticleSystem = ParticleSystem;
  package$engine.PostProcessingProfile = PostProcessingProfile;
  package$engine.PostProcessingShader = PostProcessingShader;
  package$engine.RenderingObject = RenderingObject;
  package$engine.Scene = Scene;
  package$engine.Shader = Shader;
  package$engine.VertextAttributeInfo = VertextAttributeInfo;
  package$engine.ShaderProgram = ShaderProgram;
  package$engine.StandardShader = StandardShader;
  var package$math = _.math || (_.math = {});
  package$math.Mat4_init = Mat4_init;
  package$math.Mat4_init_o5v4nz$ = Mat4_init_0;
  package$math.Mat4 = Mat4;
  Object.defineProperty(Quaternion, 'Companion', {
    get: Quaternion$Companion_getInstance
  });
  package$math.Quaternion = Quaternion;
  package$math.Vec3_init_a2j3zq$ = Vec3_init;
  package$math.Vec3_init = Vec3_init_0;
  package$math.Vec3 = Vec3;
  package$math.Vector2 = Vector2;
  Object.defineProperty(Vector3, 'Companion', {
    get: Vector3$Companion_getInstance
  });
  package$math.Vector3 = Vector3;
  package$math.Vector4 = Vector4;
  Object.defineProperty(Dom, 'Companion', {
    get: Dom$Companion_getInstance
  });
  var package$web = _.web || (_.web = {});
  package$web.Dom = Dom;
  main([]);
  Kotlin.defineModule('SeniorProjectKotlin', _);
  return _;
}(typeof SeniorProjectKotlin === 'undefined' ? {} : SeniorProjectKotlin, kotlin);
