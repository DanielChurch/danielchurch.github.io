package engine

import math.Vec3
import org.khronos.webgl.WebGLTexture

class Cube(tint: Vec3 = Vec3(), texture: WebGLTexture = ModelLoader.loadTexture()): RenderingObject(ModelLoader.loadOBJSource("out/production/SeniorProjectKotlin/models/cube.obj"), tint = tint, texture = texture)
//class Cube(tint: Vec3 = Vec3()) : RenderingObject(
//        vertices = arrayOf(
//            -1.0f, -1.0f, -1.0f,
//            1.0f, -1.0f, -1.0f,
//            1.0f, 1.0f, -1.0f,
//
//            1.0f, 1.0f, -1.0f,
//            -1.0f, 1.0f, -1.0f,
//            -1.0f, -1.0f, -1.0f,
//
//
//            -1.0f, -1.0f, 1.0f,
//            1.0f, -1.0f, 1.0f,
//            1.0f, 1.0f, 1.0f,
//
//            1.0f, 1.0f, 1.0f,
//            -1.0f, 1.0f, 1.0f,
//            -1.0f, -1.0f, 1.0f,
//
//
//            -1.0f, -1.0f, -1.0f,
//            -1.0f, 1.0f, -1.0f,
//            -1.0f, 1.0f, 1.0f,
//
//            -1.0f, 1.0f, 1.0f,
//            -1.0f, -1.0f, 1.0f,
//            -1.0f, -1.0f, -1.0f,
//
//
//            1.0f, -1.0f, -1.0f,
//            1.0f, 1.0f, -1.0f,
//            1.0f, 1.0f, 1.0f,
//
//            1.0f, 1.0f, 1.0f,
//            1.0f, -1.0f, 1.0f,
//            1.0f, -1.0f, -1.0f,
//
//
//            -1.0f, 1.0f, -1.0f,
//            1.0f, 1.0f, -1.0f,
//            1.0f, 1.0f, 1.0f,
//
//            1.0f, 1.0f, 1.0f,
//            -1.0f, 1.0f, 1.0f,
//            -1.0f, 1.0f, -1.0f,
//
//
//            -1.0f, -1.0f, -1.0f,
//            1.0f, -1.0f, -1.0f,
//            1.0f, -1.0f, 1.0f,
//
//            1.0f, -1.0f, 1.0f,
//            -1.0f, -1.0f, 1.0f,
//            -1.0f, -1.0f, -1.0f
//        ),
//        normals = arrayOf(
//            0f, 0f, -1f,
//            0f, 0f, -1f,
//            0f, 0f, -1f,
//
//            0f, 0f, -1f,
//            0f, 0f, -1f,
//            0f, 0f, -1f,
//
//            0f, 0f, 1f,
//            0f, 0f, 1f,
//            0f, 0f, 1f,
//
//            0f, 0f, 1f,
//            0f, 0f, 1f,
//            0f, 0f, 1f,
//
//            -1f, 0f, 0f,
//            -1f, 0f, 0f,
//            -1f, 0f, 0f,
//
//            -1f, 0f, 0f,
//            -1f, 0f, 0f,
//            -1f, 0f, 0f,
//
//            1f, 0f, 0f,
//            1f, 0f, 0f,
//            1f, 0f, 0f,
//
//            1f, 0f, 0f,
//            1f, 0f, 0f,
//            1f, 0f, 0f,
//
//            0f, 1f, 0f,
//            0f, 1f, 0f,
//            0f, 1f, 0f,
//
//            0f, 1f, 0f,
//            0f, 1f, 0f,
//            0f, 1f, 0f,
//
//            0f, -1f, 0f,
//            0f, -1f, 0f,
//            0f, -1f, 0f,
//
//            0f, -1f, 0f,
//            0f, -1f, 0f,
//            0f, -1f, 0f
//        ),
//        texCoords = arrayOf(
//                0f, 0f,
//                1f, 1f,
//                0f, 1f,
//
//                0f, 0f,
//                1f, 1f,
//                0f, 1f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f,
//
//                0f, 0f,
//                0f, 0f,
//                0f, 0f
//        ),
//        tint = tint
//)