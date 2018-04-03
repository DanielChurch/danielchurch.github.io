import engine.*
import web.Dom
import kotlin.browser.window
import kotlin.dom.clear
import math.Vec3
import org.khronos.webgl.WebGLRenderingContext
import org.w3c.dom.Element
import org.w3c.dom.HTMLElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.math.PI
import kotlin.math.sin
import kotlin.js.Promise
import kotlin.js.*
import kotlin.coroutines.experimental.*
import kotlin.js.Math.random
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
        var content: dynamic = Dom.h1("Select a demo first to view it's code").apply {
            style.textAlign = "center"
            style.fontSize = "80px"
            style.color = "#fff"
        }

        if (!functionName.isEmpty()) {
            val code = Dom.code(getCodeFromName(fileName, functionName)).apply {
                className = languageName
            }

            content = Dom.pre(code).apply {
                style.textAlign = "left"
            }
        }

        (content as HTMLElement).style.apply {
            position = "absolute"
            top = "50%"
            left = "50%"
            transform = "translate(-50%, -50%)"
        }

        Dom.body(
                Dom.div(content).apply {
                    id = "overlay"
                    onclick = {
                        style.display = "none"
                        document.getElementById("overlay")?.remove()
                        true
                    }
                }
        )
        js("hljs.initHighlighting.called = false; hljs.initHighlighting();")
    }

    private val demos = listOf(
            Triple("Texture", { textureDemo() }, "#4CAF50"),
            Triple("Shading", { shadingDemo() }, "#2196F3"),
            Triple("Model", { modelDemo() }, "#f44336"),
            Triple("FPS Camera", { fpsCamDemo() }, "orange"),
            Triple("Animation", { videoDemo() }, "#430297"),
            Triple("Particles", { particleDemo() }, "brown"),
            Triple("Solar", { solarDemo() }, "pink"),
            Triple("Code", { getCode("src/Main.kt", currentDemo, "Kotlin") }, "#444")
    )

    init {
        Dom.body.style.background = "#000"

        launch {
            Dom.body(createNav(0))
            Dom.body(
                    Dom.div(
                            Dom.h1("ThreeEZ Demo"),
                            Dom.h2("A 3D WebGL Rendering Engine"),
                            Dom.p("By Daniel Church and Dieter Grosswiler")
                    ).apply {
                        className = "center"
                        style.color = "#fff"
                        style.fontSize = "40px"
                        style.paddingTop = "23vh"
                    }
            )
        }
    }

    private fun createNav(pauseDuration: Int = 1000): Element {
        // Set up nav bar
        var i = 0
        fun getNav(name: String, func: () -> Unit, color: String) : Element {
            i++
            return Dom.a(name).apply {
                className = "sidenav"
                style.top = "calc(50vh - ${demos.size * 38}px + ${60 * i}px)"
                style.background = color
                onclick = {
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
            }
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
        Engine.camera = FirstPersonCamera()

        val cube = Cube(texture = ModelLoader.loadTexture("models/crate.png")).apply {
            position.x = -1f
            position.z = -3f
        }

        val sphere = Sphere(texture = ModelLoader.loadTexture("models/texture.png")).apply {
            position.x = 1f
            position.z = -3f
        }

        engine.run {
            add(cube)
            add(sphere)
        }

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

        val model = Sphere(texture = ModelLoader.loadTexture("models/test.png")).apply {
            position.z = -3f
        }

        val sphere = Sphere(texture = ModelLoader.loadTexture("models/test.png")).apply {
            scale = Vec3(0.1f, 0.1f, 0.1f)
            materialColor = engine.light.color
        }

        engine.run {
            add(model)
            add(sphere)
        }

        engine.onUpdate = {
            engine.run {
                light.position.x = 2 * sin(Engine.time)
                light.position.z = 2 * cos(Engine.time) - 3
            }
            sphere.position = engine.light.position
        }
    }

    private fun modelDemo() {
        currentDemo = "modelDemo"
        val engine = Engine()

        val model = ModelLoader.loadObj("models/TropicalFish15.obj",
                texture = ModelLoader.loadTexture("models/TropicalFish15.jpg")).apply {
            position.z = -4f
        }

        engine.add(model)

        engine.onUpdate = {
            model.rotation.y = Engine.time
        }
    }

    private fun fpsCamDemo() {
        currentDemo = "fpsCamDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera()

        val cube = Cube(texture = ModelLoader.loadTexture("models/cubetexture.png")).apply {
            position.z = -3f
        }
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

        val model = ModelLoader.loadObj("models/suzanne.obj", texture = tex).apply {
            scale = Vec3(5f, 5f, 5f)
            position = Vec3(5f, 0f, -10f)
        }

        val sphere = Sphere(texture = tex).apply {
            scale = Vec3(5f, 5f, 5f)
            position = Vec3(-5f, 0f, -10f)
        }

        engine.run {
            add(model)
            add(sphere)
        }

        engine.onUpdate = {
            model.rotation.y = Engine.time
            cube.rotation.y = 2 * PI.toFloat() * sin(Engine.time / 10)
            if (ModelLoader.copyVideo) {
                ModelLoader.updateTexture(tex, vid)
            }
        }
    }

    fun particleDemo() {
        currentDemo = "particleDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera()
        var index = 0

        val ps = ParticleSystem(emissionRate = 2).apply {
            var vec3 = Vec3()
            fun centeredRandom() = random() - 0.5f
            val amt = 0.1
            velFunc = { Vec3(centeredRandom() * amt, centeredRandom() * amt, centeredRandom() * amt).apply { vec3 = this } }
            accelFunc = { vec3.times(-0.01f) }
        }

        val ps1 = ParticleSystem().apply {
            position = Vec3(0, 0, -10)
        }

        val ps2 = ParticleSystem().apply {
            position = Vec3(0, 0, -20)
            var i = 0
            var vec3 = Vec3()
            velFunc = { Vec3(cos(i / 180f * PI) / 10, sin(i++ / 180f * PI) / 10, 0).apply { vec3 = this } }
            accelFunc = { vec3.times(-0.01f) }
        }

        val systems = listOf(ps, ps1, ps2).apply {
            forEach {
                it.tintFunc = { Vec3(random(), random(), random()) }
            }
        }

        engine.add(ps)

        engine.onKeyPressed = {
            it.preventDefault()
            when (it.which) {
                // Tab
                9 -> {
                    index = if (index >= systems.size - 1) 0 else index + 1
                    engine.clear()
                    engine.add(systems[index])
                }
            }
        }

        engine.onUpdate = {
            ps.position.x = 5 * cos(Engine.time)
            ps.position.y = 5 * sin(Engine.time)
            ps.position.z = -5f
        }
    }

    fun solarDemo() {
        currentDemo = "solarDemo"
        val engine = Engine()
        Engine.camera = FirstPersonCamera().apply {
            position = Vec3(0, 3, 10)
            rotation = Vec3(-0.3, 0, 0)
        }

        fun createPlanet(texture: String, size: Number, orbit: Number, period: Number) =
                Pair(
                        Sphere(texture = ModelLoader.loadTexture("models/solar/${texture}_diffuse.jpg")),
                        Triple(size.toFloat() / 100, orbit.toFloat() / 100, period.toFloat() * 2)
                )

        engine.add(Sphere(texture = ModelLoader.loadTexture("models/solar/positiveX.jpg")).apply {
            scale = Vec3(100, 100, 100)
            rotation = Vec3(0, 180, 0)
        })

        val orbits = mutableListOf<engine.RenderingObject>()

        val planets = listOf(
                createPlanet("sun", 50f, 0f, 0f),
                createPlanet("mercury", 4f, 57f, 0.241),
                createPlanet("venus", 8f, 100f, 0.615),
                createPlanet("earth", 30f, 130f, 1.0),
                createPlanet("moon", 1f, 20f, 0.075),
                createPlanet("mars", 6f, 180f, 1.88),
                createPlanet("jupiter", 20f, 300f, 11.86),
                createPlanet("saturn", 17f, 400f, 9.86),
                createPlanet("uranus", 10f, 450f, 15.86),
                createPlanet("neptune", 10f, 500f, 8.86)
        ).apply {
            forEach {
                val (planet, info) = it
                val (size, orbit, period) = info
                engine.run {
                    add(planet.apply {
                        scale = Vec3(size, size, size)
                    })
                    val path = OrbitPath(orbit)
                    orbits.add(path)
                    add(path)
                }
            }
        }

        engine.onUpdate = {
            planets.forEachIndexed { i, pair ->
                val (planet, info) = pair
                val (size, orbit, period) = info

                if (i != 0) {
                    // Earth & Moon
                    if (i == 4) {
                        val earthPos = planets[3].first.position
                        planet.position = earthPos + Vec3(sin(Engine.time / period) * orbit, 0, cos(Engine.time / period) * orbit)
                        orbits[i].position = earthPos
                    } else {
                        planet.position.x = sin(Engine.time / period) * orbit
                        planet.position.z = cos(Engine.time / period) * orbit
                    }
                }
            }
        }
    }
}

fun main(args: Array<String>) {
    window.onload = {
        Main()
    }
}
