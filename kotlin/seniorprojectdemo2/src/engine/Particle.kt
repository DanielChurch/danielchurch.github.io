package engine

import math.Vec3

class Particle: Cube(texture = Particle.texture) {
    companion object {
        val texture = ModelLoader.loadTexture("models/texture.png")
    }
    var currentLife = 100

    init {
        acceleration = Vec3(0, -0.00098, 0)
    }

    val isDead
        get() = currentLife < 0

    override fun update() {
        super.update()
        currentLife--
    }

}