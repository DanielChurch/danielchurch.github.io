package engine

import org.khronos.webgl.WebGLRenderingContext

class StandardShader<T>(webgl: WebGLRenderingContext, drawType: Int, vainfo: Array<VertextAttributeInfo>, setter:
        (program: ShaderProgram<T>, data: T) -> Unit) : ShaderProgram<T>(
                webgl, drawType,
                Ajax.read("out/production/SeniorProjectKotlin/engine/standardShader.vert", false),
                Ajax.read("out/production/SeniorProjectKotlin/engine/standardShader.frag", false),
                vainfo, setter
        )