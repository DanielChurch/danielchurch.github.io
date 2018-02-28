package engine

import org.khronos.webgl.WebGLTexture

class ObjObject(v: Array<Float>, n: Array<Float>, tc: Array<Float>, texture: WebGLTexture = ModelLoader.loadTexture()): RenderingObject(v, n, tc, tex = texture)