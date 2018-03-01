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
                    Dom.h1("ThreeEZ Demo"),
                    Dom.h2("A 3D WebGL Rendering Engine"),
                    Dom.p("By Daniel Church and Dieter Grosswiler")
            )
            div.className = "center"
            div.style.color = "#fff"
            div.style.fontSize = "40px"
            div.style.paddingTop = "23vh"
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

        val cube = Cube(texture = ModelLoader.loadTexture("models/crate.png"))
        cube.position.x = -1f
        cube.position.z = -3f

        val sphere = Sphere(texture = ModelLoader.loadTexture("models/texture.png"))
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
        Engine.enableLighting = true
        engine.light.color = Vec3(0.8f, 0.5f, 0.9f)

        val model = Sphere(texture = ModelLoader.loadTexture("models/test.png"))
        model.position.z = -3f
        engine.add(model)

        val sphere = Sphere(texture = ModelLoader.loadTexture("models/test.png"))
        sphere.scale = Vec3(0.1f, 0.1f, 0.1f)
        sphere.materialColor = engine.light.color
        engine.add(sphere)

        engine.onUpdate = {
            engine.light.position.x = 2 * sin(Engine.time)
            engine.light.position.z = 2 * cos(Engine.time) - 3
            sphere.position = engine.light.position
        }
    }

    private fun modelDemo() {
        currentDemo = "modelDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera()

        val model = ModelLoader.loadObj("models/TropicalFish15.obj", texture = ModelLoader.loadTexture("models/TropicalFish15.jpg"))
        model.position.z = -4f
        engine.add(model)

        engine.onUpdate = {
            model.rotation.y = Engine.time
        }
    }

    private fun fpsCamDemo() {
        currentDemo = "fpsCamDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera()

        val cube = Cube(texture = ModelLoader.loadTexture("models/cubetexture.png"))
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
        val vid = ModelLoader.setupVideo("models/SintelIntro.mp4")

        val cube = Cube(texture = tex)
        cube.scale = Vec3(-2, 1, -2)
        engine.add(cube)

        val model = ModelLoader.loadObj("models/suzanne.obj", texture = tex)
        model.scale = Vec3(5f, 5f, 5f)
        model.position = Vec3(5f, 0f, -10f)
        engine.add(model)

        val sphere = Sphere(texture = tex)
        sphere.scale = Vec3(5f, 5f, 5f)
        sphere.position = Vec3(-5f, 0f, -10f)
        engine.add(sphere)

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
