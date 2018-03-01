package engine

import math.Vec3

class Light {
    var position: Vec3 = Vec3()
    var color = Vec3(0.2f, 0f, 0f)
    var attenuation = 0.2f
    var ambientCoefficient = 0.005f
}