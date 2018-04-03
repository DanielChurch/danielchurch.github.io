package engine

import math.Vec3
import org.khronos.webgl.WebGLRenderingContext
import kotlin.js.Math.random

class ParticleSystem(val maxCount: Int = 2000, val spread: Int = 1, val emissionRate: Int = 1, val gravityScale: Float = -0.00098f, val lifetime: Int = 200): RenderingObject(arrayOf(), arrayOf()) {
    val particles: MutableList<Particle> = mutableListOf()

    private fun centeredRandom() = random() - 0.5

    var velFunc: (() -> Vec3)? = null
    var accelFunc: (() -> Vec3)? = null
    var tintFunc: (() -> Vec3)? = null

    var accel = Vec3(0, gravityScale, 0)

    private val pos
        get() = position

    override fun update() {
        particles.forEach {
            it.update()
            if (it.isDead) {
                particles.remove(it)
            }
        }

        if (particles.size < maxCount) {
            (0..emissionRate).forEach {
                particles.add(Particle().apply {
                    position = pos
                    currentLife = lifetime
                    val initForce = 0.01 * spread
                    velocity = velFunc?.invoke() ?: Vec3(centeredRandom() * initForce, centeredRandom() * initForce * 2, centeredRandom() * initForce)
                    acceleration = accelFunc?.invoke() ?: accel
                    scale = Vec3(0.05, 0.05, 0.05)
                    materialColor = tintFunc?.invoke() ?: Vec3(0, 0, 0)
                })
            }
        }
    }

    override fun render(gl: WebGLRenderingContext, shader: ShaderProgram<ShaderData>) {
        particles.forEach {
            shader.run {
                begin(it.attribBuffer, Engine.data)
                it.render(Engine.gl, this)
                end()
            }
        }
    }
}