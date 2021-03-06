package engine

import math.Vec3
import org.khronos.webgl.*

abstract class RenderingObject(private var vertices: Array<Float>, private var normals: Array<Float>, private var texCoords: Array<Float> = arrayOf(),
                               val tex: WebGLTexture = ModelLoader.loadTexture(), var tint: Vec3 = Vec3()): Entity() {
    constructor(values: Triple<Array<Float>, Array<Float>, Array<Float>>, tint: Vec3 = Vec3(), texture: WebGLTexture): this(values.first, values.second, values.third, tint = tint, tex = texture)

    var materialShininess = 128f
    var materialSpecularColor = Vec3(1f, 1f, 1f)
    var materialColor = Vec3(0f, 0f, 0f)

    var vert: Float32Array = Float32Array(0)

    val attribBuffer = Engine.gl.createBuffer() ?: throw IllegalStateException("Unable to create webgl buffer!")

    init {
        if (vertices.isNotEmpty()) {
            // Fill in tex coords if empty
            if (texCoords.isEmpty()) {
                val tc = mutableListOf<Float>()
                (0 until vertices.size / 3 * 2).forEach { tc.add(0f) }
                texCoords = tc.toTypedArray()
            }

            // Fill in the normals if empty
            if (normals.isEmpty()) {
                val norm = mutableListOf<Float>()
                (0 until vertices.size).forEach { norm.add(0f) }
                normals = norm.toTypedArray()
            }

            vert = Float32Array(vertices.size + normals.size + texCoords.size)

            // Convert to a single array
            (0 until vertices.size / 3).forEach { vertIndex ->
                // Vertices
                (0 until 3).forEach { vert[vertIndex * 8 + it] = vertices[vertIndex * 3 + it] }
                // Normals
                (0 until 3).forEach { vert[vertIndex * 8 + 3 + it] = normals[vertIndex * 3 + it] }
                // Texture Coords
                (0 until 2).forEach { vert[vertIndex * 8 + 3 + 3 + it] = texCoords[vertIndex * 2 + it] }
            }

            Engine.gl.run {
                bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, attribBuffer)
                bufferData(WebGLRenderingContext.ARRAY_BUFFER, vert, WebGLRenderingContext.STATIC_DRAW)
            }
        }
    }

    open fun render(gl: WebGLRenderingContext, shaderProgram: ShaderProgram<ShaderData>) {
        gl.run {
            bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, attribBuffer)
            activeTexture(WebGLRenderingContext.TEXTURE0)
            bindTexture(WebGLRenderingContext.TEXTURE_2D, tex)

            uniform1i(getUniformLocation(shaderProgram.shaderProgram, "materialTex"), 0)

            shaderProgram.run {
                setUniformMatrix4fv("vMat", wMat.array)
                setUniformMatrix4fv("normMat", nMat.array)
                setUniform1f("materialShininess", materialShininess)
                setUniform3f("materialSpecularColor", materialSpecularColor)
                setUniform3f("color", materialColor)
            }

            drawArrays(shaderProgram.drawType, 0, vert.length / 8)
            bindTexture(WebGLRenderingContext.TEXTURE_2D, null)
        }
    }
}