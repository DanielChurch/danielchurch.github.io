package engine

import math.Vector2

class Input {
    companion object {
        private var cursorLocked = false
        val mousePosition = Vector2()
        val keysPressed = mutableMapOf<Int, Boolean>()
        val mousePressed = mutableMapOf<Int, Boolean>()
        fun isKeyDown(key: Int) = keysPressed[key] == true
        fun isMouseDown(key: Int) = mousePressed[key] == true
        fun lockCursor() {
            js("""
                        var e = document.getElementById('WebGLCanvas');
                        e.requestPointerLock = e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock;

                        e.requestPointerLock();
                    """)
            cursorLocked = true
        }
        fun releaseCursor() {
//            js("""
//                        var e = document.getElementById('WebGLCanvas');
//                        e.exitPointerLock = e.exitPointerLock || e.mozExitPointerLock || e.webkitExitPointerLock;
//                        e.exitPointerLock();
//                    """
//            )
            cursorLocked = false
        }
        val isCursorLocked: Boolean
            get() = cursorLocked
    }
}