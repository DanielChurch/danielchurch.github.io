package engine

import math.Vec3
import org.khronos.webgl.WebGLTexture

class Sphere(tint: Vec3 = Vec3(), texture: WebGLTexture = ModelLoader.loadTexture()): RenderingObject(ModelLoader.loadOBJSource("models/sphere.obj"), tint = tint, texture = texture)