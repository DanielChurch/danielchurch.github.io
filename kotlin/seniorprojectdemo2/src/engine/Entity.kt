package engine

import math.Mat3
import math.Mat4
import math.Vec3
import org.khronos.webgl.get

open class Entity {
    var parent = Mat4()
    var position = Vec3()
    var scale = Vec3(1, 1, 1)
    var velocity = Vec3()
    var acceleration = Vec3()
    var rotation = Vec3()

    val forward: Vec3
        get() {
            val vMat = wMat
            return Vec3(vMat.array[2], vMat.array[6], vMat.array[10])
        }

    val left: Vec3
        get() {
            val vMat = wMat
            return Vec3(vMat.array[0], vMat.array[4], vMat.array[8])
        }

    open val wMat: Mat4
        get() {
            val vMat = Mat4()

            vMat.translate(position)
            vMat.rotateX(rotation.array[0])
            vMat.rotateY(rotation.array[1])
            vMat.rotateZ(rotation.array[2])
            vMat.scale(scale)

            return vMat
        }

    val nMat: Mat4
        get() {
            val m = Engine.camera.wMat * wMat

            m.invert()
            m.transpose()

            return wMat
        }
}