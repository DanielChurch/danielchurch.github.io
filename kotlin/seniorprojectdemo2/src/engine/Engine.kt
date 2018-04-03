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
    var time = 0f
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
        val data = ShaderData()
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
            Dom.body(
                    glCanvas.apply {
                        className = "shrink"
                        style.run {
                            margin = "auto"
                            this.width = "80vw"
                            this.height = "80vh"
                            marginTop = "8vh"
                            border = "3px solid #777"
                            borderRadius = "50px"
                            boxShadow = "0 4px 8px 0 rgba(0.7, 0.7, 0.7, 0.2), 0 6px 20px 0 rgba(0.7, 0.7, 0.7, 0.19);"
                            transition = "transform: 1s"
                        }
                    }
            )
            Dom.body.style.textAlign = "center"
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

    fun remove(obj: RenderingObject) {
        objects.remove(obj)
    }

    fun clear() = objects.clear()

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
            Input.mousePosition.run {
                x = event.clientX
                y = event.clientY
            }
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
        Engine.run {
            gl = gl_context
            enableLighting = false
            camera = Camera()
        }

        this.canvas = gl_canvas

        setupCallbacks()

        gl_context.clearColor(0f, 0f, 0f, 1f)

        val setter = { program: ShaderProgram<ShaderData>, data: ShaderData ->
            program.run {
                setUniform1f("time", Engine.time)
                setUniform3f("cameraPosition", camera.position)
            }
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

        objects.forEach { it.update() }

        pollInput()
        camera.update()
    }

    private fun render() {
        gl.run {
            clear(WebGLRenderingContext.COLOR_BUFFER_BIT or WebGLRenderingContext.DEPTH_BUFFER_BIT)
            clearDepth(1f)
            enable(WebGLRenderingContext.DEPTH_TEST)
        }

        if (objects.isNotEmpty()) {
            shaderProgram.run {
                begin(objects[0].attribBuffer, data)

                setUniform1f("light.attenuation", light.attenuation)
                setUniform1f("light.ambientCoefficient", light.ambientCoefficient)
                setUniform1f("useLighting", if (Engine.enableLighting) 1f else 0f)

                setUniform3f("light.position", light.position)
                setUniform3f("light.color", light.color)
                setUniform3f("cameraPosition", camera.position)

                setUniformMatrix4fv("viewMatrix", camera.wMat.array)

                end()
            }
        }

        objects.forEach {
            shaderProgram.run {
                begin(it.attribBuffer, data)
                it.render(gl, this)
                end()
            }
        }

        gl.disable(WebGLRenderingContext.DEPTH_TEST)

        window.requestAnimationFrame {
            update()
            render()
        }
    }
}