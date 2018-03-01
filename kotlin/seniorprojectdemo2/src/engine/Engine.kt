package engine

import math.Mat4
import org.khronos.webgl.WebGLRenderingContext
import org.w3c.dom.*
import org.w3c.dom.events.KeyboardEvent
import org.w3c.dom.events.MouseEvent
import web.Dom
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date
import kotlin.math.*
import org.khronos.webgl.WebGLRenderingContext as GL

class ShaderData {
    var time: Float = 0f
}

class Engine(width: Int = 1280, height: Int = 720) {
    companion object {
        private val start = Date().getTime()
        lateinit var gl: WebGLRenderingContext
        var canvas: HTMLCanvasElement? = null
        var camera = Camera()
        val time: Float
            get() = (start.toFloat() - Date().getTime().toFloat()) / 1000f
        var enableLighting = false
    }

    var scene: Scene = Scene()

    var onKeyPressed: ((KeyboardEvent) -> Unit)? = null
    var onKeyReleased: ((KeyboardEvent) -> Unit)? = null
    var onKeyDown: ((KeyboardEvent) -> Unit)? = null
    var onMouseMove: ((MouseEvent) -> Unit)? = null
    var onMousePress: ((MouseEvent) -> Unit)? = null
    var onMouseRelease: ((MouseEvent) -> Unit)? = null
    var onMouseDown: ((MouseEvent) -> Unit)? = null
    var onUpdate: (() -> Unit)? = null

    private val shaderProgram: ShaderProgram<ShaderData>
    private val data = ShaderData()

    private var canvas: HTMLCanvasElement

    private val objects = mutableListOf<RenderingObject>()

    val light: Light = Light()

    // Initializes the WebGL Context and appends the canvas to the DOM
    private fun initGL(width: Int, height: Int, container: Element? = null) : Pair<HTMLCanvasElement, WebGLRenderingContext> {
        val glCanvas = document.createElement("canvas") as HTMLCanvasElement
        Engine.canvas = glCanvas
        glCanvas.id = "WebGLCanvas"
        // Append to the container if one is specified, otherwise to the body
        if (container != null) {
            container.append(glCanvas)
        } else {
            // Append to the body if a container is not specified
            Dom.body(glCanvas)
            Dom.body().style.textAlign = "center"
            glCanvas.style.margin = "auto"
            glCanvas.style.marginTop = "100px"
            glCanvas.style.border = "3px solid #777"
            glCanvas.style.borderRadius = "50px"
            glCanvas.style.boxShadow = "0 4px 8px 0 rgba(0.7, 0.7, 0.7, 0.2), 0 6px 20px 0 rgba(0.7, 0.7, 0.7, 0.19);"
            glCanvas.style.transition = "transform: 1s"
            glCanvas.className = "shrink"
        }
        // Get the context
        val glContext = glCanvas.getContext("webgl") as WebGLRenderingContext

        // Set the width and height
        glCanvas.width = width
        glCanvas.height = height

        // Set up the viewport
        glContext.viewport(0, 0, glCanvas.width, glCanvas.height)

        return Pair(glCanvas, glContext)
    }

    private fun pollInput() {}

    fun add(obj: RenderingObject) {
        objects.add(obj)
    }

    fun setupCallbacks() {
        document.body!!.onkeydown = {
            val event = it as KeyboardEvent
            Input.keysPressed[event.which] = true
            camera.onKeyPress?.invoke(event)
            onKeyPressed?.invoke(event)
            false
        }

        document.body!!.onkeyup = {
            val event = it as KeyboardEvent
            Input.keysPressed[event.which] = false
            onKeyReleased?.invoke(event)
            false
        }

        canvas.onmousemove = {
            val event = it as MouseEvent
            Input.mousePosition.x = event.clientX
            Input.mousePosition.y = event.clientY
            camera.onMouseMove?.invoke(event)
            onMouseMove?.invoke(event)
            false
        }

        canvas.onmousedown = {
            val event = it as MouseEvent
            camera.onMousePressed?.invoke(event)
            onMousePress?.invoke(event)
            false
        }
    }

    init {
        val (gl_canvas, gl_context) = initGL(width, height)
        Engine.gl = gl_context
        Engine.enableLighting = false
        Engine.camera = Camera()

        this.canvas = gl_canvas

        setupCallbacks()

        gl_context.clearColor(0f, 0f, 0f, 1f)

        val setter = { program: ShaderProgram<ShaderData>, data: ShaderData ->
            program.setUniform1f("time", Engine.time)
            program.setUniform3f("cameraPosition", camera.position)
        }

        val vainfo = arrayOf(
                VertextAttributeInfo("a_position", 3),
                VertextAttributeInfo("a_normal", 3),
                VertextAttributeInfo("a_tex_coords", 2)
        )

        shaderProgram = StandardShader(gl, WebGLRenderingContext.TRIANGLES, vainfo, setter)

        val pMatrix = Mat4()
        pMatrix.perspective(camera.fov * PI / 180, camera.aspectRatio, camera.zNear, camera.zFar)

        shaderProgram.setUniformMatrix4fv("projectionMatrix", pMatrix.array)

        gl.viewport(0, 0, gl_canvas.width, gl_canvas.height)

        render()
    }

    private fun update() {
        if (onUpdate != null) { onUpdate?.invoke() }

        pollInput()
        camera.update()
    }

    private fun render() {
        gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT or WebGLRenderingContext.DEPTH_BUFFER_BIT)
        gl.clearDepth(1f)
        gl.enable(WebGLRenderingContext.DEPTH_TEST)

        if (objects.isNotEmpty()) {
            shaderProgram.begin(objects[0].attribBuffer, data)

            shaderProgram.setUniform1f("light.attenuation", light.attenuation)
            shaderProgram.setUniform1f("light.ambientCoefficient", light.ambientCoefficient)
            shaderProgram.setUniform1f("useLighting", if (Engine.enableLighting) 1f else 0f)

            shaderProgram.setUniform3f("light.position", light.position)
            shaderProgram.setUniform3f("light.color", light.color)
            shaderProgram.setUniform3f("cameraPosition", camera.position)

            shaderProgram.setUniformMatrix4fv("viewMatrix", camera.wMat.array)
            shaderProgram.end()
        }

        objects.forEach {
            shaderProgram.begin(it.attribBuffer, data)
            shaderProgram.setUniform3f("light.position", light.position)
            it.render(gl, shaderProgram)
            shaderProgram.end()
        }

        gl.disable(WebGLRenderingContext.DEPTH_TEST)

        window.requestAnimationFrame {
            update()
            render()
        }
    }
}