if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'SeniorProjectKotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'SeniorProjectKotlin'.");
}
var SeniorProjectKotlin = function (_, Kotlin) {
  'use strict';
  var experimental = Kotlin.kotlin.coroutines.experimental;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Continuation = Kotlin.kotlin.coroutines.experimental.Continuation;
  var startCoroutine = Kotlin.kotlin.coroutines.experimental.startCoroutine_xtwlez$;
  var CoroutineImpl = Kotlin.kotlin.coroutines.experimental.CoroutineImpl;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.experimental.intrinsics.COROUTINE_SUSPENDED;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var equals = Kotlin.equals;
  var clear = Kotlin.kotlin.dom.clear_asww5s$;
  var math = Kotlin.kotlin.math;
  var Triple = Kotlin.kotlin.Triple;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var throwCCE = Kotlin.throwCCE;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwUPAE = Kotlin.throwUPAE;
  var Pair = Kotlin.kotlin.Pair;
  var ensureNotNull = Kotlin.ensureNotNull;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var joinToString = Kotlin.kotlin.collections.joinToString_fmv235$;
  var print = Kotlin.kotlin.io.print_s8jyv4$;
  var IllegalStateException = Kotlin.kotlin.IllegalStateException;
  var toString = Kotlin.toString;
  var numberToDouble = Kotlin.numberToDouble;
  Camera.prototype = Object.create(Entity.prototype);
  Camera.prototype.constructor = Camera;
  RenderingObject.prototype = Object.create(Entity.prototype);
  RenderingObject.prototype.constructor = RenderingObject;
  Cube.prototype = Object.create(RenderingObject.prototype);
  Cube.prototype.constructor = Cube;
  FirstPersonCamera.prototype = Object.create(Camera.prototype);
  FirstPersonCamera.prototype.constructor = FirstPersonCamera;
  ObjObject.prototype = Object.create(RenderingObject.prototype);
  ObjObject.prototype.constructor = ObjObject;
  Particle.prototype = Object.create(Entity.prototype);
  Particle.prototype.constructor = Particle;
  Sphere.prototype = Object.create(RenderingObject.prototype);
  Sphere.prototype.constructor = Sphere;
  StandardShader.prototype = Object.create(ShaderProgram.prototype);
  StandardShader.prototype.constructor = StandardShader;
  function launch$ObjectLiteral() {
  }
  Object.defineProperty(launch$ObjectLiteral.prototype, 'context', {
    get: function () {
      return experimental.EmptyCoroutineContext;
    }
  });
  launch$ObjectLiteral.prototype.resume_11rb$ = function (value) {
  };
  launch$ObjectLiteral.prototype.resumeWithException_tcv7n7$ = function (e) {
    console.log('Coroutine failed: ' + e);
  };
  launch$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [Continuation]
  };
  function launch(block) {
    startCoroutine(block, new launch$ObjectLiteral());
  }
  function await$lambda$lambda(closure$cont) {
    return function (it) {
      closure$cont.resume_11rb$(it);
      return Unit;
    };
  }
  function await$lambda$lambda_0(closure$cont) {
    return function (it) {
      closure$cont.resumeWithException_tcv7n7$(it);
      return Unit;
    };
  }
  function await$lambda(this$await) {
    return function (cont) {
      this$await.then(await$lambda$lambda(cont), await$lambda$lambda_0(cont));
      return Unit;
    };
  }
  var SafeContinuation_init = Kotlin.kotlin.coroutines.experimental.SafeContinuation_init_n4f53e$;
  function suspendCoroutine$lambda(closure$block) {
    return function (c) {
      var safe = SafeContinuation_init(c);
      closure$block(safe);
      return safe.getResult();
    };
  }
  function await_0($receiver, continuation) {
    return suspendCoroutine$lambda(await$lambda($receiver))(continuation.facade);
  }
  function delay$lambda$lambda(closure$it) {
    return function () {
      closure$it.resume_11rb$(Unit);
      return Unit;
    };
  }
  function delay$lambda(closure$ms) {
    return function (it) {
      setTimeout(delay$lambda$lambda(it), closure$ms);
      return Unit;
    };
  }
  function suspendCoroutine$lambda_0(closure$block) {
    return function (c) {
      var safe = SafeContinuation_init(c);
      closure$block(safe);
      return safe.getResult();
    };
  }
  function delay(ms, continuation) {
    return suspendCoroutine$lambda_0(delay$lambda(ms))(continuation.facade);
  }
  function Main() {
    this.currentDemo_0 = '';
    this.demos_0 = listOf([new Triple('Texture', Main$demos$lambda(this), '#4CAF50'), new Triple('Shading', Main$demos$lambda_0(this), '#2196F3'), new Triple('Model', Main$demos$lambda_1(this), '#f44336'), new Triple('FPS Camera', Main$demos$lambda_2(this), 'orange'), new Triple('Animation', Main$demos$lambda_3(this), '#430297'), new Triple('Code', Main$demos$lambda_4(this), '#444')]);
    Dom$Companion_getInstance().body_jiburq$([]).style.background = '#000';
    launch(Main_init$lambda(this));
  }
  var trim = Kotlin.kotlin.text.trim_gw00vp$;
  Main.prototype.getCodeFromName_0 = function (fileName, name) {
    var file = Ajax$Companion_getInstance().read_ivxn3r$(fileName, false);
    var out = {v: ''};
    var addLine = {v: false};
    var count = {v: 0};
    var curlyCount = {v: 0};
    var tmp$;
    tmp$ = split(file, ['\n']).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (contains(element, name) && count.v !== 0) {
        addLine.v = true;
        out.v += element + '\n';
        curlyCount.v = curlyCount.v + ((-replace(element, '{', '').length | 0) + replace(element, '}', '').length) | 0;
      }
       else if (curlyCount.v === 0 & addLine.v) {
        addLine.v = false;
      }
       else if (addLine.v) {
        out.v += element + '\n';
        curlyCount.v = curlyCount.v + ((-replace(element, '{', '').length | 0) + replace(element, '}', '').length) | 0;
      }
       else if (contains(element, name)) {
        count.v = count.v + 1 | 0;
      }
    }
    var $receiver = out.v;
    var tmp$_0;
    return '    ' + trim(Kotlin.isCharSequence(tmp$_0 = $receiver) ? tmp$_0 : throwCCE()).toString();
  };
  function Main$getCode$lambda(closure$div) {
    return function (it) {
      var tmp$;
      closure$div.style.display = 'none';
      (tmp$ = document.getElementById('overlay')) != null ? (tmp$.remove(), Unit) : null;
      return true;
    };
  }
  Main.prototype.getCode_0 = function (fileName, functionName, languageName) {
    var content = Dom$Companion_getInstance().h1_jiburq$(["Select a demo first to view it's code"]);
    content.style.textAlign = 'center';
    content.style.fontSize = '80px';
    content.style.color = '#fff';
    if (!(functionName.length === 0)) {
      var code = Dom$Companion_getInstance().code_jiburq$([this.getCodeFromName_0(fileName, functionName)]);
      code.className = languageName;
      content = Dom$Companion_getInstance().pre_jiburq$([code]);
      content.style.textAlign = 'left';
    }
    content.style.position = 'absolute';
    content.style.top = '50%';
    content.style.left = '50%';
    content.style.transform = 'translate(-50%, -50%)';
    var div = Dom$Companion_getInstance().div_jiburq$([content]);
    div.id = 'overlay';
    div.onclick = Main$getCode$lambda(div);
    Dom$Companion_getInstance().body_jiburq$([div]);
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  };
  function Main$createNav$getNav$lambda$lambda(closure$pauseDuration_0, this$Main_0, closure$func_0) {
    return function (continuation_0, suspended) {
      var instance = new Coroutine$Main$createNav$getNav$lambda$lambda(closure$pauseDuration_0, this$Main_0, closure$func_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$Main$createNav$getNav$lambda$lambda(closure$pauseDuration_0, this$Main_0, closure$func_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$closure$pauseDuration = closure$pauseDuration_0;
    this.local$this$Main = this$Main_0;
    this.local$closure$func = closure$func_0;
  }
  Coroutine$Main$createNav$getNav$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$Main$createNav$getNav$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$Main$createNav$getNav$lambda$lambda.prototype.constructor = Coroutine$Main$createNav$getNav$lambda$lambda;
  Coroutine$Main$createNav$getNav$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            var tmp$;
            this.state_0 = 2;
            this.result_0 = await_0(this.local$this$Main.clearScene_0(this.local$closure$pauseDuration), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            this.local$closure$func();
            this.state_0 = 3;
            this.result_0 = delay(Kotlin.Long.fromInt(10), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 3:
            return (tmp$ = Engine$Companion_getInstance().canvas) != null && (tmp$.className = 'grow'), Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function Main$createNav$getNav$lambda(closure$name, closure$func, closure$pauseDuration, this$Main) {
    return function (it) {
      if (equals(closure$name, 'Code')) {
        closure$func();
      }
       else {
        launch(Main$createNav$getNav$lambda$lambda(closure$pauseDuration, this$Main, closure$func));
      }
      return Unit;
    };
  }
  function Main$createNav$getNav(this$Main, closure$i, closure$pauseDuration) {
    return function (name, func, color) {
      var tmp$;
      var anchor = Dom$Companion_getInstance().a_jiburq$([name]);
      anchor.className = 'sidenav';
      anchor.style.top = 'calc(50vh - ' + ((this$Main.demos_0.size * 30 | 0) + 10 | 0) + 'px + ' + (60 * closure$i.v | 0) + 'px)';
      anchor.style.background = color;
      anchor.onclick = Main$createNav$getNav$lambda(name, func, closure$pauseDuration, this$Main);
      tmp$ = closure$i.v;
      closure$i.v = tmp$ + 1 | 0;
      return anchor;
    };
  }
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  Main.prototype.createNav_0 = function (pauseDuration) {
    if (pauseDuration === void 0)
      pauseDuration = 1000;
    var i = {v: 0};
    var getNav = Main$createNav$getNav(this, i, pauseDuration);
    var tmp$ = Dom$Companion_getInstance();
    var $receiver = this.demos_0;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      var tmp$_1 = destination.add_11rb$;
      var name = item.component1()
      , func = item.component2()
      , color = item.component3();
      tmp$_1.call(destination, getNav(name, func, color));
    }
    return tmp$.div_jiburq$(copyToArray(destination).slice());
  };
  function Main$clearScene$lambda$lambda(closure$pauseDuration_0, this$Main_0, closure$resolve_0) {
    return function (continuation_0, suspended) {
      var instance = new Coroutine$Main$clearScene$lambda$lambda(closure$pauseDuration_0, this$Main_0, closure$resolve_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$Main$clearScene$lambda$lambda(closure$pauseDuration_0, this$Main_0, closure$resolve_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$closure$pauseDuration = closure$pauseDuration_0;
    this.local$this$Main = this$Main_0;
    this.local$closure$resolve = closure$resolve_0;
  }
  Coroutine$Main$clearScene$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$Main$clearScene$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$Main$clearScene$lambda$lambda.prototype.constructor = Coroutine$Main$clearScene$lambda$lambda;
  Coroutine$Main$clearScene$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            var tmp$;
            (tmp$ = Engine$Companion_getInstance().canvas) != null ? (tmp$.className = 'shrink') : null;
            this.state_0 = 2;
            this.result_0 = delay(Kotlin.Long.fromInt(this.local$closure$pauseDuration), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            clear(Dom$Companion_getInstance().body_jiburq$([]));
            Dom$Companion_getInstance().body_jiburq$([this.local$this$Main.createNav_0()]);
            return this.local$closure$resolve(true);
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function Main$clearScene$lambda(closure$pauseDuration, this$Main) {
    return function (resolve, f) {
      launch(Main$clearScene$lambda$lambda(closure$pauseDuration, this$Main, resolve));
      return Unit;
    };
  }
  Main.prototype.clearScene_0 = function (pauseDuration) {
    if (pauseDuration === void 0)
      pauseDuration = 1000;
    return new Promise(Main$clearScene$lambda(pauseDuration, this));
  };
  function Main$textureDemo$lambda(closure$cube, closure$sphere) {
    return function () {
      closure$cube.rotation.y = Engine$Companion_getInstance().time;
      closure$sphere.rotation.y = -Engine$Companion_getInstance().time;
      return Unit;
    };
  }
  Main.prototype.textureDemo_0 = function () {
    this.currentDemo_0 = 'textureDemo';
    var engine = new Engine();
    var cube = new Cube(void 0, ModelLoader$Companion_getInstance().loadTexture_61zpoe$('models/crate.png'));
    cube.position.x = -1.0;
    cube.position.z = -3.0;
    var sphere = new Sphere(void 0, ModelLoader$Companion_getInstance().loadTexture_61zpoe$('models/texture.png'));
    sphere.position.x = 1.0;
    sphere.position.z = -3.0;
    engine.add_3ifc4f$(cube);
    engine.add_3ifc4f$(sphere);
    engine.onUpdate = Main$textureDemo$lambda(cube, sphere);
  };
  var Math_0 = Math;
  function Main$shadingDemo$lambda(closure$engine, closure$sphere) {
    return function () {
      var tmp$ = closure$engine.light.position;
      var x = Engine$Companion_getInstance().time;
      tmp$.x = 2 * Math_0.sin(x);
      var tmp$_0 = closure$engine.light.position;
      var x_0 = Engine$Companion_getInstance().time;
      tmp$_0.z = 2 * Math_0.cos(x_0) - 3;
      closure$sphere.position = closure$engine.light.position;
      return Unit;
    };
  }
  Main.prototype.shadingDemo_0 = function () {
    this.currentDemo_0 = 'shadingDemo';
    var engine = new Engine();
    Engine$Companion_getInstance().enableLighting = true;
    engine.light.color = Vec3_init(0.8, 0.5, 0.9);
    var model = new Sphere(void 0, ModelLoader$Companion_getInstance().loadTexture_61zpoe$('models/test.png'));
    model.position.z = -3.0;
    engine.add_3ifc4f$(model);
    var sphere = new Sphere(void 0, ModelLoader$Companion_getInstance().loadTexture_61zpoe$('models/test.png'));
    sphere.scale = Vec3_init(0.1, 0.1, 0.1);
    sphere.materialColor = engine.light.color;
    engine.add_3ifc4f$(sphere);
    engine.onUpdate = Main$shadingDemo$lambda(engine, sphere);
  };
  function Main$modelDemo$lambda(closure$model) {
    return function () {
      closure$model.rotation.y = Engine$Companion_getInstance().time;
      return Unit;
    };
  }
  Main.prototype.modelDemo_0 = function () {
    this.currentDemo_0 = 'modelDemo';
    var engine = new Engine();
    var model = ModelLoader$Companion_getInstance().loadObj_jpwrlx$('models/TropicalFish15.obj', ModelLoader$Companion_getInstance().loadTexture_61zpoe$('models/TropicalFish15.jpg'));
    model.position.z = -4.0;
    engine.add_3ifc4f$(model);
    engine.onUpdate = Main$modelDemo$lambda(model);
  };
  function Main$fpsCamDemo$lambda(closure$cube) {
    return function () {
      closure$cube.rotation.y = Engine$Companion_getInstance().time;
      return Unit;
    };
  }
  Main.prototype.fpsCamDemo_0 = function () {
    this.currentDemo_0 = 'fpsCamDemo';
    var engine = new Engine();
    Engine$Companion_getInstance().camera = new FirstPersonCamera();
    var cube = new Cube(void 0, ModelLoader$Companion_getInstance().loadTexture_61zpoe$('models/cubetexture.png'));
    cube.position.z = -3.0;
    engine.add_3ifc4f$(cube);
    engine.onUpdate = Main$fpsCamDemo$lambda(cube);
  };
  function Main$videoDemo$lambda(closure$model, closure$cube, closure$tex, closure$vid) {
    return function () {
      closure$model.rotation.y = Engine$Companion_getInstance().time;
      var tmp$ = closure$cube.rotation;
      var tmp$_0 = 2 * math.PI;
      var x = Engine$Companion_getInstance().time / 10;
      tmp$.y = tmp$_0 * Math_0.sin(x);
      if (ModelLoader$Companion_getInstance().copyVideo) {
        ModelLoader$Companion_getInstance().updateTexture_vvrjzy$(closure$tex, closure$vid);
      }
      return Unit;
    };
  }
  Main.prototype.videoDemo_0 = function () {
    this.currentDemo_0 = 'videoDemo';
    var engine = new Engine();
    Engine$Companion_getInstance().camera = new FirstPersonCamera();
    var tex = ModelLoader$Companion_getInstance().initTexture();
    var vid = ModelLoader$Companion_getInstance().setupVideo_61zpoe$('models/SintelIntro.mp4');
    var cube = new Cube(void 0, tex);
    cube.scale = Vec3_init(-2, 1, -2);
    engine.add_3ifc4f$(cube);
    var model = ModelLoader$Companion_getInstance().loadObj_jpwrlx$('models/suzanne.obj', tex);
    model.scale = Vec3_init(5.0, 5.0, 5.0);
    model.position = Vec3_init(5.0, 0.0, -10.0);
    engine.add_3ifc4f$(model);
    var sphere = new Sphere(void 0, tex);
    sphere.scale = Vec3_init(5.0, 5.0, 5.0);
    sphere.position = Vec3_init(-5.0, 0.0, -10.0);
    engine.add_3ifc4f$(sphere);
    engine.onUpdate = Main$videoDemo$lambda(model, cube, tex, vid);
  };
  function Main$demos$lambda(this$Main) {
    return function () {
      this$Main.textureDemo_0();
      return Unit;
    };
  }
  function Main$demos$lambda_0(this$Main) {
    return function () {
      this$Main.shadingDemo_0();
      return Unit;
    };
  }
  function Main$demos$lambda_1(this$Main) {
    return function () {
      this$Main.modelDemo_0();
      return Unit;
    };
  }
  function Main$demos$lambda_2(this$Main) {
    return function () {
      this$Main.fpsCamDemo_0();
      return Unit;
    };
  }
  function Main$demos$lambda_3(this$Main) {
    return function () {
      this$Main.videoDemo_0();
      return Unit;
    };
  }
  function Main$demos$lambda_4(this$Main) {
    return function () {
      this$Main.getCode_0('src/Main.kt', this$Main.currentDemo_0, 'Kotlin');
      return Unit;
    };
  }
  function Main_init$lambda(this$Main_0) {
    return function (continuation_0, suspended) {
      var instance = new Coroutine$Main_init$lambda(this$Main_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$Main_init$lambda(this$Main_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$this$Main = this$Main_0;
  }
  Coroutine$Main_init$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$Main_init$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$Main_init$lambda.prototype.constructor = Coroutine$Main_init$lambda;
  Coroutine$Main_init$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            Dom$Companion_getInstance().body_jiburq$([this.local$this$Main.createNav_0(0)]);
            var div = Dom$Companion_getInstance().div_jiburq$([Dom$Companion_getInstance().h1_jiburq$(['ThreeEZ Demo']), Dom$Companion_getInstance().h2_jiburq$(['A 3D WebGL Rendering Engine']), Dom$Companion_getInstance().p_jiburq$(['By Daniel Church and Dieter Grosswiler'])]);
            div.className = 'center';
            div.style.color = '#fff';
            div.style.fontSize = '40px';
            div.style.paddingTop = '23vh';
            return Dom$Companion_getInstance().body_jiburq$([div]);
          case 1:
            throw this.exception_0;
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
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
  function Ajax() {
    Ajax$Companion_getInstance();
  }
  function Ajax$Companion() {
    Ajax$Companion_instance = this;
  }
  Ajax$Companion.prototype.read_ivxn3r$ = function (url, async) {
    var tmp$;
    return typeof (tmp$ = $.ajax({type: 'GET', url: url, async: async}).responseText) === 'string' ? tmp$ : throwCCE();
  };
  Ajax$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Ajax$Companion_instance = null;
  function Ajax$Companion_getInstance() {
    if (Ajax$Companion_instance === null) {
      new Ajax$Companion();
    }
    return Ajax$Companion_instance;
  }
  Ajax.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Ajax',
    interfaces: []
  };
  function Camera() {
    Entity.call(this);
    this.zNear = 0.001;
    this.zFar = 1000.0;
    this.fov = 60.0;
    this.aspectRatio = 16.0 / 9.0;
    this.onMousePressed_r59zwf$_0 = null;
    this.onMouseMove_a3v43k$_0 = null;
    this.onKeyPress_um0qrq$_0 = null;
  }
  Object.defineProperty(Camera.prototype, 'onMousePressed', {
    get: function () {
      return this.onMousePressed_r59zwf$_0;
    }
  });
  Object.defineProperty(Camera.prototype, 'onMouseMove', {
    get: function () {
      return this.onMouseMove_a3v43k$_0;
    }
  });
  Object.defineProperty(Camera.prototype, 'onKeyPress', {
    get: function () {
      return this.onKeyPress_um0qrq$_0;
    }
  });
  Object.defineProperty(Camera.prototype, 'wMat', {
    get: function () {
      var vMat = Mat4_init();
      vMat.translate_bmxtnp$(this.position);
      vMat.rotateY_3p81yu$(this.rotation.y);
      vMat.rotateX_3p81yu$(this.rotation.x);
      vMat.scale_bmxtnp$(this.scale);
      vMat.invert();
      return vMat;
    }
  });
  Camera.prototype.update = function () {
  };
  Camera.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Camera',
    interfaces: [Entity]
  };
  function Cube(tint, texture) {
    if (tint === void 0)
      tint = Vec3_init_0();
    if (texture === void 0)
      texture = ModelLoader$Companion_getInstance().loadTexture_61zpoe$();
    RenderingObject_init(ModelLoader$Companion_getInstance().loadOBJSource_61zpoe$('models/cube.obj'), tint, texture, this);
  }
  Cube.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Cube',
    interfaces: [RenderingObject]
  };
  function ShaderData() {
    this.time = 0.0;
  }
  ShaderData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ShaderData',
    interfaces: []
  };
  function Engine(width, height) {
    Engine$Companion_getInstance();
    if (width === void 0)
      width = 1280;
    if (height === void 0)
      height = 720;
    this.scene = new Scene();
    this.onKeyPressed = null;
    this.onKeyReleased = null;
    this.onKeyDown = null;
    this.onMouseMove = null;
    this.onMousePress = null;
    this.onMouseRelease = null;
    this.onMouseDown = null;
    this.onUpdate = null;
    this.shaderProgram_0 = null;
    this.data_0 = new ShaderData();
    this.canvas_0 = null;
    this.objects_0 = ArrayList_init();
    this.light = new Light();
    var tmp$ = this.initGL_0(width, height);
    var gl_canvas = tmp$.component1()
    , gl_context = tmp$.component2();
    Engine$Companion_getInstance().gl = gl_context;
    Engine$Companion_getInstance().enableLighting = false;
    Engine$Companion_getInstance().camera = new Camera();
    this.canvas_0 = gl_canvas;
    this.setupCallbacks();
    gl_context.clearColor(0.0, 0.0, 0.0, 1.0);
    var setter = Engine_init$lambda;
    var vainfo = [new VertextAttributeInfo('a_position', 3), new VertextAttributeInfo('a_normal', 3), new VertextAttributeInfo('a_tex_coords', 2)];
    this.shaderProgram_0 = new StandardShader(Engine$Companion_getInstance().gl, WebGLRenderingContext.TRIANGLES, vainfo, setter);
    var pMatrix = Mat4_init();
    pMatrix.perspective_1ugm5o$(Engine$Companion_getInstance().camera.fov * math.PI / 180, Engine$Companion_getInstance().camera.aspectRatio, Engine$Companion_getInstance().camera.zNear, Engine$Companion_getInstance().camera.zFar);
    this.shaderProgram_0.setUniformMatrix4fv_pphpxd$('projectionMatrix', pMatrix.array);
    Engine$Companion_getInstance().gl.viewport(0, 0, gl_canvas.width, gl_canvas.height);
    this.render_0();
  }
  function Engine$Companion() {
    Engine$Companion_instance = this;
    this.start_0 = (new Date()).getTime();
    this.gl_tmn89f$_0 = this.gl_tmn89f$_0;
    this.canvas = null;
    this.camera = new Camera();
    this.enableLighting = false;
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
  Object.defineProperty(Engine$Companion.prototype, 'time', {
    get: function () {
      return (this.start_0 - (new Date()).getTime()) / 1000.0;
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
  Engine.prototype.initGL_0 = function (width, height, container) {
    if (container === void 0)
      container = null;
    var tmp$, tmp$_0;
    var glCanvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    Engine$Companion_getInstance().canvas = glCanvas;
    glCanvas.id = 'WebGLCanvas';
    if (container != null) {
      container.append(glCanvas);
    }
     else {
      Dom$Companion_getInstance().body_jiburq$([glCanvas]);
      Dom$Companion_getInstance().body_jiburq$([]).style.textAlign = 'center';
      glCanvas.style.margin = 'auto';
      glCanvas.style.marginTop = '100px';
      glCanvas.style.border = '3px solid #777';
      glCanvas.style.borderRadius = '50px';
      glCanvas.style.boxShadow = '0 4px 8px 0 rgba(0.7, 0.7, 0.7, 0.2), 0 6px 20px 0 rgba(0.7, 0.7, 0.7, 0.19);';
      glCanvas.style.transition = 'transform: 1s';
      glCanvas.className = 'shrink';
    }
    var glContext = Kotlin.isType(tmp$_0 = glCanvas.getContext('webgl'), WebGLRenderingContext) ? tmp$_0 : throwCCE();
    glCanvas.width = width;
    glCanvas.height = height;
    glContext.viewport(0, 0, glCanvas.width, glCanvas.height);
    return new Pair(glCanvas, glContext);
  };
  Engine.prototype.pollInput_0 = function () {
  };
  Engine.prototype.add_3ifc4f$ = function (obj) {
    this.objects_0.add_11rb$(obj);
  };
  function Engine$setupCallbacks$lambda(this$Engine) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      var event = Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : throwCCE();
      var $receiver = Input$Companion_getInstance().keysPressed;
      var key = event.which;
      $receiver.put_xwzc9p$(key, true);
      (tmp$_0 = Engine$Companion_getInstance().camera.onKeyPress) != null ? tmp$_0(event) : null;
      (tmp$_1 = this$Engine.onKeyPressed) != null ? tmp$_1(event) : null;
      return false;
    };
  }
  function Engine$setupCallbacks$lambda_0(this$Engine) {
    return function (it) {
      var tmp$, tmp$_0;
      var event = Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : throwCCE();
      var $receiver = Input$Companion_getInstance().keysPressed;
      var key = event.which;
      $receiver.put_xwzc9p$(key, false);
      (tmp$_0 = this$Engine.onKeyReleased) != null ? tmp$_0(event) : null;
      return false;
    };
  }
  function Engine$setupCallbacks$lambda_1(this$Engine) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      var event = Kotlin.isType(tmp$ = it, MouseEvent) ? tmp$ : throwCCE();
      Input$Companion_getInstance().mousePosition.x = event.clientX;
      Input$Companion_getInstance().mousePosition.y = event.clientY;
      (tmp$_0 = Engine$Companion_getInstance().camera.onMouseMove) != null ? tmp$_0(event) : null;
      (tmp$_1 = this$Engine.onMouseMove) != null ? tmp$_1(event) : null;
      return false;
    };
  }
  function Engine$setupCallbacks$lambda_2(this$Engine) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      var event = Kotlin.isType(tmp$ = it, MouseEvent) ? tmp$ : throwCCE();
      (tmp$_0 = Engine$Companion_getInstance().camera.onMousePressed) != null ? tmp$_0(event) : null;
      (tmp$_1 = this$Engine.onMousePress) != null ? tmp$_1(event) : null;
      return false;
    };
  }
  Engine.prototype.setupCallbacks = function () {
    ensureNotNull(document.body).onkeydown = Engine$setupCallbacks$lambda(this);
    ensureNotNull(document.body).onkeyup = Engine$setupCallbacks$lambda_0(this);
    this.canvas_0.onmousemove = Engine$setupCallbacks$lambda_1(this);
    this.canvas_0.onmousedown = Engine$setupCallbacks$lambda_2(this);
  };
  Engine.prototype.update_0 = function () {
    var tmp$;
    if (this.onUpdate != null) {
      (tmp$ = this.onUpdate) != null ? tmp$() : null;
    }
    this.pollInput_0();
    Engine$Companion_getInstance().camera.update();
  };
  function Engine$render$lambda(this$Engine) {
    return function (it) {
      this$Engine.update_0();
      this$Engine.render_0();
      return Unit;
    };
  }
  Engine.prototype.render_0 = function () {
    Engine$Companion_getInstance().gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);
    Engine$Companion_getInstance().gl.clearDepth(1.0);
    Engine$Companion_getInstance().gl.enable(WebGLRenderingContext.DEPTH_TEST);
    if (!this.objects_0.isEmpty()) {
      this.shaderProgram_0.begin_v6ru81$(this.objects_0.get_za3lpa$(0).attribBuffer, this.data_0);
      this.shaderProgram_0.setUniform1f_9sobi5$('light.attenuation', this.light.attenuation);
      this.shaderProgram_0.setUniform1f_9sobi5$('light.ambientCoefficient', this.light.ambientCoefficient);
      this.shaderProgram_0.setUniform1f_9sobi5$('useLighting', Engine$Companion_getInstance().enableLighting ? 1.0 : 0.0);
      this.shaderProgram_0.setUniform3f_l7wwll$('light.position', this.light.position);
      this.shaderProgram_0.setUniform3f_l7wwll$('light.color', this.light.color);
      this.shaderProgram_0.setUniform3f_l7wwll$('cameraPosition', Engine$Companion_getInstance().camera.position);
      this.shaderProgram_0.setUniformMatrix4fv_pphpxd$('viewMatrix', Engine$Companion_getInstance().camera.wMat.array);
      this.shaderProgram_0.end();
    }
    var tmp$;
    tmp$ = this.objects_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.shaderProgram_0.begin_v6ru81$(element.attribBuffer, this.data_0);
      this.shaderProgram_0.setUniform3f_l7wwll$('light.position', this.light.position);
      element.render_q3z2ux$(Engine$Companion_getInstance().gl, this.shaderProgram_0);
      this.shaderProgram_0.end();
    }
    Engine$Companion_getInstance().gl.disable(WebGLRenderingContext.DEPTH_TEST);
    window.requestAnimationFrame(Engine$render$lambda(this));
  };
  function Engine_init$lambda(program, data) {
    program.setUniform1f_9sobi5$('time', Engine$Companion_getInstance().time);
    program.setUniform3f_l7wwll$('cameraPosition', Engine$Companion_getInstance().camera.position);
    return Unit;
  }
  Engine.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Engine',
    interfaces: []
  };
  function Entity() {
    this.parent = Mat4_init();
    this.position = Vec3_init_0();
    this.scale = Vec3_init(1, 1, 1);
    this.velocity = Vec3_init_0();
    this.acceleration = Vec3_init_0();
    this.rotation = Vec3_init_0();
  }
  Object.defineProperty(Entity.prototype, 'forward', {
    get: function () {
      var vMat = this.wMat;
      return Vec3_init(vMat.array[2], vMat.array[6], vMat.array[10]);
    }
  });
  Object.defineProperty(Entity.prototype, 'left', {
    get: function () {
      var vMat = this.wMat;
      return Vec3_init(vMat.array[0], vMat.array[4], vMat.array[8]);
    }
  });
  Object.defineProperty(Entity.prototype, 'wMat', {
    get: function () {
      var vMat = Mat4_init();
      vMat.translate_bmxtnp$(this.position);
      vMat.rotateX_3p81yu$(this.rotation.array[0]);
      vMat.rotateY_3p81yu$(this.rotation.array[1]);
      vMat.rotateZ_3p81yu$(this.rotation.array[2]);
      vMat.scale_bmxtnp$(this.scale);
      return vMat;
    }
  });
  Object.defineProperty(Entity.prototype, 'nMat', {
    get: function () {
      var m = Engine$Companion_getInstance().camera.wMat.times_bms07u$(this.wMat);
      m.invert();
      m.transpose();
      return this.wMat;
    }
  });
  Entity.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Entity',
    interfaces: []
  };
  function FirstPersonCamera() {
    Camera.call(this);
    this.mouseSensitivityX = 1.0;
    this.mouseSensitivityY = 1.0;
    this.speed = 1.0;
  }
  function FirstPersonCamera$get_FirstPersonCamera$onMousePressed$lambda(it) {
    switch (it.button) {
      case 0:
        Input$Companion_getInstance().lockCursor();
        break;
      case 1:
        Input$Companion_getInstance().releaseCursor();
        break;
    }
    return Unit;
  }
  Object.defineProperty(FirstPersonCamera.prototype, 'onMousePressed', {
    get: function () {
      return FirstPersonCamera$get_FirstPersonCamera$onMousePressed$lambda;
    }
  });
  function FirstPersonCamera$get_FirstPersonCamera$onMouseMove$lambda(this$FirstPersonCamera) {
    return function (it) {
      var tmp$, tmp$_0;
      var movementX = typeof (tmp$ = event.movementX) === 'number' ? tmp$ : throwCCE();
      var movementY = typeof (tmp$_0 = event.movementY) === 'number' ? tmp$_0 : throwCCE();
      if (Input$Companion_getInstance().isCursorLocked) {
        Engine$Companion_getInstance().camera.rotation.x = Engine$Companion_getInstance().camera.rotation.x - movementY / 1000 * this$FirstPersonCamera.mouseSensitivityY;
        Engine$Companion_getInstance().camera.rotation.y = Engine$Companion_getInstance().camera.rotation.y - movementX / 1000 * this$FirstPersonCamera.mouseSensitivityX;
      }
      return Unit;
    };
  }
  Object.defineProperty(FirstPersonCamera.prototype, 'onMouseMove', {
    get: function () {
      return FirstPersonCamera$get_FirstPersonCamera$onMouseMove$lambda(this);
    }
  });
  function FirstPersonCamera$get_FirstPersonCamera$onKeyPress$lambda(it) {
    if (it.which === 27)
      Input$Companion_getInstance().releaseCursor();
    return Unit;
  }
  Object.defineProperty(FirstPersonCamera.prototype, 'onKeyPress', {
    get: function () {
      return FirstPersonCamera$get_FirstPersonCamera$onKeyPress$lambda;
    }
  });
  FirstPersonCamera.prototype.update = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    tmp$_0 = Engine$Companion_getInstance().camera;
    if (Input$Companion_getInstance().isKeyDown_za3lpa$(65)) {
      tmp$ = Vec3_init(Engine$Companion_getInstance().camera.position.array[0], Engine$Companion_getInstance().camera.position.array[1], Engine$Companion_getInstance().camera.position.array[2]).minus_bmxtnp$(Engine$Companion_getInstance().camera.left.normalized().times_mx4ult$(0.1).times_mx4ult$(this.speed));
    }
     else if (Input$Companion_getInstance().isKeyDown_za3lpa$(68)) {
      tmp$ = Vec3_init(Engine$Companion_getInstance().camera.position.array[0], Engine$Companion_getInstance().camera.position.array[1], Engine$Companion_getInstance().camera.position.array[2]).plus_bmxtnp$(Engine$Companion_getInstance().camera.left.normalized().times_mx4ult$(0.1).times_mx4ult$(this.speed));
    }
     else
      tmp$ = Engine$Companion_getInstance().camera.position;
    tmp$_0.position = tmp$;
    tmp$_2 = Engine$Companion_getInstance().camera;
    if (Input$Companion_getInstance().isKeyDown_za3lpa$(32)) {
      tmp$_1 = Vec3_init(Engine$Companion_getInstance().camera.position.array[0], Engine$Companion_getInstance().camera.position.array[1] + 0.1 * this.speed, Engine$Companion_getInstance().camera.position.array[2]);
    }
     else if (Input$Companion_getInstance().isKeyDown_za3lpa$(16)) {
      tmp$_1 = Vec3_init(Engine$Companion_getInstance().camera.position.array[0], Engine$Companion_getInstance().camera.position.array[1] - 0.1 * this.speed, Engine$Companion_getInstance().camera.position.array[2]);
    }
     else
      tmp$_1 = Engine$Companion_getInstance().camera.position;
    tmp$_2.position = tmp$_1;
    tmp$_4 = Engine$Companion_getInstance().camera;
    if (Input$Companion_getInstance().isKeyDown_za3lpa$(83)) {
      tmp$_3 = Vec3_init(Engine$Companion_getInstance().camera.position.array[0], Engine$Companion_getInstance().camera.position.array[1], Engine$Companion_getInstance().camera.position.array[2]).plus_bmxtnp$(Engine$Companion_getInstance().camera.forward.normalized().times_mx4ult$(0.1).times_mx4ult$(this.speed));
    }
     else if (Input$Companion_getInstance().isKeyDown_za3lpa$(87)) {
      tmp$_3 = Vec3_init(Engine$Companion_getInstance().camera.position.array[0], Engine$Companion_getInstance().camera.position.array[1], Engine$Companion_getInstance().camera.position.array[2]).minus_bmxtnp$(Engine$Companion_getInstance().camera.forward.normalized().times_mx4ult$(0.1).times_mx4ult$(this.speed));
    }
     else
      tmp$_3 = Engine$Companion_getInstance().camera.position;
    tmp$_4.position = tmp$_3;
  };
  FirstPersonCamera.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FirstPersonCamera',
    interfaces: [Camera]
  };
  function Input() {
    Input$Companion_getInstance();
  }
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function Input$Companion() {
    Input$Companion_instance = this;
    this.cursorLocked_0 = false;
    this.mousePosition = new Vector2();
    this.keysPressed = LinkedHashMap_init();
    this.mousePressed = LinkedHashMap_init();
  }
  Input$Companion.prototype.isKeyDown_za3lpa$ = function (key) {
    return this.keysPressed.get_11rb$(key) === true;
  };
  Input$Companion.prototype.isMouseDown_za3lpa$ = function (key) {
    return this.mousePressed.get_11rb$(key) === true;
  };
  Input$Companion.prototype.lockCursor = function () {
    var e = document.getElementById('WebGLCanvas');
    e.requestPointerLock = e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock;
    e.requestPointerLock();
    this.cursorLocked_0 = true;
  };
  Input$Companion.prototype.releaseCursor = function () {
    this.cursorLocked_0 = false;
  };
  Object.defineProperty(Input$Companion.prototype, 'isCursorLocked', {
    get: function () {
      return this.cursorLocked_0;
    }
  });
  Input$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Input$Companion_instance = null;
  function Input$Companion_getInstance() {
    if (Input$Companion_instance === null) {
      new Input$Companion();
    }
    return Input$Companion_instance;
  }
  Input.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Input',
    interfaces: []
  };
  function Light() {
    this.position = Vec3_init_0();
    this.color = Vec3_init(0.2, 0.0, 0.0);
    this.attenuation = 0.2;
    this.ambientCoefficient = 0.005;
  }
  Light.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Light',
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
    ModelLoader$Companion_getInstance();
  }
  function ModelLoader$Companion() {
    ModelLoader$Companion_instance = this;
    this.copyVideo = false;
  }
  function ModelLoader$Companion$loadFile$lambda(closure$rawFile) {
    return function (it) {
      if (closure$rawFile.readyState === 4) {
        if (closure$rawFile.status === 200 || closure$rawFile.status === 0) {
          var allText = closure$rawFile.responseText;
          println(allText);
        }
      }
      return Unit;
    };
  }
  ModelLoader$Companion.prototype.loadFile_61zpoe$ = function (file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = ModelLoader$Companion$loadFile$lambda(rawFile);
    rawFile.send(null);
  };
  function ModelLoader$Companion$setupVideo$checkReady(closure$playing, closure$timeupdate, this$ModelLoader$) {
    return function () {
      if (closure$playing.v && closure$timeupdate.v) {
        this$ModelLoader$.copyVideo = true;
      }
    };
  }
  function ModelLoader$Companion$setupVideo$lambda(closure$playing, closure$checkReady) {
    return function (it) {
      closure$playing.v = true;
      closure$checkReady();
      return Unit;
    };
  }
  function ModelLoader$Companion$setupVideo$lambda_0(closure$timeupdate, closure$checkReady) {
    return function (it) {
      closure$timeupdate.v = true;
      closure$checkReady();
      return Unit;
    };
  }
  ModelLoader$Companion.prototype.setupVideo_61zpoe$ = function (url) {
    var tmp$;
    var video = Kotlin.isType(tmp$ = document.createElement('video'), HTMLVideoElement) ? tmp$ : throwCCE();
    var playing = {v: false};
    var timeupdate = {v: false};
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    var checkReady = ModelLoader$Companion$setupVideo$checkReady(playing, timeupdate, this);
    video.onplaying = ModelLoader$Companion$setupVideo$lambda(playing, checkReady);
    video.ontimeupdate = ModelLoader$Companion$setupVideo$lambda_0(timeupdate, checkReady);
    video.src = url;
    video.play();
    return video;
  };
  ModelLoader$Companion.prototype.initTexture = function () {
    var texture = Engine$Companion_getInstance().gl.createTexture();
    Engine$Companion_getInstance().gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
    var level = 0;
    var internalFormat = WebGLRenderingContext.RGBA;
    var width = 1;
    var height = 1;
    var border = 0;
    var srcFormat = WebGLRenderingContext.RGBA;
    var srcType = WebGLRenderingContext.UNSIGNED_BYTE;
    var pixel = new Uint8Array([0, 0, 127, 127]);
    Engine$Companion_getInstance().gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    Engine$Companion_getInstance().gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE);
    Engine$Companion_getInstance().gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE);
    Engine$Companion_getInstance().gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
    return ensureNotNull(texture);
  };
  ModelLoader$Companion.prototype.updateTexture_vvrjzy$ = function (texture, video) {
    var level = 0;
    var internalFormat = WebGLRenderingContext.RGBA;
    var srcFormat = WebGLRenderingContext.RGBA;
    var srcType = WebGLRenderingContext.UNSIGNED_BYTE;
    Engine$Companion_getInstance().gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
    Engine$Companion_getInstance().gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
  };
  function ModelLoader$Companion$loadTexture$isPowerOf2(value) {
    return (value & value - 1) === 0;
  }
  function ModelLoader$Companion$loadTexture$lambda(closure$texture, closure$level, closure$internalFormat, closure$srcFormat, closure$srcType, closure$image, closure$isPowerOf2) {
    return function (it) {
      Engine$Companion_getInstance().gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, closure$texture);
      Engine$Companion_getInstance().gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, closure$level, closure$internalFormat, closure$srcFormat, closure$srcType, closure$image);
      if (closure$isPowerOf2(closure$image.width) && closure$isPowerOf2(closure$image.height)) {
        Engine$Companion_getInstance().gl.generateMipmap(WebGLRenderingContext.TEXTURE_2D);
      }
       else {
        Engine$Companion_getInstance().gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE);
        Engine$Companion_getInstance().gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE);
        Engine$Companion_getInstance().gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
      }
      return Unit;
    };
  }
  ModelLoader$Companion.prototype.loadTexture_61zpoe$ = function (url) {
    if (url === void 0)
      url = 'models/models/standard_texture.png';
    var tmp$;
    var texture = Engine$Companion_getInstance().gl.createTexture();
    Engine$Companion_getInstance().gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
    var level = 0;
    var internalFormat = WebGLRenderingContext.RGBA;
    var width = 1;
    var height = 1;
    var border = 0;
    var srcFormat = WebGLRenderingContext.RGBA;
    var srcType = WebGLRenderingContext.UNSIGNED_BYTE;
    var pixel = new Uint8Array([0, 0, 127, 127]);
    Engine$Companion_getInstance().gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    var isPowerOf2 = ModelLoader$Companion$loadTexture$isPowerOf2;
    var image = Kotlin.isType(tmp$ = window.document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    image.onload = ModelLoader$Companion$loadTexture$lambda(texture, level, internalFormat, srcFormat, srcType, image, isPowerOf2);
    image.src = url;
    return ensureNotNull(texture);
  };
  ModelLoader$Companion.prototype.loadFBX_61zpoe$ = function (path) {
    return new Cube();
  };
  function ModelLoader$Companion$loadOBJSource$lambda$getIndex(value) {
    var $receiver = split(value, ['//']).get_za3lpa$(0);
    var tmp$;
    return toInt(trim(Kotlin.isCharSequence(tmp$ = $receiver) ? tmp$ : throwCCE()).toString());
  }
  function ModelLoader$Companion$loadOBJSource$lambda$getNormal(value) {
    var $receiver = split(value, ['//']).get_za3lpa$(1);
    var tmp$;
    return toInt(trim(Kotlin.isCharSequence(tmp$ = $receiver) ? tmp$ : throwCCE()).toString());
  }
  function ModelLoader$Companion$loadOBJSource$lambda$getIndex_0(value) {
    var $receiver = split(value, ['/']).get_za3lpa$(0);
    var tmp$;
    return toInt(trim(Kotlin.isCharSequence(tmp$ = $receiver) ? tmp$ : throwCCE()).toString());
  }
  function ModelLoader$Companion$loadOBJSource$lambda$getTex(value) {
    var $receiver = split(value, ['/']).get_za3lpa$(1);
    var tmp$;
    return toInt(trim(Kotlin.isCharSequence(tmp$ = $receiver) ? tmp$ : throwCCE()).toString());
  }
  function ModelLoader$Companion$loadOBJSource$lambda$getNormal_0(value) {
    var $receiver = split(value, ['/']).get_za3lpa$(2);
    var tmp$;
    return toInt(trim(Kotlin.isCharSequence(tmp$ = $receiver) ? tmp$ : throwCCE()).toString());
  }
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  ModelLoader$Companion.prototype.loadOBJSource_61zpoe$ = function (url) {
    println('Downloading file');
    var text = Ajax$Companion_getInstance().read_ivxn3r$(url, false);
    println('Download done');
    println('Parsing file');
    var vertices = ArrayList_init();
    var normals = ArrayList_init();
    var tex = ArrayList_init();
    var vertOut = ArrayList_init();
    var normOut = ArrayList_init();
    var tcOut = ArrayList_init();
    var tmp$;
    tmp$ = split(text, ['\n']).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0;
      var item = trim(Kotlin.isCharSequence(tmp$_0 = element) ? tmp$_0 : throwCCE()).toString();
      var values = split(item, [' ']);
      if (startsWith(item, 'vn')) {
        normals.add_11rb$(Vec3_init(toDouble(values.get_za3lpa$(1)), toDouble(values.get_za3lpa$(2)), toDouble(values.get_za3lpa$(3))));
      }
       else if (startsWith(item, 'vt')) {
        tex.add_11rb$(Vec3_init(toDouble(values.get_za3lpa$(1)), toDouble(values.get_za3lpa$(2)), 0));
      }
       else if (startsWith(item, 'v')) {
        vertices.add_11rb$(Vec3_init(toDouble(values.get_za3lpa$(1)), toDouble(values.get_za3lpa$(2)), toDouble(values.get_za3lpa$(3))));
      }
       else if (startsWith(item, 'f'))
        if (contains(item, '//')) {
          var getIndex = ModelLoader$Companion$loadOBJSource$lambda$getIndex;
          var getNormal = ModelLoader$Companion$loadOBJSource$lambda$getNormal;
          var tmp$_1;
          tmp$_1 = until(1, 4).iterator();
          while (tmp$_1.hasNext()) {
            var element_0 = tmp$_1.next();
            var v = vertices.get_za3lpa$(getIndex(values.get_za3lpa$(element_0)) - 1 | 0);
            var n = normals.get_za3lpa$(getNormal(values.get_za3lpa$(element_0)) - 1 | 0);
            vertOut.addAll_brywnq$(listOf([v.array[0], v.array[1], v.array[2]]));
            normOut.addAll_brywnq$(listOf([n.array[0], n.array[1], n.array[2]]));
          }
        }
         else if (contains(item, '/')) {
          var hasNormals = split(item, ['/']).size === 3;
          var getIndex_0 = ModelLoader$Companion$loadOBJSource$lambda$getIndex_0;
          var getTex = ModelLoader$Companion$loadOBJSource$lambda$getTex;
          var getNormal_0 = ModelLoader$Companion$loadOBJSource$lambda$getNormal_0;
          var tmp$_2;
          tmp$_2 = until(1, 4).iterator();
          while (tmp$_2.hasNext()) {
            var element_1 = tmp$_2.next();
            var v_0 = vertices.get_za3lpa$(getIndex_0(values.get_za3lpa$(element_1)) - 1 | 0);
            vertOut.addAll_brywnq$(listOf([v_0.x, v_0.y, v_0.z]));
            var t = tex.get_za3lpa$(getTex(values.get_za3lpa$(element_1)) - 1 | 0);
            tcOut.addAll_brywnq$(listOf([t.x, t.y]));
            if (hasNormals) {
              var n_0 = normals.get_za3lpa$(getNormal_0(values.get_za3lpa$(element_1)) - 1 | 0);
              normOut.addAll_brywnq$(listOf([n_0.x, n_0.y, n_0.z]));
            }
          }
        }
         else {
          var tmp$_3;
          tmp$_3 = until(1, 4).iterator();
          while (tmp$_3.hasNext()) {
            var element_2 = tmp$_3.next();
            var v_1 = vertices.get_za3lpa$(toInt(values.get_za3lpa$(element_2)) - 1 | 0);
            vertOut.addAll_brywnq$(listOf([v_1.x, v_1.y, v_1.z]));
          }
        }
       else if (startsWith(item, 'mtllib')) {
        var u = split(url, ['/']);
        var tmp$_4 = joinToString(u.subList_vux9f0$(0, u.size - 1 | 0), '/') + '/';
        var $receiver = split(item, [' ']).get_za3lpa$(1);
        var tmp$_5;
        var file = tmp$_4 + trim(Kotlin.isCharSequence(tmp$_5 = $receiver) ? tmp$_5 : throwCCE()).toString();
        print(Ajax$Companion_getInstance().read_ivxn3r$(file, false));
      }
    }
    println('Parsing done');
    return new Triple(copyToArray(vertOut), copyToArray(normOut), copyToArray(tcOut));
  };
  ModelLoader$Companion.prototype.loadObj_jpwrlx$ = function (text, texture) {
    if (texture === void 0)
      texture = ModelLoader$Companion_getInstance().loadTexture_61zpoe$();
    var tmp$ = this.loadOBJSource_61zpoe$(text);
    var vert = tmp$.component1()
    , norm = tmp$.component2()
    , tc = tmp$.component3();
    return new ObjObject(vert, norm, tc, texture);
  };
  ModelLoader$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var ModelLoader$Companion_instance = null;
  function ModelLoader$Companion_getInstance() {
    if (ModelLoader$Companion_instance === null) {
      new ModelLoader$Companion();
    }
    return ModelLoader$Companion_instance;
  }
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
  function ObjObject(v, n, tc, texture) {
    if (texture === void 0)
      texture = ModelLoader$Companion_getInstance().loadTexture_61zpoe$();
    RenderingObject.call(this, v, n, tc, texture);
  }
  ObjObject.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ObjObject',
    interfaces: [RenderingObject]
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
  function RenderingObject(vertices, normals, texCoords, tex, tint) {
    if (texCoords === void 0)
      texCoords = [];
    if (tex === void 0)
      tex = ModelLoader$Companion_getInstance().loadTexture_61zpoe$();
    if (tint === void 0)
      tint = Vec3_init_0();
    Entity.call(this);
    this.vertices_tewib2$_0 = vertices;
    this.normals_27csal$_0 = normals;
    this.texCoords_rycie4$_0 = texCoords;
    this.tex = tex;
    this.tint = tint;
    this.materialShininess = 8.0;
    this.materialSpecularColor = Vec3_init(1.0, 1.0, 1.0);
    this.materialColor = Vec3_init(0.0, 0.0, 0.0);
    this.vert_wenh46$_0 = new Float32Array(0);
    var tmp$;
    tmp$ = Engine$Companion_getInstance().gl.createBuffer();
    if (tmp$ == null) {
      throw new IllegalStateException('Unable to create webgl buffer!');
    }
    this.attribBuffer = tmp$;
    if (this.texCoords_rycie4$_0.length === 0) {
      var tc = ArrayList_init();
      var tmp$_0;
      tmp$_0 = until(0, (this.vertices_tewib2$_0.length / 3 | 0) * 2 | 0).iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        tc.add_11rb$(0.0);
      }
      this.texCoords_rycie4$_0 = copyToArray(tc);
    }
    if (this.normals_27csal$_0.length === 0) {
      var norm = ArrayList_init();
      var tmp$_1;
      tmp$_1 = until(0, this.vertices_tewib2$_0.length).iterator();
      while (tmp$_1.hasNext()) {
        var element_0 = tmp$_1.next();
        norm.add_11rb$(0.0);
      }
      this.normals_27csal$_0 = copyToArray(norm);
    }
    this.vert_wenh46$_0 = new Float32Array(this.vertices_tewib2$_0.length + this.normals_27csal$_0.length + this.texCoords_rycie4$_0.length | 0);
    var tmp$_2;
    tmp$_2 = until(0, this.vertices_tewib2$_0.length / 3 | 0).iterator();
    while (tmp$_2.hasNext()) {
      var element_1 = tmp$_2.next();
      var tmp$_3;
      tmp$_3 = until(0, 3).iterator();
      while (tmp$_3.hasNext()) {
        var element_2 = tmp$_3.next();
        this.vert_wenh46$_0[(element_1 * 8 | 0) + element_2 | 0] = this.vertices_tewib2$_0[(element_1 * 3 | 0) + element_2 | 0];
      }
      var tmp$_4;
      tmp$_4 = until(0, 3).iterator();
      while (tmp$_4.hasNext()) {
        var element_3 = tmp$_4.next();
        this.vert_wenh46$_0[(element_1 * 8 | 0) + 3 + element_3 | 0] = this.normals_27csal$_0[(element_1 * 3 | 0) + element_3 | 0];
      }
      var tmp$_5;
      tmp$_5 = until(0, 2).iterator();
      while (tmp$_5.hasNext()) {
        var element_4 = tmp$_5.next();
        this.vert_wenh46$_0[(element_1 * 8 | 0) + 3 + 3 + element_4 | 0] = this.texCoords_rycie4$_0[(element_1 * 2 | 0) + element_4 | 0];
      }
    }
  }
  RenderingObject.prototype.render_q3z2ux$ = function (gl, shaderProgram) {
    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tex);
    gl.uniform1i(gl.getUniformLocation(shaderProgram.shaderProgram, 'materialTex'), 0);
    shaderProgram.setUniformMatrix4fv_pphpxd$('vMat', this.wMat.array);
    shaderProgram.setUniformMatrix4fv_pphpxd$('normMat', this.nMat.array);
    shaderProgram.setUniform1f_9sobi5$('materialShininess', this.materialShininess);
    shaderProgram.setUniform3f_l7wwll$('materialSpecularColor', this.materialSpecularColor);
    shaderProgram.setUniform3f_l7wwll$('color', this.materialColor);
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.attribBuffer);
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.vert_wenh46$_0, WebGLRenderingContext.STATIC_DRAW);
    gl.drawArrays(shaderProgram.drawType, 0, this.vert_wenh46$_0.length / 8 | 0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);
  };
  RenderingObject.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RenderingObject',
    interfaces: [Entity]
  };
  function RenderingObject_init(values, tint, texture, $this) {
    if (tint === void 0)
      tint = Vec3_init_0();
    $this = $this || Object.create(RenderingObject.prototype);
    RenderingObject.call($this, values.first, values.second, values.third, texture, tint);
    return $this;
  }
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
    this.vertex = this.compileShader_gga26l$_0(vertexShaderSource, WebGLRenderingContext.VERTEX_SHADER);
    this.fragment = this.compileShader_gga26l$_0(fragmentShaderSource, WebGLRenderingContext.FRAGMENT_SHADER);
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
  ShaderProgram.prototype.compileShader_gga26l$_0 = function (source, type) {
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
  ShaderProgram.prototype.setUniform3f_l7wwll$ = function (location, vec3) {
    this.webgl.uniform3f(this.getUniformLocation_61zpoe$(location), vec3.x, vec3.y, vec3.z);
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
  ShaderProgram.prototype.setUniformMatrix3fv_pphpxd$ = function (location, value) {
    this.webgl.uniformMatrix4fv(this.getUniformLocation_61zpoe$(location), false, value);
  };
  ShaderProgram.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ShaderProgram',
    interfaces: []
  };
  function Sphere(tint, texture) {
    if (tint === void 0)
      tint = Vec3_init_0();
    if (texture === void 0)
      texture = ModelLoader$Companion_getInstance().loadTexture_61zpoe$();
    RenderingObject_init(ModelLoader$Companion_getInstance().loadOBJSource_61zpoe$('models/sphere.obj'), tint, texture, this);
  }
  Sphere.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Sphere',
    interfaces: [RenderingObject]
  };
  function StandardShader(webgl, drawType, vainfo, setter) {
    ShaderProgram.call(this, webgl, drawType, Ajax$Companion_getInstance().read_ivxn3r$('out/production/SeniorProjectKotlin/engine/standardShader.vert', false), Ajax$Companion_getInstance().read_ivxn3r$('out/production/SeniorProjectKotlin/engine/standardShader.frag', false), vainfo, setter);
  }
  StandardShader.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StandardShader',
    interfaces: [ShaderProgram]
  };
  function Mat3(array) {
    this.array = array;
  }
  Mat3.prototype.clone = function () {
    return new Mat3(this.array);
  };
  Mat3.prototype.identity = function () {
    mat3.identity(this.array);
  };
  Mat3.prototype.transpose = function () {
    mat3.transpose(this.array, this.array);
  };
  Mat3.prototype.invert = function () {
    mat3.invert(this.array, this.array);
  };
  Mat3.prototype.adjoint = function () {
    mat3.adjoint(this.array, this.array);
  };
  Mat3.prototype.determinant = function () {
    return mat3.determinant(this.array);
  };
  Mat3.prototype.translate_bmxtnp$ = function (v) {
    mat3.translate(this.array, this.array, v.array);
  };
  Mat3.prototype.rotateX_3p81yu$ = function (rad) {
    mat3.rotateX(this.array, this.array, numberToDouble(rad));
  };
  Mat3.prototype.rotateY_3p81yu$ = function (rad) {
    mat3.rotateY(this.array, this.array, numberToDouble(rad));
  };
  Mat3.prototype.rotateZ_3p81yu$ = function (rad) {
    mat3.rotateZ(this.array, this.array, numberToDouble(rad));
  };
  Mat3.prototype.scale_bmxtnp$ = function (v) {
    mat3.scale(this.array, this.array, v.array);
  };
  Mat3.prototype.multiply_bms07t$ = function (other) {
    var ret = Mat3_init();
    mat3.multiply(ret.array, this.array, other.array);
    return ret;
  };
  Mat3.prototype.times_bms07t$ = function (other) {
    return this.multiply_bms07t$(other);
  };
  Mat3.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Mat3',
    interfaces: []
  };
  function Mat3_init($this) {
    $this = $this || Object.create(Mat3.prototype);
    Mat3.call($this, new Float32Array(mat3.create()));
    return $this;
  }
  function Mat3_init_0(a, $this) {
    $this = $this || Object.create(Mat3.prototype);
    Mat3.call($this, new Float32Array(a));
    return $this;
  }
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
  Mat4.prototype.component1 = function () {
    return this.array;
  };
  Mat4.prototype.copy_b5uka5$ = function (array) {
    return new Mat4(array === void 0 ? this.array : array);
  };
  Mat4.prototype.toString = function () {
    return 'Mat4(array=' + Kotlin.toString(this.array) + ')';
  };
  Mat4.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.array) | 0;
    return result;
  };
  Mat4.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.array, other.array))));
  };
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
  Object.defineProperty(Vec3.prototype, 'x', {
    get: function () {
      return this.array[0];
    },
    set: function (value) {
      this.array[0] = value;
    }
  });
  Object.defineProperty(Vec3.prototype, 'y', {
    get: function () {
      return this.array[1];
    },
    set: function (value) {
      this.array[1] = value;
    }
  });
  Object.defineProperty(Vec3.prototype, 'z', {
    get: function () {
      return this.array[2];
    },
    set: function (value) {
      this.array[2] = value;
    }
  });
  Vec3.prototype.cross_bmxtnp$ = function (other) {
    var ret = Vec3_init_0();
    vec3.cross(ret.array, this.array, other.array);
    return ret;
  };
  Vec3.prototype.normalize_0 = function () {
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
  Vec3.prototype.minus_bmxtnp$ = function (other) {
    return this.sub_bmxtnp$(other);
  };
  Vec3.prototype.sub_bmxtnp$ = function (other) {
    var ret = Vec3_init_0();
    vec3.subtract(ret.array, this.array, other.array);
    return ret;
  };
  Vec3.prototype.normalized = function () {
    var ret = this.copy_b5uka5$();
    ret.normalize_0();
    return ret;
  };
  Vec3.prototype.times_mx4ult$ = function (other) {
    var ret = Vec3_init_0();
    vec3.multiply(ret.array, this.array, Vec3_init(other, other, other).array);
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
  Vec3.prototype.component1 = function () {
    return this.array;
  };
  Vec3.prototype.copy_b5uka5$ = function (array) {
    return new Vec3(array === void 0 ? this.array : array);
  };
  Vec3.prototype.toString = function () {
    return 'Vec3(array=' + Kotlin.toString(this.array) + ')';
  };
  Vec3.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.array) | 0;
    return result;
  };
  Vec3.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.array, other.array))));
  };
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
  Dom$Companion.prototype.body_jiburq$ = function (children) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = this.append_0(Kotlin.isType(tmp$ = document.body, Element) ? tmp$ : throwCCE(), children), HTMLBodyElement) ? tmp$_0 : throwCCE();
  };
  Dom$Companion.prototype.div_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('div'), children), HTMLDivElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.canvas_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('canvas'), children), HTMLCanvasElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.a_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('a'), children), HTMLAnchorElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.p_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('p'), children), HTMLParagraphElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.input_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('input'), children), HTMLInputElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.label_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('label'), children), HTMLLabelElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.span_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('span'), children), HTMLSpanElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.h1_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('h1'), children), HTMLHeadingElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.h2_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('h2'), children), HTMLHeadingElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.pre_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('pre'), children), HTMLPreElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.code_jiburq$ = function (children) {
    var tmp$;
    return Kotlin.isType(tmp$ = this.append_0(document.createElement('code'), children), HTMLElement) ? tmp$ : throwCCE();
  };
  Dom$Companion.prototype.append_0 = function (element, children) {
    var tmp$;
    for (tmp$ = 0; tmp$ !== children.length; ++tmp$) {
      var element_0 = children[tmp$];
      if (typeof element_0 === 'string') {
        element.textContent = element.textContent + toString(element_0);
      }
       else {
        element.append(element_0);
      }
    }
    return element;
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
  _.launch_g2bo5h$ = launch;
  _.await_t11jrl$ = await_0;
  _.delay_s8cxhz$ = delay;
  _.Main = Main;
  _.main_kand9s$ = main;
  Object.defineProperty(Ajax, 'Companion', {
    get: Ajax$Companion_getInstance
  });
  var package$engine = _.engine || (_.engine = {});
  package$engine.Ajax = Ajax;
  package$engine.Camera = Camera;
  package$engine.Cube = Cube;
  package$engine.ShaderData = ShaderData;
  Object.defineProperty(Engine, 'Companion', {
    get: Engine$Companion_getInstance
  });
  package$engine.Engine = Engine;
  package$engine.Entity = Entity;
  package$engine.FirstPersonCamera = FirstPersonCamera;
  Object.defineProperty(Input, 'Companion', {
    get: Input$Companion_getInstance
  });
  package$engine.Input = Input;
  package$engine.Light = Light;
  package$engine.Material = Material;
  Object.defineProperty(ModelLoader, 'Companion', {
    get: ModelLoader$Companion_getInstance
  });
  package$engine.ModelLoader = ModelLoader;
  Object.defineProperty(Modes, 'Companion', {
    get: Modes$Companion_getInstance
  });
  package$engine.Modes = Modes;
  package$engine.ObjObject = ObjObject;
  package$engine.Particle = Particle;
  package$engine.ParticleSystem = ParticleSystem;
  package$engine.PostProcessingProfile = PostProcessingProfile;
  package$engine.PostProcessingShader = PostProcessingShader;
  package$engine.RenderingObject_init_pvmhkx$ = RenderingObject_init;
  package$engine.RenderingObject = RenderingObject;
  package$engine.Scene = Scene;
  package$engine.Shader = Shader;
  package$engine.VertextAttributeInfo = VertextAttributeInfo;
  package$engine.ShaderProgram = ShaderProgram;
  package$engine.Sphere = Sphere;
  package$engine.StandardShader = StandardShader;
  var package$math = _.math || (_.math = {});
  package$math.Mat3_init = Mat3_init;
  package$math.Mat3_init_o5v4nz$ = Mat3_init_0;
  package$math.Mat3 = Mat3;
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
