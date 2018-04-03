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
        get() = Mat4().apply {
            translate(position)
            rotateY(rotation.y)
            rotateX(rotation.x)
            scale(scale)

            invert()
        }

    override fun update() {}
}