package math

import org.khronos.webgl.Float32Array

typealias Mat3JS = Float32Array

class Mat3(val array: Mat3JS) {
    constructor() : this(Float32Array(mat3.create()))
    constructor(a: Array<Float>) : this(Float32Array(a))

    fun clone(): Mat3 = Mat3(array)
    fun identity() {
        mat3.identity(array)
    }

    fun transpose() {
        mat3.transpose(array, array)
    }

    fun invert() {
        mat3.invert(array, array)
    }

    fun adjoint() {
        mat3.adjoint(array, array)
    }

    fun determinant(): Number = mat3.determinant(array)
    fun translate(v: Vec3) {
        mat3.translate(array, array, v.array)
    }

    fun rotateX(rad: Number) {
        mat3.rotateX(array, array, rad.toFloat())
    }

    fun rotateY(rad: Number) {
        mat3.rotateY(array, array, rad.toFloat())
    }

    fun rotateZ(rad: Number) {
        mat3.rotateZ(array, array, rad.toFloat())
    }

    fun scale(v: Vec3) {
        mat3.scale(array, array, v.array)
    }

    fun multiply(other: Mat3): Mat3 {
        val ret = Mat3()
        mat3.multiply(ret.array, array, other.array)
        return ret
    }

    operator fun times(other: Mat3): Mat3 = multiply(other)

}

external open class mat3 {
    companion object {
        fun create(): Mat3JS
        fun clone(a: Mat3JS): Mat3JS
        fun copy(out: Mat3JS, a: Mat3JS): Mat3JS
        fun fromValues(m00: Number, m01: Number, m02: Number, m03: Number, m10: Number, m11: Number, m12: Number, m13: Number, m20: Number, m21: Number, m22: Number, m23: Number, m30: Number, m31: Number, m32: Number, m33: Number): Mat3JS
        fun set(out: Mat3JS, m00: Number, m01: Number, m02: Number, m03: Number, m10: Number, m11: Number, m12: Number, m13: Number, m20: Number, m21: Number, m22: Number, m23: Number, m30: Number, m31: Number, m32: Number, m33: Number): Mat3JS
        fun identity(out: Mat3JS): Mat3JS
        fun transpose(out: Mat3JS, a: Mat3JS): Mat3JS
        fun invert(out: Mat3JS, a: Mat3JS): Mat3JS
        fun adjoint(out: Mat3JS, a: Mat3JS): Mat3JS
        fun determinant(a: Mat3JS): Number
        fun multiply(out: Mat3JS, a: Mat3JS, b: Mat3JS): Mat3JS
        fun translate(out: Mat3JS, a: Mat3JS, v: Vec3JS): Mat3JS
        fun scale(out: Mat3JS, a: Mat3JS, v: Vec3JS): Mat3JS
        //        fun rotate(out: Mat3JS, a: Mat3JS, rad: Number, axis: Vec3JS): Mat3JS
        fun rotateX(out: Mat3JS, a: Mat3JS, rad: Number): Mat3JS
        fun rotateY(out: Mat3JS, a: Mat3JS, rad: Number): Mat3JS
        fun rotateZ(out: Mat3JS, a: Mat3JS, rad: Number): Mat3JS
        //        fun fromTranslation(out: Mat3JS, v: Vec3JS): Mat3JS
//        fun fromScaling(out: Mat3JS, v: Vec3JS): Mat3JS
//        fun fromRotation(out: Mat3JS, rad: Number, axis: Vec3JS): Mat3JS
        fun fromXRotation(out: Mat3JS, rad: Number): Mat3JS
        fun fromYRotation(out: Mat3JS, rad: Number): Mat3JS
        fun fromZRotation(out: Mat3JS, rad: Number): Mat3JS
        //        fun fromRotationTranslation(out: Mat3JS, q: QuatJS, v: Vec3JS): Mat3JS
//        fun getTranslation(out: Vec3JS, mat: Mat3JS): Vec3JS
//        fun getScaling(out: Vec3JS, mat: Mat3JS): Vec3JS
//        fun getRotation(out: QuatJS, mat: Mat3JS): QuatJS
//        fun fromRotationTranslationScale(out: Mat3JS, q: QuatJS, v: Vec3JS, s: Vec3JS): Mat3JS
//        fun fromRotationTranslationScaleOrigin(out: Mat3JS, q: QuatJS, v: Vec3JS, s: Vec3JS, o: Vec3JS): Mat3JS
//        fun fromQuat(out: Mat3JS, q: QuatJS): Mat3JS
        fun frustum(out: Mat3JS, left: Number, right: Number, bottom: Number, top: Number, near: Number, far: Number): Mat3JS
        fun perspective(out: Mat3JS, fovy: Number, aspect: Number, near: Number, far: Number): Mat3JS
        fun perspectiveFromFieldOfView(out: Mat3JS, fov: dynamic, near: Number, far: Number): Mat3JS
        fun ortho(out: Mat3JS, left: Number, right: Number, bottom: Number, top: Number, near: Number, far: Number): Mat3JS
        //        fun lookAt(out: Mat3JS, eye: Vec3JS, center: Vec3JS, up: Vec3JS): Mat3JS
        fun str(a: Mat3JS): String
        fun frob(a: Mat3JS): Number
        fun add(out: Mat3JS, a: Mat3JS, b: Mat3JS): Mat3JS
        fun subtract(out: Mat3JS, a: Mat3JS, b: Mat3JS): Mat3JS
        fun sub(): Nothing
        fun multiplyScalar(out: Mat3JS, a: Mat3JS, b: Number): Mat3JS
        fun multiplyScalarAndAdd(out: Mat3JS, a: Mat3JS, b: Mat3JS, scale: Number): Mat3JS
        fun exactEquals(a: Mat3JS, b: Mat3JS): Boolean
        fun equals(a: Mat3JS, b: Mat3JS): Boolean
    }
}
