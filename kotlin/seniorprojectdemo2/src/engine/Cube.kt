package engine

import math.Vec3
import org.khronos.webgl.WebGLTexture

open class Cube(tint: Vec3 = Vec3(), texture: WebGLTexture = ModelLoader.loadTexture()): RenderingObject(Cube.data, tint = tint, texture = texture) {
    companion object {
        val data = ModelLoader.loadOBJSource("models/cube.obj")
    }
}