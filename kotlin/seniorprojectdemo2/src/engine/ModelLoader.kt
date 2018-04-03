package engine

import math.Vec3
import org.khronos.webgl.Uint8Array
import org.khronos.webgl.WebGLRenderingContext
import org.khronos.webgl.WebGLTexture
import org.khronos.webgl.get
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.HTMLVideoElement
import org.w3c.files.File
import org.w3c.xhr.XMLHttpRequest
import web.Dom
import kotlin.browser.document
import kotlin.browser.window

// Followed https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_textures_in_WebGL

class ModelLoader {
    companion object {
        fun loadFile(file: String) {
            val rawFile = XMLHttpRequest()
            rawFile.open("GET", file, false)

            rawFile.onreadystatechange = {
                if (rawFile.readyState.toInt() == 4) {
                    if (rawFile.status.toInt() == 200 || rawFile.status.toInt() == 0) {
                        val allText = rawFile.responseText
                        println(allText)
                    }
                }
            }
            rawFile.send(null)
        }

        var copyVideo = false

        fun setupVideo(url: String): HTMLVideoElement {
            var playing = false
            var timeupdate = false

            fun checkReady() {
                if (playing && timeupdate) {
                    copyVideo = true
                }
            }

            return (document.createElement("video") as HTMLVideoElement).apply({
                autoplay = true
                muted = true
                loop = true

                onplaying = {
                    playing = true
                    checkReady()
                }

                ontimeupdate = {
                    timeupdate = true
                    checkReady()
                }

                src = url
                play()
            })
        }

        fun initTexture(): WebGLTexture {
            val texture = Engine.gl.createTexture()
            Engine.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture)

            val level = 0
            val internalFormat = WebGLRenderingContext.RGBA
            val width = 1
            val height = 1
            val border = 0
            val srcFormat = WebGLRenderingContext.RGBA
            val srcType = WebGLRenderingContext.UNSIGNED_BYTE
            val pixel = Uint8Array(arrayOf<Byte>(0, 0, 127, 127))
            Engine.gl.run {
                texImage2D(WebGLRenderingContext.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel)

                texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE)
                texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE)
                texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR)
            }

            return texture!!
        }

        fun updateTexture(texture: WebGLTexture, video: HTMLVideoElement) {
            val level = 0
            val internalFormat = WebGLRenderingContext.RGBA
            val srcFormat = WebGLRenderingContext.RGBA
            val srcType = WebGLRenderingContext.UNSIGNED_BYTE
            Engine.gl.run {
                bindTexture(WebGLRenderingContext.TEXTURE_2D, texture)
                texImage2D(WebGLRenderingContext.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video)
            }
        }

        fun loadTexture(url: String = "models/standard_texture.png"): WebGLTexture {
            val texture = Engine.gl.createTexture()
            Engine.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture)

            val level = 0
            val internalFormat = WebGLRenderingContext.RGBA
            val width = 1
            val height = 1
            val border = 0
            val srcFormat = WebGLRenderingContext.RGBA
            val srcType = WebGLRenderingContext.UNSIGNED_BYTE
            val pixel = Uint8Array(arrayOf<Byte>(0, 0, 127, 127))
            Engine.gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel)

            fun isPowerOf2(value: Int) = (value and (value - 1)) == 0

            val image = window.document.createElement("img") as HTMLImageElement

            image.onload = {
                Engine.gl.run {
                    bindTexture(WebGLRenderingContext.TEXTURE_2D, texture)
                    texImage2D(WebGLRenderingContext.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)
                    // WebGL1 has different requirements for power of 2 images
                    // vs non power of 2 images so check if the image is a
                    // power of 2 in both dimensions.
                    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                        // Yes, it's a power of 2. Generate mips.
                        generateMipmap(WebGLRenderingContext.TEXTURE_2D)
                    } else {
                        // No, it's not a power of 2. Turn of mips and set
                        // wrapping to clamp to edge
                        texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE)
                        texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE)
                        texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR)
                    }
                }
            }
            image.src = url

            return texture!!
        }

        fun loadFBX(path: String): RenderingObject = Cube()

        fun loadOBJSource(url: String): Triple<Array<Float>, Array<Float>, Array<Float>> {
            println("Downloading file")
            val text = Ajax.read(url, false)
            println("Download done")
            println("Parsing file")
            val vertices = mutableListOf<Vec3>()
            val normals = mutableListOf<Vec3>()
            val tex = mutableListOf<Vec3>()

            val vertOut = mutableListOf<Float>()
            val normOut = mutableListOf<Float>()
            val tcOut = mutableListOf<Float>()

            text.split("\n").forEach {
                val item = it.trim()
                val values = item.split(" ")

                when {
                    item.startsWith("vn") -> normals.add(Vec3(values[1].toFloat(), values[2].toFloat(), values[3].toFloat()))
                    item.startsWith("vt") -> tex.add(Vec3(values[1].toFloat(), values[2].toFloat(), 0))
                    item.startsWith("v") -> vertices.add(Vec3(values[1].toFloat(), values[2].toFloat(), values[3].toFloat()))
                    item.startsWith("f") -> when {
                        // v//n
                        item.contains("//") -> {
                            fun getIndex(value: String) = value.split("//")[0].trim().toInt()
                            fun getNormal(value: String) = value.split("//")[1].trim().toInt()

                            (1 until 4).forEach {
                                val v = vertices[getIndex(values[it]) - 1]
                                val n = normals[getNormal(values[it]) - 1]

                                vertOut.addAll(listOf(v.array[0], v.array[1], v.array[2]))
                                normOut.addAll(listOf(n.array[0], n.array[1], n.array[2]))
                                // No tex coords defined, leave blank
                            }
                        }
                        // v/t/n or v/t
                        item.contains("/") -> {
                            val hasNormals = item.split("/").size == 3

                            fun getIndex(value: String) = value.split("/")[0].trim().toInt()
                            fun getTex(value: String) = value.split("/")[1].trim().toInt()
                            fun getNormal(value: String) = value.split("/")[2].trim().toInt()

                            (1 until 4).forEach {
                                val v = vertices[getIndex(values[it]) - 1]
                                vertOut.addAll(listOf(v.x, v.y, v.z))

                                val t = tex[getTex(values[it]) - 1]
                                tcOut.addAll(listOf(t.x, t.y))

                                if (hasNormals) {
                                    val n = normals[getNormal(values[it]) - 1]
                                    normOut.addAll(listOf(n.x, n.y, n.z))
                                }
                            }
                        }
                        // v
                        else -> {
                            (1 until 4).forEach {
                                val v = vertices[values[it].toInt() - 1]
                                vertOut.addAll(listOf(v.x, v.y, v.z))
                            }
                        }
                    }
                    item.startsWith("mtllib") -> {
                        val u = url.split("/")
                        val file = u.subList(0, u.size - 1).joinToString("/") + "/" + item.split(" ")[1].trim()
                        // TODO: Do tex stuff
                        print(Ajax.read(file, false))

//                        var tex = loadTexture(Engine.gl, "models/models/standard_texture.png")
                    }
                }
            }

            println("Parsing done")

            return Triple(vertOut.toTypedArray(), normOut.toTypedArray(), tcOut.toTypedArray())
        }

        fun loadObj(text: String, texture: WebGLTexture = ModelLoader.loadTexture()): RenderingObject {
            val (vert, norm, tc) = loadOBJSource(text)
            return ObjObject(vert, norm, tc, texture = texture)
        }
    }
}