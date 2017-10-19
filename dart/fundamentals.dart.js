(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$ise=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isd)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="e"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="q"){processStatics(init.statics[b1]=b2.q,b3)
delete b2.q}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.c_"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.c_"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.c_(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.H=function(){}
var dart=[["","",,H,{"^":"",km:{"^":"e;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
bs:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bo:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.c1==null){H.jf()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.d7("Return interceptor for "+H.h(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bC()]
if(v!=null)return v
v=H.jn(a)
if(v!=null)return v
if(typeof a=="function")return C.H
y=Object.getPrototypeOf(a)
if(y==null)return C.u
if(y===Object.prototype)return C.u
if(typeof w=="function"){Object.defineProperty(w,$.$get$bC(),{value:C.j,enumerable:false,writable:true,configurable:true})
return C.j}return C.j},
d:{"^":"e;",
p:function(a,b){return a===b},
gw:function(a){return H.a9(a)},
j:["cn",function(a){return H.bf(a)}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|AudioParam|BarProp|Bluetooth|BluetoothAdvertisingData|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CacheStorage|CalcLength|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|CircularGeofencingRegion|Client|Clients|CompositorProxy|ConsoleBase|Coordinates|Credential|CredentialsContainer|Crypto|CryptoKey|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTColorBufferFloat|EXTDisjointTimerQuery|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|EffectModel|Entry|EntrySync|FederatedCredential|FileEntry|FileEntrySync|FileError|FileReaderSync|FileWriterSync|FontFace|FormData|GamepadButton|Geofencing|GeofencingRegion|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|ImageData|InjectedScriptHost|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|Iterator|KeyframeEffect|KeywordValue|LengthValue|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaMetadata|MediaSession|MemoryInfo|MessageChannel|Metadata|MutationObserver|MutationRecord|NFC|NavigatorStorageUtils|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NumberValue|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvas|PagePopupController|PasswordCredential|PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceObserver|PerformanceObserverEntryList|PerformanceRenderTiming|PerformanceResourceTiming|PerformanceTiming|PeriodicWave|Permissions|PositionError|PositionSensorVRDevice|PositionValue|Presentation|PushManager|PushMessageData|PushSubscription|RTCCertificate|RTCIceCandidate|RTCSessionDescription|RTCStatsReport|RTCStatsResponse|Range|ReadableByteStream|ReadableByteStreamReader|ReadableStreamReader|Request|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGRect|SVGUnitTypes|Screen|ScrollState|Selection|ServicePort|SharedArrayBuffer|SimpleLength|SourceInfo|SpeechRecognitionAlternative|SpeechSynthesisVoice|StorageInfo|StorageManager|StorageQuota|Stream|StyleMedia|StylePropertyMap|StyleValue|SubtleCrypto|SyncManager|TextMetrics|TrackDefault|TransformValue|TreeWalker|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRDevice|VREyeParameters|VRFieldOfView|VRPositionState|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WindowClient|WorkerConsole|Worklet|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
fr:{"^":"d;",
j:function(a){return String(a)},
gw:function(a){return a?519018:218159},
$isdL:1},
ft:{"^":"d;",
p:function(a,b){return null==b},
j:function(a){return"null"},
gw:function(a){return 0}},
bD:{"^":"d;",
gw:function(a){return 0},
j:["co",function(a){return String(a)}],
$isfu:1},
fJ:{"^":"bD;"},
b2:{"^":"bD;"},
aZ:{"^":"bD;",
j:function(a){var z=a[$.$get$cd()]
return z==null?this.co(a):J.a0(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aW:{"^":"d;$ti",
aP:function(a,b){if(!!a.immutable$list)throw H.c(new P.m(b))},
d0:function(a,b){if(!!a.fixed$length)throw H.c(new P.m(b))},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.W(a))}},
a1:function(a,b){return new H.bd(a,b,[H.Z(a,0),null])},
bQ:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.h(a[x])
if(x>=z)return H.f(y,x)
y[x]=w}return y.join(b)},
dd:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.W(a))}return y},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
cm:function(a,b,c){if(b<0||b>a.length)throw H.c(P.D(b,0,a.length,"start",null))
if(c<b||c>a.length)throw H.c(P.D(c,b,a.length,"end",null))
if(b===c)return H.I([],[H.Z(a,0)])
return H.I(a.slice(b,c),[H.Z(a,0)])},
gda:function(a){if(a.length>0)return a[0]
throw H.c(H.bB())},
gao:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.bB())},
b8:function(a,b,c,d,e){var z,y,x
this.aP(a,"setRange")
P.X(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.y(P.D(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.fp())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.f(d,x)
a[b+y]=d[x]}},
al:function(a,b,c,d){var z
this.aP(a,"fill range")
P.X(b,c,a.length,null,null,null)
for(z=b;z<c;++z)a[z]=d},
a_:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.C(a[z],b))return z
return-1},
an:function(a,b){return this.a_(a,b,0)},
gu:function(a){return a.length===0},
j:function(a){return P.bb(a,"[","]")},
gF:function(a){return new J.e9(a,a.length,0,null)},
gw:function(a){return H.a9(a)},
gi:function(a){return a.length},
si:function(a,b){this.d0(a,"set length")
if(b<0)throw H.c(P.D(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.z(a,b))
if(b>=a.length||b<0)throw H.c(H.z(a,b))
return a[b]},
l:function(a,b,c){this.aP(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.z(a,b))
if(b>=a.length||b<0)throw H.c(H.z(a,b))
a[b]=c},
$isk:1,
$ask:I.H,
$isb:1,
$asb:null,
$isa:1,
$asa:null},
kl:{"^":"aW;$ti"},
e9:{"^":"e;a,b,c,d",
gC:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.aM(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aX:{"^":"d;",
ab:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.D(b,2,36,"radix",null))
z=a.toString(b)
if(C.a.B(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.y(new P.m("Unexpected toString result: "+z))
x=J.F(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.a.b5("0",w)},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
b6:function(a){return-a},
L:function(a,b){if(typeof b!=="number")throw H.c(H.G(b))
return a+b},
ar:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
a4:function(a,b){return(a|0)===a?a/b|0:this.cV(a,b)},
cV:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.m("Result of truncating division is "+H.h(z)+": "+H.h(a)+" ~/ "+b))},
O:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
cU:function(a,b){if(b<0)throw H.c(H.G(b))
return b>31?0:a>>>b},
D:function(a,b){if(typeof b!=="number")throw H.c(H.G(b))
return a<b},
ad:function(a,b){if(typeof b!=="number")throw H.c(H.G(b))
return a>b},
$isb6:1},
cy:{"^":"aX;",$isb6:1,$isj:1},
fs:{"^":"aX;",$isb6:1},
aY:{"^":"d;",
B:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.z(a,b))
if(b<0)throw H.c(H.z(a,b))
if(b>=a.length)H.y(H.z(a,b))
return a.charCodeAt(b)},
t:function(a,b){if(b>=a.length)throw H.c(H.z(a,b))
return a.charCodeAt(b)},
L:function(a,b){if(typeof b!=="string")throw H.c(P.c4(b,null,null))
return a+b},
a2:function(a,b,c,d){var z,y
H.dM(b)
c=P.X(b,c,a.length,null,null,null)
z=a.substring(0,b)
y=a.substring(c)
return z+d+y},
J:function(a,b,c){var z
H.dM(c)
if(typeof c!=="number")return c.D()
if(c<0||c>a.length)throw H.c(P.D(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
I:function(a,b){return this.J(a,b,0)},
k:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)H.y(H.G(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.y(H.G(c))
if(typeof b!=="number")return b.D()
if(b<0)throw H.c(P.bg(b,null,null))
if(typeof c!=="number")return H.B(c)
if(b>c)throw H.c(P.bg(b,null,null))
if(c>a.length)throw H.c(P.bg(c,null,null))
return a.substring(b,c)},
ae:function(a,b){return this.k(a,b,null)},
b5:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.x)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
a_:function(a,b,c){var z
if(c<0||c>a.length)throw H.c(P.D(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
an:function(a,b){return this.a_(a,b,0)},
d2:function(a,b,c){if(c>a.length)throw H.c(P.D(c,0,a.length,null,null))
return H.jv(a,b,c)},
gu:function(a){return a.length===0},
j:function(a){return a},
gw:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.z(a,b))
if(b>=a.length||b<0)throw H.c(H.z(a,b))
return a[b]},
$isk:1,
$ask:I.H,
$isp:1}}],["","",,H,{"^":"",
bq:function(a){var z,y
z=a^48
if(z<=9)return z
y=a|32
if(97<=y&&y<=102)return y-87
return-1},
bB:function(){return new P.bP("No element")},
fp:function(){return new P.bP("Too few elements")},
ej:{"^":"d8;a",
gi:function(a){return this.a.length},
h:function(a,b){return C.a.B(this.a,b)},
$asd8:function(){return[P.j]},
$ascz:function(){return[P.j]},
$asb:function(){return[P.j]},
$asa:function(){return[P.j]}},
a:{"^":"T;$ti",$asa:null},
b_:{"^":"a;$ti",
gF:function(a){return new H.cA(this,this.gi(this),0,null)},
Z:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.n(0,y))
if(z!==this.gi(this))throw H.c(new P.W(this))}},
gu:function(a){return this.gi(this)===0},
a1:function(a,b){return new H.bd(this,b,[H.L(this,"b_",0),null])},
b0:function(a,b){var z,y,x
z=H.I([],[H.L(this,"b_",0)])
C.c.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y){x=this.n(0,y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
b_:function(a){return this.b0(a,!0)}},
cA:{"^":"e;a,b,c,d",
gC:function(){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.F(z)
x=y.gi(z)
if(this.b!==x)throw H.c(new P.W(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.n(z,w);++this.c
return!0}},
cB:{"^":"T;a,b,$ti",
gF:function(a){return new H.fD(null,J.b8(this.a),this.b,this.$ti)},
gi:function(a){return J.V(this.a)},
gu:function(a){return J.by(this.a)},
$asT:function(a,b){return[b]},
q:{
bc:function(a,b,c,d){if(!!J.o(a).$isa)return new H.cl(a,b,[c,d])
return new H.cB(a,b,[c,d])}}},
cl:{"^":"cB;a,b,$ti",$isa:1,
$asa:function(a,b){return[b]}},
fD:{"^":"fq;a,b,c,$ti",
v:function(){var z=this.b
if(z.v()){this.a=this.c.$1(z.gC())
return!0}this.a=null
return!1},
gC:function(){return this.a}},
bd:{"^":"b_;a,b,$ti",
gi:function(a){return J.V(this.a)},
n:function(a,b){return this.b.$1(J.e3(this.a,b))},
$asb_:function(a,b){return[b]},
$asa:function(a,b){return[b]},
$asT:function(a,b){return[b]}},
cv:{"^":"e;$ti"},
hg:{"^":"e;$ti",
l:function(a,b,c){throw H.c(new P.m("Cannot modify an unmodifiable list"))},
al:function(a,b,c,d){throw H.c(new P.m("Cannot modify an unmodifiable list"))},
$isb:1,
$asb:null,
$isa:1,
$asa:null},
d8:{"^":"cz+hg;$ti",$asb:null,$asa:null,$isb:1,$isa:1}}],["","",,H,{"^":"",
b4:function(a,b){var z=a.a6(b)
if(!init.globalState.d.cy)init.globalState.f.aa()
return z},
dY:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isb)throw H.c(P.aP("Arguments to main must be a List: "+H.h(y)))
init.globalState=new H.i3(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$cw()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.hG(P.bG(null,H.b3),0)
x=P.j
y.z=new H.am(0,null,null,null,null,null,0,[x,H.bU])
y.ch=new H.am(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.i2()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fi,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.i4)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.ay(null,null,null,x)
v=new H.bh(0,null,!1)
u=new H.bU(y,new H.am(0,null,null,null,null,null,0,[x,H.bh]),w,init.createNewIsolate(),v,new H.ak(H.bu()),new H.ak(H.bu()),!1,!1,[],P.ay(null,null,null,null),null,null,!1,!0,P.ay(null,null,null,null))
w.X(0,0)
u.bb(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ar(a,{func:1,args:[,]}))u.a6(new H.jt(z,a))
else if(H.ar(a,{func:1,args:[,,]}))u.a6(new H.ju(z,a))
else u.a6(a)
init.globalState.f.aa()},
fm:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fn()
return},
fn:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.m("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.m('Cannot extract URI from "'+z+'"'))},
fi:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bk(!0,[]).S(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bk(!0,[]).S(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bk(!0,[]).S(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.j
p=P.ay(null,null,null,q)
o=new H.bh(0,null,!1)
n=new H.bU(y,new H.am(0,null,null,null,null,null,0,[q,H.bh]),p,init.createNewIsolate(),o,new H.ak(H.bu()),new H.ak(H.bu()),!1,!1,[],P.ay(null,null,null,null),null,null,!1,!0,P.ay(null,null,null,null))
p.X(0,0)
n.bb(0,o)
init.globalState.f.a.N(0,new H.b3(n,new H.fj(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aa()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.au(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aa()
break
case"close":init.globalState.ch.a9(0,$.$get$cx().h(0,a))
a.terminate()
init.globalState.f.aa()
break
case"log":H.fh(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ax(["command","print","msg",z])
q=new H.an(!0,P.aF(null,P.j)).H(q)
y.toString
self.postMessage(q)}else P.bt(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
fh:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ax(["command","log","msg",a])
x=new H.an(!0,P.aF(null,P.j)).H(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.R(w)
z=H.P(w)
y=P.aT(z)
throw H.c(y)}},
fk:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.cN=$.cN+("_"+y)
$.cO=$.cO+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.au(f,["spawned",new H.bl(y,x),w,z.r])
x=new H.fl(a,b,c,d,z)
if(e===!0){z.bD(w,w)
init.globalState.f.a.N(0,new H.b3(z,x,"start isolate"))}else x.$0()},
iE:function(a){return new H.bk(!0,[]).S(new H.an(!1,P.aF(null,P.j)).H(a))},
jt:{"^":"i:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
ju:{"^":"i:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
i3:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
i4:function(a){var z=P.ax(["command","print","msg",a])
return new H.an(!0,P.aF(null,P.j)).H(z)}}},
bU:{"^":"e;a,b,c,dq:d<,d3:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bD:function(a,b){if(!this.f.p(0,a))return
if(this.Q.X(0,b)&&!this.y)this.y=!0
this.aM()},
dw:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a9(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.f(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.f(v,w)
v[w]=x
if(w===y.c)y.bj();++y.d}this.y=!1}this.aM()},
cX:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.f(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
dv:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.p(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.y(new P.m("removeRange"))
P.X(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
ck:function(a,b){if(!this.r.p(0,a))return
this.db=b},
dg:function(a,b,c){var z=J.o(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){J.au(a,c)
return}z=this.cx
if(z==null){z=P.bG(null,null)
this.cx=z}z.N(0,new H.hY(a,c))},
df:function(a,b){var z
if(!this.r.p(0,a))return
z=J.o(b)
if(!z.p(b,0))z=z.p(b,1)&&!this.cy
else z=!0
if(z){this.aS()
return}z=this.cx
if(z==null){z=P.bG(null,null)
this.cx=z}z.N(0,this.gdr())},
dh:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bt(a)
if(b!=null)P.bt(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a0(a)
y[1]=b==null?null:J.a0(b)
for(x=new P.dm(z,z.r,null,null),x.c=z.e;x.v();)J.au(x.d,y)},
a6:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.R(u)
v=H.P(u)
this.dh(w,v)
if(this.db===!0){this.aS()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gdq()
if(this.cx!=null)for(;t=this.cx,!t.gu(t);)this.cx.bY().$0()}return y},
bU:function(a){return this.b.h(0,a)},
bb:function(a,b){var z=this.b
if(z.ak(0,a))throw H.c(P.aT("Registry: ports must be registered only once."))
z.l(0,a,b)},
aM:function(){var z=this.b
if(z.gi(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.aS()},
aS:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.Y(0)
for(z=this.b,y=z.gc6(z),y=y.gF(y);y.v();)y.gC().cD()
z.Y(0)
this.c.Y(0)
init.globalState.z.a9(0,this.a)
this.dx.Y(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.f(z,v)
J.au(w,z[v])}this.ch=null}},"$0","gdr",0,0,1]},
hY:{"^":"i:1;a,b",
$0:function(){J.au(this.a,this.b)}},
hG:{"^":"e;a,b",
d5:function(){var z=this.a
if(z.b===z.c)return
return z.bY()},
c1:function(){var z,y,x
z=this.d5()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ak(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gu(y)}else y=!1
else y=!1
else y=!1
if(y)H.y(P.aT("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gu(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ax(["command","close"])
x=new H.an(!0,new P.dn(0,null,null,null,null,null,0,[null,P.j])).H(x)
y.toString
self.postMessage(x)}return!1}z.du()
return!0},
bw:function(){if(self.window!=null)new H.hH(this).$0()
else for(;this.c1(););},
aa:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.bw()
else try{this.bw()}catch(x){z=H.R(x)
y=H.P(x)
w=init.globalState.Q
v=P.ax(["command","error","msg",H.h(z)+"\n"+H.h(y)])
v=new H.an(!0,P.aF(null,P.j)).H(v)
w.toString
self.postMessage(v)}}},
hH:{"^":"i:1;a",
$0:function(){if(!this.a.c1())return
P.hc(C.m,this)}},
b3:{"^":"e;a,b,c",
du:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.a6(this.b)}},
i2:{"^":"e;"},
fj:{"^":"i:0;a,b,c,d,e,f",
$0:function(){H.fk(this.a,this.b,this.c,this.d,this.e,this.f)}},
fl:{"^":"i:1;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ar(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ar(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.aM()}},
df:{"^":"e;"},
bl:{"^":"df;b,a",
P:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gbn())return
x=H.iE(b)
if(z.gd3()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.bD(y.h(x,1),y.h(x,2))
break
case"resume":z.dw(y.h(x,1))
break
case"add-ondone":z.cX(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.dv(y.h(x,1))
break
case"set-errors-fatal":z.ck(y.h(x,1),y.h(x,2))
break
case"ping":z.dg(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.df(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.X(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a9(0,y)
break}return}init.globalState.f.a.N(0,new H.b3(z,new H.i6(this,x),"receive"))},
p:function(a,b){if(b==null)return!1
return b instanceof H.bl&&J.C(this.b,b.b)},
gw:function(a){return this.b.gaF()}},
i6:{"^":"i:0;a,b",
$0:function(){var z=this.a.b
if(!z.gbn())z.cz(0,this.b)}},
bW:{"^":"df;b,c,a",
P:function(a,b){var z,y,x
z=P.ax(["command","message","port",this,"msg",b])
y=new H.an(!0,P.aF(null,P.j)).H(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
p:function(a,b){if(b==null)return!1
return b instanceof H.bW&&J.C(this.b,b.b)&&J.C(this.a,b.a)&&J.C(this.c,b.c)},
gw:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.at()
y=this.a
if(typeof y!=="number")return y.at()
x=this.c
if(typeof x!=="number")return H.B(x)
return(z<<16^y<<8^x)>>>0}},
bh:{"^":"e;aF:a<,b,bn:c<",
cD:function(){this.c=!0
this.b=null},
cz:function(a,b){if(this.c)return
this.b.$1(b)},
$isfT:1},
h8:{"^":"e;a,b,c",
cs:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.N(0,new H.b3(y,new H.ha(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aL(new H.hb(this,b),0),a)}else throw H.c(new P.m("Timer greater than 0."))},
q:{
h9:function(a,b){var z=new H.h8(!0,!1,null)
z.cs(a,b)
return z}}},
ha:{"^":"i:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hb:{"^":"i:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ak:{"^":"e;aF:a<",
gw:function(a){var z=this.a
if(typeof z!=="number")return z.cl()
z=C.e.O(z,0)^C.e.a4(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
p:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ak){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
an:{"^":"e;a,b",
H:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gi(z))
z=J.o(a)
if(!!z.$iscD)return["buffer",a]
if(!!z.$isbK)return["typed",a]
if(!!z.$isk)return this.cf(a)
if(!!z.$isfg){x=this.gcc()
w=z.gbR(a)
w=H.bc(w,x,H.L(w,"T",0),null)
w=P.bH(w,!0,H.L(w,"T",0))
z=z.gc6(a)
z=H.bc(z,x,H.L(z,"T",0),null)
return["map",w,P.bH(z,!0,H.L(z,"T",0))]}if(!!z.$isfu)return this.cg(a)
if(!!z.$isd)this.c3(a)
if(!!z.$isfT)this.ac(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbl)return this.ci(a)
if(!!z.$isbW)return this.cj(a)
if(!!z.$isi){v=a.$static_name
if(v==null)this.ac(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isak)return["capability",a.a]
if(!(a instanceof P.e))this.c3(a)
return["dart",init.classIdExtractor(a),this.ce(init.classFieldsExtractor(a))]},"$1","gcc",2,0,2],
ac:function(a,b){throw H.c(new P.m((b==null?"Can't transmit:":b)+" "+H.h(a)))},
c3:function(a){return this.ac(a,null)},
cf:function(a){var z=this.cd(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.ac(a,"Can't serialize indexable: ")},
cd:function(a){var z,y,x
z=[]
C.c.si(z,a.length)
for(y=0;y<a.length;++y){x=this.H(a[y])
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
ce:function(a){var z
for(z=0;z<a.length;++z)C.c.l(a,z,this.H(a[z]))
return a},
cg:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.ac(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.si(y,z.length)
for(x=0;x<z.length;++x){w=this.H(a[z[x]])
if(x>=y.length)return H.f(y,x)
y[x]=w}return["js-object",z,y]},
cj:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
ci:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gaF()]
return["raw sendport",a]}},
bk:{"^":"e;a,b",
S:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.aP("Bad serialized message: "+H.h(a)))
switch(C.c.gda(a)){case"ref":if(1>=a.length)return H.f(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.f(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.I(this.a5(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return H.I(this.a5(x),[null])
case"mutable":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return this.a5(x)
case"const":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
y=H.I(this.a5(x),[null])
y.fixed$length=Array
return y
case"map":return this.d8(a)
case"sendport":return this.d9(a)
case"raw sendport":if(1>=a.length)return H.f(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.d7(a)
case"function":if(1>=a.length)return H.f(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.f(a,1)
return new H.ak(a[1])
case"dart":y=a.length
if(1>=y)return H.f(a,1)
w=a[1]
if(2>=y)return H.f(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.a5(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.h(a))}},"$1","gd6",2,0,2],
a5:function(a){var z,y,x
z=J.F(a)
y=0
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.B(x)
if(!(y<x))break
z.l(a,y,this.S(z.h(a,y)));++y}return a},
d8:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w=P.bF()
this.b.push(w)
y=J.e6(y,this.gd6()).b_(0)
for(z=J.F(y),v=J.F(x),u=0;u<z.gi(y);++u){if(u>=y.length)return H.f(y,u)
w.l(0,y[u],this.S(v.h(x,u)))}return w},
d9:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
if(3>=z)return H.f(a,3)
w=a[3]
if(J.C(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bU(w)
if(u==null)return
t=new H.bl(u,x)}else t=new H.bW(y,w,x)
this.b.push(t)
return t},
d7:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.f(a,1)
y=a[1]
if(2>=z)return H.f(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.F(y)
v=J.F(x)
u=0
while(!0){t=z.gi(y)
if(typeof t!=="number")return H.B(t)
if(!(u<t))break
w[z.h(y,u)]=this.S(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
el:function(){throw H.c(new P.m("Cannot modify unmodifiable Map"))},
ja:function(a){return init.types[a]},
dS:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.o(a).$isl},
h:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a0(a)
if(typeof z!=="string")throw H.c(H.G(a))
return z},
a9:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bL:function(a,b){if(b==null)throw H.c(new P.A(a,null,null))
return b.$1(a)},
aB:function(a,b,c){var z,y,x,w,v,u
H.j0(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.bL(a,c)
if(3>=z.length)return H.f(z,3)
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.bL(a,c)}if(b<2||b>36)throw H.c(P.D(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.a.t(w,u)|32)>x)return H.bL(a,c)}return parseInt(a,b)},
cP:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.A||!!J.o(a).$isb2){v=C.o(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.a.t(w,0)===36)w=C.a.ae(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.dT(H.bp(a),0,null),init.mangledGlobalNames)},
bf:function(a){return"Instance of '"+H.cP(a)+"'"},
fK:function(){if(!!self.location)return self.location.href
return},
cL:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
fR:function(a){var z,y,x,w
z=H.I([],[P.j])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.aM)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.c(H.G(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.b.O(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.c(H.G(w))}return H.cL(z)},
cR:function(a){var z,y,x,w
for(z=a.length,y=0;x=a.length,y<x;x===z||(0,H.aM)(a),++y){w=a[y]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.c(H.G(w))
if(w<0)throw H.c(H.G(w))
if(w>65535)return H.fR(a)}return H.cL(a)},
fS:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
bN:function(a){var z
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.b.O(z,10))>>>0,56320|z&1023)}}throw H.c(P.D(a,0,1114111,null,null))},
M:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fQ:function(a){return a.b?H.M(a).getUTCFullYear()+0:H.M(a).getFullYear()+0},
fO:function(a){return a.b?H.M(a).getUTCMonth()+1:H.M(a).getMonth()+1},
fL:function(a){return a.b?H.M(a).getUTCDate()+0:H.M(a).getDate()+0},
fM:function(a){return a.b?H.M(a).getUTCHours()+0:H.M(a).getHours()+0},
fN:function(a){return a.b?H.M(a).getUTCMinutes()+0:H.M(a).getMinutes()+0},
fP:function(a){return a.b?H.M(a).getUTCSeconds()+0:H.M(a).getSeconds()+0},
cM:function(a){return a.b?H.M(a).getUTCMilliseconds()+0:H.M(a).getMilliseconds()+0},
bM:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.G(a))
return a[b]},
cQ:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.G(a))
a[b]=c},
B:function(a){throw H.c(H.G(a))},
f:function(a,b){if(a==null)J.V(a)
throw H.c(H.z(a,b))},
z:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a1(!0,b,"index",null)
z=J.V(a)
if(!(b<0)){if(typeof z!=="number")return H.B(z)
y=b>=z}else y=!0
if(y)return P.w(b,a,"index",null,z)
return P.bg(b,"index",null)},
G:function(a){return new P.a1(!0,a,null,null)},
dM:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.G(a))
return a},
j0:function(a){if(typeof a!=="string")throw H.c(H.G(a))
return a},
c:function(a){var z
if(a==null)a=new P.cK()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dZ})
z.name=""}else z.toString=H.dZ
return z},
dZ:function(){return J.a0(this.dartException)},
y:function(a){throw H.c(a)},
aM:function(a){throw H.c(new P.W(a))},
R:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jx(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.O(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bE(H.h(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.h(y)+" (Error "+w+")"
return z.$1(new H.cJ(v,null))}}if(a instanceof TypeError){u=$.$get$cX()
t=$.$get$cY()
s=$.$get$cZ()
r=$.$get$d_()
q=$.$get$d3()
p=$.$get$d4()
o=$.$get$d1()
$.$get$d0()
n=$.$get$d6()
m=$.$get$d5()
l=u.K(y)
if(l!=null)return z.$1(H.bE(y,l))
else{l=t.K(y)
if(l!=null){l.method="call"
return z.$1(H.bE(y,l))}else{l=s.K(y)
if(l==null){l=r.K(y)
if(l==null){l=q.K(y)
if(l==null){l=p.K(y)
if(l==null){l=o.K(y)
if(l==null){l=r.K(y)
if(l==null){l=n.K(y)
if(l==null){l=m.K(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.cJ(y,l==null?null:l.method))}}return z.$1(new H.hf(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cT()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a1(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cT()
return a},
P:function(a){var z
if(a==null)return new H.dp(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dp(a,null)},
jr:function(a){if(a==null||typeof a!='object')return J.a_(a)
else return H.a9(a)},
j7:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
jh:function(a,b,c,d,e,f,g){switch(c){case 0:return H.b4(b,new H.ji(a))
case 1:return H.b4(b,new H.jj(a,d))
case 2:return H.b4(b,new H.jk(a,d,e))
case 3:return H.b4(b,new H.jl(a,d,e,f))
case 4:return H.b4(b,new H.jm(a,d,e,f,g))}throw H.c(P.aT("Unsupported number of arguments for wrapped closure"))},
aL:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jh)
a.$identity=z
return z},
ei:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isb){z.$reflectionInfo=c
x=H.fV(z).r}else x=c
w=d?Object.create(new H.fZ().constructor.prototype):Object.create(new H.bz(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.S
$.S=J.aN(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.c8(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ja,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.c7:H.bA
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.c8(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
ef:function(a,b,c,d){var z=H.bA
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
c8:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.eh(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ef(y,!w,z,b)
if(y===0){w=$.S
$.S=J.aN(w,1)
u="self"+H.h(w)
w="return function(){var "+u+" = this."
v=$.av
if(v==null){v=H.ba("self")
$.av=v}return new Function(w+H.h(v)+";return "+u+"."+H.h(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.S
$.S=J.aN(w,1)
t+=H.h(w)
w="return function("+t+"){return this."
v=$.av
if(v==null){v=H.ba("self")
$.av=v}return new Function(w+H.h(v)+"."+H.h(z)+"("+t+");}")()},
eg:function(a,b,c,d){var z,y
z=H.bA
y=H.c7
switch(b?-1:a){case 0:throw H.c(new H.fW("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eh:function(a,b){var z,y,x,w,v,u,t,s
z=H.ed()
y=$.c6
if(y==null){y=H.ba("receiver")
$.c6=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eg(w,!u,x,b)
if(w===1){y="return function(){return this."+H.h(z)+"."+H.h(x)+"(this."+H.h(y)+");"
u=$.S
$.S=J.aN(u,1)
return new Function(y+H.h(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.h(z)+"."+H.h(x)+"(this."+H.h(y)+", "+s+");"
u=$.S
$.S=J.aN(u,1)
return new Function(y+H.h(u)+"}")()},
c_:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isb){c.fixed$length=Array
z=c}else z=c
return H.ei(a,b,z,!!d,e,f)},
j5:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ar:function(a,b){var z
if(a==null)return!1
z=H.j5(a)
return z==null?!1:H.dR(z,b)},
jw:function(a){throw H.c(new P.ep(a))},
bu:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
dP:function(a){return init.getIsolateTag(a)},
I:function(a,b){a.$ti=b
return a},
bp:function(a){if(a==null)return
return a.$ti},
dQ:function(a,b){return H.c3(a["$as"+H.h(b)],H.bp(a))},
L:function(a,b,c){var z=H.dQ(a,b)
return z==null?null:z[c]},
Z:function(a,b){var z=H.bp(a)
return z==null?null:z[b]},
at:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dT(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.h(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.at(z,b)
return H.iN(a,b)}return"unknown-reified-type"},
iN:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.at(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.at(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.at(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.j6(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.at(r[p],b)+(" "+H.h(p))}w+="}"}return"("+w+") => "+z},
dT:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.Y("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.m=v+", "
u=a[y]
if(u!=null)w=!1
v=z.m+=H.at(u,c)}return w?"":"<"+z.j(0)+">"},
c3:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bZ:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bp(a)
y=J.o(a)
if(y[b]==null)return!1
return H.dJ(H.c3(y[d],z),c)},
dJ:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.O(a[y],b[y]))return!1
return!0},
dN:function(a,b,c){return a.apply(b,H.dQ(b,c))},
O:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="be")return!0
if('func' in b)return H.dR(a,b)
if('func' in a)return b.builtin$cls==="kd"||b.builtin$cls==="e"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.at(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.dJ(H.c3(u,z),x)},
dI:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.O(z,v)||H.O(v,z)))return!1}return!0},
iU:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.O(v,u)||H.O(u,v)))return!1}return!0},
dR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.O(z,y)||H.O(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.dI(x,w,!1))return!1
if(!H.dI(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.O(o,n)||H.O(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.O(o,n)||H.O(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.O(o,n)||H.O(n,o)))return!1}}return H.iU(a.named,b.named)},
m0:function(a){var z=$.c0
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
lZ:function(a){return H.a9(a)},
lY:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jn:function(a){var z,y,x,w,v,u
z=$.c0.$1(a)
y=$.bn[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.br[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.dH.$2(a,z)
if(z!=null){y=$.bn[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.br[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c2(x)
$.bn[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.br[z]=x
return x}if(v==="-"){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dV(a,x)
if(v==="*")throw H.c(new P.d7(z))
if(init.leafTags[z]===true){u=H.c2(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dV(a,x)},
dV:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bs(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c2:function(a){return J.bs(a,!1,null,!!a.$isl)},
jq:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bs(z,!1,null,!!z.$isl)
else return J.bs(z,c,null,null)},
jf:function(){if(!0===$.c1)return
$.c1=!0
H.jg()},
jg:function(){var z,y,x,w,v,u,t,s
$.bn=Object.create(null)
$.br=Object.create(null)
H.jb()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dW.$1(v)
if(u!=null){t=H.jq(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jb:function(){var z,y,x,w,v,u,t
z=C.B()
z=H.aq(C.C,H.aq(C.D,H.aq(C.n,H.aq(C.n,H.aq(C.F,H.aq(C.E,H.aq(C.G(C.o),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c0=new H.jc(v)
$.dH=new H.jd(u)
$.dW=new H.je(t)},
aq:function(a,b){return a(b)||b},
jv:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
ek:{"^":"e;",
gu:function(a){return this.gi(this)===0},
j:function(a){return P.cC(this)},
l:function(a,b,c){return H.el()}},
em:{"^":"ek;a,b,c,$ti",
gi:function(a){return this.a},
ak:function(a,b){if(typeof b!=="string")return!1
if("__proto__"===b)return!1
return this.b.hasOwnProperty(b)},
h:function(a,b){if(!this.ak(0,b))return
return this.bi(b)},
bi:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.bi(w))}}},
fU:{"^":"e;a,b,c,d,e,f,r,x",q:{
fV:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.fU(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
he:{"^":"e;a,b,c,d,e,f",
K:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
q:{
U:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.he(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bi:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
d2:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cJ:{"^":"J;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.h(this.a)
return"NullError: method not found: '"+H.h(z)+"' on null"}},
fw:{"^":"J;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.h(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.h(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.h(this.a)+")"},
q:{
bE:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fw(a,y,z?null:b.receiver)}}},
hf:{"^":"J;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jx:{"^":"i:2;a",
$1:function(a){if(!!J.o(a).$isJ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dp:{"^":"e;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ji:{"^":"i:0;a",
$0:function(){return this.a.$0()}},
jj:{"^":"i:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jk:{"^":"i:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jl:{"^":"i:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jm:{"^":"i:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
i:{"^":"e;",
j:function(a){return"Closure '"+H.cP(this).trim()+"'"},
gc7:function(){return this},
gc7:function(){return this}},
cW:{"^":"i;"},
fZ:{"^":"cW;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bz:{"^":"cW;a,b,c,d",
p:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bz))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.a9(this.a)
else y=typeof z!=="object"?J.a_(z):H.a9(z)
z=H.a9(this.b)
if(typeof y!=="number")return y.dE()
return(y^z)>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.h(this.d)+"' of "+H.bf(z)},
q:{
bA:function(a){return a.a},
c7:function(a){return a.c},
ed:function(){var z=$.av
if(z==null){z=H.ba("self")
$.av=z}return z},
ba:function(a){var z,y,x,w,v
z=new H.bz("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fW:{"^":"J;a",
j:function(a){return"RuntimeError: "+H.h(this.a)}},
am:{"^":"e;a,b,c,d,e,f,r,$ti",
gi:function(a){return this.a},
gu:function(a){return this.a===0},
gbR:function(a){return new H.fy(this,[H.Z(this,0)])},
gc6:function(a){return H.bc(this.gbR(this),new H.fv(this),H.Z(this,0),H.Z(this,1))},
ak:function(a,b){var z
if((b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return this.cG(z,b)}else return this.dl(b)},
dl:function(a){var z=this.d
if(z==null)return!1
return this.a8(this.ah(z,this.a7(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a3(z,b)
return y==null?null:y.gT()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a3(x,b)
return y==null?null:y.gT()}else return this.dm(b)},
dm:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ah(z,this.a7(a))
x=this.a8(y,a)
if(x<0)return
return y[x].gT()},
l:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.aH()
this.b=z}this.ba(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aH()
this.c=y}this.ba(y,b,c)}else{x=this.d
if(x==null){x=this.aH()
this.d=x}w=this.a7(b)
v=this.ah(x,w)
if(v==null)this.aL(x,w,[this.aI(b,c)])
else{u=this.a8(v,b)
if(u>=0)v[u].sT(c)
else v.push(this.aI(b,c))}}},
a9:function(a,b){if(typeof b==="string")return this.bv(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bv(this.c,b)
else return this.dn(b)},
dn:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ah(z,this.a7(a))
x=this.a8(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.bB(w)
return w.gT()},
Y:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.W(this))
z=z.c}},
ba:function(a,b,c){var z=this.a3(a,b)
if(z==null)this.aL(a,b,this.aI(b,c))
else z.sT(c)},
bv:function(a,b){var z
if(a==null)return
z=this.a3(a,b)
if(z==null)return
this.bB(z)
this.bf(a,b)
return z.gT()},
aI:function(a,b){var z,y
z=new H.fx(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
bB:function(a){var z,y
z=a.gcP()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
a7:function(a){return J.a_(a)&0x3ffffff},
a8:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.C(a[y].gbP(),b))return y
return-1},
j:function(a){return P.cC(this)},
a3:function(a,b){return a[b]},
ah:function(a,b){return a[b]},
aL:function(a,b,c){a[b]=c},
bf:function(a,b){delete a[b]},
cG:function(a,b){return this.a3(a,b)!=null},
aH:function(){var z=Object.create(null)
this.aL(z,"<non-identifier-key>",z)
this.bf(z,"<non-identifier-key>")
return z},
$isfg:1},
fv:{"^":"i:2;a",
$1:function(a){return this.a.h(0,a)}},
fx:{"^":"e;bP:a<,T:b@,c,cP:d<"},
fy:{"^":"a;a,$ti",
gi:function(a){return this.a.a},
gu:function(a){return this.a.a===0},
gF:function(a){var z,y
z=this.a
y=new H.fz(z,z.r,null,null)
y.c=z.e
return y}},
fz:{"^":"e;a,b,c,d",
gC:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.W(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jc:{"^":"i:2;a",
$1:function(a){return this.a(a)}},
jd:{"^":"i:8;a",
$2:function(a,b){return this.a(a,b)}},
je:{"^":"i:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
j6:function(a){var z=H.I(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
js:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
dx:function(a){return a},
dy:function(a){return a},
fG:function(a){return new Int8Array(H.dy(a))},
cD:{"^":"d;",$iscD:1,"%":"ArrayBuffer"},
bK:{"^":"d;",$isbK:1,"%":"DataView;ArrayBufferView;bI|cE|cG|bJ|cF|cH|a7"},
bI:{"^":"bK;",
gi:function(a){return a.length},
$isl:1,
$asl:I.H,
$isk:1,
$ask:I.H},
bJ:{"^":"cG;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
a[b]=c}},
cE:{"^":"bI+u;",$asl:I.H,$ask:I.H,
$asb:function(){return[P.aj]},
$asa:function(){return[P.aj]},
$isb:1,
$isa:1},
cG:{"^":"cE+cv;",$asl:I.H,$ask:I.H,
$asb:function(){return[P.aj]},
$asa:function(){return[P.aj]}},
a7:{"^":"cH;",
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
a[b]=c},
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]}},
cF:{"^":"bI+u;",$asl:I.H,$ask:I.H,
$asb:function(){return[P.j]},
$asa:function(){return[P.j]},
$isb:1,
$isa:1},
cH:{"^":"cF+cv;",$asl:I.H,$ask:I.H,
$asb:function(){return[P.j]},
$asa:function(){return[P.j]}},
kB:{"^":"bJ;",$isb:1,
$asb:function(){return[P.aj]},
$isa:1,
$asa:function(){return[P.aj]},
"%":"Float32Array"},
kC:{"^":"bJ;",$isb:1,
$asb:function(){return[P.aj]},
$isa:1,
$asa:function(){return[P.aj]},
"%":"Float64Array"},
kD:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]},
"%":"Int16Array"},
kE:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]},
"%":"Int32Array"},
kF:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]},
"%":"Int8Array"},
kG:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]},
"%":"Uint16Array"},
kH:{"^":"a7;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]},
"%":"Uint32Array"},
kI:{"^":"a7;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
cI:{"^":"a7;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.z(a,b))
return a[b]},
$iscI:1,
$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
hs:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iV()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aL(new P.hu(z),1)).observe(y,{childList:true})
return new P.ht(z,y,x)}else if(self.setImmediate!=null)return P.iW()
return P.iX()},
lz:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aL(new P.hv(a),0))},"$1","iV",2,0,3],
lA:[function(a){++init.globalState.f.b
self.setImmediate(H.aL(new P.hw(a),0))},"$1","iW",2,0,3],
lB:[function(a){P.bQ(C.m,a)},"$1","iX",2,0,3],
dA:function(a,b){if(H.ar(a,{func:1,args:[P.be,P.be]})){b.toString
return a}else{b.toString
return a}},
iP:function(){var z,y
for(;z=$.ap,z!=null;){$.aI=null
y=z.b
$.ap=y
if(y==null)$.aH=null
z.a.$0()}},
lX:[function(){$.bX=!0
try{P.iP()}finally{$.aI=null
$.bX=!1
if($.ap!=null)$.$get$bS().$1(P.dK())}},"$0","dK",0,0,1],
dG:function(a){var z=new P.dd(a,null)
if($.ap==null){$.aH=z
$.ap=z
if(!$.bX)$.$get$bS().$1(P.dK())}else{$.aH.b=z
$.aH=z}},
iS:function(a){var z,y,x
z=$.ap
if(z==null){P.dG(a)
$.aI=$.aH
return}y=new P.dd(a,null)
x=$.aI
if(x==null){y.b=z
$.aI=y
$.ap=y}else{y.b=x.b
x.b=y
$.aI=y
if(y.b==null)$.aH=y}},
dX:function(a){var z=$.r
if(C.d===z){P.bm(null,null,C.d,a)
return}z.toString
P.bm(null,null,z,z.aN(a,!0))},
lV:[function(a){},"$1","iY",2,0,19],
iQ:[function(a,b){var z=$.r
z.toString
P.aJ(null,null,z,a,b)},function(a){return P.iQ(a,null)},"$2","$1","j_",2,2,4,0],
lW:[function(){},"$0","iZ",0,0,1],
iC:function(a,b,c){var z=a.aO(0)
if(!!J.o(z).$isal&&z!==$.$get$aU())z.b2(new P.iD(b,c))
else b.W(c)},
iB:function(a,b,c){$.r.toString
a.au(b,c)},
hc:function(a,b){var z=$.r
if(z===C.d){z.toString
return P.bQ(a,b)}return P.bQ(a,z.aN(b,!0))},
bQ:function(a,b){var z=C.b.a4(a.a,1000)
return H.h9(z<0?0:z,b)},
hr:function(){return $.r},
aJ:function(a,b,c,d,e){var z={}
z.a=d
P.iS(new P.iR(z,e))},
dB:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
dD:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
dC:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
bm:function(a,b,c,d){var z=C.d!==c
if(z)d=c.aN(d,!(!z||!1))
P.dG(d)},
hu:{"^":"i:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
ht:{"^":"i:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hv:{"^":"i:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
hw:{"^":"i:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
dj:{"^":"e;aJ:a<,b,c,d,e",
gcW:function(){return this.b.b},
gbL:function(){return(this.c&1)!==0},
gdk:function(){return(this.c&2)!==0},
gbK:function(){return this.c===8},
di:function(a){return this.b.b.aY(this.d,a)},
ds:function(a){if(this.c!==6)return!0
return this.b.b.aY(this.d,J.aO(a))},
de:function(a){var z,y,x
z=this.e
y=J.N(a)
x=this.b.b
if(H.ar(z,{func:1,args:[,,]}))return x.dz(z,y.gG(a),a.gR())
else return x.aY(z,y.gG(a))},
dj:function(){return this.b.b.c_(this.d)}},
ah:{"^":"e;aj:a<,b,cS:c<,$ti",
gcN:function(){return this.a===2},
gaG:function(){return this.a>=4},
c2:function(a,b){var z,y
z=$.r
if(z!==C.d){z.toString
if(b!=null)b=P.dA(b,z)}y=new P.ah(0,z,null,[null])
this.av(new P.dj(null,y,b==null?1:3,a,b))
return y},
dB:function(a){return this.c2(a,null)},
b2:function(a){var z,y
z=$.r
y=new P.ah(0,z,null,this.$ti)
if(z!==C.d)z.toString
this.av(new P.dj(null,y,8,a,null))
return y},
av:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gaG()){y.av(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bm(null,null,z,new P.hN(this,a))}},
bu:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gaJ()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gaG()){v.bu(a)
return}this.a=v.a
this.c=v.c}z.a=this.ai(a)
y=this.b
y.toString
P.bm(null,null,y,new P.hS(z,this))}},
aK:function(){var z=this.c
this.c=null
return this.ai(z)},
ai:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gaJ()
z.a=y}return y},
W:function(a){var z,y
z=this.$ti
if(H.bZ(a,"$isal",z,"$asal"))if(H.bZ(a,"$isah",z,null))P.dk(a,this)
else P.hO(a,this)
else{y=this.aK()
this.a=4
this.c=a
P.aE(this,y)}},
aC:[function(a,b){var z=this.aK()
this.a=8
this.c=new P.b9(a,b)
P.aE(this,z)},function(a){return this.aC(a,null)},"dF","$2","$1","gaB",2,2,4,0],
cw:function(a,b){this.a=4
this.c=a},
$isal:1,
q:{
hO:function(a,b){var z,y,x
b.a=1
try{a.c2(new P.hP(b),new P.hQ(b))}catch(x){z=H.R(x)
y=H.P(x)
P.dX(new P.hR(b,z,y))}},
dk:function(a,b){var z,y,x
for(;a.gcN();)a=a.c
z=a.gaG()
y=b.c
if(z){b.c=null
x=b.ai(y)
b.a=a.a
b.c=a.c
P.aE(b,x)}else{b.a=2
b.c=a
a.bu(y)}},
aE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=J.aO(v)
t=v.gR()
y.toString
P.aJ(null,null,y,u,t)}return}for(;b.gaJ()!=null;b=s){s=b.a
b.a=null
P.aE(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gbL()||b.gbK()){q=b.gcW()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=J.aO(v)
t=v.gR()
y.toString
P.aJ(null,null,y,u,t)
return}p=$.r
if(p==null?q!=null:p!==q)$.r=q
else p=null
if(b.gbK())new P.hV(z,x,w,b).$0()
else if(y){if(b.gbL())new P.hU(x,b,r).$0()}else if(b.gdk())new P.hT(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.o(y).$isal){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.ai(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.dk(y,o)
return}}o=b.b
b=o.aK()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
hN:{"^":"i:0;a,b",
$0:function(){P.aE(this.a,this.b)}},
hS:{"^":"i:0;a,b",
$0:function(){P.aE(this.b,this.a.a)}},
hP:{"^":"i:2;a",
$1:function(a){var z=this.a
z.a=0
z.W(a)}},
hQ:{"^":"i:11;a",
$2:function(a,b){this.a.aC(a,b)},
$1:function(a){return this.$2(a,null)}},
hR:{"^":"i:0;a,b,c",
$0:function(){this.a.aC(this.b,this.c)}},
hV:{"^":"i:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.dj()}catch(w){y=H.R(w)
x=H.P(w)
if(this.c){v=J.aO(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.b9(y,x)
u.a=!0
return}if(!!J.o(z).$isal){if(z instanceof P.ah&&z.gaj()>=4){if(z.gaj()===8){v=this.b
v.b=z.gcS()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.dB(new P.hW(t))
v.a=!1}}},
hW:{"^":"i:2;a",
$1:function(a){return this.a}},
hU:{"^":"i:1;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.di(this.c)}catch(x){z=H.R(x)
y=H.P(x)
w=this.a
w.b=new P.b9(z,y)
w.a=!0}}},
hT:{"^":"i:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.ds(z)===!0&&w.e!=null){v=this.b
v.b=w.de(z)
v.a=!1}}catch(u){y=H.R(u)
x=H.P(u)
w=this.a
v=J.aO(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.b9(y,x)
s.a=!0}}},
dd:{"^":"e;a,b"},
aC:{"^":"e;$ti",
a1:function(a,b){return new P.i5(b,this,[H.L(this,"aC",0),null])},
gi:function(a){var z,y
z={}
y=new P.ah(0,$.r,null,[P.j])
z.a=0
this.a0(new P.h2(z),!0,new P.h3(z,y),y.gaB())
return y},
gu:function(a){var z,y
z={}
y=new P.ah(0,$.r,null,[P.dL])
z.a=null
z.a=this.a0(new P.h0(z,y),!0,new P.h1(y),y.gaB())
return y},
b_:function(a){var z,y,x
z=H.L(this,"aC",0)
y=H.I([],[z])
x=new P.ah(0,$.r,null,[[P.b,z]])
this.a0(new P.h4(this,y),!0,new P.h5(y,x),x.gaB())
return x}},
h2:{"^":"i:2;a",
$1:function(a){++this.a.a}},
h3:{"^":"i:0;a,b",
$0:function(){this.b.W(this.a.a)}},
h0:{"^":"i:2;a,b",
$1:function(a){P.iC(this.a.a,this.b,!1)}},
h1:{"^":"i:0;a",
$0:function(){this.a.W(!0)}},
h4:{"^":"i;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.dN(function(a){return{func:1,args:[a]}},this.a,"aC")}},
h5:{"^":"i:0;a,b",
$0:function(){this.b.W(this.a)}},
h_:{"^":"e;"},
bj:{"^":"e;aj:e<,$ti",
aU:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.bF()
if((z&4)===0&&(this.e&32)===0)this.bk(this.gbq())},
bW:function(a){return this.aU(a,null)},
bZ:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gu(z)}else z=!1
if(z)this.r.as(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.bk(this.gbs())}}}},
aO:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.ay()
z=this.f
return z==null?$.$get$aU():z},
ay:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.bF()
if((this.e&32)===0)this.r=null
this.f=this.bp()},
ax:["cp",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bx(b)
else this.aw(new P.hC(b,null,[H.L(this,"bj",0)]))}],
au:["cq",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.bz(a,b)
else this.aw(new P.hE(a,b,null))}],
cB:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.by()
else this.aw(C.y)},
br:[function(){},"$0","gbq",0,0,1],
bt:[function(){},"$0","gbs",0,0,1],
bp:function(){return},
aw:function(a){var z,y
z=this.r
if(z==null){z=new P.ig(null,null,0,[H.L(this,"bj",0)])
this.r=z}z.X(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.as(this)}},
bx:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.aZ(this.a,a)
this.e=(this.e&4294967263)>>>0
this.az((z&4)!==0)},
bz:function(a,b){var z,y
z=this.e
y=new P.hy(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.ay()
z=this.f
if(!!J.o(z).$isal&&z!==$.$get$aU())z.b2(y)
else y.$0()}else{y.$0()
this.az((z&4)!==0)}},
by:function(){var z,y
z=new P.hx(this)
this.ay()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isal&&y!==$.$get$aU())y.b2(z)
else z.$0()},
bk:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.az((z&4)!==0)},
az:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gu(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gu(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.br()
else this.bt()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.as(this)},
ct:function(a,b,c,d,e){var z,y
z=a==null?P.iY():a
y=this.d
y.toString
this.a=z
this.b=P.dA(b==null?P.j_():b,y)
this.c=c==null?P.iZ():c}},
hy:{"^":"i:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ar(y,{func:1,args:[P.e,P.b0]})
w=z.d
v=this.b
u=z.b
if(x)w.dA(u,v,this.c)
else w.aZ(u,v)
z.e=(z.e&4294967263)>>>0}},
hx:{"^":"i:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.c0(z.c)
z.e=(z.e&4294967263)>>>0}},
dg:{"^":"e;ap:a*"},
hC:{"^":"dg;b,a,$ti",
aV:function(a){a.bx(this.b)}},
hE:{"^":"dg;G:b>,R:c<,a",
aV:function(a){a.bz(this.b,this.c)}},
hD:{"^":"e;",
aV:function(a){a.by()},
gap:function(a){return},
sap:function(a,b){throw H.c(new P.bP("No events after a done."))}},
i7:{"^":"e;aj:a<",
as:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.dX(new P.i8(this,a))
this.a=1},
bF:function(){if(this.a===1)this.a=3}},
i8:{"^":"i:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gap(x)
z.b=w
if(w==null)z.c=null
x.aV(this.b)}},
ig:{"^":"i7;b,c,a,$ti",
gu:function(a){return this.c==null},
X:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sap(0,b)
this.c=b}}},
iD:{"^":"i:0;a,b",
$0:function(){return this.a.W(this.b)}},
bT:{"^":"aC;$ti",
a0:function(a,b,c,d){return this.cH(a,d,c,!0===b)},
bT:function(a,b,c){return this.a0(a,null,b,c)},
cH:function(a,b,c,d){return P.hM(this,a,b,c,d,H.L(this,"bT",0),H.L(this,"bT",1))},
bl:function(a,b){b.ax(0,a)},
cM:function(a,b,c){c.au(a,b)},
$asaC:function(a,b){return[b]}},
di:{"^":"bj;x,y,a,b,c,d,e,f,r,$ti",
ax:function(a,b){if((this.e&2)!==0)return
this.cp(0,b)},
au:function(a,b){if((this.e&2)!==0)return
this.cq(a,b)},
br:[function(){var z=this.y
if(z==null)return
z.bW(0)},"$0","gbq",0,0,1],
bt:[function(){var z=this.y
if(z==null)return
z.bZ(0)},"$0","gbs",0,0,1],
bp:function(){var z=this.y
if(z!=null){this.y=null
return z.aO(0)}return},
dG:[function(a){this.x.bl(a,this)},"$1","gcJ",2,0,function(){return H.dN(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"di")}],
dI:[function(a,b){this.x.cM(a,b,this)},"$2","gcL",4,0,12],
dH:[function(){this.cB()},"$0","gcK",0,0,1],
cv:function(a,b,c,d,e,f,g){this.y=this.x.a.bT(this.gcJ(),this.gcK(),this.gcL())},
$asbj:function(a,b){return[b]},
q:{
hM:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.di(a,null,null,null,null,z,y,null,null,[f,g])
y.ct(b,c,d,e,g)
y.cv(a,b,c,d,e,f,g)
return y}}},
i5:{"^":"bT;b,a,$ti",
bl:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.R(w)
x=H.P(w)
P.iB(b,y,x)
return}b.ax(0,z)}},
b9:{"^":"e;G:a>,R:b<",
j:function(a){return H.h(this.a)},
$isJ:1},
iA:{"^":"e;"},
iR:{"^":"i:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cK()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.a0(y)
throw x}},
ia:{"^":"iA;",
c0:function(a){var z,y,x,w
try{if(C.d===$.r){x=a.$0()
return x}x=P.dB(null,null,this,a)
return x}catch(w){z=H.R(w)
y=H.P(w)
x=P.aJ(null,null,this,z,y)
return x}},
aZ:function(a,b){var z,y,x,w
try{if(C.d===$.r){x=a.$1(b)
return x}x=P.dD(null,null,this,a,b)
return x}catch(w){z=H.R(w)
y=H.P(w)
x=P.aJ(null,null,this,z,y)
return x}},
dA:function(a,b,c){var z,y,x,w
try{if(C.d===$.r){x=a.$2(b,c)
return x}x=P.dC(null,null,this,a,b,c)
return x}catch(w){z=H.R(w)
y=H.P(w)
x=P.aJ(null,null,this,z,y)
return x}},
aN:function(a,b){if(b)return new P.ib(this,a)
else return new P.ic(this,a)},
cZ:function(a,b){return new P.id(this,a)},
h:function(a,b){return},
c_:function(a){if($.r===C.d)return a.$0()
return P.dB(null,null,this,a)},
aY:function(a,b){if($.r===C.d)return a.$1(b)
return P.dD(null,null,this,a,b)},
dz:function(a,b,c){if($.r===C.d)return a.$2(b,c)
return P.dC(null,null,this,a,b,c)}},
ib:{"^":"i:0;a,b",
$0:function(){return this.a.c0(this.b)}},
ic:{"^":"i:0;a,b",
$0:function(){return this.a.c_(this.b)}},
id:{"^":"i:2;a,b",
$1:function(a){return this.a.aZ(this.b,a)}}}],["","",,P,{"^":"",
bF:function(){return new H.am(0,null,null,null,null,null,0,[null,null])},
ax:function(a){return H.j7(a,new H.am(0,null,null,null,null,null,0,[null,null]))},
fo:function(a,b,c){var z,y
if(P.bY(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aK()
y.push(a)
try{P.iO(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.cU(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bb:function(a,b,c){var z,y,x
if(P.bY(a))return b+"..."+c
z=new P.Y(b)
y=$.$get$aK()
y.push(a)
try{x=z
x.m=P.cU(x.gm(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.m=y.gm()+c
y=z.gm()
return y.charCodeAt(0)==0?y:y},
bY:function(a){var z,y
for(z=0;y=$.$get$aK(),z<y.length;++z)if(a===y[z])return!0
return!1},
iO:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gF(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.h(z.gC())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gC();++x
if(!z.v()){if(x<=4){b.push(H.h(t))
return}v=H.h(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gC();++x
for(;z.v();t=s,s=r){r=z.gC();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.h(t)
v=H.h(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ay:function(a,b,c,d){return new P.hZ(0,null,null,null,null,null,0,[d])},
cC:function(a){var z,y,x
z={}
if(P.bY(a))return"{...}"
y=new P.Y("")
try{$.$get$aK().push(a)
x=y
x.m=x.gm()+"{"
z.a=!0
a.Z(0,new P.fE(z,y))
z=y
z.m=z.gm()+"}"}finally{z=$.$get$aK()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gm()
return z.charCodeAt(0)==0?z:z},
dn:{"^":"am;a,b,c,d,e,f,r,$ti",
a7:function(a){return H.jr(a)&0x3ffffff},
a8:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbP()
if(x==null?b==null:x===b)return y}return-1},
q:{
aF:function(a,b){return new P.dn(0,null,null,null,null,null,0,[a,b])}}},
hZ:{"^":"hX;a,b,c,d,e,f,r,$ti",
gF:function(a){var z=new P.dm(this,this.r,null,null)
z.c=this.e
return z},
gi:function(a){return this.a},
gu:function(a){return this.a===0},
d1:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.cF(b)},
cF:function(a){var z=this.d
if(z==null)return!1
return this.ag(z[this.af(a)],a)>=0},
bU:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.d1(0,a)?a:null
else return this.cO(a)},
cO:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.af(a)]
x=this.ag(y,a)
if(x<0)return
return J.b7(y,x).gbh()},
X:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.bc(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.bc(x,b)}else return this.N(0,b)},
N:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.i0()
this.d=z}y=this.af(b)
x=z[y]
if(x==null)z[y]=[this.aA(b)]
else{if(this.ag(x,b)>=0)return!1
x.push(this.aA(b))}return!0},
a9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bd(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bd(this.c,b)
else return this.cQ(0,b)},
cQ:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.af(b)]
x=this.ag(y,b)
if(x<0)return!1
this.be(y.splice(x,1)[0])
return!0},
Y:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bc:function(a,b){if(a[b]!=null)return!1
a[b]=this.aA(b)
return!0},
bd:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.be(z)
delete a[b]
return!0},
aA:function(a){var z,y
z=new P.i_(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
be:function(a){var z,y
z=a.gcE()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
af:function(a){return J.a_(a)&0x3ffffff},
ag:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.C(a[y].gbh(),b))return y
return-1},
$isa:1,
$asa:null,
q:{
i0:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
i_:{"^":"e;bh:a<,b,cE:c<"},
dm:{"^":"e;a,b,c,d",
gC:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.W(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
hX:{"^":"fX;$ti"},
cz:{"^":"fH;$ti"},
fH:{"^":"e+u;",$asb:null,$asa:null,$isb:1,$isa:1},
u:{"^":"e;$ti",
gF:function(a){return new H.cA(a,this.gi(a),0,null)},
n:function(a,b){return this.h(a,b)},
gu:function(a){return this.gi(a)===0},
a1:function(a,b){return new H.bd(a,b,[H.L(a,"u",0),null])},
al:function(a,b,c,d){var z
P.X(b,c,this.gi(a),null,null,null)
for(z=b;z<c;++z)this.l(a,z,d)},
a_:function(a,b,c){var z
if(c>=this.gi(a))return-1
for(z=c;z<this.gi(a);++z)if(J.C(this.h(a,z),b))return z
return-1},
an:function(a,b){return this.a_(a,b,0)},
j:function(a){return P.bb(a,"[","]")},
$isb:1,
$asb:null,
$isa:1,
$asa:null},
ih:{"^":"e;",
l:function(a,b,c){throw H.c(new P.m("Cannot modify unmodifiable map"))}},
fC:{"^":"e;",
h:function(a,b){return J.b7(this.a,b)},
l:function(a,b,c){J.bw(this.a,b,c)},
gu:function(a){return J.by(this.a)},
gi:function(a){return J.V(this.a)},
j:function(a){return J.a0(this.a)}},
d9:{"^":"fC+ih;a,$ti"},
fE:{"^":"i:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.m+=", "
z.a=!1
z=this.b
y=z.m+=H.h(a)
z.m=y+": "
z.m+=H.h(b)}},
fA:{"^":"b_;a,b,c,d,$ti",
gF:function(a){return new P.i1(this,this.c,this.d,this.b,null)},
gu:function(a){return this.b===this.c},
gi:function(a){return(this.c-this.b&this.a.length-1)>>>0},
n:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.B(b)
if(0>b||b>=z)H.y(P.w(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.f(y,w)
return y[w]},
Y:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.f(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.bb(this,"{","}")},
bY:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.bB());++this.d
y=this.a
x=y.length
if(z>=x)return H.f(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
N:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.f(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.bj();++this.d},
bj:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.I(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.b8(y,0,w,z,x)
C.c.b8(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
cr:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.I(z,[b])},
$asa:null,
q:{
bG:function(a,b){var z=new P.fA(null,0,0,0,[b])
z.cr(a,b)
return z}}},
i1:{"^":"e;a,b,c,d,e",
gC:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.y(new P.W(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.f(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
fY:{"^":"e;$ti",
gu:function(a){return this.a===0},
a1:function(a,b){return new H.cl(this,b,[H.Z(this,0),null])},
j:function(a){return P.bb(this,"{","}")},
$isa:1,
$asa:null},
fX:{"^":"fY;$ti"}}],["","",,P,{"^":"",ea:{"^":"c9;a",
dt:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
d=P.X(c,d,b.length,null,null,null)
z=$.$get$de()
for(y=c,x=y,w=null,v=-1,u=-1,t=0;y<d;y=s){s=y+1
r=C.a.t(b,y)
if(r===37){q=s+2
if(q<=d){p=H.bq(C.a.t(b,s))
o=H.bq(C.a.t(b,s+1))
n=p*16+o-(o&256)
if(n===37)n=-1
s=q}else n=-1}else n=r
if(0<=n&&n<=127){if(n<0||n>=z.length)return H.f(z,n)
m=z[n]
if(m>=0){n=C.a.B("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",m)
if(n===r)continue
r=n}else{if(m===-1){if(v<0){l=w==null?w:w.m.length
if(l==null)l=0
if(typeof l!=="number")return l.L()
v=l+(y-x)
u=y}++t
if(r===61)continue}r=n}if(m!==-2){if(w==null)w=new P.Y("")
w.m+=C.a.k(b,x,y)
w.m+=H.bN(r)
x=s
continue}}throw H.c(new P.A("Invalid base64 data",b,y))}if(w!=null){l=w.m+=C.a.k(b,x,d)
k=l.length
if(v>=0)P.c5(b,u,d,v,t,k)
else{j=C.b.ar(k-1,4)+1
if(j===1)throw H.c(new P.A("Invalid base64 encoding length ",b,d))
for(;j<4;){l+="="
w.m=l;++j}}l=w.m
return C.a.a2(b,c,d,l.charCodeAt(0)==0?l:l)}i=d-c
if(v>=0)P.c5(b,u,d,v,t,i)
else{j=C.b.ar(i,4)
if(j===1)throw H.c(new P.A("Invalid base64 encoding length ",b,d))
if(j>1)b=C.a.a2(b,d,d,j===2?"==":"=")}return b},
q:{
c5:function(a,b,c,d,e,f){if(C.b.ar(f,4)!==0)throw H.c(new P.A("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw H.c(new P.A("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw H.c(new P.A("Invalid base64 padding, more than two '=' characters",a,b))}}},eb:{"^":"ca;a"},c9:{"^":"e;"},ca:{"^":"e;"},ev:{"^":"c9;"},hp:{"^":"ev;a"},hq:{"^":"ca;a",
aQ:function(a,b,c){var z,y,x,w
z=J.V(a)
P.X(b,c,z,null,null,null)
y=new P.Y("")
x=new P.ix(!1,y,!0,0,0,0)
x.aQ(a,b,z)
x.dc(0,a,z)
w=y.m
return w.charCodeAt(0)==0?w:w},
d4:function(a){return this.aQ(a,0,null)}},ix:{"^":"e;a,b,c,d,e,f",
dc:function(a,b,c){if(this.e>0)throw H.c(new P.A("Unfinished UTF-8 octet sequence",b,c))},
aQ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.iz(c)
v=new P.iy(this,a,b,c)
$loop$0:for(u=J.F(a),t=this.b,s=b;!0;s=n){$multibyte$2:if(y>0){do{if(s===c)break $loop$0
r=u.h(a,s)
if(typeof r!=="number")return r.aq()
if((r&192)!==128){q=new P.A("Bad UTF-8 encoding 0x"+C.e.ab(r,16),a,s)
throw H.c(q)}else{z=(z<<6|r&63)>>>0;--y;++s}}while(y>0)
q=x-1
if(q<0||q>=4)return H.f(C.p,q)
if(z<=C.p[q]){q=new P.A("Overlong encoding of 0x"+C.b.ab(z,16),a,s-x-1)
throw H.c(q)}if(z>1114111){q=new P.A("Character outside valid Unicode range: 0x"+C.b.ab(z,16),a,s-x-1)
throw H.c(q)}if(!this.c||z!==65279)t.m+=H.bN(z)
this.c=!1}for(q=s<c;q;){p=w.$2(a,s)
if(J.bv(p,0)){this.c=!1
if(typeof p!=="number")return H.B(p)
o=s+p
v.$2(s,o)
if(o===c)break}else o=s
n=o+1
r=u.h(a,o)
m=J.b5(r)
if(m.D(r,0)){m=new P.A("Negative UTF-8 code unit: -0x"+J.e7(m.b6(r),16),a,n-1)
throw H.c(m)}else{if(typeof r!=="number")return r.aq()
if((r&224)===192){z=r&31
y=1
x=1
continue $loop$0}if((r&240)===224){z=r&15
y=2
x=2
continue $loop$0}if((r&248)===240&&r<245){z=r&7
y=3
x=3
continue $loop$0}m=new P.A("Bad UTF-8 encoding 0x"+C.e.ab(r,16),a,n-1)
throw H.c(m)}}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},iz:{"^":"i:13;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=J.F(a),x=b;x<z;++x){w=y.h(a,x)
if(typeof w!=="number")return w.aq()
if((w&127)!==w)return x-b}return z-b}},iy:{"^":"i:14;a,b,c,d",
$2:function(a,b){this.a.b.m+=P.cV(this.b,a,b)}}}],["","",,P,{"^":"",
h6:function(a,b,c){var z,y,x,w
if(b<0)throw H.c(P.D(b,0,J.V(a),null,null))
z=c==null
if(!z&&c<b)throw H.c(P.D(c,b,J.V(a),null,null))
y=J.b8(a)
for(x=0;x<b;++x)if(!y.v())throw H.c(P.D(b,0,x,null,null))
w=[]
if(z)for(;y.v();)w.push(y.gC())
else for(x=b;x<c;++x){if(!y.v())throw H.c(P.D(c,b,x,null,null))
w.push(y.gC())}return H.cR(w)},
cn:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a0(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ew(a)},
ew:function(a){var z=J.o(a)
if(!!z.$isi)return z.j(a)
return H.bf(a)},
aT:function(a){return new P.hL(a)},
bH:function(a,b,c){var z,y
z=H.I([],[c])
for(y=J.b8(a);y.v();)z.push(y.gC())
if(b)return z
z.fixed$length=Array
return z},
fB:function(a,b,c,d){var z,y,x
z=H.I([],[d])
C.c.si(z,a)
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.f(z,y)
z[y]=x}return z},
bt:function(a){H.js(H.h(a))},
cV:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.X(b,c,z,null,null,null)
return H.cR(b>0||c<z?C.c.cm(a,b,c):a)}if(!!J.o(a).$iscI)return H.fS(a,b,P.X(b,c,a.length,null,null,null))
return P.h6(a,b,c)},
hk:function(){var z=H.fK()
if(z!=null)return P.hl(z,0,null)
throw H.c(new P.m("'Uri.base' is not supported"))},
hl:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
c=a.length
z=b+5
if(c>=z){y=((C.a.t(a,b+4)^58)*3|C.a.t(a,b)^100|C.a.t(a,b+1)^97|C.a.t(a,b+2)^116|C.a.t(a,b+3)^97)>>>0
if(y===0)return P.da(b>0||c<c?C.a.k(a,b,c):a,5,null).gc4()
else if(y===32)return P.da(C.a.k(a,z,c),0,null).gc4()}x=H.I(new Array(8),[P.j])
x[0]=0
w=b-1
x[1]=w
x[2]=w
x[7]=w
x[3]=b
x[4]=b
x[5]=c
x[6]=c
if(P.dE(a,b,c,0,x)>=14)x[7]=c
v=x[1]
if(typeof v!=="number")return v.c8()
if(v>=b)if(P.dE(a,b,v,20,x)===20)x[7]=v
w=x[2]
if(typeof w!=="number")return w.L()
u=w+1
t=x[3]
s=x[4]
r=x[5]
q=x[6]
if(typeof q!=="number")return q.D()
if(typeof r!=="number")return H.B(r)
if(q<r)r=q
if(typeof s!=="number")return s.D()
if(s<u||s<=v)s=r
if(typeof t!=="number")return t.D()
if(t<u)t=s
w=x[7]
if(typeof w!=="number")return w.D()
p=w<b
if(p)if(u>v+3){o=null
p=!1}else{w=t>b
if(w&&t+1===s){o=null
p=!1}else{if(!(r<c&&r===s+2&&C.a.J(a,"..",s)))n=r>s+2&&C.a.J(a,"/..",r-3)
else n=!0
if(n){o=null
p=!1}else{if(v===b+4)if(C.a.J(a,"file",b)){if(u<=b){if(!C.a.J(a,"/",s)){m="file:///"
y=3}else{m="file://"
y=2}a=m+C.a.k(a,s,c)
v-=b
z=y-b
r+=z
q+=z
c=a.length
b=0
u=7
t=7
s=7}else if(s===r)if(b===0&&!0){a=C.a.a2(a,s,r,"/");++r;++q;++c}else{a=C.a.k(a,b,s)+"/"+C.a.k(a,r,c)
v-=b
u-=b
t-=b
s-=b
z=1-b
r+=z
q+=z
c=a.length
b=0}o="file"}else if(C.a.J(a,"http",b)){if(w&&t+3===s&&C.a.J(a,"80",t+1))if(b===0&&!0){a=C.a.a2(a,t,s,"")
s-=3
r-=3
q-=3
c-=3}else{a=C.a.k(a,b,t)+C.a.k(a,s,c)
v-=b
u-=b
t-=b
z=3+b
s-=z
r-=z
q-=z
c=a.length
b=0}o="http"}else o=null
else if(v===z&&C.a.J(a,"https",b)){if(w&&t+4===s&&C.a.J(a,"443",t+1))if(b===0&&!0){a=C.a.a2(a,t,s,"")
s-=4
r-=4
q-=4
c-=3}else{a=C.a.k(a,b,t)+C.a.k(a,s,c)
v-=b
u-=b
t-=b
z=4+b
s-=z
r-=z
q-=z
c=a.length
b=0}o="https"}else o=null
p=!0}}}else o=null
if(p){if(b>0||c<a.length){a=C.a.k(a,b,c)
v-=b
u-=b
t-=b
s-=b
r-=b
q-=b}return new P.ie(a,v,u,t,s,r,q,o,null)}return P.ii(a,b,c,v,u,t,s,r,q,o)},
dc:function(a,b){return C.c.dd(a.split("&"),P.bF(),new P.ho(b))},
hi:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=new P.hj(a)
y=H.dx(4)
x=new Uint8Array(y)
for(w=b,v=w,u=0;w<c;++w){t=C.a.B(a,w)
if(t!==46){if((t^48)>9)z.$2("invalid character",w)}else{if(u===3)z.$2("IPv4 address should contain exactly 4 parts",w)
s=H.aB(C.a.k(a,v,w),null,null)
if(J.bv(s,255))z.$2("each part must be in the range 0..255",v)
r=u+1
if(u>=y)return H.f(x,u)
x[u]=s
v=w+1
u=r}}if(u!==3)z.$2("IPv4 address should contain exactly 4 parts",c)
s=H.aB(C.a.k(a,v,c),null,null)
if(J.bv(s,255))z.$2("each part must be in the range 0..255",v)
if(u>=y)return H.f(x,u)
x[u]=s
return x},
db:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
if(c==null)c=a.length
z=new P.hm(a)
y=new P.hn(a,z)
if(a.length<2)z.$1("address is too short")
x=[]
for(w=b,v=w,u=!1,t=!1;w<c;++w){s=C.a.B(a,w)
if(s===58){if(w===b){++w
if(C.a.B(a,w)!==58)z.$2("invalid start colon.",w)
v=w}if(w===v){if(u)z.$2("only one wildcard `::` is allowed",w)
x.push(-1)
u=!0}else x.push(y.$2(v,w))
v=w+1}else if(s===46)t=!0}if(x.length===0)z.$1("too few parts")
r=v===c
q=J.C(C.c.gao(x),-1)
if(r&&!q)z.$2("expected a part after last `:`",c)
if(!r)if(!t)x.push(y.$2(v,c))
else{p=P.hi(a,v,c)
o=p[0]
if(typeof o!=="number")return o.at()
n=p[1]
if(typeof n!=="number")return H.B(n)
x.push((o<<8|n)>>>0)
n=p[2]
if(typeof n!=="number")return n.at()
o=p[3]
if(typeof o!=="number")return H.B(o)
x.push((n<<8|o)>>>0)}if(u){if(x.length>7)z.$1("an address with a wildcard must have less than 7 parts")}else if(x.length!==8)z.$1("an address without a wildcard must contain exactly 8 parts")
m=new Uint8Array(16)
for(w=0,l=0;w<x.length;++w){k=x[w]
if(J.o(k).p(k,-1)){j=9-x.length
for(i=0;i<j;++i){if(l<0||l>=16)return H.f(m,l)
m[l]=0
o=l+1
if(o>=16)return H.f(m,o)
m[o]=0
l+=2}}else{if(typeof k!=="number")return k.cl()
o=C.e.O(k,8)
if(l<0||l>=16)return H.f(m,l)
m[l]=o
o=l+1
if(o>=16)return H.f(m,o)
m[o]=k&255
l+=2}}return m},
iI:function(){var z,y,x,w,v
z=P.fB(22,new P.iK(),!0,P.b1)
y=new P.iJ(z)
x=new P.iL()
w=new P.iM()
v=y.$2(0,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,".",14)
x.$3(v,":",34)
x.$3(v,"/",3)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(14,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,".",15)
x.$3(v,":",34)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(15,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,"%",225)
x.$3(v,":",34)
x.$3(v,"/",9)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(1,225)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",1)
x.$3(v,":",34)
x.$3(v,"/",10)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(2,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",139)
x.$3(v,"/",131)
x.$3(v,".",146)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(3,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",68)
x.$3(v,".",18)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(4,229)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",5)
w.$3(v,"AZ",229)
x.$3(v,":",102)
x.$3(v,"@",68)
x.$3(v,"[",232)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(5,229)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",5)
w.$3(v,"AZ",229)
x.$3(v,":",102)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(6,231)
w.$3(v,"19",7)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(7,231)
w.$3(v,"09",7)
x.$3(v,"@",68)
x.$3(v,"/",138)
x.$3(v,"?",172)
x.$3(v,"#",205)
x.$3(y.$2(8,8),"]",5)
v=y.$2(9,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",16)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(16,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",17)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(17,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",9)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(10,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",18)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(18,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,".",19)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(19,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",234)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(11,235)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",11)
x.$3(v,"/",10)
x.$3(v,"?",172)
x.$3(v,"#",205)
v=y.$2(12,236)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",12)
x.$3(v,"?",12)
x.$3(v,"#",205)
v=y.$2(13,237)
x.$3(v,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",13)
x.$3(v,"?",13)
w.$3(y.$2(20,245),"az",21)
v=y.$2(21,245)
w.$3(v,"az",21)
w.$3(v,"09",21)
x.$3(v,"+-.",21)
return z},
dE:function(a,b,c,d,e){var z,y,x,w,v,u
z=$.$get$dF()
for(y=b;y<c;++y){if(d<0||d>=z.length)return H.f(z,d)
x=z[d]
w=C.a.t(a,y)^96
v=J.b7(x,w>95?31:w)
if(typeof v!=="number")return v.aq()
d=v&31
u=C.e.O(v,5)
if(u>=8)return H.f(e,u)
e[u]=y}return d},
dL:{"^":"e;"},
"+bool":0,
ce:{"^":"e;a,b",
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.ce))return!1
return this.a===b.a&&this.b===b.b},
gw:function(a){var z=this.a
return(z^C.b.O(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t
z=P.eq(H.fQ(this))
y=P.aQ(H.fO(this))
x=P.aQ(H.fL(this))
w=P.aQ(H.fM(this))
v=P.aQ(H.fN(this))
u=P.aQ(H.fP(this))
t=P.er(H.cM(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
q:{
eq:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.h(z)
if(z>=10)return y+"00"+H.h(z)
return y+"000"+H.h(z)},
er:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
aQ:function(a){if(a>=10)return""+a
return"0"+a}}},
aj:{"^":"b6;"},
"+double":0,
aR:{"^":"e;a",
L:function(a,b){return new P.aR(C.b.L(this.a,b.gbg()))},
D:function(a,b){return C.b.D(this.a,b.gbg())},
ad:function(a,b){return C.b.ad(this.a,b.gbg())},
p:function(a,b){if(b==null)return!1
if(!(b instanceof P.aR))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.eu()
y=this.a
if(y<0)return"-"+new P.aR(0-y).j(0)
x=z.$1(C.b.a4(y,6e7)%60)
w=z.$1(C.b.a4(y,1e6)%60)
v=new P.et().$1(y%1e6)
return""+C.b.a4(y,36e8)+":"+H.h(x)+":"+H.h(w)+"."+H.h(v)},
b6:function(a){return new P.aR(0-this.a)}},
et:{"^":"i:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eu:{"^":"i:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
J:{"^":"e;",
gR:function(){return H.P(this.$thrownJsError)}},
cK:{"^":"J;",
j:function(a){return"Throw of null."}},
a1:{"^":"J;a,b,c,d",
gaE:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaD:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.h(z)
w=this.gaE()+y+x
if(!this.a)return w
v=this.gaD()
u=P.cn(this.b)
return w+v+": "+H.h(u)},
q:{
aP:function(a){return new P.a1(!1,null,null,a)},
c4:function(a,b,c){return new P.a1(!0,a,b,c)},
e8:function(a){return new P.a1(!1,null,a,"Must not be null")}}},
cS:{"^":"a1;e,f,a,b,c,d",
gaE:function(){return"RangeError"},
gaD:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.h(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.h(z)
else if(x>z)y=": Not in range "+H.h(z)+".."+H.h(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.h(z)}return y},
q:{
bg:function(a,b,c){return new P.cS(null,null,!0,a,b,"Value not in range")},
D:function(a,b,c,d,e){return new P.cS(b,c,!0,a,d,"Invalid value")},
X:function(a,b,c,d,e,f){if(typeof a!=="number")return H.B(a)
if(0>a||a>c)throw H.c(P.D(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.c(P.D(b,a,c,"end",f))
return b}return c}}},
eB:{"^":"a1;e,i:f>,a,b,c,d",
gaE:function(){return"RangeError"},
gaD:function(){if(J.e_(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.h(z)},
q:{
w:function(a,b,c,d,e){var z=e!=null?e:J.V(b)
return new P.eB(b,z,!0,a,c,"Index out of range")}}},
m:{"^":"J;a",
j:function(a){return"Unsupported operation: "+this.a}},
d7:{"^":"J;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.h(z):"UnimplementedError"}},
bP:{"^":"J;a",
j:function(a){return"Bad state: "+this.a}},
W:{"^":"J;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.h(P.cn(z))+"."}},
fI:{"^":"e;",
j:function(a){return"Out of Memory"},
gR:function(){return},
$isJ:1},
cT:{"^":"e;",
j:function(a){return"Stack Overflow"},
gR:function(){return},
$isJ:1},
ep:{"^":"J;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.h(z)+"' during its initialization"}},
hL:{"^":"e;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.h(z)}},
A:{"^":"e;a,M:b>,c",
j:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.h(z):"FormatException"
x=this.c
w=this.b
if(typeof w!=="string")return x!=null?y+(" (at offset "+H.h(x)+")"):y
if(x!=null)z=x<0||x>w.length
else z=!1
if(z)x=null
if(x==null){if(w.length>78)w=C.a.k(w,0,75)+"..."
return y+"\n"+w}for(v=1,u=0,t=!1,s=0;s<x;++s){r=C.a.t(w,s)
if(r===10){if(u!==s||!t)++v
u=s+1
t=!1}else if(r===13){++v
u=s+1
t=!0}}y=v>1?y+(" (at line "+v+", character "+(x-u+1)+")\n"):y+(" (at character "+(x+1)+")\n")
q=w.length
for(s=x;s<w.length;++s){r=C.a.B(w,s)
if(r===10||r===13){q=s
break}}if(q-u>78)if(x-u<75){p=u+75
o=u
n=""
m="..."}else{if(q-x<75){o=q-75
p=q
m=""}else{o=x-36
p=x+36
m="..."}n="..."}else{p=q
o=u
n=""
m=""}l=C.a.k(w,o,p)
return y+n+l+m+"\n"+C.a.b5(" ",x-o+n.length)+"^\n"}},
ex:{"^":"e;a,bo",
j:function(a){return"Expando:"+H.h(this.a)},
h:function(a,b){var z,y
z=this.bo
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.y(P.c4(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.bM(b,"expando$values")
return y==null?null:H.bM(y,z)},
l:function(a,b,c){var z,y
z=this.bo
if(typeof z!=="string")z.set(b,c)
else{y=H.bM(b,"expando$values")
if(y==null){y=new P.e()
H.cQ(b,"expando$values",y)}H.cQ(y,z,c)}}},
j:{"^":"b6;"},
"+int":0,
T:{"^":"e;$ti",
a1:function(a,b){return H.bc(this,b,H.L(this,"T",0),null)},
b0:function(a,b){return P.bH(this,!0,H.L(this,"T",0))},
b_:function(a){return this.b0(a,!0)},
gi:function(a){var z,y
z=this.gF(this)
for(y=0;z.v();)++y
return y},
gu:function(a){return!this.gF(this).v()},
n:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.e8("index"))
if(b<0)H.y(P.D(b,0,null,"index",null))
for(z=this.gF(this),y=0;z.v();){x=z.gC()
if(b===y)return x;++y}throw H.c(P.w(b,this,"index",null,y))},
j:function(a){return P.fo(this,"(",")")}},
fq:{"^":"e;"},
b:{"^":"e;$ti",$asb:null,$isa:1,$asa:null},
"+List":0,
az:{"^":"e;$ti"},
be:{"^":"e;",
gw:function(a){return P.e.prototype.gw.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
b6:{"^":"e;"},
"+num":0,
e:{"^":";",
p:function(a,b){return this===b},
gw:function(a){return H.a9(this)},
j:function(a){return H.bf(this)},
toString:function(){return this.j(this)}},
b0:{"^":"e;"},
p:{"^":"e;"},
"+String":0,
Y:{"^":"e;m<",
gi:function(a){return this.m.length},
gu:function(a){return this.m.length===0},
j:function(a){var z=this.m
return z.charCodeAt(0)==0?z:z},
q:{
cU:function(a,b,c){var z=J.b8(b)
if(!z.v())return a
if(c.length===0){do a+=H.h(z.gC())
while(z.v())}else{a+=H.h(z.gC())
for(;z.v();)a=a+c+H.h(z.gC())}return a}}},
ho:{"^":"i:5;a",
$2:function(a,b){var z,y,x,w
z=J.F(b)
y=z.an(b,"=")
if(y===-1){if(!z.p(b,""))J.bw(a,P.bV(b,0,z.gi(b),this.a,!0),"")}else if(y!==0){x=z.k(b,0,y)
w=C.a.ae(b,y+1)
z=this.a
J.bw(a,P.bV(x,0,x.length,z,!0),P.bV(w,0,w.length,z,!0))}return a}},
hj:{"^":"i:15;a",
$2:function(a,b){throw H.c(new P.A("Illegal IPv4 address, "+a,this.a,b))}},
hm:{"^":"i:16;a",
$2:function(a,b){throw H.c(new P.A("Illegal IPv6 address, "+a,this.a,b))},
$1:function(a){return this.$2(a,null)}},
hn:{"^":"i:17;a,b",
$2:function(a,b){var z,y
if(b-a>4)this.b.$2("an IPv6 part can only contain a maximum of 4 hex digits",a)
z=H.aB(C.a.k(this.a,a,b),16,null)
y=J.b5(z)
if(y.D(z,0)||y.ad(z,65535))this.b.$2("each part must be in the range of `0x0..0xFFFF`",a)
return z}},
dq:{"^":"e;b7:a<,b,c,d,bV:e>,f,r,x,y,z,Q,ch",
gc5:function(){return this.b},
gaR:function(a){var z=this.c
if(z==null)return""
if(C.a.I(z,"["))return C.a.k(z,1,z.length-1)
return z},
gaW:function(a){var z=this.d
if(z==null)return P.dr(this.a)
return z},
gaX:function(a){var z=this.f
return z==null?"":z},
gbJ:function(){var z=this.r
return z==null?"":z},
gbX:function(){var z,y
z=this.Q
if(z==null){z=this.f
y=P.p
y=new P.d9(P.dc(z==null?"":z,C.k),[y,y])
this.Q=y
z=y}return z},
gbM:function(){return this.c!=null},
gbO:function(){return this.f!=null},
gbN:function(){return this.r!=null},
j:function(a){var z=this.y
if(z==null){z=this.bm()
this.y=z}return z},
bm:function(){var z,y,x,w
z=this.a
y=z.length!==0?z+":":""
x=this.c
w=x==null
if(!w||z==="file"){z=y+"//"
y=this.b
if(y.length!==0)z=z+H.h(y)+"@"
if(!w)z+=x
y=this.d
if(y!=null)z=z+":"+H.h(y)}else z=y
z+=H.h(this.e)
y=this.f
if(y!=null)z=z+"?"+y
y=this.r
if(y!=null)z=z+"#"+y
return z.charCodeAt(0)==0?z:z},
p:function(a,b){var z,y,x
if(b==null)return!1
if(this===b)return!0
z=J.o(b)
if(!!z.$isbR){if(this.a===b.gb7())if(this.c!=null===b.gbM()){y=this.b
x=b.gc5()
if(y==null?x==null:y===x){y=this.gaR(this)
x=z.gaR(b)
if(y==null?x==null:y===x)if(J.C(this.gaW(this),z.gaW(b)))if(J.C(this.e,z.gbV(b))){y=this.f
x=y==null
if(!x===b.gbO()){if(x)y=""
if(y===z.gaX(b)){z=this.r
y=z==null
if(!y===b.gbN()){if(y)z=""
z=z===b.gbJ()}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
return z}return!1},
gw:function(a){var z=this.z
if(z==null){z=this.y
if(z==null){z=this.bm()
this.y=z}z=C.a.gw(z)
this.z=z}return z},
$isbR:1,
q:{
ii:function(a,b,c,d,e,f,g,h,i,j){var z,y,x,w,v,u,t
if(j==null)if(d>b)j=P.ir(a,b,d)
else{if(d===b)P.aG(a,b,"Invalid empty scheme")
j=""}if(e>b){z=d+3
y=z<e?P.is(a,z,e-1):""
x=P.im(a,e,f,!1)
if(typeof f!=="number")return f.L()
w=f+1
if(typeof g!=="number")return H.B(g)
v=w<g?P.ip(H.aB(C.a.k(a,w,g),null,new P.j1(a,f)),j):null}else{y=""
x=null
v=null}u=P.io(a,g,h,null,j,x!=null)
if(typeof h!=="number")return h.D()
t=h<i?P.iq(a,h+1,i,null):null
return new P.dq(j,y,x,v,u,t,i<c?P.il(a,i+1,c):null,null,null,null,null,null)},
dr:function(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
aG:function(a,b,c){throw H.c(new P.A(c,a,b))},
ip:function(a,b){if(a!=null&&J.C(a,P.dr(b)))return
return a},
im:function(a,b,c,d){var z,y
if(b===c)return""
if(C.a.B(a,b)===91){if(typeof c!=="number")return c.dD()
z=c-1
if(C.a.B(a,z)!==93)P.aG(a,b,"Missing end `]` to match `[` in host")
P.db(a,b+1,z)
return C.a.k(a,b,c).toLowerCase()}if(typeof c!=="number")return H.B(c)
y=b
for(;y<c;++y)if(C.a.B(a,y)===58){P.db(a,b,c)
return"["+a+"]"}return P.iu(a,b,c)},
iu:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
if(typeof c!=="number")return H.B(c)
z=b
y=z
x=null
w=!0
for(;z<c;){v=C.a.B(a,z)
if(v===37){u=P.dw(a,z,!0)
t=u==null
if(t&&w){z+=3
continue}if(x==null)x=new P.Y("")
s=C.a.k(a,y,z)
r=x.m+=!w?s.toLowerCase():s
if(t){u=C.a.k(a,z,z+3)
q=3}else if(u==="%"){u="%25"
q=1}else q=3
x.m=r+u
z+=q
y=z
w=!0}else{if(v<127){t=v>>>4
if(t>=8)return H.f(C.r,t)
t=(C.r[t]&1<<(v&15))!==0}else t=!1
if(t){if(w&&65<=v&&90>=v){if(x==null)x=new P.Y("")
if(y<z){x.m+=C.a.k(a,y,z)
y=z}w=!1}++z}else{if(v<=93){t=v>>>4
if(t>=8)return H.f(C.f,t)
t=(C.f[t]&1<<(v&15))!==0}else t=!1
if(t)P.aG(a,z,"Invalid character")
else{if((v&64512)===55296&&z+1<c){p=C.a.B(a,z+1)
if((p&64512)===56320){v=65536|(v&1023)<<10|p&1023
q=2}else q=1}else q=1
if(x==null)x=new P.Y("")
s=C.a.k(a,y,z)
x.m+=!w?s.toLowerCase():s
x.m+=P.ds(v)
z+=q
y=z}}}}if(x==null)return C.a.k(a,b,c)
if(y<c){s=C.a.k(a,y,c)
x.m+=!w?s.toLowerCase():s}t=x.m
return t.charCodeAt(0)==0?t:t},
ir:function(a,b,c){var z,y,x,w
if(b===c)return""
if(!P.du(C.a.t(a,b)))P.aG(a,b,"Scheme not starting with alphabetic character")
for(z=b,y=!1;z<c;++z){x=C.a.t(a,z)
if(x<128){w=x>>>4
if(w>=8)return H.f(C.i,w)
w=(C.i[w]&1<<(x&15))!==0}else w=!1
if(!w)P.aG(a,z,"Illegal scheme character")
if(65<=x&&x<=90)y=!0}a=C.a.k(a,b,c)
return P.ij(y?a.toLowerCase():a)},
ij:function(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
is:function(a,b,c){var z=P.ao(a,b,c,C.J,!1)
return z==null?C.a.k(a,b,c):z},
io:function(a,b,c,d,e,f){var z,y,x
z=e==="file"
y=z||f
x=P.ao(a,b,c,C.t,!1)
if(x==null)x=C.a.k(a,b,c)
if(x.length===0){if(z)return"/"}else if(y&&!C.a.I(x,"/"))x="/"+x
return P.it(x,e,f)},
it:function(a,b,c){var z=b.length===0
if(z&&!c&&!C.a.I(a,"/"))return P.iv(a,!z||c)
return P.iw(a)},
iq:function(a,b,c,d){var z=P.ao(a,b,c,C.h,!1)
return z==null?C.a.k(a,b,c):z},
il:function(a,b,c){var z=P.ao(a,b,c,C.h,!1)
return z==null?C.a.k(a,b,c):z},
dw:function(a,b,c){var z,y,x,w,v,u
z=b+2
if(z>=a.length)return"%"
y=C.a.B(a,b+1)
x=C.a.B(a,z)
w=H.bq(y)
v=H.bq(x)
if(w<0||v<0)return"%"
u=w*16+v
if(u<127){z=C.b.O(u,4)
if(z>=8)return H.f(C.q,z)
z=(C.q[z]&1<<(u&15))!==0}else z=!1
if(z)return H.bN(c&&65<=u&&90>=u?(u|32)>>>0:u)
if(y>=97||x>=97)return C.a.k(a,b,b+3).toUpperCase()
return},
ds:function(a){var z,y,x,w,v,u,t,s
if(a<128){z=new Array(3)
z.fixed$length=Array
z[0]=37
z[1]=C.a.t("0123456789ABCDEF",a>>>4)
z[2]=C.a.t("0123456789ABCDEF",a&15)}else{if(a>2047)if(a>65535){y=240
x=4}else{y=224
x=3}else{y=192
x=2}w=3*x
z=new Array(w)
z.fixed$length=Array
for(v=0;--x,x>=0;y=128){u=C.b.cU(a,6*x)&63|y
if(v>=w)return H.f(z,v)
z[v]=37
t=v+1
s=C.a.t("0123456789ABCDEF",u>>>4)
if(t>=w)return H.f(z,t)
z[t]=s
s=v+2
t=C.a.t("0123456789ABCDEF",u&15)
if(s>=w)return H.f(z,s)
z[s]=t
v+=3}}return P.cV(z,0,null)},
ao:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=!e
y=b
x=y
w=null
while(!0){if(typeof y!=="number")return y.D()
if(typeof c!=="number")return H.B(c)
if(!(y<c))break
c$0:{v=C.a.B(a,y)
if(v<127){u=v>>>4
if(u>=8)return H.f(d,u)
u=(d[u]&1<<(v&15))!==0}else u=!1
if(u)++y
else{if(v===37){t=P.dw(a,y,!1)
if(t==null){y+=3
break c$0}if("%"===t){t="%25"
s=1}else s=3}else{if(z)if(v<=93){u=v>>>4
if(u>=8)return H.f(C.f,u)
u=(C.f[u]&1<<(v&15))!==0}else u=!1
else u=!1
if(u){P.aG(a,y,"Invalid character")
t=null
s=null}else{if((v&64512)===55296){u=y+1
if(u<c){r=C.a.B(a,u)
if((r&64512)===56320){v=65536|(v&1023)<<10|r&1023
s=2}else s=1}else s=1}else s=1
t=P.ds(v)}}if(w==null)w=new P.Y("")
w.m+=C.a.k(a,x,y)
w.m+=H.h(t)
if(typeof s!=="number")return H.B(s)
y+=s
x=y}}}if(w==null)return
if(typeof x!=="number")return x.D()
if(x<c)w.m+=C.a.k(a,x,c)
z=w.m
return z.charCodeAt(0)==0?z:z},
dv:function(a){if(C.a.I(a,"."))return!0
return C.a.an(a,"/.")!==-1},
iw:function(a){var z,y,x,w,v,u,t
if(!P.dv(a))return a
z=[]
for(y=a.split("/"),x=y.length,w=!1,v=0;v<y.length;y.length===x||(0,H.aM)(y),++v){u=y[v]
if(J.C(u,"..")){t=z.length
if(t!==0){if(0>=t)return H.f(z,-1)
z.pop()
if(z.length===0)z.push("")}w=!0}else if("."===u)w=!0
else{z.push(u)
w=!1}}if(w)z.push("")
return C.c.bQ(z,"/")},
iv:function(a,b){var z,y,x,w,v,u
if(!P.dv(a))return!b?P.dt(a):a
z=[]
for(y=a.split("/"),x=y.length,w=!1,v=0;v<y.length;y.length===x||(0,H.aM)(y),++v){u=y[v]
if(".."===u)if(z.length!==0&&!J.C(C.c.gao(z),"..")){if(0>=z.length)return H.f(z,-1)
z.pop()
w=!0}else{z.push("..")
w=!1}else if("."===u)w=!0
else{z.push(u)
w=!1}}y=z.length
if(y!==0)if(y===1){if(0>=y)return H.f(z,0)
y=J.by(z[0])===!0}else y=!1
else y=!0
if(y)return"./"
if(w||J.C(C.c.gao(z),".."))z.push("")
if(!b){if(0>=z.length)return H.f(z,0)
y=P.dt(z[0])
if(0>=z.length)return H.f(z,0)
z[0]=y}return C.c.bQ(z,"/")},
dt:function(a){var z,y,x,w
z=J.F(a)
y=z.gi(a)
if(typeof y!=="number")return y.c8()
if(y>=2&&P.du(z.B(a,0))){x=1
while(!0){y=z.gi(a)
if(typeof y!=="number")return H.B(y)
if(!(x<y))break
w=z.B(a,x)
if(w===58)return C.a.k(a,0,x)+"%3A"+C.a.ae(a,x+1)
if(w<=127){y=w>>>4
if(y>=8)return H.f(C.i,y)
y=(C.i[y]&1<<(w&15))===0}else y=!0
if(y)break;++x}}return a},
ik:function(a,b){var z,y,x
for(z=0,y=0;y<2;++y){x=C.a.t(a,b+y)
if(48<=x&&x<=57)z=z*16+x-48
else{x|=32
if(97<=x&&x<=102)z=z*16+x-87
else throw H.c(P.aP("Invalid URL encoding"))}}return z},
bV:function(a,b,c,d,e){var z,y,x,w,v,u
if(typeof c!=="number")return H.B(c)
z=J.j9(a)
y=b
while(!0){if(!(y<c)){x=!0
break}w=z.B(a,y)
if(w<=127)if(w!==37)v=w===43
else v=!0
else v=!0
if(v){x=!1
break}++y}if(x){if(C.k!==d)v=!1
else v=!0
if(v)return z.k(a,b,c)
else u=new H.ej(z.k(a,b,c))}else{u=[]
for(y=b;y<c;++y){w=z.B(a,y)
if(w>127)throw H.c(P.aP("Illegal percent encoding in URI"))
if(w===37){if(y+3>a.length)throw H.c(P.aP("Truncated URI"))
u.push(P.ik(a,y+1))
y+=2}else if(w===43)u.push(32)
else u.push(w)}}return new P.hq(!1).d4(u)},
du:function(a){var z=a|32
return 97<=z&&z<=122}}},
j1:{"^":"i:2;a,b",
$1:function(a){throw H.c(new P.A("Invalid port",this.a,this.b+1))}},
hh:{"^":"e;a,b,c",
gc4:function(){var z,y,x,w,v,u,t
z=this.c
if(z!=null)return z
z=this.b
if(0>=z.length)return H.f(z,0)
y=this.a
z=z[0]+1
x=C.a.a_(y,"?",z)
w=y.length
if(x>=0){v=x+1
u=P.ao(y,v,w,C.h,!1)
if(u==null)u=C.a.k(y,v,w)
w=x}else u=null
t=P.ao(y,z,w,C.t,!1)
z=new P.hB(this,"data",null,null,null,t==null?C.a.k(y,z,w):t,u,null,null,null,null,null,null)
this.c=z
return z},
j:function(a){var z,y
z=this.b
if(0>=z.length)return H.f(z,0)
y=this.a
return z[0]===-1?"data:"+y:y},
q:{
da:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=[b-1]
for(y=a.length,x=b,w=-1,v=null;x<y;++x){v=C.a.t(a,x)
if(v===44||v===59)break
if(v===47){if(w<0){w=x
continue}throw H.c(new P.A("Invalid MIME type",a,x))}}if(w<0&&x>b)throw H.c(new P.A("Invalid MIME type",a,x))
for(;v!==44;){z.push(x);++x
for(u=-1;x<y;++x){v=C.a.t(a,x)
if(v===61){if(u<0)u=x}else if(v===59||v===44)break}if(u>=0)z.push(u)
else{t=C.c.gao(z)
if(v!==44||x!==t+7||!C.a.J(a,"base64",t+1))throw H.c(new P.A("Expecting '='",a,x))
break}}z.push(x)
s=x+1
if((z.length&1)===1)a=C.v.dt(0,a,s,y)
else{r=P.ao(a,s,y,C.h,!0)
if(r!=null)a=C.a.a2(a,s,y,r)}return new P.hh(a,z,c)}}},
iK:{"^":"i:2;",
$1:function(a){return new Uint8Array(H.dx(96))}},
iJ:{"^":"i:18;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.f(z,a)
z=z[a]
J.e4(z,0,96,b)
return z}},
iL:{"^":"i:7;",
$3:function(a,b,c){var z,y,x
for(z=b.length,y=J.as(a),x=0;x<z;++x)y.l(a,C.a.t(b,x)^96,c)}},
iM:{"^":"i:7;",
$3:function(a,b,c){var z,y,x
for(z=C.a.t(b,0),y=C.a.t(b,1),x=J.as(a);z<=y;++z)x.l(a,(z^96)>>>0,c)}},
ie:{"^":"e;a,b,c,d,e,f,r,x,y",
gbM:function(){return this.c>0},
gbO:function(){var z=this.f
if(typeof z!=="number")return z.D()
return z<this.r},
gbN:function(){return this.r<this.a.length},
gb7:function(){var z,y
z=this.b
if(z<=0)return""
y=this.x
if(y!=null)return y
y=z===4
if(y&&C.a.I(this.a,"http")){this.x="http"
z="http"}else if(z===5&&C.a.I(this.a,"https")){this.x="https"
z="https"}else if(y&&C.a.I(this.a,"file")){this.x="file"
z="file"}else if(z===7&&C.a.I(this.a,"package")){this.x="package"
z="package"}else{z=C.a.k(this.a,0,z)
this.x=z}return z},
gc5:function(){var z,y
z=this.c
y=this.b+3
return z>y?C.a.k(this.a,y,z-1):""},
gaR:function(a){var z=this.c
return z>0?C.a.k(this.a,z,this.d):""},
gaW:function(a){var z,y
if(this.c>0){z=this.d
if(typeof z!=="number")return z.L()
y=this.e
if(typeof y!=="number")return H.B(y)
y=z+1<y
z=y}else z=!1
if(z){z=this.d
if(typeof z!=="number")return z.L()
return H.aB(C.a.k(this.a,z+1,this.e),null,null)}z=this.b
if(z===4&&C.a.I(this.a,"http"))return 80
if(z===5&&C.a.I(this.a,"https"))return 443
return 0},
gbV:function(a){return C.a.k(this.a,this.e,this.f)},
gaX:function(a){var z,y
z=this.f
y=this.r
if(typeof z!=="number")return z.D()
return z<y?C.a.k(this.a,z+1,y):""},
gbJ:function(){var z,y
z=this.r
y=this.a
return z<y.length?C.a.ae(y,z+1):""},
gbX:function(){var z=this.f
if(typeof z!=="number")return z.D()
if(z>=this.r)return C.K
z=P.p
return new P.d9(P.dc(this.gaX(this),C.k),[z,z])},
gw:function(a){var z=this.y
if(z==null){z=C.a.gw(this.a)
this.y=z}return z},
p:function(a,b){var z
if(b==null)return!1
if(this===b)return!0
z=J.o(b)
if(!!z.$isbR)return this.a===z.j(b)
return!1},
j:function(a){return this.a},
$isbR:1},
hB:{"^":"dq;cx,a,b,c,d,e,f,r,x,y,z,Q,ch"}}],["","",,W,{"^":"",
cb:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(b,c){return c.toUpperCase()})},
hF:function(a,b){return document.createElement(a)},
ai:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dl:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
iF:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hA(a)
if(!!J.o(z).$isn)return z
return}else return a},
iT:function(a){var z=$.r
if(z===C.d)return a
return z.cZ(a,!0)},
v:{"^":"cm;","%":"HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSlotElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jz:{"^":"v;A:type=",
j:function(a){return String(a)},
$isd:1,
"%":"HTMLAnchorElement"},
jA:{"^":"n;am:id}","%":"Animation"},
jC:{"^":"v;",
j:function(a){return String(a)},
$isd:1,
"%":"HTMLAreaElement"},
a2:{"^":"d;",$ise:1,"%":"AudioTrack"},
jE:{"^":"cr;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.a2]},
$isa:1,
$asa:function(){return[W.a2]},
$isl:1,
$asl:function(){return[W.a2]},
$isk:1,
$ask:function(){return[W.a2]},
"%":"AudioTrackList"},
co:{"^":"n+u;",
$asb:function(){return[W.a2]},
$asa:function(){return[W.a2]},
$isb:1,
$isa:1},
cr:{"^":"co+x;",
$asb:function(){return[W.a2]},
$asa:function(){return[W.a2]},
$isb:1,
$isa:1},
ec:{"^":"d;","%":";Blob"},
jF:{"^":"v;",$isn:1,$isd:1,"%":"HTMLBodyElement"},
jG:{"^":"v;A:type=","%":"HTMLButtonElement"},
ee:{"^":"v;",
ca:function(a,b,c){return a.getContext(b)},
c9:function(a,b){return this.ca(a,b,null)},
"%":"HTMLCanvasElement"},
jH:{"^":"t;i:length=",$isd:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jI:{"^":"n;",$isn:1,$isd:1,"%":"CompositorWorker"},
a3:{"^":"d;",$ise:1,"%":"CSSCharsetRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
en:{"^":"eC;i:length=",
cb:function(a,b){var z=this.cI(a,b)
return z!=null?z:""},
cI:function(a,b){if(W.cb(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.cj()+b)},
cC:function(a,b){var z,y
z=$.$get$cc()
y=z[b]
if(typeof y==="string")return y
y=W.cb(b) in a?b:P.cj()+b
z[b]=y
return y},
cT:function(a,b,c,d){a.setProperty(b,c,d)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eC:{"^":"d+eo;"},
eo:{"^":"e;",
gE:function(a){return this.cb(a,"src")}},
jK:{"^":"d;i:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
jL:{"^":"t;",$isd:1,"%":"DocumentFragment|ShadowRoot"},
jM:{"^":"d;",
j:function(a){return String(a)},
"%":"DOMException"},
es:{"^":"d;",
j:function(a){return"Rectangle ("+H.h(a.left)+", "+H.h(a.top)+") "+H.h(this.gV(a))+" x "+H.h(this.gU(a))},
p:function(a,b){var z
if(b==null)return!1
z=J.o(b)
if(!z.$isK)return!1
return a.left===z.gaT(b)&&a.top===z.gb1(b)&&this.gV(a)===z.gV(b)&&this.gU(a)===z.gU(b)},
gw:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gV(a)
w=this.gU(a)
return W.dl(W.ai(W.ai(W.ai(W.ai(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gU:function(a){return a.height},
gaT:function(a){return a.left},
gb1:function(a){return a.top},
gV:function(a){return a.width},
$isK:1,
$asK:I.H,
"%":";DOMRectReadOnly"},
jN:{"^":"eX;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[P.p]},
$isa:1,
$asa:function(){return[P.p]},
$isl:1,
$asl:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":"DOMStringList"},
eD:{"^":"d+u;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},
eX:{"^":"eD+x;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},
jO:{"^":"d;i:length=","%":"DOMTokenList"},
cm:{"^":"t;am:id}",
j:function(a){return a.localName},
$isd:1,
$isn:1,
"%":";Element"},
jP:{"^":"v;E:src=,A:type=","%":"HTMLEmbedElement"},
jQ:{"^":"aS;G:error=","%":"ErrorEvent"},
aS:{"^":"d;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MouseEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SVGZoomEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent;Event|InputEvent"},
n:{"^":"d;",
cA:function(a,b,c,d){return a.addEventListener(b,H.aL(c,1),!1)},
cR:function(a,b,c,d){return a.removeEventListener(b,H.aL(c,1),!1)},
$isn:1,
"%":"AnalyserNode|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioContext|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioSourceNode|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|CrossOriginServiceWorkerClient|DOMApplicationCache|DelayNode|DynamicsCompressorNode|EventSource|FontFaceSet|GainNode|IDBDatabase|IIRFilterNode|JavaScriptAudioNode|MIDIAccess|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MessagePort|NetworkInformation|Notification|OfflineAudioContext|OfflineResourceList|Oscillator|OscillatorNode|PannerNode|Performance|PermissionStatus|PresentationAvailability|PresentationReceiver|PresentationRequest|RTCDTMFSender|RTCPeerConnection|RealtimeAnalyserNode|ScreenOrientation|ScriptProcessorNode|ServicePortCollection|ServiceWorkerContainer|ServiceWorkerRegistration|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|WaveShaperNode|WorkerPerformance|mozRTCPeerConnection|webkitAudioContext|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;co|cr|cp|cs|cq|ct"},
ey:{"^":"aS;","%":"FetchEvent|InstallEvent|NotificationEvent|PushEvent|ServicePortConnectEvent|SyncEvent;ExtendableEvent"},
jR:{"^":"ey;M:source=","%":"ExtendableMessageEvent"},
k7:{"^":"v;A:type=","%":"HTMLFieldSetElement"},
a4:{"^":"ec;",$ise:1,"%":"File"},
k8:{"^":"eY;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.a4]},
$isk:1,
$ask:function(){return[W.a4]},
$isb:1,
$asb:function(){return[W.a4]},
$isa:1,
$asa:function(){return[W.a4]},
"%":"FileList"},
eE:{"^":"d+u;",
$asb:function(){return[W.a4]},
$asa:function(){return[W.a4]},
$isb:1,
$isa:1},
eY:{"^":"eE+x;",
$asb:function(){return[W.a4]},
$asa:function(){return[W.a4]},
$isb:1,
$isa:1},
k9:{"^":"n;G:error=","%":"FileReader"},
ka:{"^":"n;G:error=,i:length=","%":"FileWriter"},
kc:{"^":"v;i:length=","%":"HTMLFormElement"},
a5:{"^":"d;",$ise:1,"%":"Gamepad"},
ke:{"^":"d;i:length=","%":"History"},
kf:{"^":"eZ;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.t]},
$isa:1,
$asa:function(){return[W.t]},
$isl:1,
$asl:function(){return[W.t]},
$isk:1,
$ask:function(){return[W.t]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
eF:{"^":"d+u;",
$asb:function(){return[W.t]},
$asa:function(){return[W.t]},
$isb:1,
$isa:1},
eZ:{"^":"eF+x;",
$asb:function(){return[W.t]},
$asa:function(){return[W.t]},
$isb:1,
$isa:1},
kg:{"^":"eA;",
P:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
eA:{"^":"n;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
kh:{"^":"v;E:src=","%":"HTMLIFrameElement"},
ki:{"^":"v;E:src=","%":"HTMLImageElement"},
kk:{"^":"v;E:src=,A:type=",$isd:1,$isn:1,"%":"HTMLInputElement"},
kn:{"^":"v;A:type=","%":"HTMLKeygenElement"},
kp:{"^":"v;A:type=","%":"HTMLLinkElement"},
kq:{"^":"d;",
j:function(a){return String(a)},
"%":"Location"},
kt:{"^":"v;G:error=,E:src=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
ku:{"^":"d;i:length=","%":"MediaList"},
kv:{"^":"v;A:type=","%":"HTMLMenuElement"},
kw:{"^":"v;A:type=","%":"HTMLMenuItemElement"},
kx:{"^":"aS;",
gM:function(a){return W.iF(a.source)},
"%":"MessageEvent"},
ky:{"^":"fF;",
dC:function(a,b,c){return a.send(b,c)},
P:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
fF:{"^":"n;","%":"MIDIInput;MIDIPort"},
a6:{"^":"d;",$ise:1,"%":"MimeType"},
kz:{"^":"f8;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.a6]},
$isk:1,
$ask:function(){return[W.a6]},
$isb:1,
$asb:function(){return[W.a6]},
$isa:1,
$asa:function(){return[W.a6]},
"%":"MimeTypeArray"},
eP:{"^":"d+u;",
$asb:function(){return[W.a6]},
$asa:function(){return[W.a6]},
$isb:1,
$isa:1},
f8:{"^":"eP+x;",
$asb:function(){return[W.a6]},
$asa:function(){return[W.a6]},
$isb:1,
$isa:1},
kJ:{"^":"d;",$isd:1,"%":"Navigator"},
t:{"^":"n;",
j:function(a){var z=a.nodeValue
return z==null?this.cn(a):z},
cY:function(a,b){return a.appendChild(b)},
$ise:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
kK:{"^":"f9;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.t]},
$isa:1,
$asa:function(){return[W.t]},
$isl:1,
$asl:function(){return[W.t]},
$isk:1,
$ask:function(){return[W.t]},
"%":"NodeList|RadioNodeList"},
eQ:{"^":"d+u;",
$asb:function(){return[W.t]},
$asa:function(){return[W.t]},
$isb:1,
$isa:1},
f9:{"^":"eQ+x;",
$asb:function(){return[W.t]},
$asa:function(){return[W.t]},
$isb:1,
$isa:1},
kM:{"^":"v;A:type=","%":"HTMLOListElement"},
kN:{"^":"v;A:type=","%":"HTMLObjectElement"},
kO:{"^":"v;A:type=","%":"HTMLOutputElement"},
kP:{"^":"d;",$isd:1,"%":"Path2D"},
kR:{"^":"hd;i:length=","%":"Perspective"},
a8:{"^":"d;i:length=",$ise:1,"%":"Plugin"},
kS:{"^":"fa;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.a8]},
$isa:1,
$asa:function(){return[W.a8]},
$isl:1,
$asl:function(){return[W.a8]},
$isk:1,
$ask:function(){return[W.a8]},
"%":"PluginArray"},
eR:{"^":"d+u;",
$asb:function(){return[W.a8]},
$asa:function(){return[W.a8]},
$isb:1,
$isa:1},
fa:{"^":"eR+x;",
$asb:function(){return[W.a8]},
$asa:function(){return[W.a8]},
$isb:1,
$isa:1},
kU:{"^":"n;",
P:function(a,b){return a.send(b)},
"%":"PresentationConnection"},
kX:{"^":"n;",
P:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
kY:{"^":"v;E:src=,A:type=","%":"HTMLScriptElement"},
l_:{"^":"v;i:length=,A:type=","%":"HTMLSelectElement"},
l0:{"^":"aS;M:source=","%":"ServiceWorkerMessageEvent"},
l2:{"^":"n;",$isn:1,$isd:1,"%":"SharedWorker"},
aa:{"^":"n;",$ise:1,"%":"SourceBuffer"},
l3:{"^":"cs;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.aa]},
$isa:1,
$asa:function(){return[W.aa]},
$isl:1,
$asl:function(){return[W.aa]},
$isk:1,
$ask:function(){return[W.aa]},
"%":"SourceBufferList"},
cp:{"^":"n+u;",
$asb:function(){return[W.aa]},
$asa:function(){return[W.aa]},
$isb:1,
$isa:1},
cs:{"^":"cp+x;",
$asb:function(){return[W.aa]},
$asa:function(){return[W.aa]},
$isb:1,
$isa:1},
l4:{"^":"v;E:src=,A:type=","%":"HTMLSourceElement"},
ab:{"^":"d;E:src=",$ise:1,"%":"SpeechGrammar"},
l5:{"^":"fb;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.ab]},
$isa:1,
$asa:function(){return[W.ab]},
$isl:1,
$asl:function(){return[W.ab]},
$isk:1,
$ask:function(){return[W.ab]},
"%":"SpeechGrammarList"},
eS:{"^":"d+u;",
$asb:function(){return[W.ab]},
$asa:function(){return[W.ab]},
$isb:1,
$isa:1},
fb:{"^":"eS+x;",
$asb:function(){return[W.ab]},
$asa:function(){return[W.ab]},
$isb:1,
$isa:1},
l6:{"^":"aS;G:error=","%":"SpeechRecognitionError"},
ac:{"^":"d;i:length=",$ise:1,"%":"SpeechRecognitionResult"},
l8:{"^":"d;",
h:function(a,b){return a.getItem(b)},
l:function(a,b,c){a.setItem(b,c)},
gi:function(a){return a.length},
gu:function(a){return a.key(0)==null},
"%":"Storage"},
la:{"^":"v;A:type=","%":"HTMLStyleElement"},
ad:{"^":"d;",$ise:1,"%":"CSSStyleSheet|StyleSheet"},
le:{"^":"v;A:type=","%":"HTMLTextAreaElement"},
ae:{"^":"n;",$ise:1,"%":"TextTrack"},
af:{"^":"n;am:id}",$ise:1,"%":"TextTrackCue|VTTCue"},
lg:{"^":"fc;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.af]},
$isk:1,
$ask:function(){return[W.af]},
$isb:1,
$asb:function(){return[W.af]},
$isa:1,
$asa:function(){return[W.af]},
"%":"TextTrackCueList"},
eT:{"^":"d+u;",
$asb:function(){return[W.af]},
$asa:function(){return[W.af]},
$isb:1,
$isa:1},
fc:{"^":"eT+x;",
$asb:function(){return[W.af]},
$asa:function(){return[W.af]},
$isb:1,
$isa:1},
lh:{"^":"ct;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.ae]},
$isk:1,
$ask:function(){return[W.ae]},
$isb:1,
$asb:function(){return[W.ae]},
$isa:1,
$asa:function(){return[W.ae]},
"%":"TextTrackList"},
cq:{"^":"n+u;",
$asb:function(){return[W.ae]},
$asa:function(){return[W.ae]},
$isb:1,
$isa:1},
ct:{"^":"cq+x;",
$asb:function(){return[W.ae]},
$asa:function(){return[W.ae]},
$isb:1,
$isa:1},
li:{"^":"d;i:length=","%":"TimeRanges"},
ag:{"^":"d;",$ise:1,"%":"Touch"},
lj:{"^":"fd;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.ag]},
$isa:1,
$asa:function(){return[W.ag]},
$isl:1,
$asl:function(){return[W.ag]},
$isk:1,
$ask:function(){return[W.ag]},
"%":"TouchList"},
eU:{"^":"d+u;",
$asb:function(){return[W.ag]},
$asa:function(){return[W.ag]},
$isb:1,
$isa:1},
fd:{"^":"eU+x;",
$asb:function(){return[W.ag]},
$asa:function(){return[W.ag]},
$isb:1,
$isa:1},
lk:{"^":"d;i:length=","%":"TrackDefaultList"},
ll:{"^":"v;E:src=","%":"HTMLTrackElement"},
hd:{"^":"d;","%":"Matrix|Rotation|Skew|Translation;TransformComponent"},
lo:{"^":"d;",
j:function(a){return String(a)},
$isd:1,
"%":"URL"},
lq:{"^":"n;i:length=","%":"VideoTrackList"},
lt:{"^":"d;am:id}","%":"VTTRegion"},
lu:{"^":"d;i:length=","%":"VTTRegionList"},
lv:{"^":"n;",
P:function(a,b){return a.send(b)},
"%":"WebSocket"},
lw:{"^":"n;",$isd:1,$isn:1,"%":"DOMWindow|Window"},
lx:{"^":"n;",$isn:1,$isd:1,"%":"Worker"},
ly:{"^":"n;",$isd:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
lC:{"^":"d;U:height=,aT:left=,b1:top=,V:width=",
j:function(a){return"Rectangle ("+H.h(a.left)+", "+H.h(a.top)+") "+H.h(a.width)+" x "+H.h(a.height)},
p:function(a,b){var z,y,x
if(b==null)return!1
z=J.o(b)
if(!z.$isK)return!1
y=a.left
x=z.gaT(b)
if(y==null?x==null:y===x){y=a.top
x=z.gb1(b)
if(y==null?x==null:y===x){y=a.width
x=z.gV(b)
if(y==null?x==null:y===x){y=a.height
z=z.gU(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gw:function(a){var z,y,x,w
z=J.a_(a.left)
y=J.a_(a.top)
x=J.a_(a.width)
w=J.a_(a.height)
return W.dl(W.ai(W.ai(W.ai(W.ai(0,z),y),x),w))},
$isK:1,
$asK:I.H,
"%":"ClientRect"},
lD:{"^":"fe;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[P.K]},
$isk:1,
$ask:function(){return[P.K]},
$isb:1,
$asb:function(){return[P.K]},
$isa:1,
$asa:function(){return[P.K]},
"%":"ClientRectList|DOMRectList"},
eV:{"^":"d+u;",
$asb:function(){return[P.K]},
$asa:function(){return[P.K]},
$isb:1,
$isa:1},
fe:{"^":"eV+x;",
$asb:function(){return[P.K]},
$asa:function(){return[P.K]},
$isb:1,
$isa:1},
lE:{"^":"ff;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.a3]},
$isa:1,
$asa:function(){return[W.a3]},
$isl:1,
$asl:function(){return[W.a3]},
$isk:1,
$ask:function(){return[W.a3]},
"%":"CSSRuleList"},
eW:{"^":"d+u;",
$asb:function(){return[W.a3]},
$asa:function(){return[W.a3]},
$isb:1,
$isa:1},
ff:{"^":"eW+x;",
$asb:function(){return[W.a3]},
$asa:function(){return[W.a3]},
$isb:1,
$isa:1},
lF:{"^":"t;",$isd:1,"%":"DocumentType"},
lG:{"^":"es;",
gU:function(a){return a.height},
gV:function(a){return a.width},
"%":"DOMRect"},
lI:{"^":"f_;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.a5]},
$isk:1,
$ask:function(){return[W.a5]},
$isb:1,
$asb:function(){return[W.a5]},
$isa:1,
$asa:function(){return[W.a5]},
"%":"GamepadList"},
eG:{"^":"d+u;",
$asb:function(){return[W.a5]},
$asa:function(){return[W.a5]},
$isb:1,
$isa:1},
f_:{"^":"eG+x;",
$asb:function(){return[W.a5]},
$asa:function(){return[W.a5]},
$isb:1,
$isa:1},
lK:{"^":"v;",$isn:1,$isd:1,"%":"HTMLFrameSetElement"},
lL:{"^":"f0;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.t]},
$isa:1,
$asa:function(){return[W.t]},
$isl:1,
$asl:function(){return[W.t]},
$isk:1,
$ask:function(){return[W.t]},
"%":"MozNamedAttrMap|NamedNodeMap"},
eH:{"^":"d+u;",
$asb:function(){return[W.t]},
$asa:function(){return[W.t]},
$isb:1,
$isa:1},
f0:{"^":"eH+x;",
$asb:function(){return[W.t]},
$asa:function(){return[W.t]},
$isb:1,
$isa:1},
lP:{"^":"n;",$isn:1,$isd:1,"%":"ServiceWorker"},
lQ:{"^":"f1;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isb:1,
$asb:function(){return[W.ac]},
$isa:1,
$asa:function(){return[W.ac]},
$isl:1,
$asl:function(){return[W.ac]},
$isk:1,
$ask:function(){return[W.ac]},
"%":"SpeechRecognitionResultList"},
eI:{"^":"d+u;",
$asb:function(){return[W.ac]},
$asa:function(){return[W.ac]},
$isb:1,
$isa:1},
f1:{"^":"eI+x;",
$asb:function(){return[W.ac]},
$asa:function(){return[W.ac]},
$isb:1,
$isa:1},
lR:{"^":"f2;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){if(b>>>0!==b||b>=a.length)return H.f(a,b)
return a[b]},
$isl:1,
$asl:function(){return[W.ad]},
$isk:1,
$ask:function(){return[W.ad]},
$isb:1,
$asb:function(){return[W.ad]},
$isa:1,
$asa:function(){return[W.ad]},
"%":"StyleSheetList"},
eJ:{"^":"d+u;",
$asb:function(){return[W.ad]},
$asa:function(){return[W.ad]},
$isb:1,
$isa:1},
f2:{"^":"eJ+x;",
$asb:function(){return[W.ad]},
$asa:function(){return[W.ad]},
$isb:1,
$isa:1},
lT:{"^":"d;",$isd:1,"%":"WorkerLocation"},
lU:{"^":"d;",$isd:1,"%":"WorkerNavigator"},
hI:{"^":"aC;$ti",
a0:function(a,b,c,d){return W.dh(this.a,this.b,a,!1,H.Z(this,0))},
bT:function(a,b,c){return this.a0(a,null,b,c)}},
lH:{"^":"hI;a,b,c,$ti"},
hJ:{"^":"h_;a,b,c,d,e,$ti",
aO:function(a){if(this.b==null)return
this.bC()
this.b=null
this.d=null
return},
aU:function(a,b){if(this.b==null)return;++this.a
this.bC()},
bW:function(a){return this.aU(a,null)},
bZ:function(a){if(this.b==null||this.a<=0)return;--this.a
this.bA()},
bA:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.e0(x,this.c,z,!1)}},
bC:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.e1(x,this.c,z,!1)}},
cu:function(a,b,c,d,e){this.bA()},
q:{
dh:function(a,b,c,d,e){var z=c==null?null:W.iT(new W.hK(c))
z=new W.hJ(0,a,b,z,!1,[e])
z.cu(a,b,c,!1,e)
return z}}},
hK:{"^":"i:2;a",
$1:function(a){return this.a.$1(a)}},
x:{"^":"e;$ti",
gF:function(a){return new W.ez(a,this.gi(a),-1,null)},
al:function(a,b,c,d){throw H.c(new P.m("Cannot modify an immutable List."))},
$isb:1,
$asb:null,
$isa:1,
$asa:null},
ez:{"^":"e;a,b,c,d",
v:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.b7(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gC:function(){return this.d}},
hz:{"^":"e;a",$isn:1,$isd:1,q:{
hA:function(a){if(a===window)return a
else return new W.hz(a)}}}}],["","",,P,{"^":"",
j2:function(a){var z,y,x,w,v
if(a==null)return
z=P.bF()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.aM)(y),++w){v=y[w]
z.l(0,v,a[v])}return z},
ck:function(){var z=$.ci
if(z==null){z=J.bx(window.navigator.userAgent,"Opera",0)
$.ci=z}return z},
cj:function(){var z,y
z=$.cf
if(z!=null)return z
y=$.cg
if(y==null){y=J.bx(window.navigator.userAgent,"Firefox",0)
$.cg=y}if(y)z="-moz-"
else{y=$.ch
if(y==null){y=P.ck()!==!0&&J.bx(window.navigator.userAgent,"Trident/",0)
$.ch=y}if(y)z="-ms-"
else z=P.ck()===!0?"-o-":"-webkit-"}$.cf=z
return z}}],["","",,P,{"^":"",jJ:{"^":"d;M:source=","%":"IDBCursor|IDBCursorWithValue"},kW:{"^":"n;G:error=,M:source=","%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},lm:{"^":"n;G:error=","%":"IDBTransaction"}}],["","",,P,{"^":"",i9:{"^":"e;$ti"},K:{"^":"i9;$ti",$asK:null}}],["","",,P,{"^":"",jy:{"^":"aV;",$isd:1,"%":"SVGAElement"},jB:{"^":"q;",$isd:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},jS:{"^":"q;",$isd:1,"%":"SVGFEBlendElement"},jT:{"^":"q;A:type=",$isd:1,"%":"SVGFEColorMatrixElement"},jU:{"^":"q;",$isd:1,"%":"SVGFEComponentTransferElement"},jV:{"^":"q;",$isd:1,"%":"SVGFECompositeElement"},jW:{"^":"q;",$isd:1,"%":"SVGFEConvolveMatrixElement"},jX:{"^":"q;",$isd:1,"%":"SVGFEDiffuseLightingElement"},jY:{"^":"q;",$isd:1,"%":"SVGFEDisplacementMapElement"},jZ:{"^":"q;",$isd:1,"%":"SVGFEFloodElement"},k_:{"^":"q;",$isd:1,"%":"SVGFEGaussianBlurElement"},k0:{"^":"q;",$isd:1,"%":"SVGFEImageElement"},k1:{"^":"q;",$isd:1,"%":"SVGFEMergeElement"},k2:{"^":"q;",$isd:1,"%":"SVGFEMorphologyElement"},k3:{"^":"q;",$isd:1,"%":"SVGFEOffsetElement"},k4:{"^":"q;",$isd:1,"%":"SVGFESpecularLightingElement"},k5:{"^":"q;",$isd:1,"%":"SVGFETileElement"},k6:{"^":"q;A:type=",$isd:1,"%":"SVGFETurbulenceElement"},kb:{"^":"q;",$isd:1,"%":"SVGFilterElement"},aV:{"^":"q;",$isd:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},kj:{"^":"aV;",$isd:1,"%":"SVGImageElement"},aw:{"^":"d;",$ise:1,"%":"SVGLength"},ko:{"^":"f3;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a.getItem(b)},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.aw]},
$isa:1,
$asa:function(){return[P.aw]},
"%":"SVGLengthList"},eK:{"^":"d+u;",
$asb:function(){return[P.aw]},
$asa:function(){return[P.aw]},
$isb:1,
$isa:1},f3:{"^":"eK+x;",
$asb:function(){return[P.aw]},
$asa:function(){return[P.aw]},
$isb:1,
$isa:1},kr:{"^":"q;",$isd:1,"%":"SVGMarkerElement"},ks:{"^":"q;",$isd:1,"%":"SVGMaskElement"},aA:{"^":"d;",$ise:1,"%":"SVGNumber"},kL:{"^":"f4;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a.getItem(b)},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.aA]},
$isa:1,
$asa:function(){return[P.aA]},
"%":"SVGNumberList"},eL:{"^":"d+u;",
$asb:function(){return[P.aA]},
$asa:function(){return[P.aA]},
$isb:1,
$isa:1},f4:{"^":"eL+x;",
$asb:function(){return[P.aA]},
$asa:function(){return[P.aA]},
$isb:1,
$isa:1},kQ:{"^":"q;",$isd:1,"%":"SVGPatternElement"},kT:{"^":"d;i:length=","%":"SVGPointList"},kZ:{"^":"q;A:type=",$isd:1,"%":"SVGScriptElement"},l9:{"^":"f5;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a.getItem(b)},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.p]},
$isa:1,
$asa:function(){return[P.p]},
"%":"SVGStringList"},eM:{"^":"d+u;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},f5:{"^":"eM+x;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},lb:{"^":"q;A:type=","%":"SVGStyleElement"},q:{"^":"cm;",$isn:1,$isd:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},lc:{"^":"aV;",$isd:1,"%":"SVGSVGElement"},ld:{"^":"q;",$isd:1,"%":"SVGSymbolElement"},h7:{"^":"aV;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},lf:{"^":"h7;",$isd:1,"%":"SVGTextPathElement"},aD:{"^":"d;",$ise:1,"%":"SVGTransform"},ln:{"^":"f6;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return a.getItem(b)},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.aD]},
$isa:1,
$asa:function(){return[P.aD]},
"%":"SVGTransformList"},eN:{"^":"d+u;",
$asb:function(){return[P.aD]},
$asa:function(){return[P.aD]},
$isb:1,
$isa:1},f6:{"^":"eN+x;",
$asb:function(){return[P.aD]},
$asa:function(){return[P.aD]},
$isb:1,
$isa:1},lp:{"^":"aV;",$isd:1,"%":"SVGUseElement"},lr:{"^":"q;",$isd:1,"%":"SVGViewElement"},ls:{"^":"d;",$isd:1,"%":"SVGViewSpec"},lJ:{"^":"q;",$isd:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},lM:{"^":"q;",$isd:1,"%":"SVGCursorElement"},lN:{"^":"q;",$isd:1,"%":"SVGFEDropShadowElement"},lO:{"^":"q;",$isd:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",b1:{"^":"e;",$isb:1,
$asb:function(){return[P.j]},
$isa:1,
$asa:function(){return[P.j]}}}],["","",,P,{"^":"",jD:{"^":"d;i:length=","%":"AudioBuffer"}}],["","",,P,{"^":"",bO:{"^":"d;",
bE:function(a,b,c){return a.attachShader(b,c)},
bG:function(a,b){return a.compileShader(b)},
bH:function(a){return a.createProgram()},
bI:function(a,b){return a.createShader(b)},
b3:function(a,b,c){return a.getProgramParameter(b,c)},
b4:function(a,b,c){return a.getShaderParameter(b,c)},
bS:function(a,b){return a.linkProgram(b)},
b9:function(a,b,c){return a.shaderSource(b,c)},
d_:function(a,b,c,d){a.bufferData(b,c,d)},
$isbO:1,
"%":"WebGLRenderingContext"},kV:{"^":"d;",
bE:function(a,b,c){return a.attachShader(b,c)},
bG:function(a,b){return a.compileShader(b)},
bH:function(a){return a.createProgram()},
bI:function(a,b){return a.createShader(b)},
b3:function(a,b,c){return a.getProgramParameter(b,c)},
b4:function(a,b,c){return a.getShaderParameter(b,c)},
bS:function(a,b){return a.linkProgram(b)},
b9:function(a,b,c){return a.shaderSource(b,c)},
$isd:1,
"%":"WebGL2RenderingContext"},lS:{"^":"d;",$isd:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",l7:{"^":"f7;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.w(b,a,null,null,null))
return P.j2(a.item(b))},
l:function(a,b,c){throw H.c(new P.m("Cannot assign element of immutable List."))},
n:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.az]},
$isa:1,
$asa:function(){return[P.az]},
"%":"SQLResultSetRowList"},eO:{"^":"d+u;",
$asb:function(){return[P.az]},
$asa:function(){return[P.az]},
$isb:1,
$isa:1},f7:{"^":"eO+x;",
$asb:function(){return[P.az]},
$asa:function(){return[P.az]},
$isb:1,
$isa:1}}],["","",,R,{"^":"",
iG:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=document
y=z.querySelector("#content")
x=W.hF("span",null)
w=z.createElement("canvas")
v=w.style
C.l.cT(v,(v&&C.l).cC(v,"transform"),"perspective(400px) translateZ(-50)","")
v=J.N(c)
w.title=v.gE(c)
W.dh(w,"click",new R.iH(c),!1,W.kA)
u=$.dz
$.dz=u+1
t=J.N(x)
t.sam(x,"id"+u)
t.cY(x,w)
y.appendChild(x)
w.width=a
w.height=b
s=C.z.c9(w,"experimental-webgl")
if(!J.o(s).$isbO){P.bt("Failed to load canvas")
return}r=z.querySelector("#v2d-vertex-shader")
q=r.textContent
z=J.N(r)
if(z.gA(r)==="x-shader/x-vertex")p=35633
else if(z.gA(r)==="x-shader/x-fragment")p=35632
else{H.y(P.aT("*** Error: unknown shader type"))
p=null}o=N.j3(s,[N.dU(s,q,p),N.dU(s,v.gE(c),35632)])
s.useProgram(o)
n=s.getAttribLocation(o,"a_position")
s.bindBuffer(34962,s.createBuffer())
C.L.d_(s,34962,new Float32Array(H.dy([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),35044)
s.enableVertexAttribArray(n)
s.vertexAttribPointer(n,2,5126,!1,0,0)
s.uniform2f(s.getUniformLocation(o,"resolution"),w.width,w.height)
s.uniform1f(s.getUniformLocation(o,"time"),d)
s.drawArrays(4,0,6)},
m_:[function(){var z,y,x
z={}
y=P.hk().gbX().h(0,"size")
x=H.aB(y==null?"0":y,null,null)
z.a=x
if(J.C(x,0))z.a=256
y=[new R.E("    #define iTime time\r\n\r\n    mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}\r\n    mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);\r\n    float tri(in float x){return clamp(abs(fract(x)-.5),0.01,0.49);}\r\n    vec2 tri2(in vec2 p){return vec2(tri(p.x)+tri(p.y),tri(p.y+tri(p.x)));}\r\n    \r\n    float triNoise2d(in vec2 p, float spd)\r\n    {\r\n        float z=1.8;\r\n        float z2=2.5;\r\n      float rz = 0.;\r\n        p *= mm2(p.x*0.06);\r\n        vec2 bp = p;\r\n      for (float i=0.; i<5.; i++ )\r\n      {\r\n            vec2 dg = tri2(bp*1.85)*.75;\r\n            dg *= mm2(time*spd);\r\n            p -= dg/z2;\r\n    \r\n            bp *= 1.3;\r\n            z2 *= .45;\r\n            z *= .42;\r\n        p *= 1.21 + (rz-1.0)*.02;\r\n            \r\n            rz += tri(p.x+tri(p.y))*z;\r\n            p*= -m2;\r\n      }\r\n        return clamp(1./pow(rz*29., 1.3),0.,.55);\r\n    }\r\n    \r\n    float hash21(in vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }\r\n    vec4 aurora(vec3 ro, vec3 rd)\r\n    {\r\n        vec4 col = vec4(0);\r\n        vec4 avgCol = vec4(0);\r\n        \r\n        for(float i=0.;i<50.;i++)\r\n        {\r\n            float of = 0.006*hash21(gl_FragCoord.xy)*smoothstep(0.,15., i);\r\n            float pt = ((.8+pow(i,1.4)*.002)-ro.y)/(rd.y*2.+0.4);\r\n            pt -= of;\r\n          vec3 bpos = ro + pt*rd;\r\n            vec2 p = bpos.zx;\r\n            float rzt = triNoise2d(p, 0.06);\r\n            vec4 col2 = vec4(0,0,0, rzt);\r\n            col2.rgb = (sin(1.-vec3(2.05,-.7, 0.9)+i*0.063)*0.5+0.5)*rzt;\r\n            avgCol =  mix(avgCol, col2, .5);\r\n            col += avgCol*exp2(-i*0.065 - 2.5)*smoothstep(0.,5., i);\r\n            \r\n        }\r\n        \r\n        col *= (clamp(rd.y*15.+.4,0.,1.));\r\n        \r\n        \r\n        //return clamp(pow(col,vec4(1.3))*1.5,0.,1.);\r\n        //return clamp(pow(col,vec4(1.7))*2.,0.,1.);\r\n        //return clamp(pow(col,vec4(1.5))*2.5,0.,1.);\r\n        //return clamp(pow(col,vec4(1.8))*1.5,0.,1.);\r\n        \r\n        //return smoothstep(0.,1.1,pow(col,vec4(1.))*1.5);\r\n        return col*1.8;\r\n        //return pow(col,vec4(1.))*2.\r\n    }\r\n    \r\n    \r\n    //-------------------Background and Stars--------------------\r\n    \r\n    //From Dave_Hoskins (https://www.shadertoy.com/view/4djSRW)\r\n    vec3 hash33(vec3 p)\r\n    {\r\n        p = fract(p * vec3(443.8975,397.2973, 491.1871));\r\n        p += dot(p.zxy, p.yxz+19.27);\r\n        return fract(vec3(p.x * p.y, p.z*p.x, p.y*p.z));\r\n    }\r\n    \r\n    vec3 stars(in vec3 p)\r\n    {\r\n        vec3 c = vec3(0.);\r\n        float res = resolution.x*1.;\r\n        \r\n      for (float i=0.;i<4.;i++)\r\n        {\r\n            vec3 q = fract(p*(.15*res))-0.5;\r\n            vec3 id = floor(p*(.15*res));\r\n            vec2 rn = hash33(id).xy;\r\n            float c2 = 1.-smoothstep(0.,.6,length(q));\r\n            c2 *= step(rn.x,.0005+i*i*0.001);\r\n            c += c2*(mix(vec3(1.0,0.49,0.1),vec3(0.75,0.9,1.),rn.y)*0.1+0.9);\r\n            p *= 1.3;\r\n        }\r\n        return c*c*.8;\r\n    }\r\n    \r\n    vec3 bg(in vec3 rd)\r\n    {\r\n        float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd)*0.5+0.5;\r\n        sd = pow(sd, 5.);\r\n        vec3 col = mix(vec3(0.05,0,0.1), vec3(0.1,0.05,0.2), sd);\r\n        return col*.63;\r\n    }\r\n    //-----------------------------------------------------------\r\n    \r\n    \r\n    void main()\r\n    {\r\n      vec2 q = gl_FragCoord.xy / resolution.xy;\r\n            vec2 p = q - 0.5;\r\n      p.x*=resolution.x/resolution.y;\r\n        \r\n        vec3 ro = vec3(0,0,-6.7);\r\n        vec3 rd = normalize(vec3(p,1.3));\r\n        rd.yz *= mm2(0.17);\r\n        \r\n        vec3 col = vec3(0.);\r\n        vec3 brd = rd;\r\n        float fade = smoothstep(0.,0.01,abs(brd.y))*0.1+0.9;\r\n        \r\n        col = bg(rd)*fade;\r\n        \r\n        if (rd.y > 0.){\r\n            vec4 aur = smoothstep(0.,1.5,aurora(ro,rd))*fade;\r\n            col += stars(rd);\r\n            col = col*(1.-aur.a) + aur.rgb;\r\n        }\r\n        else //Reflections\r\n        {\r\n            rd.y = abs(rd.y);\r\n            col = bg(rd)*fade*0.6;\r\n            vec4 aur = smoothstep(0.0,2.5,aurora(ro,rd));\r\n            col += stars(rd)*0.1;\r\n            col = col*(1.-aur.a) + aur.rgb;\r\n            vec2 uv = vec2(p.x,1.)/abs(p.y);\r\n            float nz2 = triNoise2d(uv*vec2(0.09,15.) + vec2(0.3+ 0.5*sin(p.y*17.),0.), 0.);\r\n            col += mix(vec3(0.2,0.25,0.5)*0.08,vec3(0.3,0.3,0.5)*0.7, nz2*0.5);\r\n        }\r\n        \r\n      gl_FragColor = vec4(col, 1.);\r\n    }\r\n  ","http://glslsandbox.com/e#43096.0"),new R.E("    vec3 mod289(vec3 x) {\r\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\r\n    }\r\n    \r\n    vec2 mod289(vec2 x) {\r\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\r\n    }\r\n    \r\n    vec3 permute(vec3 x) {\r\n      return mod289(((x*34.0)+1.0)*x);\r\n    }\r\n    \r\n    float snoise(vec2 v)\r\n      {\r\n      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\r\n                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\r\n                         -0.577350269189626,  // -1.0 + 2.0 * C.x\r\n                          0.024390243902439); // 1.0 / 41.0\r\n    // First corner\r\n      vec2 i  = floor(v + dot(v, C.yy) );\r\n      vec2 x0 = v -   i + dot(i, C.xx);\r\n    \r\n    // Other corners\r\n      vec2 i1;\r\n      //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\r\n      //i1.y = 1.0 - i1.x;\r\n      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r\n      // x0 = x0 - 0.0 + 0.0 * C.xx ;\r\n      // x1 = x0 - i1 + 1.0 * C.xx ;\r\n      // x2 = x0 - 1.0 + 2.0 * C.xx ;\r\n      vec4 x12 = x0.xyxy + C.xxzz;\r\n      x12.xy -= i1;\r\n    \r\n    // Permutations\r\n      i = mod289(i); // Avoid truncation effects in permutation\r\n      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\r\n        + i.x + vec3(0.0, i1.x, 1.0 ));\r\n    \r\n      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\r\n      m = m*m ;\r\n      m = m*m ;\r\n    \r\n    // Gradients: 41 points uniformly over a line, mapped onto a diamond.\r\n    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\r\n    \r\n      vec3 x = 2.0 * fract(p * C.www) - 1.0;\r\n      vec3 h = abs(x) - 0.5;\r\n      vec3 ox = floor(x + 0.5);\r\n      vec3 a0 = x - ox;\r\n    \r\n    // Normalise gradients implicitly by scaling m\r\n    // Approximation of: m *= inversesqrt( a0*a0 + h*h );\r\n      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\r\n    \r\n    // Compute final noise value at P\r\n      vec3 g;\r\n      g.x  = a0.x  * x0.x  + h.x  * x0.y;\r\n      g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r\n      return 130.0 * dot(m, g);\r\n    }\r\n    \r\n    void main( void ) {\r\n      vec2 fc = gl_FragCoord.xy;\r\n      vec2 fp = fc / resolution;\r\n      \r\n      float shade = 0.5;\r\n      float light = 1.;\r\n      float dark = 0.;\r\n      float gap = -2.;\r\n      \r\n      float sbase = 50.;\r\n      vec2 s = resolution / floor(0.5 + resolution/vec2(sbase, sbase));\r\n      \r\n      vec2 b = vec2(8., 4.)*fract(fc/s);\r\n      float c = -1.;\r\n      if (b.y < 1.) {\r\n        if (b.x < 1.) {\r\n          c = shade;\r\n        } else if (b.x < 3.) {\r\n          c = mix(shade, dark, smoothstep(1., 3., b.x));\r\n        } else if (b.x < 4.) {\r\n          c = light;\r\n        } else if (b.x < 5.) {\r\n          c = shade;\r\n        } else if (b.x < 7.) {\r\n          c = mix(dark, light, smoothstep(5., 7., b.x));\r\n        } else if (b.x <= 8.) {\r\n          c = light;\r\n        }\r\n      } else if (b.y < 2.) {\r\n        if (b.x < 1.) {\r\n          c = shade;\r\n        } else if (b.x < 3.) {\r\n          c = gap;\r\n        } else if (b.x < 4.) {\r\n          c = light;\r\n        } else if (b.x < 5.) {\r\n          c = shade;\r\n        } else if (b.x < 7.) {\r\n          c = gap;\r\n        } else if (b.x <= 8.) {\r\n          c = light;\r\n        }\r\n      } else if (b.y < 3.) {\r\n        if (b.x < 1.) {\r\n          c = shade;\r\n        } else if (b.x < 3.) {\r\n          c = mix(dark, light, smoothstep(1., 3., b.x));\r\n        } else if (b.x < 4.) {\r\n          c = light;\r\n        } else if (b.x < 5.) {\r\n          c = shade;\r\n        } else if (b.x < 7.) {\r\n          c = mix(shade, dark, smoothstep(5., 7., b.x));\r\n        } else if (b.x <= 8.) {\r\n          c = light;\r\n        }\r\n      } else if (b.y <= 4.) {\r\n        if (b.x < 1.) {\r\n          c = shade;\r\n        } else if (b.x < 3.) {\r\n          c = gap;\r\n        } else if (b.x < 4.) {\r\n          c = light;\r\n        } else if (b.x < 5.) {\r\n          c = shade;\r\n        } else if (b.x < 7.) {\r\n          c = gap;\r\n        } else if (b.x <= 8.) {\r\n          c = light;\r\n        }\r\n      }\r\n      \r\n      if (c == -1.) {\r\n        gl_FragColor = vec4(0.7, 0.2, 0.2, 1.);\r\n      } else {\r\n        float g = 0.;\r\n        if (c == gap) {\r\n          g = 0.15;\r\n        } else {\r\n          g = mix(0.2, 0.6, c) * mix(0.97, 1.0, snoise(fc/40.) + snoise(fc/20.) + snoise(fc/10.) + snoise(fc/5.));\r\n        }\r\n        g *= mix(0.4, 1., fp.y);\r\n        gl_FragColor = vec4(g, g, g, 1.);\r\n      }\r\n    }\r\n    ","http://glslsandbox.com/e#42979.14"),new R.E("    // I didn't write this random function but I don't know who did... so thanks to whoever wrote this!\r\n    vec2 random2f(vec2 p)  {\r\n         p = mod( p, 4.0 );\r\n        \r\n         vec2 tmp = fract(vec2(sin(p.x * 591.32 + p.y * 154.077), cos(p.x * 391.32 + p.y * 49.077)));\r\n        \r\n         return vec2(.5+.5*sin(tmp.x*time+ p.y),.5+.5*cos(tmp.y*time + p.x));\r\n    }\r\n    \r\n    float voronoi( vec2 uv ) {\r\n        \r\n        uv.x = mod(uv.x,4.0);\r\n        \r\n        vec2 p = floor( uv );\r\n        vec2 f = fract( uv );\r\n        \r\n        float res = 8.0;\r\n        const float i = 1.0;\r\n        \r\n        for( float y = -i; y <= i; ++y )\r\n        {\r\n            for( float x = -i; x <= i; ++x )\r\n            {\r\n                vec2 b = vec2( x, y );\r\n                vec2 r = b - f + random2f( p + b );\r\n                float d = length( r );\r\n                \r\n                res = min( res, d );\r\n            }\r\n        }\r\n        \r\n        return res;\r\n    }\r\n    \r\n    \r\n    void main( void ) {\r\n        vec2 uv = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;\r\n        uv.x *= resolution.x / resolution.y;\r\n    \r\n        vec2 originalUV = uv;\r\n        \r\n        float a = 2.0 * atan( uv.x, uv.y );\r\n        a *= (3.0 / 3.141596);\r\n        \r\n        float r = length( uv ) * 0.5;\r\n        \r\n        float t = sin( time * 0.2 ) * 0.5 + 0.5;\r\n        \r\n        float z = mix( 2.5, 3.5, t );\r\n        uv = vec2( r * z, a );\r\n        \r\n        vec3 finalColor = vec3(0.0);\r\n        finalColor += vec3( voronoi(uv * 4.0), voronoi(uv * 3.0), voronoi(uv * 7.0) );\r\n        finalColor -= length(originalUV) * 0.3;\r\n        finalColor *= 1.0-length(originalUV);\r\n        \r\n        gl_FragColor = vec4( finalColor, 1.0 );\r\n    \r\n    }\r\n    ","http://glslsandbox.com/e#42796.0"),new R.E("    void main(void) {\t\r\n      float n = 2.5;\r\n      vec2 p = 2.0*(gl_FragCoord.xy-0.5*resolution)/resolution.y;\r\n      p = vec2(7.0*atan(p.y,p.x),0.4*cos((9.0+6.0*sin(time)+2.0*sin(0.88*time))*length(p)));\r\n      vec2 p2 = vec2(n*cos(p.x+0.1*time),p.y); \r\n      float y0 = p.y + 0.31*sin(p.x+time+10.5*cos(time));\r\n      float y1 = p.y + 0.3*cos(p.x+time+12.5*sin(time));\r\n      y0 *= y0;\r\n      y1 *= y1;\r\n      y0 = sqrt(1.0 - y0 * 60.0 * (sin(8.0*p.x+1.4*time) + 1.4));\r\n      y1 = sqrt(1.0 - y1 * 60.0 * (sin(6.0*p.x-1.5*time) + 1.5));\r\n      float y2 =  cos(p.x+time-1.0+0.5*cos(time));\r\n      float y3 = -sin(p.x+time+1.0+0.5*sin(time));\r\n      float y = max(y0+y2,y1+y3);\r\n      float c = y;\r\n      vec3 color = 0.001*pow(c*c*0.4,10.0)+c*normalize(vec3(c,c+p2.x,-c+p2.x));\r\n      gl_FragColor = vec4(color.yxz,1.0);\r\n    }\r\n    ","http://glslsandbox.com/e#42775.0"),new R.E("    vec3 mod289(vec3 x) {\r\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\r\n    }\r\n\r\n    vec4 mod289(vec4 x) {\r\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\r\n    }\r\n\r\n    vec4 permute(vec4 x) {\r\n         return mod289(((x*34.0)+1.0)*x);\r\n    }\r\n\r\n    vec4 taylorInvSqrt(vec4 r)\r\n    {\r\n      return 1.79284291400159 - 0.85373472095314 * r;\r\n    }\r\n\r\n    float snoise(vec3 v)\r\n      {\r\n      const vec2\tC = vec2(1.0/6.0, 1.0/3.0) ;\r\n      const vec4\tD = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n    // First corner\r\n      vec3 i\t= floor(v + dot(v, C.yyy) );\r\n      vec3 x0 =\t v - i + dot(i, C.xxx) ;\r\n\r\n    // Other corners\r\n      vec3 g = step(x0.yzx, x0.xyz);\r\n      vec3 l = 1.0 - g;\r\n      vec3 i1 = min( g.xyz, l.zxy );\r\n      vec3 i2 = max( g.xyz, l.zxy );\r\n\r\n      //\t x0 = x0 - 0.0 + 0.0 * C.xxx;\r\n      //\t x1 = x0 - i1\t+ 1.0 * C.xxx;\r\n      //\t x2 = x0 - i2\t+ 2.0 * C.xxx;\r\n      //\t x3 = x0 - 1.0 + 3.0 * C.xxx;\r\n      vec3 x1 = x0 - i1 + C.xxx;\r\n      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r\n      vec3 x3 = x0 - D.yyy;\t\t\t// -1.0+3.0*C.x = -0.5 = -D.y\r\n\r\n    // Permutations\r\n      i = mod289(i);\r\n      vec4 p = permute( permute( permute(\r\n                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n    // Gradients: 7x7 points over a square, mapped onto an octahedron.\r\n    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r\n      float n_ = 0.142857142857; // 1.0/7.0\r\n      vec3\tns = n_ * D.wyz - D.xzx;\r\n\r\n      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\t//\tmod(p,7*7)\r\n\r\n      vec4 x_ = floor(j * ns.z);\r\n      vec4 y_ = floor(j - 7.0 * x_ );\t\t// mod(j,N)\r\n\r\n      vec4 x = x_ *ns.x + ns.yyyy;\r\n      vec4 y = y_ *ns.x + ns.yyyy;\r\n      vec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n      vec4 b0 = vec4( x.xy, y.xy );\r\n      vec4 b1 = vec4( x.zw, y.zw );\r\n\r\n      //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r\n      //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r\n      vec4 s0 = floor(b0)*2.0 + 1.0;\r\n      vec4 s1 = floor(b1)*2.0 + 1.0;\r\n      vec4 sh = -step(h, vec4(0.0));\r\n\r\n      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n      vec3 p0 = vec3(a0.xy,h.x);\r\n      vec3 p1 = vec3(a0.zw,h.y);\r\n      vec3 p2 = vec3(a1.xy,h.z);\r\n      vec3 p3 = vec3(a1.zw,h.w);\r\n\r\n    //Normalise gradients\r\n      //vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n      vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n      p0 *= norm.x;\r\n      p1 *= norm.y;\r\n      p2 *= norm.z;\r\n      p3 *= norm.w;\r\n\r\n    // Mix final noise value\r\n      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n      m = m * m;\r\n      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\r\n                                    dot(p2,x2), dot(p3,x3) ) );\r\n      }\r\n\r\n    //////////////////////////////////////////////////////////////\r\n\r\n    // PRNG\r\n    // From https://www.shadertoy.com/view/4djSRW\r\n    float prng(in vec2 seed) {\r\n      seed = fract (seed * vec2 (5.3983, 5.4427));\r\n      seed += dot (seed.yx, seed.xy + vec2 (21.5351, 14.3137));\r\n      return fract (seed.x * seed.y * 95.4337);\r\n    }\r\n\r\n    //////////////////////////////////////////////////////////////\r\n\r\n    float PI = 3.1415926535897932384626433832795;\r\n\r\n    float noiseStack(vec3 pos,int octaves,float falloff){\r\n      float noise = snoise(vec3(pos));\r\n      float off = 1.0;\r\n      if (octaves>1) {\r\n        pos *= 2.0;\r\n        off *= falloff;\r\n        noise = (1.0-off)*noise + off*snoise(vec3(pos));\r\n      }\r\n      if (octaves>2) {\r\n        pos *= 2.0;\r\n        off *= falloff;\r\n        noise = (1.0-off)*noise + off*snoise(vec3(pos));\r\n      }\r\n      if (octaves>3) {\r\n        pos *= 2.0;\r\n        off *= falloff;\r\n        noise = (1.0-off)*noise + off*snoise(vec3(pos));\r\n      }\r\n      return (1.0+noise)/2.0;\r\n    }\r\n\r\n    vec2 noiseStackUV(vec3 pos,int octaves,float falloff,float diff){\r\n      float displaceA = noiseStack(pos,octaves,falloff);\r\n      float displaceB = noiseStack(pos+vec3(3984.293,423.21,5235.19),octaves,falloff);\r\n      return vec2(displaceA,displaceB);\r\n    }\r\n\r\n    void main(  ) {\r\n      vec2 drag = vec2(0.0, 0.0); //mouse.xy;\r\n      vec2 offset = vec2(0.0, 0.0); //mouse.xy;\r\n        //\r\n      float xpart = gl_FragCoord.x/resolution.x;\r\n      float ypart = gl_FragCoord.y/resolution.y;\r\n      //\r\n      float clip = 210.0;\r\n      float ypartClip = gl_FragCoord.y/clip;\r\n      float ypartClippedFalloff = clamp(2.0-ypartClip,0.0,1.0);\r\n      float ypartClipped = min(ypartClip,1.0);\r\n      float ypartClippedn = 1.0-ypartClipped;\r\n      //\r\n      float xfuel = 1.0-abs(2.0*xpart-1.0);//pow(1.0-abs(2.0*xpart-1.0),0.5);\r\n      //\r\n      float timeSpeed = 0.5;\r\n      float realTime = timeSpeed*time;\r\n      //\r\n      vec2 coordScaled = 0.01*gl_FragCoord.xy - 0.02*vec2(offset.x,0.0);\r\n      vec3 position = vec3(coordScaled,0.0) + vec3(1223.0,6434.0,8425.0);\r\n      vec3 flow = vec3(4.1*(0.5-xpart)*pow(ypartClippedn,4.0),-2.0*xfuel*pow(ypartClippedn,64.0),0.0);\r\n      vec3 timing = realTime*vec3(0.0,-1.7,1.1) + flow;\r\n      //\r\n      vec3 displacePos = vec3(1.0,0.5,1.0)*2.4*position+realTime*vec3(0.01,-0.7,1.3);\r\n      vec3 displace3 = vec3(noiseStackUV(displacePos,2,0.4,0.1),0.0);\r\n      //\r\n      vec3 noiseCoord = (vec3(2.0,1.0,1.0)*position+timing+0.4*displace3)/1.0;\r\n      float noise = noiseStack(noiseCoord,3,0.4);\r\n      //\r\n      float flames = pow(ypartClipped,0.3*xfuel)*pow(noise,xfuel);\r\n      //\r\n      float f = ypartClippedFalloff*pow(1.0-flames*flames*flames,8.0);\r\n      float fff = f*f*f;\r\n      vec3 fire = 1.5*vec3(f, fff, fff*fff);\r\n      //\r\n      // smoke\r\n      float smokeNoise = 0.5+snoise(0.4*position+timing*vec3(1.0,1.0,0.2))/2.0;\r\n      vec3 smoke = vec3(0.3*pow(xfuel,3.0)*pow(ypart,2.0)*(smokeNoise+0.4*(1.0-noise)));\r\n      //\r\n      // sparks\r\n      float sparkGridSize = 30.0;\r\n      vec2 sparkCoord = gl_FragCoord.xy - vec2(2.0*offset.x,190.0*realTime);\r\n      sparkCoord -= 30.0*noiseStackUV(0.01*vec3(sparkCoord,30.0*time),1,0.4,0.1);\r\n      sparkCoord += 100.0*flow.xy;\r\n      if (mod(sparkCoord.y/sparkGridSize,2.0)<1.0) sparkCoord.x += 0.5*sparkGridSize;\r\n      vec2 sparkGridIndex = vec2(floor(sparkCoord/sparkGridSize));\r\n      float sparkRandom = prng(sparkGridIndex);\r\n      float sparkLife = min(10.0*(1.0-min((sparkGridIndex.y+(190.0*realTime/sparkGridSize))/(24.0-20.0*sparkRandom),1.0)),1.0);\r\n      vec3 sparks = vec3(0.0);\r\n      if (sparkLife>0.0) {\r\n        float sparkSize = xfuel*xfuel*sparkRandom*0.08;\r\n        float sparkRadians = 999.0*sparkRandom*2.0*PI + 2.0*time;\r\n        vec2 sparkCircular = vec2(sin(sparkRadians),cos(sparkRadians));\r\n        vec2 sparkOffset = (0.5-sparkSize)*sparkGridSize*sparkCircular;\r\n        vec2 sparkModulus = mod(sparkCoord+sparkOffset,sparkGridSize) - 0.5*vec2(sparkGridSize);\r\n        float sparkLength = length(sparkModulus);\r\n        float sparksGray = max(0.0, 1.0 - sparkLength/(sparkSize*sparkGridSize));\r\n        sparks = sparkLife*sparksGray*vec3(1.0,0.3,0.0);\r\n      }\r\n      //\r\n      gl_FragColor = vec4(max(fire,sparks)+smoke,1.0);\r\n    }\r\n    ","http://glslsandbox.com/e#42635.0"),new R.E("    float snoise(vec3 uv, float res) {\r\n      const vec3 s = vec3(1e0, 1e2, 1e3);\r\n      \r\n      uv *= res;\r\n      \r\n      vec3 uv0 = floor(mod(uv, res))*s;\r\n      vec3 uv1 = floor(mod(uv+vec3(1.0), res))*s;\r\n      \r\n      vec3 f = fract(uv); f = f*f*(3.0-2.0*f);\r\n    \r\n      vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,\r\n                  uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);\r\n    \r\n      vec4 r = fract(sin(v*1e-1)*1e3);\r\n      float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r\n      \r\n      r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);\r\n      float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r\n      \r\n      return mix(r0, r1, f.z)*2.-1.;\r\n    }\r\n    \r\n    void main( void ) {\r\n    \r\n      vec2 p = -.5 + gl_FragCoord.xy / resolution.xy;\r\n      p.x *= resolution.x/resolution.y;\r\n      \r\n      float color = 3.0 - (3.*length(2.*p));\r\n      \r\n      vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*.4, .5);\r\n      \r\n      for(int i = 1; i <= 7; i++)\r\n      {\r\n        float power = pow(2.0, float(i));\r\n        color += (1.5 / power) * snoise(coord + vec3(0.,-time*10000000000.5, time*.03), power*16.);\r\n      }\r\n      gl_FragColor = vec4( color, pow(max(color,0.),2.)*0.4, pow(max(color,0.),3.)*0.15 , 1.0);\r\n    }\r\n    ","http://glslsandbox.com/e#42606.0"),new R.E("    #ifndef REDUCER\r\n    #define _GLF_ZERO(X, Y)          (Y)\r\n    #define _GLF_ONE(X, Y)           (Y)\r\n    #define _GLF_FALSE(X, Y)         (Y)\r\n    #define _GLF_TRUE(X, Y)          (Y)\r\n    #define _GLF_IDENTITY(X, Y)      (Y)\r\n    #define _GLF_DEAD(X)             (X)\r\n    #define _GLF_FUZZED(X)           (X)\r\n    #define _GLF_WRAPPED_LOOP(X)     X\r\n    #define _GLF_WRAPPED_IF_TRUE(X)  X\r\n    #define _GLF_WRAPPED_IF_FALSE(X) X\r\n    #endif\r\n    \r\n    void main(void) {\r\n        vec2 uv = gl_FragCoord.xy / resolution.xy - .5;\r\n        uv.y *= resolution.y / resolution.x;\r\n        vec3 dir = vec3(uv * 0.7, 1.2);\r\n        float a2 = time * 20. + .5;\r\n        float a1 = 0.0;\r\n        mat2 rot1 = mat2(cos(a1), sin(a1), - sin(a1), cos(a1));\r\n        mat2 rot2 = rot1;\r\n        dir.xz *= rot1;\r\n        dir.xy *= rot2;\r\n        vec3 from = vec3(0., 0., 0.);\r\n        from += vec3(.025 * time, .03 * time, - 2.);\r\n        from.xz *= rot1;\r\n        from.xy *= rot2;\r\n        float s = .1, fade = .07;\r\n        vec3 v = vec3(0.4);\r\n        for(\r\n            int r = 0;\r\n            r < 12;\r\n            r ++\r\n        )\r\n            {\r\n        float my_scale = 1.;\r\n                vec3 p = from + s * dir * my_scale;\r\n                p = abs(vec3(0.750) - mod(p, vec3(0.750 * 2.)));\r\n                p.x += float(r * r) * 0.01;\r\n                p.y += float(r) * 0.02;\r\n                float pa, a = pa = 0.;\r\n                for(\r\n                    int i = 0;\r\n                    i < 15;\r\n                    i ++\r\n                )\r\n                    {\r\n                        p = abs(p) / dot(p, p) - 0.340;\r\n                        a += abs(length(p) - pa * 0.2);\r\n                        pa = length(p);\r\n                    }\r\n                a *= a * a * 4.;\r\n                v += vec3(s, s * s, s * s * s * s) * a * 0.0017 * fade;\r\n                fade *= 0.960;\r\n                s += 0.120;\r\n            }\r\n        v = mix(vec3(length(v)), v, 0.8);\r\n        gl_FragColor = vec4(v * .01, 1.);\r\n    }\r\n    ","http://glslsandbox.com/e#42564.0"),new R.E("    #define PI 3.14159265359\r\n    #define DEG2RAD (PI/180.0)\r\n    \r\n    \r\n    vec3 rotateX(vec3 p, float angle)\r\n    {\r\n        float c = cos(angle);\r\n        float s = sin(angle);\r\n        return vec3(p.x, c*p.y+s*p.z, -s*p.y+c*p.z);\r\n    }\r\n    \r\n    vec3 rotateY(vec3 p, float angle)\r\n    {\r\n        float c = cos(angle);\r\n        float s = sin(angle);\r\n        return vec3(c*p.x-s*p.z, p.y, s*p.x+c*p.z);\r\n    }\r\n    \r\n    vec3 rotateZ(vec3 p, float angle)\r\n    {\r\n        float c = cos(angle);\r\n        float s = sin(angle);\r\n        return vec3(c*p.x+s*p.y, -s*p.x+c*p.y, p.z);\r\n    }\r\n    \r\n    \r\n    float kaleidoscopic_IFS(vec3 z)\r\n    {\r\n        const int FRACT_ITER      = 20;\r\n        float FRACT_SCALE   = 1.8;\r\n        float FRACT_OFFSET  = 1.0;\r\n      \r\n        float c = 2.0;\r\n        z.y = mod(z.y, c)-c/2.0;\r\n        z = rotateZ(z, PI/2.0);\r\n        float r;\r\n        int n1 = 0;\r\n        for (int n = 0; n < FRACT_ITER; n++) {\r\n            float rotate = PI*0.5;\r\n            z = rotateX(z, rotate);\r\n            z = rotateY(z, rotate);\r\n            z = rotateZ(z, rotate);\r\n    \r\n            z.xy = abs(z.xy);\r\n            if (z.x+z.y<0.0) z.xy = -z.yx; // fold 1\r\n            if (z.x+z.z<0.0) z.xz = -z.zx; // fold 2\r\n            if (z.y+z.z<0.0) z.zy = -z.yz; // fold 3\r\n            z = z*FRACT_SCALE - FRACT_OFFSET*(FRACT_SCALE-1.0);\r\n        }\r\n        return (length(z) ) * pow(FRACT_SCALE, -float(FRACT_ITER));\r\n    }\r\n    \r\n    \r\n    float tglad_formula(vec3 z0)\r\n    {\r\n      z0 = mod(z0, 2.);\r\n      \r\n        float mr=0.25, mxr=1.0;\r\n        vec4 scale=vec4(-3.12,-3.12,-3.12,3.12), p0=vec4(0.0,1.59,-1.0,0.0);\r\n        vec4 z = vec4(z0,1.0);\r\n        for (int n = 0; n < 3; n++) {\r\n            z.xyz=clamp(z.xyz, -0.94, 0.94)*2.0-z.xyz;\r\n            z*=scale/clamp(dot(z.xyz,z.xyz),mr,mxr)*1.;\r\n            z+=p0;\r\n        }\r\n        float dS=(length(max(abs(z.xyz)-vec3(1.2,49.0,1.4),0.0))-0.06)/z.w;\r\n        return dS;\r\n    }\r\n    \r\n    // distance function from Hartverdrahtet\r\n    // ( http://www.pouet.net/prod.php?which=59086 )\r\n    float hartverdrahtet(vec3 f)\r\n    {\r\n      vec3 cs=vec3(.808,.808,1.167);\r\n      float fs=1.;\r\n      vec3 fc=vec3(0);\r\n      float fu=10.;\r\n      float fd=.763;\r\n      \r\n      // scene selection\r\n      int i = int(mod(time/2.0, 9.0));\r\n      if(i==0) cs.y=.58;\r\n      if(i==1) cs.xy=vec2(.5);\r\n      if(i==2) cs.xy=vec2(.5);\r\n      if(i==3) fu=1.01,cs.x=.9;\r\n      if(i==4) fu=1.01,cs.x=.9;\r\n      if(i==6) cs=vec3(.5,.5,1.04);\r\n      if(i==5) fu=.9;\r\n      if(i==7) fd=.7,fs=1.34,cs.xy=vec2(.5);\r\n      if(i==8) fc.z=-.38;\r\n      \r\n      //cs += sin(time)*0.2;\r\n        \r\n      float v=1.;\r\n      for(int i=0; i<12; i++){\r\n        f=2.*clamp(f,-cs,cs)-f;\r\n        float c=max(fs/dot(f,f),1.);\r\n        f*=c;\r\n        v*=c;\r\n        f+=fc;\r\n      }\r\n      float z=length(f.xy)-fu;\r\n      return fd*max(z,abs(length(f.xy)*f.z)/sqrt(dot(f,f)))/abs(v);\r\n    }\r\n    \r\n    float pseudo_kleinian(vec3 p)\r\n    {\r\n      const vec3 CSize = vec3(0.92436,0.90756,0.92436);\r\n      const float Size = 1.0;\r\n      const vec3 C = vec3(0.0,0.0,0.0);\r\n      float DEfactor=1.;\r\n      const vec3 Offset = vec3(0.0,0.0,0.0);\r\n        vec3 ap=p+1.;\r\n      for(int i=0;i<10 ;i++){\r\n        ap=p;\r\n        p=2.*clamp(p, -CSize, CSize)-p;\r\n        float r2 = dot(p,p);\r\n        float k = max(Size/r2,1.);\r\n        p *= k;\r\n        DEfactor *= k;\r\n        p += C;\r\n      }\r\n      float r = abs(0.5*abs(p.z-Offset.z)/DEfactor);\r\n      return r;\r\n    }\r\n    \r\n    float pseudo_knightyan(vec3 p)\r\n    {\t\r\n      const vec3 CSize = vec3(0.63248, 0.78632, 0.775);\r\n      float DEfactor=1.;\r\n      for(int i=0;i<6;i++){\r\n        p = 2.*clamp(p, -CSize, CSize)-p;\r\n        float k = max(0.70968/dot(p,p),1.);\r\n        p *= k;\r\n        DEfactor *= k*1.1;\r\n      }\r\n      float rxy=length(p.xy);\r\n      return max(rxy-0.92784, abs(rxy*p.z) / length(p))/DEfactor;\r\n    }\r\n    \r\n    \r\n    float map(vec3 p)\r\n    {\r\n      //return kaleidoscopic_IFS(p);\r\n      //return tglad_formula(p);\r\n      //return hartverdrahtet(p);\r\n      return pseudo_kleinian(p);\r\n      //return pseudo_knightyan(p);\r\n    }\r\n    \r\n    vec3 guess_normal(vec3 p)\r\n    {\r\n      const float d = 0.001;\r\n      return normalize( vec3(\r\n        map(p+vec3(  d,0.0,0.0))-map(p+vec3( -d,0.0,0.0)),\r\n        map(p+vec3(0.0,  d,0.0))-map(p+vec3(0.0, -d,0.0)),\r\n        map(p+vec3(0.0,0.0,  d))-map(p+vec3(0.0,0.0, -d)) ));\r\n    }\r\n    \r\n    \r\n    vec2 pattern(vec2 p)\r\n    {\r\n      p = fract(p);\r\n      float r = 0.123;\r\n      float v = 0.0, g = 0.0;\r\n      r = fract(r * 9184.928);\r\n      float cp, d;\r\n      \r\n      d = p.x;\r\n      g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 1000.0);\r\n      d = p.y;\r\n      g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 1000.0);\r\n      d = p.x - 1.0;\r\n      g += pow(clamp(3.0 - abs(d), 0.0, 1.0), 1000.0);\r\n      d = p.y - 1.0;\r\n      g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 10000.0);\r\n      \r\n      const int iter = 12;\r\n      for(int i = 0; i < iter; i ++)\r\n      {\r\n        cp = 0.5 + (r - 0.5) * 0.9;\r\n        d = p.x - cp;\r\n        g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 200.0);\r\n        if(d > 0.0) {\r\n          r = fract(r * 4829.013);\r\n          p.x = (p.x - cp) / (1.0 - cp);\r\n          v += 1.0;\r\n        }\r\n        else {\r\n          r = fract(r * 129.528);\r\n          p.x = p.x / cp;\r\n        }\r\n        p = p.yx;\r\n      }\r\n      v /= float(iter);\r\n      return vec2(g, v);\r\n    }\r\n    \r\n    vec2 sphere_mapping(vec3 p)\r\n    {\r\n      return vec2(\r\n        asin(p.x)/PI + 0.5,\r\n        asin(p.y)/PI + 0.5);\r\n    }\r\n    \r\n    \r\n    mat3 axis_rotation_matrix33(vec3 axis, float angle)\r\n    {\r\n        axis = normalize(axis);\r\n        float s = sin(angle);\r\n        float c = cos(angle);\r\n        float oc = 1.0 - c;\r\n        return mat3(\r\n            oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,\r\n            oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,\r\n            oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c          );\r\n    }\r\n    \r\n    void main( void ) {\r\n      \r\n      vec2 pos = (gl_FragCoord.xy*2.0 - resolution.xy) / resolution.y;\r\n      vec3 camPos = vec3(5.0*cos(time*0.1), 0.5*sin(time*0.2), 5.0*sin(time*0.1));\r\n      vec3 camDir = normalize(camPos);\r\n      vec3 camUp = normalize( vec3(0.0, 1.0+cos(time*0.1)*0.75, sin(time*0.1)*0.75) );\r\n      camUp  = axis_rotation_matrix33(cross(camDir, camUp), 90.0*DEG2RAD)*camDir;\r\n      \r\n      vec3 camSide = cross(camDir, camUp);\r\n      float fovy = 60.0;\r\n      \r\n      vec3 rayDir = normalize(camSide*-pos.x + camUp*-pos.y + camDir*1.0/tan(fovy*0.5*DEG2RAD));\r\n      vec3 ray = camPos;\r\n      float m = 0.0;\r\n      float d = 0.0, total_d = 0.0;\r\n      const int MAX_MARCH = 100;\r\n      const float MAX_DISTANCE = 100.0;\r\n      for(int i=0; i<MAX_MARCH; ++i) {\r\n        d = map(ray);\r\n        total_d += d;\r\n        ray += rayDir * d;\r\n        m += 1.0;\r\n        if(d<0.001) { break; }\r\n        if(total_d>MAX_DISTANCE) { break; }\r\n      }\r\n      \r\n      vec3 normal = guess_normal(ray);\r\n      \r\n      float r = mod(time*2.0, 20.0);\r\n      float glow = max((mod(length(ray)-time*1.5, 10.0)-9.0)*2.5, 0.0);\r\n      vec3 gp = abs(mod(ray, vec3(0.4)));\r\n      vec2 p = pattern(sphere_mapping(normalize(ray)*mod(length(ray), 1.0))*2.0);\r\n      if(p.x<1.4) {\r\n        glow = 0.0;\r\n      }\r\n      else {\r\n        glow += 0.0;\r\n      }\r\n      glow += max(1.0-abs(dot(-camDir, normal)) - 0.4, 0.0) * 0.5;\r\n      \r\n      float c = (total_d)*0.01;\r\n      vec4 result = vec4( vec3(c, c, c) + vec3(0.02, 0.02, 0.025)*m*0.4, 1.0 );\r\n      result.xyz += vec3(0.5, 0.5, 0.75)*glow;\r\n      //result *= mod(gl_FragCoord.y, 4.0)<2.0 ? 0.6 : 1.0;\r\n      //result.xyz = normal*0.5+0.5;\r\n      gl_FragColor = result;\r\n    }\r\n\r\n    ","http://glslsandbox.com/e#42953.0"),new R.E("    vec2 R = resolution;\r\n    vec2 Offset;\r\n    vec2 Scale=vec2(0.002,0.002);\r\n    float Saturation = 0.8; // 0 - 1;\r\n    \r\n    \r\n    vec3 lungth(vec2 x,vec3 c){\r\n           return vec3(length(x+c.r),length(x+c.g),length(c.b));\r\n    }\r\n    \r\n    void main( void ) {\r\n      \r\n      vec2 position = (gl_FragCoord.xy - resolution * 0.9) / resolution.yy;\r\n      float th = atan(position.y, position.x) / (1.0 * 3.1415926);\r\n      float dd = length(position) + 0.005;\r\n      float d = 0.5 / dd + time;\r\n      \r\n          vec2 x = gl_FragCoord.xy;\r\n          vec3 c2=vec3(0,0,0);\r\n        x=x*Scale*R/R.x;\r\n          x+sin(x.yx*sqrt(vec2(1,9)))/1.;\r\n          c2=lungth(sin(x*sqrt(vec2(3,43))),vec3(5,6,7)*Saturation * d);\r\n      x+=sin(x.yx*sqrt(vec2(73,5)))/5.;\r\n          c2=2.*lungth(sin(time+x*sqrt(vec2(33.,23.))),c2/9.);\r\n          x+=sin(x.yx*sqrt(vec2(93,7)))/3.;\r\n          c2=lungth(sin(x*sqrt(vec2(3.,1.))),c2/2.0);\r\n          c2=.5+.5*sin(c2*8.);\r\n      \r\n      vec3 uv = vec3(th + d, th - d, th + sin(d) * 0.45);\r\n      float a = 0.5 + cos(uv.x * 3.1415926 * 2.0) * 0.5;\r\n      float b = 0.5 + cos(uv.y * 3.1415926 * 2.0) * 0.5;\r\n      float c = 0.5 + cos(uv.z * 3.1415926 * 6.0) * 0.5;\r\n      vec3 color = \tmix(vec3(0.1, 0.5, 0.5), \tvec3(0.1, 0.1, 0.2),  pow(a, 0.2)) * 3.;\r\n      color += \tmix(vec3(0.8, 0.2, 1.0), \tvec3(0.1, 0.1, 0.2),  pow(b, 0.1)) * 0.75;\r\n      color += \tmix(c2, \t\t\tvec3(0.1, 0.2, 0.2),  pow(c, 0.1)) * 0.75;\r\n    \r\n      gl_FragColor = vec4( (color * dd), 1.0);\r\n    }\r\n    ","http://glslsandbox.com/e#41847.0"),new R.E("// by srtuss, 2013\r\n    // was trying to find some sort of \"mechanical\" fractal for texture/heightmap\r\n    // generation, but then i ended up with this.\r\n    \r\n    // rotate position around axis\r\n    vec2 rotate(vec2 p, float a)\r\n    {\r\n      return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));\r\n    }\r\n    \r\n    // 1D random numbers\r\n    float rand(float n)\r\n    {\r\n        return fract(sin(n) * 43758.5453123);\r\n    }\r\n    \r\n    // 2D random numbers\r\n    vec2 rand2(in vec2 p)\r\n    {\r\n      return fract(vec2(sin(p.x * 591.32 + p.y * 154.077), cos(p.x * 391.32 + p.y * 49.077)));\r\n    }\r\n    \r\n    // 1D noise\r\n    float noise1(float p)\r\n    {\r\n      float fl = floor(p);\r\n      float fc = fract(p);\r\n      return mix(rand(fl), rand(fl + 1.000004), fc);\r\n    }\r\n    \r\n    // voronoi distance noise, based on iq's articles\r\n    float voronoi(in vec2 x)\r\n    {\r\n      vec2 p = floor(x);\r\n      vec2 f = fract(x);\r\n      \r\n      vec2 res = vec2(8.0);\r\n      for(int j = -1; j <= 1; j ++)\r\n      {\r\n        for(int i = -1; i <= 1; i ++)\r\n        {\r\n          vec2 b = vec2(i, j);\r\n          vec2 r = vec2(b) - f + rand2(p + b);\r\n          \r\n          // chebyshev distance, one of many ways to do this\r\n          float d = max(abs(r.x), abs(r.y));\r\n          \r\n          if(d < res.x)\r\n          {\r\n            res.y = res.x;\r\n            res.x = d;\r\n          }\r\n          else if(d < res.y)\r\n          {\r\n            res.y = d;\r\n          }\r\n        }\r\n      }\r\n      return res.y - res.x;\r\n    }\r\n    \r\n    \r\n    //float flicker = noise1(time * 2.0) * 0.8 + 0.4;\r\n    \r\n    void main(void)\r\n    {\r\n      vec2 uv = gl_FragCoord.xy / resolution.xy;\r\n      uv = (uv - 0.5) * 2.0;\r\n      vec2 suv = uv;\r\n      uv.x *= resolution.x / resolution.y;\r\n      \r\n      \r\n      float v = 0.0;\r\n      \r\n      // that looks highly interesting:\r\n      v = 0.3 - length(uv) * 0.3;\r\n      \r\n      \r\n      // a bit of camera movement\r\n      uv *= 0.6 + sin(time * 0.03) * 0.4;\r\n      uv = rotate(uv, sin(time * 0.1) * 1.0);\r\n      uv += time * 0.03;\r\n      \r\n      \r\n      // add some noise octaves\r\n      float a = 0.6, f = 1.0;\r\n      \r\n      for(int i = 0; i < 3; i ++) // 4 octaves also look nice, its getting a bit slow though\r\n      {\t\r\n        float v1 = voronoi(uv * f + 5.0);\r\n        float v2 = 0.0;\r\n        \r\n        // make the moving electrons-effect for higher octaves\r\n        if(i > 0)\r\n        {\r\n          // of course everything based on voronoi\r\n          v2 = voronoi(uv * f * 0.5 + 50.0 + time);\r\n          \r\n          float va = 0.0, vb = 0.0;\r\n          va = 1.0 - smoothstep(0.0, 0.1, v1);\r\n          vb = 1.0 - smoothstep(0.0, 0.08, v2);\r\n          v += a * pow(va * (0.5 + vb), 2.0);\r\n        }\r\n        \r\n        // make sharp edges\r\n        v1 = 1.0 - smoothstep(0.0, 0.3, v1);\r\n        \r\n        // noise is used as intensity map\r\n        v2 = a * (noise1(v1 * 5.5 + 0.1));\r\n        \r\n        // octave 0's intensity changes a bit\r\n        if(i == 0)\r\n          //v += v2 * flicker;\r\n        //else\r\n          v += v2;\r\n        \r\n        f *= 3.0;\r\n        a *= 0.7;\r\n      }\r\n    \r\n      // slight vignetting\r\n      v *= exp(-0.6 * length(suv)) * 1.2;\r\n      \r\n      // use texture channel0 for color? why not.\r\n      //vec3 cexp = texture2D(iChannel0, uv * 0.001).xyz * 3.0 + texture2D(iChannel0, uv * 0.01).xyz;//vec3(1.0, 2.0, 4.0);\r\n      \r\n      // old blueish color st\r\n      vec3 cexp = vec3(0.5, 1.7, 1.0);\r\n        cexp *= 1.3;\r\n    \r\n      vec3 col = vec3(pow(v, cexp.x), pow(v, cexp.y), pow(v, cexp.z)) * 2.0;\r\n      \r\n      gl_FragColor = vec4(col, 1.0);\r\n    }\r\n","http://glslsandbox.com/e#41375.0"),new R.E("    mat2 rot(float th){ float cs = cos(th), si = sin(th); return mat2(cs, -si, si, cs); }\r\n\r\n\r\nfloat Voronesque( in vec3 p ){\r\n    \r\n    vec3 i  = floor(p + dot(p, vec3(0.333333)) );  p -= i - dot(i, vec3(0.166666)) ;\r\n    \r\n    vec3 i1 = step(0., p-p.yzx), i2 = max(i1, 1.0-i1.zxy); i1 = min(i1, 1.0-i1.zxy);    \r\n    \r\n    vec3 p1 = p - i1 + 0.166666, p2 = p - i2 + 0.333333, p3 = p - 0.5;\r\n    \r\n    vec3 rnd = vec3(7, 157, 113); \r\n    \r\n    vec4 v = max(0.5 - vec4(dot(p, p), dot(p1, p1), dot(p2, p2), dot(p3, p3)), 0.);\r\n    \r\n    vec4 d = vec4( dot(i, rnd), dot(i + i1, rnd), dot(i + i2, rnd), dot(i + 1., rnd) ); \r\n    \r\n    d = fract(sin(d)*262144.)*v*2.; \r\n \r\n    v.x = max(d.x, d.y), v.y = max(d.z, d.w), v.z = max(min(d.x, d.y), min(d.z, d.w)), v.w = min(v.x, v.y); \r\n   \r\n    return  max(v.x, v.y)- max(v.z, v.w); \r\n}\r\n\r\n\r\nvoid main(){\r\n    \r\n    \r\n    vec2 uv = (gl_FragCoord.xy - resolution.xy*0.5)/resolution.y + vec2(0.5*cos(time*0.5), 0.25*sin(time*0.5));\r\n    \r\n   \r\n    vec3 rd = normalize(vec3(uv, 1.));\r\n    rd.xy *= rot(sin(time*0.25)*0.5); \r\n    rd.xz *= rot(sin(time*0.25)*0.5);\r\n \r\n\r\n    vec3 col = vec3(0);\r\n    \r\n    vec2 scale = vec2(0.75, 1.);\r\n    float power = 6.;\r\n    float sDist = max(dot( pow(abs(rd.xy)*scale, vec2(power)), vec2(1.) ), 1e-16); \r\n    sDist = 1./pow( sDist, 1./power ); \r\n    \r\n        vec3 sp = vec3(0.0, 0.0, time*2.) + rd*sDist;\r\n \r\n        vec3 sn = normalize(-sign(sp)*vec3(pow(abs(sp.xy)*scale, vec2(power-1.)), 0.)); \r\n        \r\n        const vec2 eps = vec2(0.025, 0.);\r\n        float c = Voronesque(sp*2.5); \r\n\t\r\n        vec3 gr = (vec3(Voronesque((sp-eps.xyy)*2.5), Voronesque((sp-eps.yxy)*2.5), Voronesque((sp-eps.yyx)*2.5))-c)/eps.x;\r\n        gr -= sn*dot(sn, gr); \r\n        sn = normalize(sn + gr*0.1); \r\n        vec3 lp = vec3(0.0, 0.0, time*2. + 3.);\r\n        vec3 ld = lp - sp; \r\n        float dist = max(length(ld), 0.001);\r\n        ld /= dist; \r\n\r\n        float atten = min(1.0/max(0.75 + dist*0.25 + dist*dist*0.05, 0.001), 1.0);\r\n        \r\n       \r\n        float diff = max(dot(sn, ld), 0.); \r\n        float spec = pow(max(dot(reflect(-ld, sn), -rd), 0.), 16.); \r\n        float ref = Voronesque((sp + reflect(rd, sn)*0.5)*2.5);\r\n        vec3 objCol = vec3(min(c*1.5, 1.), pow(c, 2.5), pow(c, 12.)); \r\n\r\n        col = (objCol*(vec3(1.0, 0.97, 0.92)*diff + ref*0.5 + 0.25) + vec3(1., 0.8, 0.9)*ref*0.3 + vec3(1., 0.9, 0.7)*spec)*atten;\r\n         \r\n        \r\n   \r\n    \r\n    gl_FragColor = vec4(min(col, 1.), 1.);\r\n}\r\n","http://glslsandbox.com/e#40865.0"),new R.E("#define TAU 6.28318530718\r\n#define MAX_ITER 3\r\n\r\nvoid main( void ) {\r\n\tfloat gtime = time * .1+23.0;\r\n    // uv should be the 0-1 uv of texture...\r\n\tvec2 uv = gl_FragCoord.xy / resolution.xy;\r\n    vec2 p = mod(uv*TAU, TAU)-250.0;\r\n\tvec2 i = vec2(p);\r\n\tfloat c = 1.0;\r\n\tfloat inten = .008;\r\n\r\n\tfor (int n = 0; n < MAX_ITER; n++) \r\n\t{\r\n\t\tfloat t = gtime * (0.0 - (3.0 / float(n+1)));\r\n\t\ti = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));\r\n\t\tc += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));\r\n\t}\r\n\tc /= float(MAX_ITER);\r\n\tc = 1.17-pow(c, 1.4);\r\n\tvec3 colour = vec3(pow(abs(c), 8.0));\r\n    colour = clamp(colour + vec3(0.0, 0.35, 0.5), 0.0, 1.0);\r\n    \r\n\tgl_FragColor = vec4(colour, 1.0);\r\n}\r\n","http://glslsandbox.com/e#40844.0"),new R.E("vec3   iResolution = vec3(resolution, 1.0);\r\nfloat  iGlobalTime = time-60.;\r\n\r\n//Oblivion by nimitz (twitter: @stormoid)\r\n\r\n/*\r\n\tMostly showing off animated triangle noise, the idea is to just use\tcombinations\r\n\tof moving triangle waves to create animated noise. In practice, only very few\r\n\tlayers of triangle wave basis are needed to produce animated noise that\tis visually\r\n\tinteresting (using 4 layers here), meaning that this runs considerably faster\r\n\tthan equivalent animated perlin-style noise and without the need for value noise as input.\r\n*/\r\n\r\n#define ITR 50\r\n#define FAR 25.\r\n#define time iGlobalTime*0.2\r\n\r\n#define MSPEED 0.2\r\n#define ROTSPEED 3.0\r\n\r\n#define VOLSTEPS 20\r\n\r\n//#define PENTAGRAM_ONLY\r\n\r\nfloat hash(in float n){ return fract(sin(n)*43758.5453); }\r\nmat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,-s,s,c);}\r\n\r\nfloat tri(in float x){return abs(fract(x)-.5);}\r\nvec3 tri3(in vec3 p){return vec3( tri(p.z+tri(p.y*1.)), tri(p.z+tri(p.x*1.)), tri(p.y+tri(p.x*1.)));}\r\n\r\nvec3 path(in float t){return vec3(sin(t*.3),sin(t*0.25),0.)*0.3;}\r\n\r\nmat2 m2 = mat2( 0.970,  0.242, -0.242,  0.970 );\r\nfloat triNoise3d(in vec3 p)\r\n{\r\n    float z=1.5;\r\n\tfloat rz = 0.;\r\n    vec3 bp = p;\r\n\tfor (float i=0.; i<=3.; i++ )\r\n\t{\r\n        vec3 dg = tri3(bp*2.)*1.;\r\n        p += (dg+time*0.25);\r\n\r\n        bp *= 1.8;\r\n\t\tz *= 1.5;\r\n\t\tp *= 1.1;\r\n        p.xz*= m2;\r\n\r\n        rz+= (tri(p.z+tri(p.x+tri(p.y))))/z;\r\n        bp += 0.14;\r\n\t}\r\n\treturn rz;\r\n}\r\n\r\nfloat map(vec3 p)\r\n{\r\n    p -= path(p.z);\r\n    float d = 1.-length(p.xy);\r\n    return d;\r\n}\r\n\r\nfloat march(in vec3 ro, in vec3 rd)\r\n{\r\n\tfloat precis = 0.001;\r\n    float h=precis*2.0;\r\n    float d = 0.;\r\n    float id = 0.;;\r\n    for( int i=0; i<ITR; i++ )\r\n    {\r\n        if( abs(h)<precis || d>FAR ) break;\r\n        d += h;\r\n\t    float res = map(ro+rd*d);\r\n        h = res;\r\n    }\r\n\treturn d;\r\n}\r\n\r\nfloat mapVol(vec3 p)\r\n{\r\n    p -= path(p.z);\r\n    float d = 1.-length(p.xy);\r\n    d -= triNoise3d(p*0.15)*1.2;\r\n    return d*0.55;\r\n}\r\n\r\nvec4 marchVol( in vec3 ro, in vec3 rd )\r\n{\r\n\tvec4 rz = vec4(0);\r\n\r\n\tfloat t = 0.3;\r\n\tfor(int i=0; i<VOLSTEPS; i++)\r\n\t{\r\n\t\tif(rz.a > 0.99)break;\r\n\r\n\t\tvec3 pos = ro + t*rd;\r\n        float r = mapVol( pos );\r\n\r\n        float gr =  clamp((r - mapVol(pos+vec3(.0,.1,.5)))/.5, 0., 1. );\r\n        vec3 lg = vec3(0.7,0.5,.1)*1.2 + 3.*vec3(1)*gr;\r\n        vec4 col = vec4(lg,r+0.55);\r\n\r\n\t\tcol.a *= .2;\r\n\t\tcol.rgb *= col.a;\r\n\t\trz = rz + col*(1. - rz.a);\r\n\t\tt += 0.05;\r\n\t}\r\n\trz.b += rz.w*0.2;\r\n    rz.rg *= mm2(-rd.z*0.09);\r\n    rz.rb *= mm2(-rd.z*0.13);\r\n\treturn clamp(rz, 0.0, 1.0);\r\n}\r\n\r\nvec2 tri2(in vec2 p)\r\n{\r\n    const float m = 1.5;\r\n    return vec2(tri(p.x+tri(p.y*m)),tri(p.y+tri(p.x*m)));\r\n}\r\n\r\nfloat triNoise2d(in vec2 p)\r\n{\r\n    float z=2.;\r\n    float z2=1.5;\r\n\tfloat rz = 0.;\r\n    vec2 bp = p;\r\n    rz+= (tri(-time*0.5+p.x*(sin(-time)*0.3+.9)+tri(p.y-time*0.2)))*.7/z;\r\n\tfor (float i=0.; i<=2.; i++ )\r\n\t{\r\n        vec2 dg = tri2(bp*2.)*.8;\r\n        dg *= mm2(time*2.);\r\n        p += dg/z2;\r\n\r\n        bp *= 1.7;\r\n        z2 *= .7;\r\n\t\tz *= 2.;\r\n\t\tp *= 1.5;\r\n        p*= m2;\r\n\r\n        rz+= (tri(p.x+tri(p.y)))/z;\r\n\t}\r\n\treturn rz;\r\n}\r\n\r\n\r\nvec3 shadePenta(in vec2 p, in vec3 rd)\r\n{\r\n    p*=2.5;\r\n\tfloat rz= triNoise2d(p)*2.;\r\n\r\n    vec2 q = abs(p);\r\n    float pen1 = max(max(q.x*1.176+p.y*0.385, q.x*0.727-p.y), p.y*1.237);\r\n    float pen2 = max(max(q.x*1.176-p.y*0.385, q.x*0.727+p.y), -p.y*1.237);\r\n    float d = abs(min(pen1,pen1-pen2*0.619)*4.28-.95)*1.2;\r\n    d = min(d,abs(length(p)-1.)*3.);\r\n    d = min(d,abs(pen2-0.37)*4.);\r\n    d = pow(d,.7+sin(sin(time*4.1)+time)*0.15);\r\n    rz = max(rz,d/(rz));\r\n\r\n    vec3 col1 = vec3(.3,0.5,0.45)/(rz*rz);\r\n    vec3 col2 = vec3(1.,0.5,0.25)/(rz*rz);\r\n    vec3 col = mix(col1,col2,clamp(rd.z,0.,1.));\r\n\r\n    return col;\r\n}\r\n\r\nvoid main(void)\r\n{\r\n\tvec2 p = gl_FragCoord.xy/iResolution.xy-0.5;\r\n\tp.x*=iResolution.x/iResolution.y;\r\n\tp += vec2(hash(time),hash(time+1.))*0.008;\r\n    float dz = sin(time*ROTSPEED)*8.+1.;\r\n    vec3 ro = path(time*MSPEED+dz)*.7+vec3(0,0,time*MSPEED);\r\n    ro.z += dz;\r\n    ro.y += cos(time*ROTSPEED)*.4;\r\n    ro.x += cos(time*ROTSPEED*2.)*.4;\r\n\r\n    vec3 tgt = vec3(0,0,time*MSPEED+1.);\r\n    vec3 eye = normalize( tgt - ro);\r\n    vec3 rgt = normalize(cross( vec3(0.0,1.0,0.0), eye ));\r\n    vec3 up = normalize(cross(eye,rgt));\r\n    vec3 rd = normalize( p.x*rgt + p.y*up + .75*eye );\r\n\r\n    #ifndef PENTAGRAM_ONLY\r\n\r\n\tfloat rz = march(ro,rd);\r\n\r\n    vec3 pos = ro+rz*rd;\r\n\r\n    vec4 col = marchVol(pos,rd);\r\n    vec3 ligt = normalize( vec3(-.0, 0., -1.) );\r\n    vec2 spi = vec2(sin(time),cos(time))*1.;\r\n    float flick = clamp(1.-abs(((pos.z-time*MSPEED)*0.3+mod(time*5.,30.))-15.),0.,1.)*clamp(dot(pos.xy,spi),0.,1.)*1.7;\r\n    flick += \t clamp(1.-abs(((pos.z-time*MSPEED)*0.3+mod(time*5.+10.,30.))-15.),0.,1.)*clamp(dot(pos.xy,spi),0.,1.)*2.;\r\n    flick += \t clamp(1.-abs(((pos.z-time*MSPEED)*0.3+mod(time*5.+20.,30.))-15.),0.,1.)*clamp(dot(pos.xy,spi),0.,1.)*2.;\r\n    col.rgb += flick*(step(mod(time,2.5),0.2))*.4;\r\n    col.rgb += flick*(step(mod(time*1.5,3.2),0.2))*.4;\r\n\r\n    col.rgb = mix(col.rgb*col.rgb*col.rgb,col.rgb*shadePenta(p,rd*rd)*2.0*1.2,(1.-col.w)*step(tri(time*40.25),1.1)*smoothstep(1.5,1.,2.*tri(time)));\r\n\r\n    #else\r\n    vec3  col = shadePenta(p,rd);\r\n    col = pow(col,vec3(103.5))*100.4;\r\n    #endif\r\n\r\n\tgl_FragColor = vec4( col.rgb, 1.0 );\r\n}\r\n","http://glslsandbox.com/e#40824.0"),new R.E("\r\nvoid main(void) {\r\n\tvec2 cPos = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;\r\n\tfloat ratio = resolution.x / resolution.y;\r\n\tcPos.x *= ratio;\r\n\r\n\tfloat cLength = length(cPos);\r\n\r\n\tfloat speed = 10.0;\r\n\tvec2 uv = gl_FragCoord.xy / resolution.xy + (cPos / cLength) * cos(cLength * 40.0 - time * speed) * 0.3;\r\n\r\n\t//gl_FragColor = vec4(vec3(1.0 - distance(vec2(0.5), uv),0.0, 0.0), 1.0);\r\n\tfloat f = sin(uv.x * 2. + time);\r\n\tgl_FragColor = vec4(vec3(f, pow(f, 8.), pow(f, 3.)), 1.0);\r\n}\r\n","http://glslsandbox.com/e#40671.0"),new R.E("vec2 rot(vec2 p, float a) {\r\n\treturn vec2(\r\n\t\tp.x * cos(a) - p.y * sin(a),\r\n\t\tp.x * sin(a) + p.y * cos(a));\r\n\r\n}\r\n\r\nfloat map(vec3 p) {\r\n\tfloat t = length(mod(p, 2.0) - 1.0) - 0.5;\r\n\tfloat tp0 = 4.0 - dot(abs(p), vec3(0,1,0));\r\n\tfloat tp1 = 4.0 - dot(abs(p), vec3(1,0,0));\r\n\r\n\tfloat tx = length(mod(p.yz, 2.0) - 1.0) - 0.3;\r\n\tfloat ty = length(mod(p.zx, 2.0) - 1.0) - 0.3;\r\n\tfloat tz = length(mod(p.xy, 2.0) - 1.0) - 0.3;\r\n\tfloat txp = length(mod(p.yz, 0.2) - 0.1) - 0.04;\r\n\tfloat typ = length(mod(p.zx, 0.2) - 0.1) - 0.04;\r\n\tfloat tzp = length(mod(p.xy, 0.2) - 0.1) - 0.04;\r\n\tt = max(-txp, t);\r\n\tt = max(-typ, t);\r\n\tt = max(-tzp, t);\r\n\tt = max(-tx, t);\r\n\tt = max(-ty, t);\r\n\tt = max(-tz, t);\r\n\tt = min(tp0, t);\r\n\tt = min(tp1, t);\r\n\tt = max(-txp, t);\r\n\tt = max(-typ, t);\r\n\tt = max(-tzp, t);\r\n\r\n\r\n\treturn t;\r\n\r\n}\r\n\r\nvec3 getnormal(vec3 p){\r\n    float d = 0.001;\r\n        return normalize(vec3(\r\n        map(p + vec3(  d, 0.0, 0.0)) - map(p + vec3( -d, 0.0, 0.0)),\r\n        map(p + vec3(0.0,   d, 0.0)) - map(p + vec3(0.0,  -d, 0.0)),\r\n        map(p + vec3(0.0, 0.0,   d)) - map(p + vec3(0.0, 0.0,  -d))\r\n    ));\r\n}\r\n\r\nvec4 getcolor(float z) {\r\n\r\n\tvec2 uv = ( gl_FragCoord.xy / resolution.xy )  * 2.0 - 1.0;\r\n\r\n\tuv.y *= resolution.y / resolution.x;\r\n\tuv.x += z;\r\n\r\n\tvec3 dir = normalize(vec3(uv, 1.0));\r\n\t//dir.xy = rot(dir.xy, time * 0.2);\r\n\t//dir.zy = rot(dir.zy, time * 0.2);\r\n\r\n\tvec3 pos = vec3(0, 0, time);\r\n\tfloat t = 0.0;\r\n\tfor(int i = 0; i < 100; i++) {\r\n\t\tfloat temp = map(dir * t + pos);\r\n\t\tif(temp < 0.001) break;\r\n\t\tt += temp * 0.75;\r\n\t}\r\n\tvec3 ip = dir * t + pos;\r\n\tvec3 V = normalize(-ip);\r\n\tvec3 N = getnormal(ip);\r\n\tvec3 L = normalize(vec3(3,4,-1));\r\n\tvec3 H = normalize(L + V);\r\n\tfloat Kd = max(dot(L, N), 0.0);\r\n\tfloat Ks = pow(max(dot(H, N), 0.0), 32.0);\r\n\tvec4 D = vec4(Kd) * vec4(1,0,0,1);\r\n\tvec4 S = vec4(Ks) * vec4(1,1,0,1);\r\n\tvec4 F = vec4(t * 0.06) * vec4(0.4,0.4,1,1);\r\n\treturn D + S + F;\r\n\r\n}\r\n\r\nvoid main() {\r\n\tvec2 uv = ( gl_FragCoord.xy / resolution.xy )  * 2.0 - 1.0;\r\n\tfloat Z = 0.005;\r\n\tvec4 R = getcolor(-Z);\r\n\tvec4 G = getcolor(0.0);\r\n\tvec4 B = getcolor(Z);\r\n\tgl_FragColor.x = R.x;\r\n\tgl_FragColor.y = G.y;\r\n\tgl_FragColor.z = B.z;\r\n\tgl_FragColor.w = 1.0;\r\n\tfloat v = gl_FragColor.x * 0.298912 + gl_FragColor.y *  0.586611 + gl_FragColor.z * 0.114478;\r\n\tgl_FragColor.xyz *= mix(vec3(0.1,0.2,0.5), vec3(1,0.9,0.5), v);\r\n\tgl_FragColor.xyz *= 1.0 - dot(uv * 0.5, uv);\r\n}\r\n","http://glslsandbox.com/e#40413.12"),new R.E("#define INNER_RADIUS 0.75\r\n#define OUTER_RADIUS 0.9\r\n#define SHEET_THICKNESS 0.012\r\n#define NOISINESS 10.0\r\n\r\n#define INNER_COLOR vec4(0.0, 30.0, 30.0, 1.0)\r\n#define OUTER_COLOR vec4(20.0, 20.0, 30.0, 1.0)\r\n\r\n#define NUM_STEPS 20\r\n#define TIME_SCALE 5.0\r\n\r\nfloat trapezium(float x)\r\n{\r\n    //            __________\r\n    // 1.0 -     /          \r\n    //          /                            .\r\n    // 0.5 -   /                            .  --> Repeating\r\n    //        /                            .\r\n    // 0.0 - /                  __________/\r\n    //\r\n    //       |    |    |    |    |    |    |\r\n    //      0.0  1/6  2/6  3/6  4/6  5/6  6/6\r\n    //\r\n\treturn min(1.0, max(0.0, 1.0 - abs(-mod(x, 1.0) * 3.0 + 1.0)) * 2.0);\r\n}\r\n\r\nvec3 colFromHue(float hue)\r\n{\r\n    // https://en.wikipedia.org/wiki/Hue#/media/File:HSV-RGB-comparison.svg\r\n\treturn vec3(trapezium(hue - 1.0/3.0), trapezium(hue), trapezium(hue + 1.0/3.0));\r\n}\r\n\r\n// Cheap noise functions. I just messed around with sin functions until\r\n// I got something I liked. The important thing was to make sure the periods\r\n// of the sin functions weren't constant and varied over space.\r\nfloat cnoise3(float pos)\r\n{\r\n\treturn (cos(pos / 2.0) * 0.2 + 1.0);\r\n}\r\n\r\nfloat cnoise2(float pos)\r\n{\r\n\treturn (sin(pos * cnoise3(pos) / 2.0) * 0.2 + 1.0);\r\n}\r\n\r\nfloat cnoise(vec4 pos)\r\n{\r\n    // These values are all very carefully chosen using\r\n    // lots of very complex mathematics. In other news,\r\n    // bashing my head on my keyboard is now complex\r\n    // mathematics\r\n    float x = pos.x * cnoise2(pos.y) + pos.w * 0.87123 + 82.52;\r\n    float y = pos.y * cnoise2(pos.z) + pos.w * 0.78725 + 12.76;\r\n    float z = pos.z * cnoise2(pos.x) + pos.w * 0.68201 + 42.03;\r\n    return (sin(x) + sin(y) + sin(z)) / 3.0;\r\n}\r\n\r\nvec4 merge_colours(vec4 apply_this, vec4 on_top_of_this)\r\n{\r\n    // Very basic colour merging\r\n    return on_top_of_this * (1.0 - apply_this.a) + apply_this * apply_this.a;\r\n}\r\n\r\nvec4 getdensity(vec3 pos)\r\n{\r\n    // This function get's the \"density\" of fog at a position in space (pos)\r\n\r\n    // First, let's make a variable we can reuse for scaled time.\r\n    float time = time * TIME_SCALE;\r\n\r\n    // The next thing to do is decide where to sample the noise functions.\r\n    // We want the radius of the bubble to be constant along any ray from\r\n    // the center of the bubble. So, to ensure that we always sample the same\r\n    // position in the noise function for any ray, we normalize the position\r\n    // vector (since the origin of the bubble is at 0)\r\n    vec3 samplePos = normalize(pos);\r\n\r\n    // The inner colour of the buble is just a random colour sampled from the cheap noise function.\r\n    vec4 inner_color = vec4(colFromHue(cnoise(vec4(samplePos / 5.0, time / 15.0))) * 25.0, 1.0);\r\n    // The outer colour of the buble is a big whiter than the inside. This helps make the bubble\r\n    // look more natural.\r\n    vec4 outer_color = merge_colours(vec4(25.0,25.0,25.0,0.5), inner_color);\r\n\r\n    // Now we're going to sample the noise function to get the radius of the bubble along this ray\r\n    float sample_ = (cnoise(vec4(samplePos * NOISINESS, time)) + 1.0) / 2.0;\r\n    // Clamp the noise in case using a different noise function (perlin for example)\r\n    sample_ = clamp(sample_, 0.0, 1.0);\r\n    // Calculate the inner and outer most radius boundaries\r\n    float innerIncBorder = INNER_RADIUS + SHEET_THICKNESS;\r\n    float outerIncBorder = OUTER_RADIUS - SHEET_THICKNESS;\r\n    // Calculate the radius of the bubble by linearly interpolating\r\n    // the noise sample between inner and outer boundaries.\r\n    float radius = innerIncBorder + (outerIncBorder - innerIncBorder) * sample_;\r\n\r\n    // Calculate the distance between the volume sample position and the center of the bubble\r\n    float dist = distance(pos, vec3(0.0, 0.0, 0.0));\r\n    // Calculate the density of the fog. We use a very \"strongly peaking\" function here.\r\n    // It's almost 0 everywhere except at radius, where it peaks to 1 and then falls to 0 very quickly.\r\n    // Take a look at it in wolframalpha.\r\n    float density = exp(-pow(dist - radius, 2.0) * 05000.0);\r\n\r\n    // Calculate final color here. Lerp the inner and outer colours depending on the radius and scale by density\r\n    return (inner_color + (outer_color - inner_color) * (radius - innerIncBorder) / (outerIncBorder - innerIncBorder)) * density;\r\n}\r\n\r\nvec4 raymarch(vec3 start, vec3 end)\r\n{\r\n    // This is the ray marching function. Here, we sample NUM_STEPS points along the vector\r\n    // between start and end. Then, we integrate the resultant densities linearly.\r\n    vec4 retn = vec4(0.0, 0.0, 0.0, 0.0);\r\n\tvec3 delta = end - start;\r\n    float stepDistance = length(delta) / float(NUM_STEPS);\r\n\r\n    vec4 densityPrevious = getdensity(start);\r\n    for (int i = 1; i < NUM_STEPS; i++)\r\n    {\r\n        vec3 samplePos = start + delta * float(i) / float(NUM_STEPS);\r\n        vec4 density = getdensity(samplePos);\r\n        // Integrate the density using linear interpolation\r\n        // The colours will be the average of the two weighted by their alpha\r\n        vec4 densityIntegrated = (density + densityPrevious) / 2.0;\r\n        // Optimised out to return. densityIntegrated *= stepDistance\r\n        retn += densityIntegrated;\r\n\r\n        densityPrevious = density;\r\n    }\r\n\r\n    return retn * stepDistance;\r\n}\r\n\r\nvec4 raymarch_ball(vec2 coord) {\r\n\t// Now we're going to intersect a ray from the\r\n    // coord along the Z axis onto two spheres, one\r\n    // inside the other (same origin). getdensity\r\n    // is only > 0 between these volumes.\r\n    float d = distance(coord, vec2(0.0, 0.0));\r\n    if (d > OUTER_RADIUS) {\r\n        // No intersection on the spheres.\r\n\t\treturn vec4(0.0, 0.0, 0.0, 0.0);\r\n    }\r\n    float dOuterNormalized = d / OUTER_RADIUS;\r\n    float outerStartZ = -sqrt(1.0 - dOuterNormalized*dOuterNormalized) * OUTER_RADIUS; // sqrt(1-x*x) = function of a circle :)\r\n    float outerEndZ = -outerStartZ;\r\n    if (d > INNER_RADIUS) {\r\n        // The ray only intersects the larger sphere,\r\n        // so we need to cast from the front to the back\r\n\r\n        // We do it twice so that the number of samples in this branch\r\n        // is identical to the number of samples\r\n        // inside the blob. Otherwise we see artifacts with\r\n        // a lower number of samples.\r\n        vec4 frontPart = raymarch(vec3(coord, outerStartZ), vec3(coord, 0));\r\n        vec4 backPart = raymarch(vec3(coord, 0), vec3(coord, outerEndZ));\r\n        return frontPart + backPart;\r\n    }\r\n\r\n    float dInnerNormalized = d / INNER_RADIUS;\r\n    float innerStartZ = -sqrt(1.0 - dInnerNormalized*dInnerNormalized) * INNER_RADIUS; // sqrt(1-x*x) = function of a circle :)\r\n    float innerEndZ = -innerStartZ;\r\n    // The ray intersects both spheres.\r\n    vec4 frontPart = raymarch(vec3(coord, outerStartZ), vec3(coord, innerStartZ));\r\n    vec4 backPart = raymarch(vec3(coord, innerEndZ), vec3(coord, outerEndZ));\r\n    vec4 final = frontPart + backPart;\r\n    return final;\r\n}\r\n\r\n\r\nvoid main()\r\n{\r\n\tvec2 uv = (gl_FragCoord.xy / min(resolution.x, resolution.y)) * 2.0 - vec2(resolution.x / resolution.y, 1.0);\r\n    gl_FragColor = merge_colours(raymarch_ball(uv), vec4(0.0, 0.0, 0.0, 1.0));\r\n}\r\n","http://glslsandbox.com/e#39993.0")]
new H.bd(y,new R.jo(),[H.Z(y,0),null]).Z(0,new R.jp(z,H.cM(new P.ce(Date.now(),!1))))},"$0","dO",0,0,1],
iH:{"^":"i:2;a",
$1:function(a){window.location.href=J.e5(this.a)}},
jo:{"^":"i:2;",
$1:function(a){var z=J.N(a)
return new R.E("                 precision mediump float;\r\n                 uniform vec2 resolution;\r\n                 uniform float time;\r\n                \r\n                 "+H.h(z.gE(a))+"\r\n               ",z.gM(a))}},
jp:{"^":"i:2;a,b",
$1:function(a){var z=this.a.a
return R.iG(z,z,a,this.b,null)}}},1],["","",,R,{"^":"",E:{"^":"e;E:a>,M:b>"}}],["","",,N,{"^":"",
j3:function(a,b){var z,y
z=J.N(a)
y=z.bH(a)
if(H.bZ(b,"$isb",[P.l1],"$asb"))C.c.Z(b,new N.j4(a,y))
z.bS(a,y)
if(z.b3(a,y,35714)!==!0)throw H.c("Not able to link shader(s) "+H.h(b))
return y},
dU:function(a,b,c){var z,y
z=J.N(a)
y=z.bI(a,c)
z.b9(a,y,b)
z.bG(a,y)
if(z.b4(a,y,35713)!==!0)throw H.c("Not able to compile shader "+H.h(b))
return y},
j4:{"^":"i:2;a,b",
$1:function(a){return J.e2(this.a,this.b,a)}}}]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cy.prototype
return J.fs.prototype}if(typeof a=="string")return J.aY.prototype
if(a==null)return J.ft.prototype
if(typeof a=="boolean")return J.fr.prototype
if(a.constructor==Array)return J.aW.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aZ.prototype
return a}if(a instanceof P.e)return a
return J.bo(a)}
J.F=function(a){if(typeof a=="string")return J.aY.prototype
if(a==null)return a
if(a.constructor==Array)return J.aW.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aZ.prototype
return a}if(a instanceof P.e)return a
return J.bo(a)}
J.as=function(a){if(a==null)return a
if(a.constructor==Array)return J.aW.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aZ.prototype
return a}if(a instanceof P.e)return a
return J.bo(a)}
J.b5=function(a){if(typeof a=="number")return J.aX.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.b2.prototype
return a}
J.j8=function(a){if(typeof a=="number")return J.aX.prototype
if(typeof a=="string")return J.aY.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.b2.prototype
return a}
J.j9=function(a){if(typeof a=="string")return J.aY.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.b2.prototype
return a}
J.N=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aZ.prototype
return a}if(a instanceof P.e)return a
return J.bo(a)}
J.aN=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.j8(a).L(a,b)}
J.C=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).p(a,b)}
J.bv=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.b5(a).ad(a,b)}
J.e_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.b5(a).D(a,b)}
J.b7=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.dS(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.bw=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.dS(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.as(a).l(a,b,c)}
J.e0=function(a,b,c,d){return J.N(a).cA(a,b,c,d)}
J.e1=function(a,b,c,d){return J.N(a).cR(a,b,c,d)}
J.e2=function(a,b,c){return J.N(a).bE(a,b,c)}
J.bx=function(a,b,c){return J.F(a).d2(a,b,c)}
J.e3=function(a,b){return J.as(a).n(a,b)}
J.e4=function(a,b,c,d){return J.as(a).al(a,b,c,d)}
J.aO=function(a){return J.N(a).gG(a)}
J.a_=function(a){return J.o(a).gw(a)}
J.by=function(a){return J.F(a).gu(a)}
J.b8=function(a){return J.as(a).gF(a)}
J.V=function(a){return J.F(a).gi(a)}
J.e5=function(a){return J.N(a).gM(a)}
J.e6=function(a,b){return J.as(a).a1(a,b)}
J.au=function(a,b){return J.N(a).P(a,b)}
J.e7=function(a,b){return J.b5(a).ab(a,b)}
J.a0=function(a){return J.o(a).j(a)}
I.Q=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.z=W.ee.prototype
C.l=W.en.prototype
C.A=J.d.prototype
C.c=J.aW.prototype
C.b=J.cy.prototype
C.e=J.aX.prototype
C.a=J.aY.prototype
C.H=J.aZ.prototype
C.u=J.fJ.prototype
C.L=P.bO.prototype
C.j=J.b2.prototype
C.w=new P.eb(!1)
C.v=new P.ea(C.w)
C.x=new P.fI()
C.y=new P.hD()
C.d=new P.ia()
C.m=new P.aR(0)
C.B=function() {  var toStringFunction = Object.prototype.toString;  function getTag(o) {    var s = toStringFunction.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = toStringFunction.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: getTag,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.n=function(hooks) { return hooks; }
C.C=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.D=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.E=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.o=function getTagFallback(o) {  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.F=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.G=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.p=H.I(I.Q([127,2047,65535,1114111]),[P.j])
C.f=I.Q([0,0,32776,33792,1,10240,0,0])
C.h=I.Q([0,0,65490,45055,65535,34815,65534,18431])
C.i=I.Q([0,0,26624,1023,65534,2047,65534,2047])
C.J=I.Q([0,0,32722,12287,65534,34815,65534,18431])
C.q=I.Q([0,0,24576,1023,65534,34815,65534,18431])
C.r=I.Q([0,0,32754,11263,65534,34815,65534,18431])
C.t=I.Q([0,0,65490,12287,65535,34815,65534,18431])
C.I=H.I(I.Q([]),[P.p])
C.K=new H.em(0,{},C.I,[P.p,P.p])
C.k=new P.hp(!1)
$.cN="$cachedFunction"
$.cO="$cachedInvocation"
$.S=0
$.av=null
$.c6=null
$.c0=null
$.dH=null
$.dW=null
$.bn=null
$.br=null
$.c1=null
$.ap=null
$.aH=null
$.aI=null
$.bX=!1
$.r=C.d
$.cu=0
$.ci=null
$.ch=null
$.cg=null
$.cf=null
$.dz=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["cd","$get$cd",function(){return H.dP("_$dart_dartClosure")},"bC","$get$bC",function(){return H.dP("_$dart_js")},"cw","$get$cw",function(){return H.fm()},"cx","$get$cx",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.cu
$.cu=z+1
z="expando$key$"+z}return new P.ex(null,z)},"cX","$get$cX",function(){return H.U(H.bi({
toString:function(){return"$receiver$"}}))},"cY","$get$cY",function(){return H.U(H.bi({$method$:null,
toString:function(){return"$receiver$"}}))},"cZ","$get$cZ",function(){return H.U(H.bi(null))},"d_","$get$d_",function(){return H.U(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"d3","$get$d3",function(){return H.U(H.bi(void 0))},"d4","$get$d4",function(){return H.U(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"d1","$get$d1",function(){return H.U(H.d2(null))},"d0","$get$d0",function(){return H.U(function(){try{null.$method$}catch(z){return z.message}}())},"d6","$get$d6",function(){return H.U(H.d2(void 0))},"d5","$get$d5",function(){return H.U(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bS","$get$bS",function(){return P.hs()},"aU","$get$aU",function(){var z,y
z=P.be
y=new P.ah(0,P.hr(),null,[z])
y.cw(null,z)
return y},"aK","$get$aK",function(){return[]},"de","$get$de",function(){return H.fG([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2])},"dF","$get$dF",function(){return P.iI()},"cc","$get$cc",function(){return{}}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.e],opt:[P.b0]},{func:1,args:[,,]},{func:1,ret:P.p,args:[P.j]},{func:1,v:true,args:[P.b1,P.p,P.j]},{func:1,args:[,P.p]},{func:1,args:[P.p]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.b0]},{func:1,ret:P.j,args:[,P.j]},{func:1,v:true,args:[P.j,P.j]},{func:1,v:true,args:[P.p,P.j]},{func:1,v:true,args:[P.p],opt:[,]},{func:1,ret:P.j,args:[P.j,P.j]},{func:1,ret:P.b1,args:[,,]},{func:1,v:true,args:[P.e]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.jw(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.Q=a.Q
Isolate.H=a.H
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.dY(R.dO(),b)},[])
else (function(b){H.dY(R.dO(),b)})([])})})()