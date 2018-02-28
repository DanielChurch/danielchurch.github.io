package engine

import math.Mat4
import org.w3c.dom.events.KeyboardEvent
import org.w3c.dom.events.MouseEvent

open class Camera: Entity() {
    var zNear = 0.001
    var zFar = 1000.0
    var fov = 60.0
    var aspectRatio = 16.0/9.0

    open val onMousePressed: ((MouseEvent) -> Unit)? = null
    open val onMouseMove: ((MouseEvent) -> Unit)? = null
    open val onKeyPress: ((KeyboardEvent) -> Unit)? = null

    override val wMat: Mat4
        get() {
            val vMat = Mat4()

            vMat.translate(position)
            vMat.rotateY(rotation.y)
            vMat.rotateX(rotation.x)
            vMat.scale(scale)

            vMat.invert()
            return vMat
        }

    open fun update() {}
}