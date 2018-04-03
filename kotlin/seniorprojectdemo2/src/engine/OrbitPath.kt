package engine

import math.Vec3
import org.khronos.webgl.WebGLRenderingContext
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

private fun makePath(radius: Float): MutableList<Float> {
    val segments = 64

    val step = 360/segments

    val center = Vec3()
    val circle_u = Vec3(1.0, 0.0, 0.0)
    val circle_v = Vec3(0.0, 0.0, 1.0)
    var last = center + circle_u * radius

    val vertexPositions = mutableListOf<Float>()

    for (alpha in 0 until 360 step step) {
        val p = center + (circle_u.times(radius * cos(PI / 180 * alpha.toDouble()).toFloat())) + (circle_v.times(radius * sin(PI / 180 * alpha.toDouble()).toFloat()))
        vertexPositions.add(p.x)
        vertexPositions.add(p.y)
        vertexPositions.add(p.z)
        vertexPositions.add(last.x)
        vertexPositions.add(last.y)
        vertexPositions.add(last.z)
        last = p
    }

    val p1 = center + circle_u * radius
    vertexPositions.add(p1.x)
    vertexPositions.add(p1.y)
    vertexPositions.add(p1.z)
    vertexPositions.add(last.x)
    vertexPositions.add(last.y)
    vertexPositions.add(last.z)

    return vertexPositions
}

class OrbitPath(radius: Float): RenderingObject(makePath(radius).toTypedArray(), arrayOf()) {
    override fun render(gl: WebGLRenderingContext, shaderProgram: ShaderProgram<ShaderData>) {
        gl.run {
            bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, attribBuffer)

            shaderProgram.run {
                setUniformMatrix4fv("vMat", wMat.array)
                setUniform3f("color", Vec3(1, 1, 1))
            }

            drawArrays(WebGLRenderingContext.LINES, 0, vert.length / 8)
        }
    }
}