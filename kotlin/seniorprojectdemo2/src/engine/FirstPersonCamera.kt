package engine

import math.Vec3
import org.khronos.webgl.get
import org.w3c.dom.events.KeyboardEvent
import org.w3c.dom.events.MouseEvent

class FirstPersonCamera: Camera() {

    var mouseSensitivityX = 1f
    var mouseSensitivityY = 1f
    var speed = 1f

    override val onMousePressed: ((MouseEvent) -> Unit)
        get() = {
            when (it.button.toInt()) {
                0 -> Input.lockCursor()
                1 -> Input.releaseCursor()
            }
        }

    override val onMouseMove: ((MouseEvent) -> Unit)
        get() = {
            val movementX = js("event.movementX") as Float
            val movementY = js("event.movementY") as Float
            if (Input.isCursorLocked) {
                Engine.camera.rotation.run {
                    x -= movementY / 1000 * mouseSensitivityY
                    y -= movementX / 1000 * mouseSensitivityX
                }
            }
        }

    override val onKeyPress: ((KeyboardEvent) -> Unit)?
        get() = {
            when {
                it.which == 27 -> Input.releaseCursor()
            }
        }

    override fun update() {
        // A D
        Engine.camera.position = when {
            Input.isKeyDown(65) -> Vec3(Engine.camera.position.array[0], Engine.camera.position.array[1], Engine.camera.position.array[2]) - Engine.camera.left.normalized() * 0.1f * speed
            Input.isKeyDown(68) -> Vec3(Engine.camera.position.array[0], Engine.camera.position.array[1], Engine.camera.position.array[2]) + Engine.camera.left.normalized() * 0.1f * speed
            else -> Engine.camera.position
        }

        // SPACE SHIFT
        Engine.camera.position = when {
            Input.isKeyDown(32) -> Vec3(Engine.camera.position.array[0], Engine.camera.position.array[1] + 0.1 * speed, Engine.camera.position.array[2])
            Input.isKeyDown(16) -> Vec3(Engine.camera.position.array[0], Engine.camera.position.array[1] - 0.1 * speed, Engine.camera.position.array[2])
            else -> Engine.camera.position
        }

        // W S
        Engine.camera.position = when {
            Input.isKeyDown(83) -> Vec3(Engine.camera.position.array[0], Engine.camera.position.array[1], Engine.camera.position.array[2]) + Engine.camera.forward.normalized() * 0.1f * speed
            Input.isKeyDown(87) -> Vec3(Engine.camera.position.array[0], Engine.camera.position.array[1], Engine.camera.position.array[2]) - Engine.camera.forward.normalized() * 0.1f * speed
            else -> Engine.camera.position
        }
    }
}