import engine.*
import web.Dom
import kotlin.browser.window
import kotlin.dom.clear
import math.Vec3
import org.w3c.dom.Element
import kotlin.browser.document
import kotlin.math.PI
import kotlin.math.sin
import kotlin.js.Promise
import kotlin.js.*
import kotlin.coroutines.experimental.*
import kotlin.math.cos

external fun setTimeout(function: () -> Unit, delay: Long)

fun launch(block: suspend () -> Unit) {
    block.startCoroutine(object : Continuation<Unit> {
        override val context: CoroutineContext get() = EmptyCoroutineContext
        override fun resume(value: Unit) {}
        override fun resumeWithException(e: Throwable) { console.log("Coroutine failed: $e") }
    })
}

suspend fun <T> Promise<T>.await(): T = suspendCoroutine { cont -> then({ cont.resume(it) }, { cont.resumeWithException(it) }) }
suspend fun delay(ms: Long): Unit = suspendCoroutine { setTimeout({ it.resume(Unit) }, ms) }

class Main {
    private var currentDemo = ""

    private fun getCodeFromName(fileName: String, name: String): String {
        val file = Ajax.read(fileName, false)

        var out = ""

        var addLine = false
        var count = 0
        var curlyCount = 0
        file.split("\n").forEach {
            if (it.contains(name) && count != 0) {
                addLine = true
                out += it + "\n"
                curlyCount += -it.replace("{", "").length + it.replace("}", "").length
            } else if ((curlyCount == 0) and addLine) {
                addLine = false
            } else if (addLine) {
                out += it + "\n"
                curlyCount += -it.replace("{", "").length + it.replace("}", "").length
            } else if (it.contains(name)) {
                count++
            }
        }

        return "    " + out.trim()
    }

    private fun getCode(fileName: String, functionName: String, languageName: String) {
        var content: dynamic = Dom.h1("Select a demo first to view it's code")
        content.style.textAlign = "center"
        content.style.fontSize = "80px"
        content.style.color = "#fff"

        if (!functionName.isEmpty()) {
            val code = Dom.code(getCodeFromName(fileName, functionName))
            code.className = languageName

            content = Dom.pre(code)
            content.style.textAlign = "left"
        }

        content.style.position = "absolute"
        content.style.top = "50%"
        content.style.left = "50%"
        content.style.transform = "translate(-50%, -50%)"

        val div = Dom.div(content)
        div.id = "overlay"
        div.onclick = {
            div.style.display = "none"
            document.getElementById("overlay")?.remove()
            true
        }

        Dom.body(div)
        js("hljs.initHighlighting.called = false; hljs.initHighlighting();")
    }

    private val demos = listOf(
            Triple("Texture", { textureDemo() }, "#4CAF50"),
            Triple("Shading", { shadingDemo() }, "#2196F3"),
            Triple("Model", { modelDemo() }, "#f44336"),
            Triple("FPS Camera", { fpsCamDemo() }, "orange"),
            Triple("Animation", { videoDemo() }, "#430297"),
            Triple("Code", { getCode("src/Main.kt", currentDemo, "Kotlin") }, "#444")
    )

    init {
        Dom.body().style.background = "#000"

        launch {
            Dom.body(createNav(0))
            val div = Dom.div(
                    Dom.h1("3D WebGL Rendering Engine Demo"),
                    Dom.p("By Daniel Church")
            )
            div.className = "center"
            div.style.color = "#fff"
            div.style.fontSize = "40px"
            Dom.body(div)
        }
    }

    private fun createNav(pauseDuration: Int = 1000): Element {
        // Set up nav bar
        var i = 0
        fun getNav(name: String, func: () -> Unit, color: String) : Element {
            val anchor = Dom.a(name)
            anchor.className = "sidenav"
            anchor.style.top = "calc(50vh - ${demos.size * 30 + 10}px + ${60 * i}px)"
            anchor.style.background = color
            anchor.onclick = {
                if (name == "Code") {
                    func()
                } else {
                    launch {
                        clearScene(pauseDuration).await()

                        func()

                        delay(10)
                        Engine.canvas?.className = "grow"
                    }
                }
            }
            i++
            return anchor
        }

        return Dom.div(*demos.map { (name, func, color) -> getNav(name, func, color) }.toTypedArray())
    }

    private fun clearScene(pauseDuration: Int = 1000): Promise<Boolean> {
        return Promise { resolve, _ ->
            launch {
                Engine.canvas?.className = "shrink"
                delay(pauseDuration.toLong())
                Dom.body().clear()
                Dom.body(createNav())
                resolve(true)
            }
        }
    }

    private fun textureDemo() {
        currentDemo = "textureDemo"
        val engine = Engine()

        val cube = Cube(texture = ModelLoader.loadTexture("out/production/SeniorProjectKotlin/crate.png"))
        cube.position.x = -1f
        cube.position.z = -3f

        val sphere = Sphere(texture = ModelLoader.loadTexture("out/production/SeniorProjectKotlin/cubetexture.png"))
        sphere.position.x = 1f
        sphere.position.z = -3f

        engine.add(cube)
        engine.add(sphere)

        engine.onUpdate = {
            cube.rotation.y = Engine.time
            sphere.rotation.y = -Engine.time
        }
    }

    private fun shadingDemo() {
        currentDemo = "shadingDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera()
        Engine.enableLighting = true

        val model = ModelLoader.loadObj("out/production/SeniorProjectKotlin/suzanne.obj", texture = ModelLoader.loadTexture("out/production/SeniorProjectKotlin/cube.png"))
        model.position.z = -3f
        engine.add(model)

        val sphere = Sphere()
        sphere.position.z = -3f
        sphere.scale.x = 0.1f
        sphere.scale.y = 0.1f
        sphere.scale.z = 0.1f
        engine.add(sphere)

        engine.onUpdate = {
            engine.light.position.x = 2 * sin(Engine.time)
            engine.light.position.z = 2 * cos(Engine.time) - 3
            sphere.position.x = 2 * sin(Engine.time)
            sphere.position.z = 2 * cos(Engine.time) - 3
        }
    }

    private fun modelDemo() {
        currentDemo = "modelDemo"
        val engine = Engine()

        val model = ModelLoader.loadObj("out/production/SeniorProjectKotlin/suzanne.obj", texture = ModelLoader.loadTexture("out/production/SeniorProjectKotlin/cubetexture.png"))
        model.position.z = -10f
        engine.add(model)

        engine.onUpdate = {
            model.rotation.y = Engine.time
        }
    }

    private fun fpsCamDemo() {
        currentDemo = "fpsCamDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera()

        val cube = Cube(texture = ModelLoader.loadTexture("out/production/SeniorProjectKotlin/cubetexture.png"))
        cube.position.z = -3f
        engine.add(cube)

        engine.onUpdate = {
            cube.rotation.y = Engine.time
        }
    }

    private fun videoDemo() {
        currentDemo = "videoDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera()

        val tex = ModelLoader.initTexture()
        val vid = ModelLoader.setupVideo("out/production/SeniorProjectKotlin/Sintel.2010.720p.mkv")

        val cube = Cube(texture = tex)
        engine.add(cube)

        cube.scale.x = 2f
        cube.scale.z = 2f
        cube.scale = Vec3(-2, 1, -2)

        val model = ModelLoader.loadObj("out/production/SeniorProjectKotlin/suzanne.obj", texture = tex)
        model.position.z = -10f
        engine.add(model)

        vid.volume = 1.0
        vid.muted = false
        vid.play()

        val mute = Dom.input()
        mute.type = "checkbox"
        mute.onclick = {
            vid.muted = !vid.muted
            true
        }
        mute.checked = true

        val span = Dom.span()
        span.className = "checkmark"

        val label = Dom.label("Mute", mute, span)
        label.className = "container"
        label.style.color = "#fff"

        Dom.body(label).style.background = "#000"

        engine.onMousePress = {
            if (it.button.toInt() == 2) {
                // vid.fastSeek(120.0)
                vid.muted = !vid.muted
            }
        }

        engine.onUpdate = {
            model.rotation.y = Engine.time
            cube.rotation.y = 2 * PI.toFloat() * sin(Engine.time / 10)
            if (ModelLoader.copyVideo) {
                ModelLoader.updateTexture(tex, vid)
            }
        }
    }
}

fun main(args: Array<String>) {
    window.onload = {
        Main()
    }
}
