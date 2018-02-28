package engine

import math.Vec3

class Light {
    val position: Vec3 = Vec3()
    val color = Vec3(0.2f, 0f, 0f)
    val attenuation = 0.2f
    val ambientCoefficient = 0.005f

    val materialShininess = 8f
    val materialSpecularColor = Vec3(1f, 1f, 1f)
}