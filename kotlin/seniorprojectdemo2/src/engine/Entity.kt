package engine

import math.Mat3
import math.Mat4
import math.Vec3
import org.khronos.webgl.get

open class Entity {
    var parent = Mat4()
    var position = Vec3()
    var scale = Vec3(1, 1, 1)
    var velocity = Vec3(0, 0, 0)
    var acceleration = Vec3(0, 0, 0)
    var rotation = Vec3()

    val forward: Vec3
        get() = Vec3(wMat.array[2], wMat.array[6], wMat.array[10])

    val left: Vec3
        get() = Vec3(wMat.array[0], wMat.array[4], wMat.array[8])

    open val wMat: Mat4
        get() = Mat4().apply {
            translate(position)
            rotateX(rotation.array[0])
            rotateY(rotation.array[1])
            rotateZ(rotation.array[2])
            scale(scale)
        }

    val nMat: Mat4
        get() = wMat

    open fun update() {
        velocity += acceleration
        position += velocity
    }
}